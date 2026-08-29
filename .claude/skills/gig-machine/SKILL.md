---
name: gig-machine
description: Run the productized-service pipeline — design fixed-scope service packages, and turn a real client brief into a polished, QA'd deliverable draft. Use for anything freelance/service related, e.g. "/gig-machine design my packages from VENTURE/research/x.md" or "/gig-machine deliver — client brief follows".
---

# Gig Machine

Services are the fastest real dollars: someone already wants an outcome and will pay for
it this week. You do the production; the operator does the human parts (winning the client,
communication, final review, delivery). Two modes:

## Mode 1 — Design packages (before there are clients)

From an offer spec (`VENTURE/research/<slug>.md`) or the user's description, produce
`VENTURE/clients/_packages.md`:

- **Three tiers** (e.g. $50 / $150 / $400): exact scope, exact deliverables, delivery time,
  number of revisions. Fixed scope is the whole point — vague scope is how beginners get
  scope-creeped into $4/hour.
- **Platform listing drafts** for where they'll sell (Upwork profile + proposal template,
  Fiverr gig structure, or a direct one-pager). Written to be concrete and portfolio-backed,
  never keyword-stuffed.
- **Portfolio pieces**: for a zero-review newcomer, build 2–3 speculative before/after
  samples (real work on public/sample data, clearly labeled as samples) so the profile has
  proof on day one.
- **Proposal snippets** the operator personalizes per job. Rules: only respond to posted
  jobs or inbound interest; every proposal references the client's actual brief; no
  copy-paste blasts — platforms detect and bury them, and they don't convert anyway.

## Mode 2 — Deliver (a real client brief exists)

1. Create `VENTURE/clients/<client-slug>/` with `brief.md` (the brief, verbatim),
   then `clarifying-questions.md` — the 3–5 questions worth asking before work starts.
   Ambiguity discovered after delivery costs a revision cycle and a review star.
2. Produce the deliverable to the tier's exact scope. Same bar as product-factory:
   complete, specific, runnable/usable, no placeholders.
3. **QA pass as the client**: does this match every word of the brief and the listed scope?
   Write `qa.md` noting anything that deviates and why.
4. Write `delivery-note.md`: a short, warm handover message for the operator to send —
   what was done, how to use it, what's covered by revisions. Plus, if natural, one genuine
   upsell suggestion (never pushy).
5. On revision requests: treat them as new briefs in the same folder (`revision-1.md`, …).
   In-scope revisions get done cheerfully and fast — reviews compound; arguing doesn't.

## Rules

- The operator personally reviews every deliverable before it's sent, and personally sends
  all client communication. You draft; they own the relationship.
- Never misrepresent who does the work: if a client asks about process or AI use, the
  operator answers honestly. Most clients pay for outcomes, not keystrokes — honesty holds.
- Never accept (or design packages for) work in domains that require credentials the
  operator lacks (legal advice, medical, tax filings) or academic-dishonesty work
  (essays for students, ghostwritten theses).
- Track every delivery in `VENTURE/ledger.csv` (see `/weekly-review`).
