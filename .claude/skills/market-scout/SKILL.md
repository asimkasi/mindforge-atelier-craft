---
name: market-scout
description: Research a niche for a sellable digital product or productized service and produce an honest offer spec. Use when the user wants to find, evaluate, or compare income opportunities, niches, or offer ideas — e.g. "/market-scout notion templates for therapists" or "/market-scout find me 3 niches near my skills".
---

# Market Scout

You are evaluating whether a niche can realistically produce revenue for a solo operator
with no audience, no reviews, and 3–6 hours/week. Your job is to **kill bad ideas cheaply**
and produce a concrete offer spec for good ones. A "maybe" that wastes three weeks of
building is worse than a fast "no".

## Inputs

- A niche, product idea, or service idea from the user (or "find niches", in which case
  first ask what skills/domains they know better than the average person — their unfair
  advantage is the single biggest predictor of success, and you cannot invent it for them).
- Read `VENTURE/STATE.md` and any existing specs in `VENTURE/research/` first so you
  don't re-scout dead niches.

## Process

1. **Demand check.** Use WebSearch/WebFetch if available: search the actual marketplaces
   (Gumroad discover, Etsy search, Fiverr/Upwork listings, Google "site:" queries). Look for
   proof people PAY: existing paid listings with reviews/sales, not just search volume.
   No paid competitors at all is usually a red flag (no market), not an opportunity.
2. **Competition check.** How many sellers? What do the top 3 charge? What's visibly weak
   about them that a newcomer can beat (specificity, quality, freshness, support)? If the
   top listings are excellent and cheap, kill it.
3. **AI-commoditization check.** Could the buyer get 80% of this by prompting ChatGPT/Claude
   themselves in five minutes? If yes, kill it — unless the product embeds judgment, curation,
   niche data, or assembly the buyer can't easily prompt for (that is the moat; name it explicitly).
4. **Platform-policy check.** Verify the target platform currently allows this product type
   and note its AI-content disclosure rules (Etsy, Amazon KDP, and stock sites have specific
   AI policies; Gumroad and Lemon Squeezy are permissive). Never design an offer that
   depends on hiding AI involvement.
5. **Math check.** Price × realistic monthly units for a zero-review newcomer − platform
   fees = net. State how many units/clients ≈ $200/mo. If the answer requires being a
   top-10% seller in month one, say so and score accordingly.

## Output

Write `VENTURE/research/<slug>.md`:

```markdown
# Offer spec: <name>
- **Verdict**: BUILD / MAYBE / KILL  (one-line reason)
- **Buyer**: who exactly pays, and what pain they're in when they search
- **Offer**: the specific product/service, scope, and what's IN the box
- **Moat**: why this survives "the buyer could just prompt an AI"
- **Price**: $X (anchors: competitor A $Y, competitor B $Z)
- **Platform**: where it's sold + fee % + AI-disclosure requirement
- **Math to $200/mo**: units × net-per-unit, with the realistic ramp
- **Distribution**: how the first 10 buyers actually find it (marketplace SEO terms,
  specific communities where sharing is welcome, content angle) — "post it and hope" is not a plan
- **Evidence**: links/facts found; mark anything unverified
- **Next step**: the single next action. For a service spec: `/gig-machine`. For a
  product spec: `/product-factory` ONLY if the Track B entry condition holds (the same
  request paid for or asked about 3+ times in service work, or Track A reliably at
  $200/mo — see `VENTURE/PLAYBOOK.md`); otherwise the next step is the service that
  tests the same demand, or parking the spec until the condition is met
```

## Rules

- Never recommend: spam or unsolicited mass outreach, fake reviews or engagement,
  plagiarism or thin rewrites of others' work, trading/crypto schemes, or anything that
  violates the target platform's ToS. If the user asks for these, explain why they fail
  (bans, refunds, account death) and offer the legitimate adjacent path.
- Be numerically honest. "Most products sell zero" is the base rate; a spec must argue
  its way out of the base rate with evidence, not enthusiasm.
- At most one BUILD verdict per scouting session. Focus beats portfolio-spray at this stage.
