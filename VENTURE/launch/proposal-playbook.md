# Proposal playbook — Upwork active bidding

The channel is **active targeted bidding**, 8–12 proposals/week at full cadence (the
weekly quota floor is 5 — see `day-1-checklist.md`). Claude drafts; **you personalize,
approve, and submit every proposal by hand** — automated submission violates Upwork ToS
and is the account-ban step. Expect the first contract after 15–30 tailored proposals;
silence through proposal 10 is normal variance, not a verdict.

---

## 1. Picking jobs — the three gates (all must pass)

**Gate 1 — Fresh:** posted **<24 hours ago**. Urgent Lovable/Supabase buyers hire fast;
a 3-day-old post is usually already filled or dead. Sort search by newest; check twice
a day if possible (morning + evening), otherwise once.

**Gate 2 — Uncrowded:** **fewer than 10 proposals** shown. At 10–15 you're buying a
lottery ticket; at 50 you're donating Connects.

**Gate 3 — Exact fit:** the job maps onto a tier in `../clients/_packages.md` with no
squinting:
- ✅ "Lovable app login loop", "Supabase RLS error", "app won't publish to custom
  domain", "edge function failing", "finish auth on my Lovable app", "pre-launch
  security check"
- ❌ Native mobile apps, WordPress, Firebase-only, "build me a whole app", vague
  "AI developer needed" posts, hourly staff-augmentation roles

Saved searches to set up day 1 (Upwork lets you save + get alerts):
`lovable supabase` · `lovable bug` · `supabase RLS` · `lovable app fix` ·
`bolt.new supabase`

**Client-quality screen (30 seconds):** payment method verified; hire rate >40% or a
brand-new client with a clear, specific brief; budget ≥$50 or hourly with a plausible
range. Skip "$5 for quick fix" posts and briefs written in pure buzzword.

**Budget mismatch rule:** if the post's fixed budget is below your intro price but the
job is a perfect fit, bid your real intro price with one honest line about why —
don't race to their number.

---

## 2. The AI-restriction check — BEFORE drafting anything

Read the full post for AI-use terms. Three outcomes:

1. **"No AI" / "human-written code only" / "no ChatGPT/Claude"** → **skip the job
   entirely.** Delivering 80–90% Claude-produced work there is misrepresentation by
   omission, a refund risk, and a review bomb. No exceptions, however perfect the fit.
2. **Restricted or ambiguous** ("explain your process", "AI-assisted OK if disclosed")
   → bid, with the disclosure paragraph (below) prominent, not buried.
3. **Silent on AI** → bid; the disclosure paragraph is still included. Disclosure is
   the default posture and the selling point (speed + fixed price + human-verified),
   not an answer-only-if-asked fallback.

Standing disclosure paragraph (adapt tone, keep substance):

> A note on process, up front: I work automation-assisted — I use Claude Code for
> production — and every change gets human QA: I reproduce your bug before touching
> anything and re-test it after, and you get a before/after demonstration you can
> repeat yourself. That's what makes a 48-hour fixed-price turnaround possible.

---

## 3. The proposal SKELETON

This is a **structure, not a template to blast**. Upwork buries near-duplicate
proposals and buyers smell them instantly. Every proposal is rebuilt around the three
personalization points; if you can't fill all three, the job failed Gate 3 — skip it.

**The 3 things personalized per job (non-negotiable):**
1. **Their symptom, mirrored in their words** — quote or closely paraphrase the actual
   error/behavior from their post in the first two lines.
2. **Your specific hypothesis** — 1–2 sentences on the likely root-cause *area* for
   their exact symptom (e.g. a login loop → Supabase redirect-URL config or session
   persistence; data visible to wrong users → RLS policy gap). A hypothesis, not a
   promise — it proves you read the post and know the terrain.
3. **The matching tier + a concrete first step** — which package fits their job, its
   fixed price, and the exact first thing you'll send them (the written reproduction).

**Skeleton (6 short blocks, ~150–220 words total — brevity wins):**

```
[1. MIRROR — 1–2 lines] Their symptom in their words. No greeting fluff, no
   "Dear esteemed client", no restating your own title.

[2. HYPOTHESIS — 1–2 sentences] Likely root-cause area for that exact symptom,
   framed as "usually one of X or Y — I'd confirm before touching anything."

[3. PROCESS — 2–3 sentences] First deliverable is a written reproduction they
   confirm; then the fix; then a before/after demo they can re-run. Include the
   AI-disclosure paragraph from section 2 here.

[4. OFFER — 1–2 lines] The tier, the fixed price (intro price while it applies —
   say it's intro pricing for early reviews, openly), the delivery time, one
   revision round, and the data promise in one clause ("your code is never
   committed anywhere and is deleted after the revision window").

[5. PROOF — 1 line] One link/attachment: the portfolio piece closest to their
   problem, explicitly labeled a self-initiated sample ("sample project on my own
   app — I'm new to Upwork and my work is the proof I've got").

[6. QUESTION — 1 line] One specific, easy-to-answer question about their setup
   that moves the job forward (e.g. "Is the app deployed via Lovable publish or
   your own Vercel?"). Ends the proposal in their court.
```

**Never in a proposal:** claimed client history that doesn't exist, invented metrics,
"I have 10 years of experience", promises to fix unseen bugs by a deadline, free work
("I'll fix it first, pay if happy" — against your economics and often ToS-gray), or
attachments the post didn't ask for beyond the one proof link.

---

## 4. Intro pricing rule — first 2–4 jobs

- Quote **intro prices** ($50 Single Fix / $95 Fix Pack / $150 Production Gate) for the
  first jobs until you have **3–5 reviews**, then move to full prices ($75/$150/$250)
  for all new quotes. Track which order you're on in `../STATE.md`.
- Say it's intro pricing **in the proposal** ("launch pricing while I earn my first
  reviews — the listed price rises after") — honesty converts better than mystery
  discounts, and it pre-frames the later price rise.
- Never go below $50. Below that, buyers read "risky", and one bad-fit $20 job costs
  more in review risk than it pays.
- **Over-deliver on the first five jobs** (playbook rule): tighter summaries, faster
  responses, one small genuinely-useful extra (e.g. a config note you noticed) — named
  in the delivery message, not silently expected to be noticed.

---

## 5. Response-time rules

- **<24h response to any client message, always** — slower is the #1 controllable
  killer per the playbook. Set Upwork mobile push notifications ON at signup.
- Aim for **<4h during your stated working window**; say your timezone and window in
  the first exchange so expectations are set by you, not assumed.
- Invited to interview / asked a question → answering **within 1–2 hours** while
  competitors sleep is the single cheapest conversion edge a newcomer has.
- If a week is blown (illness, day job), pause the "available now" badge rather than
  letting response times rot silently.
- Every proposal that gets a *reply* gets logged in `../STATE.md` (the week-4
  diagnostic counts conversations, not proposals).

---

## 6. Per-job workflow (so no step gets skipped under time pressure)

1. Job passes all three gates + AI check → save link.
2. Claude drafts the proposal from the skeleton + the job text.
3. **You** rewrite personalization points 1–3 in your own words (10 min max), verify
   every claim in it is true, submit by hand.
4. Log in `../STATE.md`: date, job link, tier quoted, Connects spent.
5. On win: `/gig-machine deliver` — Mode 2 takes over (intake gate, client folder,
   QA, delivery note, purge). On silence after 7 days: close it mentally, move on —
   the cadence is the game, not any single job.
