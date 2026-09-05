# Fiverr gig — passive second surface

One gig, three tiers, published once and left to sit while Upwork gets the active
cadence (per PLAYBOOK Track A: a passive listing costs nothing ongoing and isn't a
second channel). Fiverr takes a flat 20% — at launch prices that nets ~$40/$76/$120;
acceptable for review-building, raise prices after the first 5 reviews.

**Launch pricing note:** Fiverr can't do "first N orders" pricing automatically, so the
gig launches at the intro prices ($50/$95/$150) with the description saying openly that
these are launch prices that will rise to $75/$150/$250 — honest, and ToS-clean.

---

## Gig title (max 80 chars; starts with "I will" by Fiverr convention)

```
I will fix your Lovable or Bolt app — Supabase bugs, auth, and RLS security
```

## Category

**Programming & Tech → Software Development → Web Application** (choose the closest
current equivalent at listing time; Fiverr renames subcategories often). Metadata
pickers: Programming language: **TypeScript, JavaScript, SQL** · Expertise: **Bug fix,
Security, Databases** · App type: **Web application**.

## Search tags (5 max)

```
lovable  ·  supabase  ·  bug fix  ·  web app security  ·  react
```

---

## Pricing table (3 tiers)

| | **Basic — Single Fix** | **Standard — Fix Pack** | **Premium — Production Gate** |
|---|---|---|---|
| Launch price | **$50** (rises to $75) | **$95** (rises to $150) | **$150** (rises to $250) |
| Delivery | 2 days | 3 days | 5 days |
| Revisions | 1 | 1 | 1 |
| Tier title (35 chars) | One bug, fixed and verified | 3 bugs + Supabase health check | Auth + RLS audit and hardening |
| Tier description (100 chars) | 1 reproducible bug fixed: auth, query/CRUD, deploy, or edge function. Before/after demo included | Up to 3 scoped bugs fixed + RLS status of every table, key & auth red flags, prioritized issue list | Full RLS + auth audit, up to 5 findings fixed, re-runnable pass/fail RLS test script, go-live checklist |

Gig extras (optional, honest ones only): **Extra-fast 24h delivery** on Basic (+$25) —
only enable in weeks you can genuinely honor it.

---

## Gig description (max 1,200 chars — this fits)

```
Your Lovable or Bolt app worked in the demo and broke in the real world — login
loops, RLS errors, blank screens, a publish that fails. I fix exactly that, at a
fixed price.

Every fix is verifiable: I write down the steps that reproduce your bug and you
confirm it's the right one BEFORE work starts. Then I fix it and send a before/after
demo you can repeat yourself, plus a plain-English summary of the root cause and
what changed.

The Premium tier is a pre-launch security pass: every table's RLS policies audited,
up to 5 findings fixed, and a test script you keep — it attempts cross-user data
access and prints pass/fail per table, so you verify the hardening by running it. A
scoped hardening pass, not a certified penetration test.

How I work, disclosed up front: automation-assisted with AI tools (Claude Code),
human QA on every change — reproduce before, re-test after. That's why it's fast and
fixed-price. My portfolio is self-initiated sample work on my own React + Supabase
app, clearly labeled. I'm new here, at honest launch prices that rise as reviews
come in.

Your code and data are never committed to any repo and are deleted from my machine
after the revision window closes.
```

(1,199 characters — verified under the 1,200 limit.)

---

## FAQ (paste each Q&A)

**Q: Do you use AI tools to do the work?**
A: Yes, and I say so up front rather than waiting to be asked: production is
automation-assisted with Claude Code, and every change gets human QA — I personally
reproduce your bug before work starts and re-test it after the fix. You're paying for a
verified outcome on a fast turnaround; the before/after demonstration is yours to
re-run, so you never have to take the fix on trust. If you require zero AI tooling,
this gig isn't the right fit and I'd rather tell you that now.

**Q: What counts as "one bug"?**
A: One reproducible failure with one root cause: an auth loop or login failure, one
broken query or CRUD action, one failed publish/custom-domain error, or one misfiring
edge function. If reproduction reveals several tangled root causes, I pause and tell
you before doing anything extra — you'll get a Fix Pack quote, never a surprise bill or
a silently expanded scope.

**Q: What do you need from me to start?**
A: The requirements list below: repo or Lovable project access, a least-privileged
Supabase invite, and the reproduction context (which page, which account, what you
clicked). The delivery clock starts when access works and you've confirmed my written
reproduction of the bug.

**Q: What happens to my code and data afterwards?**
A: They live only in a git-ignored working folder on my machine, are never committed to
any repository, and are deleted when your revision window closes (3, 5, or 7 days by
tier). I also ask you to revoke my Supabase and repo access at that point. Apps
handling regulated data (health, financial, EU personal data) need your explicit
written authorization before I access any data — and where possible I work against a
staging or empty database instead.

**Q: Is the Premium tier a security certification?**
A: No. It's a scoped audit-and-hardening pass on your RLS policies, auth flows, and key
exposure, with a re-runnable pass/fail test script as proof. It is not a certified
penetration test and not SOC 2/HIPAA/GDPR compliance work — if that's what you need,
I'll say so and point you toward the right kind of provider.

**Q: My problem isn't on the list — can you still help?**
A: Message me before ordering. If it fits, I'll tell you which tier and confirm the
scope in writing. If it doesn't (new features, redesigns, non-Supabase backends), I'll
say so straight away rather than take an order I can't deliver well.

---

## Buyer requirements (shown after purchase — paste into gig requirements)

1. **What's broken, in your own words** — plus the error message or a short screen
   recording if you have one. (Mandatory, free text)
2. **Access:** GitHub repo invite or Lovable project share, AND a Supabase organization/
   project member invite with the minimum role that permits the work. Send credentials
   only via Fiverr's order page — never email. (Mandatory, free text)
3. **Reproduction context:** which page/route, which user account or role, what you
   clicked, what you expected vs. what happened. (Mandatory, free text)
4. **Does your app handle health, financial, or EU personal data?** If yes, written
   authorization to access it is required before work starts — or an invite to a
   staging/empty database instead. (Mandatory, multiple choice: Yes / No / Not sure)
5. **Deadline or launch date, if any.** (Optional, free text)

---

## Gig image brief (make in Canva or the design tool of choice; 1280×769)

Plain, credible, zero hype: left half — headline "Lovable app broken?" with subline
"Supabase bugs · auth · RLS — fixed & verified in 48h"; right half — a real (from the
portfolio sample, not mocked) before/after terminal or test-output screenshot showing a
failing state and a passing state. Small footer line: "Automation-assisted · human-QA'd
· fixed price". No fake client logos, no star graphics, no badge lookalikes (Fiverr
bans imitation badges).
