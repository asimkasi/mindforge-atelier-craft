# The Playbook

Three income tracks, ranked by speed-to-first-dollar. The math below is net of platform
fees, assumes a solo newcomer with no audience and 3–6 hrs/week, and was researched
against current platform terms in August 2026 (see Appendix — re-verify fees before
relying on them; platforms change).

**Recommended sequence — one offer, one channel, 90 days.** Track A (services) is the
opening move: it's the only reliably fast path for a no-audience newcomer, and it
generates the demand evidence the other tracks need. Add Track B (products) only when a
service request has been paid for or asked about 3+ times — that's demand proof, and
products built from it dramatically beat the sell-zero base rate. Add Track C
(compounding) once revenue exists. Running two sales channels before the first one works
simply halves both. The one cheap exception: a low-effort build-in-public log of your
service work costs ~30 min/week and pre-seeds Track C's audience without being a second
channel.

**The week-4 diagnostic** (from the failure-mode analysis, and it applies to this very
repo): at the end of week 4, count conversations with humans who could pay you. If the
number is zero, you're building a hobby, no matter how good the code is. Building agent
pipelines feels like progress and produces $0 — and free Claude labor makes that trap
*cheaper*, not safer.

---

## Track A — Productized services (fastest: first dollar in weeks 3–8)

**The offer**: ONE fixed-scope, fixed-price package where Claude Code does 80–90% of
production and you do intake, QA, and the client relationship. Pick one of these three
(best demand-to-competition ratios for an AI-leveraged newcomer; #2/#3 fit your existing
Supabase/React experience):

1. **Data cleanup & spreadsheet automation** — "I will clean, dedupe, and standardize
   your messy CSV/Excel/CRM export (up to ~50k rows), 48–72h turnaround, plus a reusable
   cleaning script." $100–250.
2. **Codebase documentation packages** — README, API docs, onboarding docs generated from
   a client's repo. $150–400. Claude Code reads repos natively; competition quality is low.
3. **Supabase/small-app fix packages** — e.g. "Supabase schema + RLS security audit, 48h
   turnaround," or 1–3 scoped bug fixes. $100–250. Urgent demand; converts fast; builds
   reviews quickly.

**Channel**: Upwork, active targeted bidding — jobs <24h old, <10 proposals, exact fit
only. Claude drafts each proposal; you personalize, approve, and submit by hand (automated
submission violates Upwork ToS and is the account-ban step). Fiverr as a passive second
surface (2 gigs, 3 tiers) is acceptable because it costs nothing ongoing. Warm-network
announcement once. No cold outreach, ever — it burns the only assets you have (your name,
your accounts, your domain).

**The math to $200/mo**: ~$125 average net per job → **2 jobs/month**. First contract
typically lands after 15–30 tailored proposals ($30–70 total in Connects). Ramp:

| Phase | Timeline | Hours/wk | Expected net/mo |
|---|---|---|---|
| Setup + 3 portfolio artifacts (before/after cleanup case study; docs package on your own repo; fix case study on this repo) | Weeks 1–2 | 6 | $0 |
| Proposal cadence 8–12/wk, intro pricing $50–120 to buy reviews | Weeks 2–6 | 5 | $30–200 |
| 3–5 reviews in; raise to $125–250/job, 2–4 jobs/mo | Months 2–3 | 4 | **$200–500** |
| Retainer conversion (data-hygiene $150–300/mo, on-platform) | Months 3–6 | 4 | $500–1,000 |
| 2–3 retainers + 4–6 one-offs | Months 6–9 | 6 | $1,000–2,000 |

**The weekly quota floor** (designed for your demotivated week-5 self, which is when
these plans actually die): 5 tailored proposals OR 3 substantive community contributions,
agent-prepped so it costs ≤90 human minutes. Track the quota, not revenue — revenue is a
lagging indicator and the weeks 3–8 feedback desert is the point of maximum quit-risk.

