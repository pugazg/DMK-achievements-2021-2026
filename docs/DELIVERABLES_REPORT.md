# Audit Remediation — Final Deliverables Report

**Branch:** `audit-remediation` (8 commits ahead of `main`)
**Audit:** reviewer's artefact audit, 19 July 2026
**Report date:** 21 July 2026
**Data cut-off:** 18 July 2026

---

## 1. Executive summary

The reviewer's audit found a project with strong source breadth and sound
internal structure that was **presenting government-reported claims as verified
fact**. Five findings were release blockers, the sharpest being a "Fact-check"
tool that read partial keyword overlap as verification or contradiction.

The remediation has closed all five blockers, but the honest summary is not
"everything is fixed". It is:

> The project no longer claims more than it can support. It still supports much
> less than a reader might want.

Three things changed structurally.

**The claim tool stopped answering questions it cannot answer.** `lookupClaim()`
returns records and reasons, never a verdict — there is no boolean, score or
rebuttal in its output, and a test asserts none can reappear. It abstains
frequently and by design, and flags negated claims because the presence of a
record cannot confirm or deny a negative.

**Every record now states the quality of its own evidence.** An A–F grade sits on
all 438 record cards. Auto-grading is capped at **D**, and 376 of 438 records sit
at **E — government-reported**, because the corpus is transcribed from the
government's own summary publications and nothing in it is counted by an
independent body. That cap is enforced by a validation rule, not by convention.

**Every public count is now derived from the data and tested.** 12 domains became
11, 38 departments became 36, and catalogue totals were separated from embedded
content (3,501 catalogued vs 186 embedded; 138 sitting links vs 38 measured).
Nineteen validation checks make it impossible for a label to drift from the
dataset again.

Two findings emerged during remediation that the audit had not identified at full
scale:

- **Colour contrast was far worse than reported.** An in-browser audit of every
  rendered text node found **76 failures on the dark theme and 78 on the light
  one** — not the handful of muted-text cases the audit noted. The evidence-grade
  chip, which carries the project's central caveat on all 438 cards, sat at
  **2.25:1** in light mode. Now **0 failures in both themes**.
- **`assembly.tn.gov.in` forbids crawling.** Its `robots.txt` is a blanket
  `Disallow: /`, which removes the planned route to measuring the remaining 100
  of 138 Assembly sittings.

## 2. Release recommendation

**Ship as a public beta evidence explorer — not as a fact-checking platform.**

This matches the reviewer's assessment, and the remediation has deliberately
moved the project *further* from "fact checker". The honest one-line description:

> A searchable, source-linked index of what the Tamil Nadu government says it did
> between 2021 and 2026 — not an assessment of whether it did it.

**One item blocks a public launch and is not a technical one:** publisher
identity, political affiliation, funding disclosure and licensing are unwritten.
For a politically-charged artefact these are not a nicety; a reader cannot weigh
the material without knowing who produced it and why. This is flagged in the
README and in `docs/RELEASE_CHECKLIST.md`.

## 3. Test and gate results

| Gate | Result |
|---|---|
| `npm run test` | **8/8 pass** — adversarial claim-lookup tests |
| `npm run validate` | **19/19 pass** — dataset and label integrity |
| `npm run a11y` | **0 failures** — WCAG AA contrast, both themes |
| `npm run build` | **pass** — 842KB main / 244KB gzip |

The claim tests are adversarial by design: fictional claims, unrelated claims
sharing common words, negations, stopword-only queries, weak single-term overlap,
and an assertion that no verdict field exists in the return value.

## 4. Dataset reconciliation

Counts are unchanged from the pre-remediation baseline; what changed is how they
are *described*.

| Dataset | Count | Corrected label |
|---|---|---|
| Achievement records | 438 | unchanged; 247 have no page reference |
| Domains | **11** | was labelled 12 — the "All" filter was counted as a domain |
| Manifesto promises | 505 | 400 fulfilled — **the external tracker's assessment**, reproduced |
| Assembly sittings | **138 links / 38 measured** | was "138 transcripts"; 12,720pp and 2.17M words describe the 38 only |
| Government Orders | **3,501 catalogued / 186 embedded** | was "~3,500 GOs", implying they were held here |
| GO departments | **36** | was labelled 38 |
| Gazette GOs | 788 | across 286 weekly issues |
| Legislation | 222 | **119 Acts / 95 Bills / 8 Ordinances**, split by legal stage |
| Promise→GO links | 41 links / 38 promises | under 8% of the manifesto |

**Evidence grade distribution (all 438 records, all auto-graded):**

| Grade | Count | Meaning |
|---|---|---|
| D — Sanctioned | 62 | a Government Order or Act names the scheme |
| E — Government-reported | 376 | rests on the government's own publication |
| A / B / C | **0** | require an independent counter; none exists in the corpus |

## 5. Data corrections

70 issues detected by `scripts/data_quality_scan.mjs`; **15 applied, 55
deliberately not applied.** No record ID changed.

| Change | Count | Where logged |
|---|---|---|
| Rupee-glyph encoding repairs (promises) | 8 | `docs/migration_currency.json` |
| Duplicate title disambiguated | 1 (2 records) | `docs/migration_records.json` |
| Records flagged `mixedStatus: true` | 6 | `docs/migration_records.json` |
| OCR defects in quoted source text | **55 — left as published** | `docs/data_quality_report.json` |
| Chart unit corrected (Ambedkar: crore → students) | 1 | `CHANGELOG.md` |
| Chart recoloured neutral (fertility rate) | 1 | `CHANGELOG.md` |

