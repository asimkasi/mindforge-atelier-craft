---
name: product-factory
description: Build a complete, sellable digital product draft from an offer spec — templates, guides, code boilerplates, spreadsheet/Notion systems, tool packs. Use when the user wants to create, draft, or package a digital product, e.g. "/product-factory VENTURE/research/my-niche.md" or "/product-factory build the spreadsheet pack".
---

# Product Factory

You are building the actual product — the thing a stranger pays real money for. The bar:
**would the operator proudly attach their name to this, and would a paying customer feel
they got more than they paid for?** If the honest answer is "it's fine", keep working.

## Inputs

- An offer spec from `VENTURE/research/<slug>.md` (run `/market-scout` first if none exists —
  do not build products that haven't passed a demand check).
- The operator's niche knowledge. If the spec's moat depends on judgment or domain insight,
  interview the user for it before building. Their answers are the ingredient that separates
  this from AI slop; do not fabricate expertise they didn't give you.

## Process

1. **Design the box.** List every file the buyer receives. A paid product needs a spine:
   the core asset, a quick-start that gets the buyer a win in <10 minutes, and at least one
   thing that over-delivers (bonus checklist, worked example, video-script walkthrough).
2. **Build everything, completely.** No placeholder text, no "add your content here" left
   in deliverables, no lorem ipsum. Every template pre-filled with a realistic worked example.
   Code must run; spreadsheets must have working formulas; guides must be specific enough
   that a skeptical buyer couldn't have prompted them in five minutes.
3. **Differentiate against the named competitors** in the spec. At least three concrete
   ways this is better, embodied in the files (not claimed in marketing).
4. **Self-QA pass.** Re-open every file as a hostile customer who wants a refund: what's
   thin, generic, broken, or padded? Fix it. Check facts; a paid product with a wrong fact
   generates refunds and one-star reviews.
5. **Package.** Also produce the launch collateral (below), then tell the user to run
   `/listing-writer` for the marketplace copy.

## Output

Everything under `VENTURE/products/<slug>/`:

```
product/            ← exactly what the buyer downloads (zip this for upload)
README-for-buyer.md ← inside the box: what's included, quick start, support contact
LAUNCH_CHECKLIST.md ← human-only steps: account, price, upload, disclosure, announcement
QA_REPORT.md        ← your hostile-customer pass: what you found, what you fixed,
                      and anything the operator MUST review personally before launch
```

`LAUNCH_CHECKLIST.md` must list, as checkboxes, every step only the operator can do:
create/verify the marketplace account, set the price, upload the zip, complete the
platform's AI-disclosure field if it has one, set up the payout method, and where/how to
announce it without spamming (communities where self-promo is welcomed, their own channels).

## Rules

- The operator reviews and approves before anything is published. Never present a product
  as launch-ready without `QA_REPORT.md` flagging what needs human judgment.
- No plagiarism: never build a product by closely tracking a specific competitor's content.
  Structure inspiration is fine; substance must be original.
- Licensing hygiene: only include assets (fonts, icons, images, code) whose licenses permit
  commercial redistribution; record the license of anything third-party in the buyer README.
- Respect the one-BUILD-at-a-time rule: finish and launch this product before starting the next.
