# Case study: fixing a "works locally, dead in production" bug in a Supabase + React app

> **What this is (and is not).** This is a self-initiated portfolio sample: a real bug
> fix on **my own open-source app** ([`asimkasi/mindforge-atelier-craft`](https://github.com/asimkasi/mindforge-atelier-craft),
> a Lovable-built Vite + React + Supabase prototype). It is **not client work** — I have
> no client to name here yet, so instead the evidence is public: the fix is commit
> [`d97398a`](https://github.com/asimkasi/mindforge-atelier-craft/commit/d97398ab194001cb9a64db18ddfc952979ee442e)
> (file `src/components/AgentWorkflow.tsx`), and you can read every line of the diff.
>
> **How I work:** production is automation-assisted — Claude Code does the heavy
> lifting of investigation and code changes under my direction, and I personally QA
> and stand behind everything that ships. That combination (AI speed, human
> accountability) is the service.

---

## The symptom

The app is a multi-phase "AI agent workflow" demo: you submit an app idea, and a
chain of agents (concept draft → technical plan → UI mockup → code plan → QA →
deploy) is supposed to generate output for each phase via a Supabase Edge Function
that calls an LLM.

In the deployed app, clicking **Submit Idea** produced a JSON parse error instead
of any agent output. The repo's own commit history shows the symptom had been
chased twice before without being cured — both earlier fixes patched the *edge
function's* response handling:

- `2b37a2e` — "Fix: Resolve 'Unexpected end of JSON input' error"
- `2aacb91` — "Fix: Handle JSON parsing errors"

That is the classic signature of treating a symptom: the error message moved
around, but the feature stayed dead in production while working under the local
dev proxy. This is exactly the kind of bug Lovable/Bolt-built apps hit when they
graduate from preview to a real deployment.

## The root cause

The frontend called the edge function with a **relative URL**:

```ts
const fnResp = await fetch("/functions/v1/generate-agent-output", { ... });
const fnData = await fnResp.json();
```

Two independent reasons this cannot work in production:

1. **Wrong host.** The app is a static Vite build. A relative
   `/functions/v1/...` path resolves against the *static host* (Lovable
   publish, Netlify, etc.), not against the app's Supabase project at
   `https://<project-ref>.supabase.co`. The static host answers with a 404 —
   usually an HTML page — so `fnResp.json()` throws
   `Unexpected end of JSON input` / `Unexpected token '<'` before the code's
   own error branch can even run. Hence the misleading JSON errors.
2. **No auth headers.** Supabase Edge Functions (with default JWT
   verification, which this project uses — no `verify_jwt` override exists in
   `supabase/config.toml`) require `apikey`/`Authorization` headers. The raw
   `fetch` sent neither, so even with a correct absolute URL the call would
   have been rejected.

The project already had a configured Supabase client
(`src/integrations/supabase/client.ts`), which is the tell: the standard,
documented way to call an edge function from supabase-js is
`supabase.functions.invoke()`, which targets the correct functions URL **and**
attaches the required headers automatically.

## The second bug found in the same flow

While verifying the request path end-to-end, I traced the state flow and found
an off-by-one that meant **no generated output was ever displayed** — and the
final phase's output was never even generated:

- Clicking "Approve & Continue" on phase *N* generated output for phase *N*
  (stored under `phases[N].key`), then immediately advanced to phase *N+1* —
  whose review pane reads `outputs[phases[N+1].key]`. That key is never set at
  that point, so every review screen showed the "Output coming soon..."
  fallback forever.
- Worse, the generate button is hidden on the last phase
  (`currentPhase < phases.length - 1`), so the final "Deploy/Run" phase's
  output could never be generated at all.

The fix: `advancePhase` now generates the output for the phase being advanced
**into**, then moves to it — so every phase, including the last, shows the
content the user is meant to review. I deliberately stopped there: two
verified bugs, no speculative refactoring.

## The fix (actual diff, condensed)

The full change is one file, +43/−27 lines. The core hunks:

```diff
-      // Real LLM call via edge function
-      const fnResp = await fetch("/functions/v1/generate-agent-output", {
-        method: "POST",
-        headers: { "Content-Type": "application/json" },
-        body: JSON.stringify({
+      const { data: fnData, error: fnError } = await supabase.functions.invoke("generate-agent-output", {
+        body: {
           prompt: thisPrompt,
           llm,
           system: SYSTEM_PROMPTS[phase.key],
-        }),
+        },
       });
-      const fnData = await fnResp.json();

-      if (!fnResp.ok || !fnData.content) {
-        throw new Error(fnData.error || "LLM error");
+      if (fnError) {
+        // On a non-2xx response the edge function's JSON error body is on
+        // error.context — surface its message instead of a generic one.
+        let message = fnError.message;
+        if (fnError instanceof FunctionsHttpError) {
+          try {
+            const details = await fnError.context.json();
+            if (details?.error) message = String(details.error);
+          } catch {
+            // Error body wasn't JSON — keep the generic message.
+          }
+        }
+        throw new Error(message);
+      }
+      if (!fnData?.content) {
+        throw new Error(fnData?.error || "LLM provider returned no content.");
       }
```

```diff
-  // Advance phase and handle LLM calls/storage
+  // Advance phase and handle LLM calls/storage: generate the NEXT phase's output,
+  // then move to it — so every phase (including the final one) shows its content.
   const advancePhase = async () => {
     if (loading) return;
+    const nextIdx = currentPhase + 1;
+    if (nextIdx >= phases.length) return;
     try {
-      const phaseIdx = currentPhase;
-      const prevOutputs = outputs;
-
-      const genOut = await handleGenerateOutput(phaseIdx, idea, prevOutputs);
-
-      if (currentPhase < phases.length - 1) setCurrentPhase((p) => p + 1);
+      await handleGenerateOutput(nextIdx, idea, outputs);
+      setCurrentPhase(nextIdx);
     } catch (e) {
-      // Optionally notify error
-      alert("Error generating output: " + (e.message || e));
+      // Notify error; the workflow stays on the current phase so the user can retry.
+      alert("Error generating output: " + (e instanceof Error ? e.message : String(e)));
     }
   };
```

Error handling was upgraded as part of the fix, not as an afterthought: the
edge function already returns structured JSON errors (`{ error, status, ... }`),
and the frontend now actually surfaces them (via `FunctionsHttpError.context`)
instead of showing a parse error. The loading state was also moved to a
`finally` block so a failed request can't leave the UI stuck.

## How it was validated

Validation for this fix was static analysis plus a regression gate — stated
precisely, because that is what a client should expect me to state:

| Check | Before fix | After fix |
|---|---|---|
| `npm run build` (Vite production build) | passes | **passes** (`✓ built in 5.10s`, 1749 modules) |
| `npx tsc --noEmit` (strict compile of the app tsconfig) | — | **clean, exit 0** |
| `npm run lint` (ESLint 9) | 9 errors, 7 warnings (pre-existing, repo-wide) | **8 errors, 7 warnings — zero new findings**; the rewrite removed one pre-existing `no-explicit-any` error |
| Both response shapes traced by hand | — | success path (`{ content }`) and error path (`{ error, status, responseText }`) of `supabase/functions/generate-agent-output/index.ts` are both handled by the new client code |

The `supabase.functions.invoke()` pattern is Supabase's documented standard for
calling edge functions from the browser, which is why it is the fix rather than
hand-building an absolute URL with headers. Final sign-off happens the same way
it would on a client job: I exercise the deployed app end-to-end before calling
it shipped — that human QA pass is part of the package, not optional.

## What this looks like as a service

This is the shape of my fixed-scope app-fix package for Supabase/React apps
(including Lovable/Bolt-built ones):

1. **Diagnosis in writing** — the actual root cause, not the first thing that
   makes the error message change (this bug had already eaten two
   symptom-patching commits).
2. **A minimal, reviewable diff** — scoped to verified bugs; no drive-by
   rewrites of code that works.
3. **A stated validation trail** — build, typecheck, lint-against-baseline,
   and exactly what was and wasn't tested.
4. **Disclosed process** — AI-assisted production, human-QA'd delivery.

*Written August 2026. Repository: [github.com/asimkasi/mindforge-atelier-craft](https://github.com/asimkasi/mindforge-atelier-craft). Fix commit: [`d97398ab194001cb9a64db18ddfc952979ee442e`](https://github.com/asimkasi/mindforge-atelier-craft/commit/d97398ab194001cb9a64db18ddfc952979ee442e).*
