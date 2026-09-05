# The Venture Engine

**An honest system for building AI-leveraged income with Claude Code.**
Target: $200/month net (covering the Claude Max subscription), designed to scale well past it.

## Read this first: what this is and isn't

No AI agent autonomously "generates income." Money arrives only when a real person pays
for a product or service — through payment accounts only you can own, on platforms whose
rules only you can accept, for work you're willing to put your name on. Anyone selling you
a fully-autonomous-money-agent is selling you the shovel, not the gold.

What AI *can* do — and what this engine does — is make your few weekly hours count for
three to five: agents carry production while you keep only the judgment, approval, and
relationship work. Your Claude Max subscription is the key economic asset here:
**agent labor run inside Claude Code sessions has zero marginal cost to you.** Production
(building products, drafting deliverables, writing listings, doing research) is
effectively free within Max usage limits. That flips the traditional solo-business
equation: your scarce
resources are no longer production hours — they are **distribution, trust, and your 3–6
human hours a week.** Everything in this system is designed around that inversion.

The engine is honest about the base rates: most digital products sell zero copies; most
new freelancer profiles die in the cold-start; most content sites never pay. It beats those
base rates the boring way — demand-checking before building, portfolio shots-on-goal,
review-compounding, weekly kill/scale discipline — not by pretending they don't exist.

## How the engine works

Five Claude Code skills (in `.claude/skills/`) form the labor layer. You invoke them by
name in any Claude Code session in this repo:

| Skill | What it does | When |
|---|---|---|
| `/market-scout` | Demand-checks a niche, kills bad ideas cheaply, writes an offer spec | Before building anything |
| `/gig-machine` | Designs fixed-scope service packages; turns client briefs into QA'd deliverables | Services track |
| `/product-factory` | Builds a complete, sellable digital product from a spec | Products track |
| `/listing-writer` | Writes platform-tuned marketplace listing copy | After building |
| `/weekly-review` | The ops loop: ledger, run-rate vs. target, kill/scale rules, next 3 actions | Every week, same day |

The workspace:

```
VENTURE/
  README.md      ← you are here
  PLAYBOOK.md    ← the three income tracks, with real math and timelines
  PROMPT.md      ← the improved version of the original prompt, reusable with any AI
  STATE.md       ← current scoreboard + next 3 actions (updated by /weekly-review)
  ledger.csv     ← every dollar in and out, net of fees
  research/      ← offer specs from /market-scout
  products/      ← built products awaiting/after launch
  clients/       ← service packages + client work — CONTENTS ARE GIT-IGNORED (see below)
  launch/        ← the Upwork/Fiverr launch kit: profile copy, gig, proposal playbook, day-1 checklist
  portfolio/     ← the three sample artifacts that make a zero-review profile credible
  assets/        ← shared images, logos, thumbnails
```

**Client-data warning**: this repository syncs to a hosted remote (GitHub, and Lovable
auto-commits to it). Client briefs, datasets, code, and security findings therefore live
only in `VENTURE/clients/`, whose contents are git-ignored — never commit them, never
weaken that ignore rule, and use anonymized client slugs in the ledger and state files.
The `gig-machine` skill enforces this and purges client data after each delivery.

The loop is: **scout → build → list → distribute → weekly-review → kill or scale.**
The playbook (`PLAYBOOK.md`) explains the three tracks and the sequencing rule the
failure-mode analysis insists on: **one offer, one channel, 90 days** — services first
(fastest real dollars), products only once service work proves demand for them,
compounding assets once revenue exists.

## What only you can do (Week-0 checklist, ~45 minutes)

The engine is installed and idle until these human-only steps happen:

- [ ] **Unfair-advantage inventory.** Write 5–10 bullets: domains you know better than the
  average person, tools you use daily, audiences you belong to, things people ask your help
  with. This is the single strongest predictor of which offers work, and no AI can write it
  for you. Save it as `VENTURE/research/_unfair-advantage.md`.
- [ ] **Pick your opening offer** after reading `PLAYBOOK.md` — one offer, one channel
  for the first 90 days. The default and strong recommendation is a Track A productized
  service; override it only if your unfair-advantage list argues hard for something else.
- [ ] **Create the accounts for your track** (you own these; never share credentials with
  any AI): services → Upwork (start day 1 — ID verification and approval can take days)
  and optionally Fiverr; products (later) → Gumroad and/or Lemon Squeezy with tax info
  and payout bank.
- [ ] **Commit to a weekly review slot** — same day every week, 30 minutes, run
  `/weekly-review`. Consistency is the actual engine; everything else is parts.
- [ ] **Taxes (US rule of thumb)**: this is real self-employment income. Set aside
  ~25–30% of net, track everything in `ledger.csv` (the skills maintain it, you
  sanity-check it), and once real revenue starts, confirm specifics — quarterly
  estimated payments, deductions, your jurisdiction — with a tax professional.

## Guardrails (the engine will refuse these, and so should you)

- **No spam**: no mass cold outreach, no automated proposal blasts, no posting where
  self-promotion isn't welcome. Platforms detect it, ban for it, and it doesn't convert.
- **No fakery**: no fake reviews, testimonials, sales counts, or engagement; no
  plagiarized or thinly-rewritten products; no hiding AI involvement where a platform
  requires disclosure (Etsy does) or a client asks directly.
- **No trading-as-income**: you have a brokerage connected — a trading bot is capital at
  risk with negative expected value after costs, not income. It has no place in this plan.
- **Human approval on everything public**: nothing gets published, delivered, or sent to
  a client without your personal review. Your name and your platform reputation are the
  durable assets; agents draft, you own.
- **No credential sharing**: Claude drafts listings and messages; you paste and publish.
  Payment accounts, marketplace logins, and client relationships stay in your hands.
- **Client confidentiality is absolute**: client material never enters a tracked file or
  leaves this machine, AI use is disclosed up front in proposals (and jobs that prohibit
  AI are skipped), and client data is purged after each delivery.

## Scaling past $200

$200/mo is the break-even bar, not the design ceiling. The scale path (detail in
`PLAYBOOK.md`): services scale by reviews → higher prices → retainers (~$1.5–2.5k/mo
ceiling at 6 hrs/wk); products scale by finding one winner and building a product line
around it (asymmetric upside, $1–3k/mo realistic at 12–18 months if a winner emerges);
compounding assets (newsletter, OSS tools, micro-SaaS) stack on top once cash flow exists.
When trailing-30-day net revenue (excluding the subscription overhead line) crosses $200,
`/weekly-review` raises the target to $500 and adds a compounding-track experiment.

## Getting started right now

1. Complete the Week-0 checklist above.
2. Open a Claude Code session in this repo and run:
   `/market-scout` — paste your unfair-advantage list and ask it to evaluate 3 candidate offers.
3. Build the winner with `/gig-machine` — its package sheets double as your service
   listings, so no separate listing pass is needed. (`/product-factory` +
   `/listing-writer` come later, once the Track B entry condition in `PLAYBOOK.md` is
   met.) Publish (you), then run `/weekly-review` in seven days.
