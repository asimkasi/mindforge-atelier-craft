# ThinkTank AI

**A prototype "AI app builder" that walks an app idea through a seven-phase, multi-agent pipeline — with pluggable LLM providers and Supabase persistence.**

> Status: **v0.1 prototype.** This is an exploratory build, not a production application. The [Known limitations](#known-limitations) section below is an honest inventory of what is wired up and what is still UI scaffolding.

---

## What it is

ThinkTank AI is a single-page React application. You type an app idea into a text field, and the app advances it through seven review phases, each attributed to a themed "agent":

| # | Phase | Agent |
|---|-------|-------|
| 1 | App Idea | Dream Weaver |
| 2 | Concept Draft | Dream Weaver |
| 3 | Technical Plan | Master Builder |
| 4 | UI/UX Mockup | Aesthetic Artist |
| 5 | Code Generation | Code Sage |
| 6 | Review/Test | Quality Guardian |
| 7 | Deploy/Run | Deployment Master |

At each phase, the frontend calls a Supabase Edge Function (`generate-agent-output`) that forwards a composed prompt to one of three selectable LLM backends — **OpenAI (gpt-4o)**, a **local LM Studio server**, or **OpenRouter (a free DeepSeek model)** — and returns the generated text. You review the output, optionally leave feedback, and click **Approve & Continue** to advance. Ideas, per-phase agent outputs, and an event log are persisted to a Supabase Postgres database, and the ten most recent log entries are displayed live in the UI.

## Tech stack

| Layer | Technology |
|---|---|
| Build tool | Vite 5 (with `@vitejs/plugin-react-swc`) |
| UI framework | React 18 + TypeScript 5 |
| Styling | Tailwind CSS 3 with a shadcn/ui component library (Radix UI primitives) |
| Routing | React Router 6 |
| Data layer | `@supabase/supabase-js` v2 (typed client generated in `src/integrations/supabase/`) |
| Server state | TanStack React Query 5 (provider configured; see Known limitations) |
| Backend | Supabase: Postgres (3 tables) + one Deno Edge Function |
| LLM providers | OpenAI, LM Studio (local), OpenRouter — switched per request |
| Scaffolding | Generated with Lovable, iterated by hand |

## Architecture at a glance

```
Browser (React SPA)
  ├── Index page: 3-panel layout
  │     ├── AgentMemory   (left sidebar — sample memory log display)
  │     ├── AgentWorkflow (center — the working pipeline)
  │     └── AgentPanel    (right sidebar — agent roster & router mock)
  │
  ├── supabase-js ──────────► Postgres: app_ideas, agent_outputs, project_logs
  │
  └── fetch POST /functions/v1/generate-agent-output
                └── Deno Edge Function ──► OpenAI | LM Studio | OpenRouter
```

Full component map, data-flow walkthrough, and a mermaid diagram: **[ARCHITECTURE.md](ARCHITECTURE.md)**.
Edge function contract: **[API.md](API.md)**. Database schema: **[DATA_MODEL.md](DATA_MODEL.md)**.

## Setup

### Prerequisites

- Node.js 18+ and npm (a `bun.lockb` is also checked in if you prefer Bun)
- A Supabase project (the repo is wired to project `sqjgtqgytbfrqwnmnyeh` in `supabase/config.toml` and `src/integrations/supabase/client.ts`; point those at your own project to run it yourself)
- Supabase CLI, if you want to run migrations and the edge function

### 1. Install and run the frontend

```sh
npm install
npm run dev        # Vite dev server on port 8080 (vite.config.ts)
```

Other scripts (from `package.json`): `npm run build`, `npm run build:dev`, `npm run lint`, `npm run preview`.

### 2. Apply the database schema

The single migration in `supabase/migrations/` creates the three tables. With the Supabase CLI linked to your project:

```sh
supabase db push
```

Or paste the migration SQL into the Supabase dashboard's SQL editor.

### 3. Configure and deploy the edge function

The function reads these environment variables (set them as function secrets, or in your shell for local serving):

| Variable | Needed for | Default |
|---|---|---|
| `OPENAI_API_KEY` | `llm: "openai"` mode | — |
| `OPENROUTER_API_KEY` | `llm: "openrouter"` mode | — |
| `LM_STUDIO_BASE_URL` | `llm: "lmstudio"` mode | `http://localhost:1234` |

```sh
supabase secrets set OPENAI_API_KEY=sk-...
supabase functions deploy generate-agent-output
# or run locally:
supabase functions serve generate-agent-output
```

Note: the frontend calls the function at the **relative path** `/functions/v1/generate-agent-output`, so the SPA expects to be served behind an origin that routes that path to Supabase (see Known limitations). LM Studio mode assumes the function itself can reach the LM Studio server — practical for local serving, not for a hosted edge function pointing at your laptop's `localhost`.

## Usage

1. Open the app; the center panel shows the phase timeline starting at **App Idea**.
2. Pick an LLM provider from the dropdown above the workflow card (OpenAI / LM Studio / OpenRouter).
3. Type an idea (e.g. "Project manager for biologists") and click **Submit Idea**. The idea is sent to the LLM, saved to `app_ideas`, and logged to `project_logs`.
4. For each subsequent phase, review the generated output, optionally type feedback (held in local state), and click **Approve & Continue**. Each output is saved to `agent_outputs` (linked to the idea) and logged. Prompts for later phases include all previous phases' outputs as context.
5. The **Recent Project Logs** box below the workflow shows the 10 newest rows from `project_logs`.
6. **Start Over** resets the pipeline to phase one.

## Project structure

```
src/
  main.tsx                        # entry point
  App.tsx                         # providers + routes (/ and catch-all 404)
  pages/
    Index.tsx                     # 3-panel layout page
    NotFound.tsx                  # 404 page
  components/
    AgentWorkflow.tsx             # phase state machine + LLM calls + persistence
    PhaseTimeline.tsx             # step indicator
    IdeaInput.tsx                 # phase-1 idea form
    PhaseReview.tsx               # output display + feedback box
    AgentPanel.tsx                # agent roster, router mock, plugin placeholders
    AgentMemory.tsx               # sample memory-log sidebar
    ui/                           # shadcn/ui component library
  hooks/                          # use-toast, use-mobile
  integrations/supabase/          # generated client + database types
supabase/
  config.toml                     # project id
  migrations/                     # schema (3 tables)
  functions/generate-agent-output # Deno edge function (LLM router)
```

## Known limitations

Documented deliberately — this is a prototype and the docs should say so:

- **Relative function URL.** `AgentWorkflow` fetches `/functions/v1/generate-agent-output` on the same origin, with no `apikey`/`Authorization` headers. Running against a hosted Supabase project requires either proxying that path, switching to `supabase.functions.invoke(...)`, or disabling JWT verification for the function.
- **No auth, no RLS.** The migration ships RLS statements commented out; all three tables are open to the anon key. Fine for a local demo, not for real users.
- **AgentPanel's "LLM Router" is display-only.** Its five buttons (including DeepSeek and Mock Mode) set local state that nothing consumes. The working provider selector is the three-option dropdown in `AgentWorkflow`.
- **AgentMemory shows hardcoded sample entries**, not database reads; the "Export Generated App (ZIP)" and "Plugin/Extension Docs" buttons have no click handlers.
- **React Query is mounted but unused** — data access is direct `supabase-js` calls in effects/handlers.
- **`exampleOutputs` in `AgentWorkflow.tsx` is an unused fixture** left over from the mock-mode era.
- **No tests**, and no license file is currently included in the repository.

---

*This document is a portfolio sample: professional documentation written for the author's own open prototype project, shown as an example of the codebase-documentation service.*