**What kills it**: stopping proposal cadence in the cold-start; scope creep (fixed written
scope + paid change orders); >24h message response times; one bad early review (over-deliver
on the first five jobs); denying AI use when asked (never do this — position as
"automation-assisted with human QA," which is also the selling point).

**Hygiene**: delete client data after delivery and say so in the gig description; leave
Upwork's AI-data-training provisions off for client work; honor non-circumvention
(~24 months); set aside 25–30% of net for self-employment tax.

**Ceiling**: ~$1.5–2.5k/mo at 6 hrs/wk. Beyond that: higher-ticket fixed-scope migrations
($500–1,500 — spreadsheet-to-Supabase-app conversions fit your stack), or direct clients
from non-platform channels at ~97% keep.

---

## Track B — Digital products (scalable: enter from demand proof, not from hope)

**Entry condition**: the same request paid for or asked about 3+ times in Track A work,
or Track A reliably clearing $200/mo. Products built without demand proof face the honest
base rate: **the median new Gumroad product sells zero.**

**The offer**: small, judgment-dense products at $19–49 on Gumroad and/or Lemon Squeezy,
each fronted by a genuinely useful **free GitHub "lite" version** — the discovery engine
that works with no audience, no ads, and no spam, and compounds via search. Product lanes
where you have authentic standing:

1. **Claude Code skill packs / agent-workflow kits** — your own working `.claude/`
   configurations, documented and tested. You are the target buyer, which is the moat.
2. **"Lovable/Bolt-to-production" kits** — Supabase hardening: RLS policy library, auth
   checklists, migration templates, deploy checklists — tested against this repo's own
   prototype. A large, growing buyer pool hits the production-readiness wall behind you.
3. **(Test lane only)** Etsy spreadsheet systems at $6–12 with mandatory AI disclosure.
   $0.20/listing makes testing nearly free; expect low velocity; never the primary.

**The math to $200/mo**: $29 × ~13–16% Gumroad fees ≈ $24.50 net → **8–9 sales/month**
(fewer at a $49 pro tier). Sell via direct links and the free-repo funnel; treat
marketplace Discover traffic (30% fee) as a bonus, never the plan.

| Phase | Timeline | Hours/wk | Expected net/mo |
|---|---|---|---|
| Product #1 from proven demand, tested, launched at $19 intro + free lite repo + one honest launch post | Weeks 1–2 of track | 5 | $0–25 |
| Ship next products every 1–2 weeks while signals accumulate | Months 1–2 | 5 | $30–90 |
| Double down on traction: v2, $49–79 pro tier, bundles | Months 3–4 | 4 | $100–200 |
| Winner-led product line, price increases, compounding funnels | Months 5–6 | 4 | **$200–350** |
| Affiliates, tutorial content, second line | Months 7–12 | 4 | $400–1,200 (if a winner emerged; $150–300 if not) |

**Reality check on net**: refunds run 1–5% (Gumroad keeps its fees on refunds),
chargebacks cost $15–25 each, support email is real labor, and the tax set-aside is
25–30%. To durably *net* $200/mo, plan for roughly $300–350/mo gross.

**What kills it**: generic templates a buyer could prompt for themselves (the moat must be
*tested judgment* — working configs, hard-won checklists, niche data); drafted-but-unlaunched
products; sunk-cost attachment to losers; volume-publishing because production is free
(every channel that matters prices volume as spam).

**Ceiling**: $1–3k/mo net at 12–18 months if 1–2 winners emerge, with hours flat or
falling. The distribution is asymmetric: small chance of $1k+/mo, moderate chance of
$200–500, meaningful (~30–40%) chance of plateauing under $100 — with zero cash downside,
only time. That risk profile is why this is the second gear, not the first.

---

## Track C — Compounding assets (patient: highest ceiling, months to first dollar)

**The design**: ONE niche, three mutually-reinforcing surfaces —

1. **An open-source dev tool** (a Claude Code skill pack / workflow harness distilled from
   your real daily use) as the distribution engine — GitHub/HN/Reddit discovery still works
   in 2026 while SEO does not.
