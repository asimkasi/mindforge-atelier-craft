# Service packages — Lovable/Supabase Fix Shop

Offer: **fixes and pre-launch hardening for Lovable/Bolt-built React + Supabase apps.**
This file is the single source of truth for what is sold, at what price, with what scope.
Every listing, proposal, and delivery must match it word-for-word on scope. It contains
no client data and may be copied anywhere freely (see `README.md` in this directory).

Positioning, stated in every listing and proposal: production is **automation-assisted
(Claude Code) with human QA on every change** — each bug is reproduced before work starts
and re-tested after, so quality is verified by behavior, not by trust. Portfolio proof is
**self-initiated sample work, clearly labeled as such** — never presented as client work.

---

## Tier 1 — Single Fix: one bug, gone in 48 hours

**Price:** $75 fixed. **Intro pricing: first 5 orders at $50** — stated openly in the
listing as launch pricing while early reviews are earned, never as fake urgency.
**Delivery:** 2 days from receiving access + a confirmed reproduction.
**Revisions:** 1 revision round within 3 days of delivery.

**Scope (exactly one of):**
- An auth loop, login/signup failure, or password-reset failure
- One broken query, CRUD action, or page that errors/renders wrong data
- A failed publish/deploy or custom-domain error
- One misfiring Supabase Edge Function

**Deliverables:**
1. **Written reproduction before work starts** — the exact steps that trigger the bug,
   sent to the client to confirm it's the right bug. No confirmation, no clock start.
2. **The fix**, committed to a branch (or applied via the client's preferred workflow —
   Lovable, GitHub, or Supabase dashboard) with a clear commit/change description.
3. **Before/after demonstration** the client can repeat themselves: the reproduction
   steps run again, showing the failure gone.
4. **Plain-English root-cause summary** — what was wrong, exactly what changed, and
   which files/policies/settings were touched. No jargon walls.

**Explicitly OUT of scope:**
- New features, redesigns, styling work, or "while you're in there" additions
- Multiple bugs, or one symptom with several tangled root causes discovered during
  reproduction (paused and re-quoted as a Fix Pack before further work — never silently expanded)
- Bugs that cannot be reproduced from the client's description after one clarifying
  exchange (refunded/cancelled rather than billed for exploration)
