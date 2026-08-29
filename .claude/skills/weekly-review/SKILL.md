---
name: weekly-review
description: Run the weekly operations loop for the VENTURE income engine — review the ledger and state, compute run-rate vs. the $200/mo target, apply kill/scale rules, and set next week's 3 actions. Use weekly or whenever the user asks "how's the business doing" / "what should I do next" / "/weekly-review".
---

# Weekly Review

This is the flywheel. Solo businesses die from drift, not from bad ideas — the operator
skips a week, momentum dies at week 3, the products rot unlaunched. Your job each week:
face the numbers, decide, and leave exactly three actions on the table.

## Process

1. **Read the state**: `VENTURE/STATE.md`, `VENTURE/ledger.csv`, and skim
   `VENTURE/research/`, `VENTURE/products/`, `VENTURE/clients/` for anything new or stalled.
2. **Ask the operator** what happened this week that isn't in the files: sales, client
   replies, listings published, hours actually spent. Append any new revenue/costs to
   `VENTURE/ledger.csv` (columns: `date,track,item,gross_usd,fees_usd,net_usd,notes`).
3. **Compute honestly**:
   - Net revenue this week / this month; trailing-30-day run-rate vs. the $200/mo target.
   - Hours spent → effective $/hour (face this number; it should trend up monthly).
   - Pipeline: products live vs. drafted-but-unlaunched (drafted-but-unlaunched is the
     classic failure state — flag it loudly), proposals sent, replies, conversion.
4. **Apply the standing rules** (the operator can override, but make them argue):
   - **Leading indicators first**: before month 3, judge weeks by inputs, not revenue —
     the weekly quota floor is 5 tailored proposals OR 3 substantive community
     contributions (agent-prepped, ≤90 human minutes). Revenue lags; quota-kept weeks lead.
   - **Week-4 diagnostic**: count conversations with humans who could pay. Zero means
     the venture is currently a hobby — say so plainly and make action #1 a conversation,
     not a build.
   - **Kill**: a product with 0 sales after 4 weeks live *with real distribution effort*
     gets one repositioning (new listing/price/audience via `/listing-writer`), then killed.
     A niche with 10+ proposals and 0 replies gets its offer redesigned, not more proposals.
   - **Scale**: anything that sold twice gets doubled down — a v2, a companion product,
     a raised price, or more distribution. Revenue concentration beats portfolio spray.
   - **Unblock**: if the bottleneck is a human step (account not created, product not
     uploaded), next week's action #1 is that step, timeboxed to 30 minutes.
   - **Ramp check**: if trailing-30-day net ≥ $200, the target moves to $500 and one
     compounding-track experiment (see `VENTURE/PLAYBOOK.md` track C) gets added.
5. **Write back** `VENTURE/STATE.md`:
   - Scoreboard (this month net, run-rate, streak of weeks reviewed).
   - What's live, what's in progress, what was killed and why (so dead niches stay dead).
   - **Next 3 actions** — each with its skill command (e.g. "run `/product-factory` on X",
     "upload Y — human step, 30 min") and the single metric it should move.
6. **Tell the operator** the summary in plain language: the number, the trend, the three
   actions, and one sentence of coach-honest assessment (celebrate real wins; name drift
   as drift — "nothing shipped in 2 weeks" said kindly and directly).

## Rules

- Never inflate: the scoreboard reports `net_usd` after fees, never gross, never "projected".
- Money math stays in the ledger; if ledger and memory disagree, the ledger wins and gets fixed.
- If the operator has genuinely stalled for 3+ weeks, don't pile on more actions — propose
  shrinking scope to one action of 30 minutes. Restarting the streak matters more than the plan.
- This skill can be automated: the operator can ask Claude to schedule a weekly session
  that runs this review and messages them the summary (in Claude Code: a scheduled task /
  Routine; offer to set this up, don't do it unasked).