2. **A weekly niche newsletter** ("real builds with agentic coding" — teardowns, real
   numbers, working repos; no hype) on Substack as the compounding audience asset.
3. **A paid bridge** — the Track B product line, later joined by a $5/mo paid tier at
   ~500–1,000 engaged subs (expect 1–2% free-to-paid) and niche sponsor slots ($50–100
   near 1,000 subs).

**The honest verdict on this repo's app**: do **not** revive ThinkTank as an "AI app
builder" product. That market is a funded-incumbent bloodbath (Lovable, Bolt, v0, Replit —
free tiers, nine-figure war chests; a solo newcomer has no wedge). Keep the Vite+React+
shadcn+Supabase scaffold as a reusable template, and mine the experience for content —
"I built an app-builder demo; here's why I'd never ship it" is an honest, differentiated
first essay. A narrow micro-SaaS pivot on this scaffold becomes rational only around
month 9–12, *if* the audience surfaces a specific repeated pain — never the generic
app-builder idea.

**The math to $200/mo** (median case at month 6–9): 1,500–2,500 free subs → 15–25 paid
subs (~$65–105) + 4–8 product sales (~$100–200) + one sponsor slot (~$50–100). First
dollar in 6–10 weeks if a launch post lands; month 3–4 if launches whiff (they're
lottery-like — plan for it). Treat $200 here as a trailing-3-month average; the mix is
lumpy.

**What kills it**: the silent quit in months 2–4 (analytics flatline + day job = a skipped
week that becomes three; the metric for the first 90 days is *issues shipped*, not
subscribers); skimping the human voice layer (2026 readers are hostile to obvious AI
writing — your rewrite pass IS the strategy); breaking community self-promotion rules
(each channel dies permanently); anchoring to one vendor's ecosystem (frame it "shipping
with AI agents," not one tool's changelog).

