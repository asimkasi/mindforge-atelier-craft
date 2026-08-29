# Client workspace — contents are git-ignored, on purpose

Everything in this directory except this README is excluded from git (see the repo's
`.gitignore`). **Never remove that exclusion and never `git add -f` anything here.**

Why: this repository syncs to a hosted remote (GitHub, plus Lovable auto-commits), and
this directory holds client-confidential material — verbatim briefs, datasets that may
contain third-party personal data, proprietary code, and security-audit findings.
Committing any of it would publish it, breaching client confidentiality, marketplace
confidentiality obligations, and potentially data-protection law.

House rules for anything created here (enforced by the `gig-machine` skill):

- Client files live only on this machine and are purged after the revision window
  closes — keep only non-confidential metadata (anonymized slug, package tier, dates,
  net amount) in `../ledger.csv` and `../STATE.md`.
- Ledger and state entries use anonymized client slugs, never names or identifying details.
- `_packages.md` (your own service-package definitions, no client data) is the one file
  you may copy elsewhere freely.