- Third-party service outages or paid-plan limits (Supabase/Lovable platform issues are
  identified and explained, but can't be "fixed" from the codebase)

---

## Tier 2 — Fix Pack: up to 3 bugs + Supabase health check

**Price:** $150 fixed. **Intro pricing: first 5 orders at $95.**
**Delivery:** 3 days from receiving access + a confirmed written bug list.
**Revisions:** 1 revision round within 5 days of delivery.

**Scope:**
- Up to **3 scoped, reproducible bugs** in one Lovable/Bolt-built React + Supabase app,
  same categories as Single Fix
- Bug list confirmed in writing (short intake message/call) **before purchase**, so scope
  is fixed before money moves
- Plus a **Supabase quick health check** (read-only review, no changes beyond the 3 fixes)

**Deliverables:**
1. Per bug: written reproduction → fix → before/after demonstration → root-cause note
   (the full Single Fix treatment, three times)
2. **One-page health check report** in plain English:
   - RLS enabled/disabled status for **every** table
   - Exposed-key red flags (service-role key in client code, anon key misuse)
   - Auth configuration red flags (redirect URLs, email confirmation, session settings)
   - A prioritized "what else is lurking" list — findings only, ranked by risk
3. Additional findings are **quoted separately, never silently added or silently fixed**

**Explicitly OUT of scope:**
- A 4th bug, or swapping a confirmed bug for a new one after work starts (paid change order)
- Fixing anything the health check surfaces (that's a quote, often a Production Gate)
- New features, migrations, redesigns
- Anything excluded from Single Fix

---

## Tier 3 — Production Gate: auth + RLS audit and hardening

**Price:** $250 fixed. **Intro pricing: first 3 orders at $150.**
**Delivery:** 5 days from receiving access.
**Revisions:** 1 revision round within 7 days of delivery.

**Scope — a pre-launch security pass on one Lovable/Bolt-built React + Supabase app:**
- Audit of **every table's RLS status and policies**
- Auth flow review: signup, login, password reset, session handling, redirect URLs
- Service-role/anon key exposure check (client bundle, edge functions, repo history)
- **Fixes applied for up to 5 findings.** Larger apps (roughly >15 tables or >5 critical
  findings) are re-quoted **before** start, not discovered into a bigger bill.

**Deliverables:**
1. **Prioritized findings report** in plain English: what was wrong, what was fixed,
   what remains and why (with severity, so the client can decide what to do next)
2. **Automated RLS test script the client keeps and can re-run anytime** — it attempts
   cross-user data access against every table and prints **pass/fail per table**. The
   client (and my own QA) verifies the hardening by running it and reading the output,
   not by trusting a writeup.
3. **Go-live deploy checklist** specific to their app: keys, redirect URLs, backups,
   env settings, custom domain
4. Before/after demonstration for each applied fix, as in the other tiers

**Honest limits, stated in the listing verbatim:**
- This is a **scoped hardening pass** by an automation-assisted (Claude Code) workflow
  with human behavioral QA — **not a certified penetration test** and not a compliance
  certification (SOC 2, HIPAA, GDPR). If that's what's needed, I'll say so and step aside.
- Apps handling **regulated data** (health, financial, EU personal data) require the
  client's **explicit written authorization** before any data is accessed; where possible
  the audit runs against a staging/empty database instead.

**Explicitly OUT of scope:**
- Fixes beyond the 5 findings (quoted as follow-on work)
- Infrastructure outside Supabase + the app (DNS beyond the domain check, email
  deliverability, third-party APIs)
- Load testing, dependency CVE remediation, front-end refactors

---

## Rules that apply to every tier

**Fixed scope is the product.** Scope is confirmed in writing before payment. Anything
discovered mid-job is reported and quoted as a change order — never silently added,
never silently billed. One revision round per tier, covering defects in the delivered
work, not new requests.

**Access needed (requested at intake, minimum necessary):**
- Read (or collaborator) access to the repo, or Lovable project share
- A Supabase member invite (least-privileged role that permits the work) — **never**
  the client's personal login where an invite is possible
- The bug's reproduction context: which page, which account/role, what was clicked
- Credentials travel via the platform's private messages or a password manager share,
  never email/chat outside the platform

**The data-handling promise (printed in every listing, enforced by workflow):**
- Client code, data, and credentials live **only** in the git-ignored `VENTURE/clients/`
  workspace on my machine. They are **never committed to any repository** — not this
  one, not a private one — and never pasted into tracked files. (This repo's
  `.gitignore` enforces it; see `VENTURE/clients/README.md`.)
- Everything of the client's is **deleted after the revision window closes** (3/5/7 days
  by tier). What survives is non-confidential bookkeeping only: an anonymized slug,
  tier, dates, and amount in the ledger.
- Access granted for the job is relinquished at the same time: I ask to be removed from
  the Supabase project and repo when the revision window closes.
- Before any client material enters an AI tool session, job terms are checked to confirm
  third-party tool use is permitted — the up-front process disclosure in the proposal is
  what makes that consent informed. Data entering sessions is minimized; regulated data
  needs written authorization first (see Production Gate).
- Upwork's AI-data-training provisions stay **off** for all client work.

**QA gate (operator, before anything ships):** reproduce the bug from the written steps →
confirm it fails → apply the delivered fix → confirm it passes → for Production Gate, run
the RLS test script and read every pass/fail line. If the operator can't verify a change
behaviorally, it doesn't ship — it gets rebuilt until it can be verified behaviorally.

**Refusals (no exceptions):** work requiring credentials I don't have (legal, medical,
tax), academic-dishonesty work, apps whose purpose is deceptive, and any job whose terms
prohibit AI-assisted tooling (see `../launch/proposal-playbook.md` — those jobs are
skipped, not fudged).