The 55 unfixed defects are a deliberate choice: text quoted from a gazette or
Government Order is preserved verbatim, OCR errors included, so a reader can
still match it against the source PDF.

One correction was found in *this* pass rather than the last: promise **#162**
had been flagged but never repaired, because the repair script matched the unit
case-sensitively and that note reads "?169 Cr". Fixed and logged.

## 6. Source coverage

| Measure | Count |
|---|---|
| Sources catalogued | 108 |
| Index URL checked (HTTP status only) | 108 |
| Reachable (HTTP 200) | 92 |
| Blocked (403) / server error (5xx) / no response | 3 / 6 / 7 |
| Eligible for automated acquisition | 68 |
| Manual-acquisition queue | 40 |
| **Documents actually fetched** | **10** (pilot) |
| **Registry sources ingested** | **0** |

**Nothing in the app is currently backed by a document from this pipeline.** The
pilot proves the ingest path works — fetch, size, sha256, content-type, manifest
row — it is not coverage. `docs/SOURCE_COVERAGE_MATRIX.md` leads with the
distinction between *checked* and *read* for exactly this reason.

`robots.txt` was read for all 60 distinct origins. Three sources are explicitly
disallowed (`tnla-legacy`, `tnla-debates`, `tn-opendata`); 30 serve an HTML
soft-404 and are recorded as **unknown**, never as permission.

## 7. File-change report

69 files changed, ~11,400 insertions, ~340 deletions, over 8 commits.

| Area | Files | What |
|---|---|---|
| **Documentation** | 17 new | Evidence model, claim limitations, manifesto methodology, data quality, coverage matrix, accessibility, acquisition plan, RTI register, release checklist, remediation record, changelog, handover, deliverables report + generated JSON |
| **Scripts** | 17 new | validate · baseline · data_quality_scan · check_contrast · remediation_queue · source_coverage_matrix · data_quality_doc · verify_sources · recheck_sources · fetch_robots · patch_source_registry · pilot_ingest · registry seed · migration appliers |
| **New source modules** | 2 | `src/lib/evidence.js`, `src/data/sourceRegistry.json` |
| **Rewritten logic** | 2 | `src/lib/search.js` (`lookupClaim`), `src/lib/theme.js` (`textSafe`, `onColor`, `contrast`) |
| **UI components** | 8 modified | Contrast, dialog semantics, grade chip, disabled states, lazy routes, error boundary |
| **Data** | 4 modified | Corrections listed in §5 — all logged, no ID changes |
| **Tests** | 1 new | `test/claim.test.mjs`, 8 adversarial cases |
| **Packaging** | 5 | `.gitignore`, `.npmignore`, `.nvmrc`, `package.json` scripts, `launch.json` |

Bundle, measured by building `origin/main` and HEAD: initial load **1,133.4 KB →
830.7 KB (−26.7%)**; main chunk 1,152 kB → 842 kB (275.4 → 244.2 kB gzip), with
Government Orders split to a 291 kB on-demand chunk. Total shipped bytes rose
slightly (1,136 → 1,168 KB) — code-splitting overhead, paid back on first load.

## 8. Remaining manual-review queue

Work that requires a human, ordered by how much it would improve the artefact.

**Blocking a public launch**

1. **Publisher identity, affiliation, funding, licence.** Unwritten.

**Provenance (largest evidential gap)**

2. **247 of 438 records have no page reference.** `docs/remediation_queue.json`,
   prioritised: 27 resolvable from an already-linked GO/Act, 5 mixed-status
   records needing components split, 215 needing the printed volumes re-checked.
3. **Manifesto statuses are unverified.** All 505 mirror an external tracker.
   Independent assessment needs a fulfilment criterion fixed *before* looking at
   the evidence, plus a primary document per judgement.
4. **40 sources in the manual-acquisition queue.** The six DES endpoints are the
   highest-value cluster — the state's own statistical authority, and the natural
   independent counter that grades A and B require.

**Accessibility**

5. Textual data-table equivalents for charts — the largest remaining gap.
6. Testing with real assistive technology (VoiceOver, NVDA). Everything to date
   is computed-style measurement and code inspection.
7. `lang="ta"` tagging on Tamil-script content.

**Blocked, not merely undone**

8. **100 of 138 Assembly sittings unmeasured**, and `robots.txt` forbids the
   crawl that was planned to close it. Needs a manual process or permission.

**Engineering**

9. `source-package` / `deploy-package` scripts; permalinks and URL state; print
   views; per-value chart citations; inline-style consolidation.

## 9. What a reader should take away

The project is now honest about three things it was not honest about before: that
its records are what a government said about itself, that its manifesto statuses
are someone else's judgement, and that its claim tool retrieves rather than
verifies. Those are not small admissions — they materially reduce what the
artefact appears to prove.

That reduction is the deliverable. An evidence explorer that overstates its
evidence is worse than useless on politically contested material, because it
lends the appearance of verification to claims nobody has verified. What remains
is a genuinely useful thing: a fast, offline, source-linked index that shortens
the path from a claim to the primary document — and then gets out of the way.
