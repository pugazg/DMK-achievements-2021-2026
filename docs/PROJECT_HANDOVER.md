# Project Handover — DMK Achievements 2021–2026 Evidence Explorer

**Handover date:** 21 July 2026 (rewritten after Phase C0.6; supersedes the
mid-remediation version)
**Purpose:** resume work in a fresh chat without re-deriving context.
**Read this first**, then `docs/EVIDENCE_MODEL_V2.md` and `docs/EVIDENCE_REVIEWER_GUIDE.md`.

---

## 1. What this project is

An interactive, fully-offline React/Vite **evidence explorer** of the Tamil Nadu
government's 2021–2026 record. It began as a promotional dashboard, was audited,
and has been rebuilt into a source-linked artefact that is deliberately careful
about what it claims.

The one-line description — getting this wrong is the original sin the project has
spent every phase correcting:

> A searchable, source-linked index of **what the Tamil Nadu government says it
> did** between 2021 and 2026 — **not** an assessment of whether it did it.

- **Repo:** https://github.com/pugazg/DMK-achievements-2021-2026 (public, `gh` authenticated as `pugazg`)
- **Local:** `~/Documents/DMK Achievements 2021-2026/app`
- **Maintainer:** Pugazhendhi R · independent, no political affiliation, self-funded
- **Licence:** MIT (code) + CC BY 4.0 (data compilation); government documents not licensed here
- **Versions:** release 2.0.0 · data cut-off 2026-07-18 · methodology 1.0 · evidence schema v2.1

### Commands

```bash
cd "~/Documents/DMK Achievements 2021-2026/app"
npm ci
npm test        # 100 tests
npm run validate
npm run a11y
npm run build
npm run docs    # regenerate derived docs — CI fails if they drift
npm run dev
```

**All gates pass as of this handover.** CI runs them on every PR.

---

## 2. Git state (IMPORTANT)

- **Branch:** `audit-remediation`, 18 commits ahead of `origin/main`. Tree clean, pushed.
- **PR #7** open, `MERGEABLE`, `gates` check **SUCCESS**. **Not merged** — the single
  outstanding decision, deliberately left to the owner.
- **`main` is protected**: requires a PR, requires the `gates` check, blocks
  force-push and deletion. 0 required approvals (solo maintainer); `enforce_admins`
  off so there is an escape hatch.
- **Local `main` is 18 commits behind** with nothing unique — `git pull` before using it.
- Remote branches: `main`, `audit-remediation`, `backup-pre-expansion-20260718`.
  Six merged feature branches deleted; `deleteBranchOnMerge` is on.
- **`debates-content`** is **local-only**, 3 WIP commits, verified superseded (its
  `debates.js` is byte-identical to shipped; its `Debates.jsx` is the
  pre-remediation version). Safe to delete, but it is the only copy.

---

## 3. Dataset facts (verified, test-guarded)

| Dataset | Count | Notes |
|---|---|---|
| Achievement records | **438** | 247 have `page: null`; 6 flagged `mixedStatus` |
| Domains | **11** | "All" is a filter, not a domain — the original 12-vs-11 bug |
| Manifesto promises | **505** | 400 "fulfilled" — **an external tracker's assessment**, reproduced |
| Assembly sittings | **138 links / 38 measured** | 12,720pp and 2.17M words are the 38 only |
| Government Orders | **3,501 catalogued / 186 embedded** | 36 departments |
| Gazette GOs | **788** | 286 weekly issues; ~340KB, lazy-loaded |
| Legislation | **222** | 119 Acts, 95 Bills, 8 Ordinances |
| Promise→GO links | 41 links / 38 promises | under 8% of the manifesto |
| Source registry | **108 catalogued / 0 ingested** | 10 pilot documents fetched |
| Evidence grades (all 438) | **62 D · 376 E · 0 A/B/C** | computed at render time |

**Every displayed number is derived** via `src/lib/publicMetrics.js` and reconciled
by `npm run validate`. A hard-coded count now fails the build.

---

## 4. What has been done

Each phase is a commit on `audit-remediation`.

