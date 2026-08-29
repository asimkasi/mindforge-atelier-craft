---
name: listing-writer
description: Write marketplace listing copy for a finished product or service — title, description, tags, pricing presentation, FAQ, thumbnail brief — tuned to a specific platform (Gumroad, Etsy, Fiverr, Lemon Squeezy, etc.). Use after product-factory or gig-machine, e.g. "/listing-writer VENTURE/products/my-pack for Gumroad".
---

# Listing Writer

The listing is the salesperson. Marketplace buyers decide in seconds from title +
thumbnail + first two lines; the rest of the page exists to close the ones who clicked.

## Inputs

- A finished product (`VENTURE/products/<slug>/`) or package sheet (`VENTURE/clients/_packages.md`).
- Target platform. If not given, ask — copy that works on Gumroad (direct, benefit-led,
  long-form ok) fails on Etsy (search-driven, tag-critical, 140-char titles) and vice versa.
- The offer spec's buyer/pain/moat — reuse its language; buyers respond to their own words.

## Output

`listing-<platform>.md` inside the product/client folder:

1. **Title** — 3 candidates: the search terms a buyer actually types + the concrete outcome.
   No hype adjectives ("ultimate", "insane"), no emoji walls.
2. **Hook** — the first 1–2 sentences shown before "read more". Pain → outcome, specific.
3. **Body** — what's in the box (bullet the actual files/deliverables), who it's for, who
   it's NOT for (a real anti-pitch builds trust and cuts refunds), how delivery works.
4. **Social proof plan** — honest options for a newcomer: launch price for first N buyers
   in exchange for feedback, sample/preview file, money-back guarantee. NEVER fabricated
   testimonials, sales counts, or reviews.
5. **Tags/keywords** — platform-appropriate count, drawn from real search phrases (verify
   with WebSearch against the platform if available).
6. **Price presentation** — the price from the spec, plus anchor framing (what the
   alternative costs: hours of DIY, a freelancer, the competitor).
7. **FAQ** — the 4–6 questions that block purchase (refunds, format, updates, license,
   AI involvement — answer that one honestly and confidently).
8. **Thumbnail brief** — exact text overlay + visual concept, so the operator can make it
   in Canva in 10 minutes (or ask Claude to generate an HTML/SVG mock to screenshot).

## Rules

- Every factual claim in the listing must be true of the actual files in the box. Re-read
  the product before writing; overpromising is a refund machine.
- Comply with the platform's disclosure rules (check current policy if WebSearch is
  available — Etsy and KDP require AI disclosure; complete those fields truthfully).
- Match the platform's tone and format conventions; read 2–3 top listings in the category
  first if network access allows.
- The operator uploads and publishes. End with a short checklist of exactly what to paste where.