**Excluded from this track on evidence**: SEO-affiliate content sites (AI Overviews have
cut organic CTR 15–46%; established publishers report 27–80% traffic declines — a
no-authority newcomer in 2026 is planting in salted earth) and YouTube (competent video
has 3–5 hrs of irreducible human time per video; doesn't fit the hours budget).

**Ceiling**: $2–4k/mo solo (5k engaged subs ≈ $500–1,500/mo; a $79–99 second product;
a warm-audience micro-SaaS at month 9–12 can add $300–800/mo). Migrate off Substack's 10%
to beehiiv's flat $29–49/mo once revenue passes ~$1k/mo.

---

## Honest expectations

Printed verbatim from the failure-mode analysis; the rest of this playbook is designed
around it:

> Nothing in this playbook makes money while you sleep at the start: every durable dollar
> traces back to a human who trusted you enough to pay, and building that trust is the one
> thing the agents cannot do for you. On 3–6 hours a week with no audience, expect roughly
> $0 in weeks 1–6, a first $50–300 from service work somewhere in weeks 4–10, and a
> realistic shot at $200/month net by months 3–5 — with digital products contributing
> meaningfully only after month 4–6, if ever. The agents' real contribution is making your
> few hours count for three to five on delivery and quality, not replacing distribution,
> sales, or credibility. If any step ever feels like free money at scale, it is either
> against a platform's rules, already arbitraged away, or quietly converting your capital
> risk into someone else's revenue. Slightly boring, fully compliant client work that
> compounds is the plan; anyone promising faster is selling the dream — usually literally.

## Red flags — if your plan (or any AI's plan) has one of these, it will fail

- Revenue projected from production capacity ("agents can generate 30 products/month")
  rather than evidence a specific buyer exists.
- The word "passive" appears before the first dollar has been earned.
- Depends on marketplace discovery algorithms working for a zero-review, zero-audience account.
- "Income" framing applied to capital at risk (trading bots, arbitrage, staking) — the
  downside there is negative thousands, which nothing else on this list can do.
- Any step requires sending outreach at a volume you wouldn't personally hand-send —
  that step is the account-ban step.
- Success stories come from people whose actual business is selling courses about the method.
- No line items for refunds, chargebacks, tax set-aside, or support time.
- Week 1 is all building (tooling, branding, dashboards) and zero conversations with a
  human who could pay.
- Only works at a daily publishing cadence — a volume play wearing a quality costume.
- The "scale to $10k/month" section is longer than the "earn the first $50" section.
- AI use undisclosed where a platform requires disclosure (Etsy, KDP) — one automated
  flag from deletion.
- More than one platform, offer, or channel active in the first 90 days.
- Progress measured in artifacts produced instead of proposals sent, replies received,
  conversations held.
- Assumes week-5 motivation equals week-0 motivation, with no minimum quota that survives
  a bad week.

## What this playbook deliberately excludes

- **Trading/crypto bots** — capital risk dressed as income. $200/mo from a $10k account
  claims a sustained 24%+ annual return; retail backtests are overfit, and the worst case
  is negative thousands. Excluded entirely, IBKR connection notwithstanding.
- **Mass cold outreach / scraping-and-blasting** — deliverability-burned domains, banned
  accounts, <1% reply rates. The funnel math requires exactly the volume that destroys
  the accounts.
- **AI-slop mass publishing** — KDP now caps uploads (3 titles/day) and requires AI
  disclosure with account suspension for violations; Etsy runs automated detection;
  Gumroad's median new product sells zero. The volume play is dead by policy and was
  already dead by economics.
- **SEO-affiliate content farms** — structurally broken post-AI-search, not just hard.
- **MLM / dropshipping arbitrage / "passive income" courses** — the seller of the system
  is the only one making money.
- **Anything requiring credentials you lack** (legal/medical/tax advice) or academic
  dishonesty.

---

## Appendix — platform facts verified 2026-08-29

Re-verify at signup; platforms change terms often.

- **Upwork**: variable 0–15% freelancer fee per contract (replaced flat 10%, May 2025),
  shown before acceptance; typically ~10%. Connects ~$0.15 each, 8–16 per proposal
  (~$1.20–2.40/proposal). AI-assisted work allowed; misrepresenting AI use prohibited;
  automated proposal submission prohibited; Jan-2026 AI-data-training provisions are
  opt-in — leave off for client work. Profile approval can take days.
- **Fiverr**: flat 20% seller fee at all levels, including tips and extras. AI-assisted
  work explicitly allowed if high-quality, original, meaningfully customized.
- **Gumroad**: 10% + $0.50 + processing (2.9% + $0.30) on direct sales ≈ 13–16% effective
  on a $29 product (nets ~$24.50); 30% flat via Gumroad Discover; no monthly fee; merchant
  of record (handles sales tax/VAT); keeps its fees on refunds.
- **Lemon Squeezy**: 5% + $0.50 (+1.5% international, +1.5% PayPal); merchant of record.
  Stripe-owned — expect eventual migration to Stripe Managed Payments.
- **Etsy**: AI-assisted digital products permitted under the June-2025 Creativity
  Standards **with mandatory AI disclosure** and the seller listed as directing designer;
  automated detection + member reporting enforce it. Fees: $0.20/listing + 6.5%
  transaction + ~3% + $0.25 processing (+12–15% Offsite Ads when attributed).
- **Amazon KDP**: AI-generation disclosure required; upload cap of 3 new titles/day;
  suspension for violations.
- **Substack**: 10% + Stripe processing (~13–16% all-in), no monthly fee. beehiiv: 0%
  commission on a $29–49/mo plan — cheaper only above ~$1k/mo revenue.
- **Google AI Overviews**: organic CTR down 15–46% across studies (Ahrefs: −34.5% at
  position 1) — the reason SEO-content plays are excluded.
- **Taxes (US)**: all of it is ordinary self-employment income (~15.3% SE tax before
  income tax); report regardless of 1099-K thresholds; set aside 25–30% of net.