| Phase | Outcome |
|---|---|
| **Audit remediation P0–P12** | Claim tool rewritten as neutral retrieval; labels corrected (12→11 domains, 38→36 depts, catalogue vs embedded); evidence grades; manifesto disclosure; data-quality fixes; lazy loading (1,152→842 KB initial) |
| **Verification audit** | Adversarial re-check. Found 9 residual defects, incl. "438 verified records" still live and `index.html` still advertising "a fact-checker" |
| **Phase A** | Fixed those. Hero wording, metadata, Tamil claim search, input labels, `lang="ta"`, small-text review, doc corrections |
| **Phase B** | Publisher transparency completed; in-app `#transparency`; `METHODOLOGY.md`; `CORRECTIONS.md`; MIT + CC BY 4.0; version info |
| **Phase C0** | 25-subject evidence pilot with real adverse evidence from the CAG |
| **Phase C0.5** | Evidence model v2 — relationship notes, claim components, NG, confidence, document lifecycle |
| **Phase C0.6** | Adversarial review — blinded packets, second pass, disagreement measurement, reviewer guide |
| **Infra** | CI workflow (5 checks), `main` protected, stale branches deleted |

### Findings worth remembering

- **The contrast defect was systemic**, not cosmetic: 76 dark / 78 light failures,
  because identity hues were used as text in both themes. `textSafe()` fixes it
  algorithmically. Now 0/0, guarded by `npm run a11y`.
- **"438 verified records" survived three phases** in the hero strip while the
  headline above it had been corrected. Now derived and impossible to hard-code.
- **Componentisation demoted 4 of 25 pilot subjects** from D to E — in each case the
  D component was not what the claim asserted.
- **The C0.6 review disagreed with itself on 8 of 25**, with **zero** Class D
  (normal expert judgement). Every disagreement traced to a missing or non-binding rule.
- **CI failed on its first run and was right to**: a generated doc depended on a
  gitignored manifest, so it was not reproducible from a clean checkout.

---

## 5. Where the evidence actually stands

State this plainly to anyone who asks:

- **0 of 438 records are independently verified.** No record is graded above D.
- **376 of 438 (85.8%) are grade E** — the government's own summary only.
- **192 records are marked complete with no completion evidence.**
- **247 of 438 have no page reference** and cannot be spot-checked.
- **0 of 108 catalogued sources have been ingested.** 10 pilot documents exist.
- **The "400 fulfilled" headline is not reproducible** from this project's evidence:
  0 outcome-verified, 79 with a GO/Act, 163 record-only, **158 with nothing linked**.
- **No contrary or adverse evidence has been ingested** beyond the C0 pilot's CAG
  passages. This is the largest editorial weakness and is disclosed in-app.

---

## 6. Non-negotiable rules (keep enforcing)

1. **Never invent** evidence, URLs, pages, dates, amounts, beneficiary counts or statuses.
2. **An announcement is not an achievement.** Government souvenir = grade E.
3. **Never silently rewrite** a record. Log every change with its ID in `CHANGELOG.md`.
4. **Record IDs are stable** and never reused.
5. **Quoted source text stays verbatim**, OCR defects included, so it matches the PDF.
6. **Don't call it fact-checking.** The claim tool is neutral retrieval, structurally.
7. **Contrary evidence never raises a grade.** It can lower one toward F.
8. **A parent claim takes its weakest component**, never its strongest.
9. **Failed extraction is never quoted from.**
10. **`missing[]` may not be empty** — that would mean nobody looked.
11. **Respect robots.txt / CAPTCHA / ToS.** Blocked sources go to the manual queue.

---

## 7. Open work, in priority order

### Blocking bulk ingestion

1. **An independent reviewer.** The C0.6 review was the same author in the same
   session; its agreement rate is near-worthless. **Someone else must grade a
   sample** before scaling. A person-shaped gap, not a code one.
2. **Ingest one adverse source properly** — a full CAG performance audit. Would
   materially change the corpus's shape, currently one-sided by construction.

### Known model gaps (from C0.6, documented in the reviewer guide)

