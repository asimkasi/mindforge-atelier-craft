# Venture state

_Updated by `/weekly-review`. Last update: 2026-09-05, 14:00 UTC (review #2 — one full
week with no operator activity reported; everything remains blocked on the day-1 human
steps. September overhead logged.)_

## Scoreboard

Conventions: **net revenue** = sum of `net_usd` in `ledger.csv` *excluding*
`track=overhead` rows (i.e. after platform fees and refunds, before taxes). Overhead
(the Claude subscription) is reported on its own line so the break-even picture stays
visible without making the revenue target ambiguous.

| Metric | Value |
|---|---|
| Trailing-30-day net revenue | $0 |
| Monthly overhead | −$200 (Claude Max; one row per month, not a trailing sum) |
| Net after overhead (monthly) | −$200 |
| Target | $200/mo net revenue |
| Hours this week / effective $-per-hour | 0 reported / n.a. |
| Weeks reviewed in a row | 2 |
| Products live | 0 |
| Service packages listed | 0 |

## Live

Nothing yet — nothing can be listed until the operator creates the Upwork account.

## The chosen offer (Track A, one offer / one channel / 90 days)

**Lovable/Supabase fix packages** — picked from live marketplace evidence on 2026-08-29
(urgent exact-fit Upwork job stream, $30–$1,000 price anchors, weak keyword-spam
competition, strongest operator fit). Tiers in `VENTURE/clients/_packages.md`:
Single Fix $75 (intro $50) · Fix Pack $150 (intro $95) · Production Gate $250 (intro $150).

## In progress

- ✅ Engine installed (skills + playbook), merged to main.
- ✅ Launch kit built: `VENTURE/launch/` (Upwork profile copy, Fiverr gig, proposal
  playbook, day-1 checklist) + `VENTURE/clients/_packages.md`.
- ✅ Portfolio built: `VENTURE/portfolio/` — data-cleanup case study (real Chicago
  public dataset, runnable pipeline), full docs package for this repo, and a real
  bug-fix case study (the app's edge-function call, fixed and build-verified).
- ✅ Weekly review automated: fires every Saturday 14:00 UTC into the operator's session.
- ⏳ **Blocked on the operator**: `VENTURE/launch/day-1-checklist.md` (<60 min).

## Killed (stays dead — don't re-scout without new evidence)

- **data-cleanup as the OPENING offer** — most commoditized of the three candidates,
  $5–50 Fiverr anchors with data-entry price gravity (kept as a portfolio proof and a
  possible later second offer, not the lead).
- **codebase-docs as the OPENING offer** — weakest live-demand signal; no stream of
  small fixed-scope "document my repo" jobs to bid on.

## Next 3 actions

1. **Operator, smallest possible step (~15 min)**: create the Upwork account and start
   ID verification — just that; verification takes days to clear, so starting it is the
   whole point. Profile paste and Connects can be a separate 20-minute session later.
2. Tell Claude "account created" → Claude walks the rest of
   `VENTURE/launch/day-1-checklist.md` with you, then preps the first 5 tailored
   proposals from live job posts (you personalize and submit).
3. Optionally publish the passive Fiverr gig from `VENTURE/launch/fiverr-gigs.md`.
   The automated `/weekly-review` runs Saturday and reports the scoreboard either way.