3. Component granularity is under-determined — tests, not an algorithm.
4. Confidence is uncalibrated; high/medium/low are not probabilities.
5. NG remains a soft boundary and could be misused for merely-hard claims.

### Product / engineering

6. **PR #7 merge decision.**
7. **Chart data tables** — the largest remaining accessibility gap; charts expose
   values via `aria-label` but have no tabular equivalent.
8. **Real assistive-technology testing** (VoiceOver/NVDA). Everything so far is
   computed-style measurement.
9. **Hero strip counters display 0** — they never animate. Pre-existing, verified
   not caused by the derivation change; the larger hero figures work. A background
   task chip exists for this.
10. `source-package` / `deploy-package` scripts; permalinks/URL state; print views.
11. Two dev-only vulnerabilities (vite/esbuild); fix requires vite 5→8.

### Blocked, not merely undone

12. **100 of 138 Assembly sittings unmeasured** — `assembly.tn.gov.in` publishes
    `Disallow: /`. Needs a manual process or permission. **Do not crawl it.**
13. **6 DES endpoints return HTTP 500** — the state's own statistical authority and
    the natural independent counter for grades A/B. Re-check periodically.

---

## 8. Key files

**Libraries**
`src/lib/evidenceRecord.js` — evidence schema v2.1 + validators (the heart of it)
`src/lib/publicMetrics.js` — every displayed number, derived
`src/lib/theme.js` — `textSafe()` contrast helper, `onColor()`
`src/lib/search.js` — `lookupClaim()` neutral retrieval + Tamil handling
`src/lib/evidence.js` — A–F ladder, `gradeRecord()`
`src/lib/version.js` — release / data / methodology versions

**Data**
`src/data/evidencePilot.js` — 25-subject pilot corpus (v2)
`src/data/evidenceReview.js` — C0.6 second-pass assessments
`src/data/transparency.js` — public transparency copy
`src/data/sourceRegistry.json` — 108 sources with reachability + robots

**Docs** (23 files in `docs/`) — start with `EVIDENCE_MODEL_V2.md`,
`EVIDENCE_REVIEWER_GUIDE.md`, `EVIDENCE_ADVERSARIAL_REVIEW.md`, `METHODOLOGY.md`,
`PUBLISHER_TRANSPARENCY.md`, `RELEASE_CHECKLIST.md`

**Generated — never hand-edit** (`npm run docs`):
`SOURCE_COVERAGE_MATRIX.md`, `DATA_QUALITY_REPORT.md`,
`POST_CHANGE_DATA_RECONCILIATION.md`, `EVIDENCE_REMEDIATION_QUEUE.md`,
`EVIDENCE_ADVERSARIAL_REVIEW.md`, `remediation_queue.json`,
`reviewer_packets/packets.json`

**Tests** (100): `claim`, `metrics`, `tamil`, `transparency`, `evidencePilot`,
`evidenceEdgeCases`

**Scratch/ignored:** `sources/pilot/`, `sources/pilot_c0/`, `sources/robots/` —
fetched documents are gitignored, but their **manifests are tracked** because the
generated docs depend on them.

---

## 9. Release classification

**Public beta evidence explorer.**

Phase B cleared the last blocker (publisher transparency). It is **not** a
production evidence explorer and nowhere near a fact-checking platform — those
would need the evidence store populated, page provenance restored, and at least
one independent counter ingested.

Two things worth doing before announcing publicly, neither blocking the
classification: ingest one adverse source, and get one other person to spot-check
a sample of grades.

---

## 10. Suggested first message for the new chat

> Continue the DMK Achievements project in `~/Documents/DMK Achievements 2021-2026/app`,
> branch `audit-remediation`. Read `docs/PROJECT_HANDOVER.md` first, then
> `docs/EVIDENCE_MODEL_V2.md` and `docs/EVIDENCE_REVIEWER_GUIDE.md`.
>
> Do not start bulk ingestion — §7 explains why it is blocked on an independent
> reviewer. Keep the non-negotiable rules in §6.
>
> Run `npm test`, `npm run validate`, `npm run a11y`, `npm run build` before
> committing. CI runs the same gates plus a generated-docs drift check.
