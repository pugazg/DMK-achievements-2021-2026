# Artefact Audit — Remediation Record

**Audit:** `docs/DMK_Achievements_Artefact_Audit_2026-07-19.md` (reviewer, 19 July 2026)
**Remediation branch:** `audit-remediation` · **This record:** 21 July 2026

Traceability from every audit finding to what was actually done. Items marked
**Open** are genuinely not done — this table is not a completion certificate.

---

## Release blockers (P0)

### P0.1 — Replace or redesign the "Fact-check" feature
**Finding:** the claim checker interpreted weak, partial word matches as verification or contradiction.
**Status: Done.**

`lookupClaim()` was rewritten as neutral retrieval. It returns one of
`not_found` / `insufficient_match` / `related_records` and **never a verdict**;
there is no boolean, score, or rebuttal in the return value. It requires ≥60%
term coverage, ≥2 matched terms and a distinctive (≥6-char) term before showing
anything as related, and it flags negated claims because record presence cannot
confirm or deny a negative. The feature is renamed **Claim lookup**. Eight
adversarial tests (`test/claim.test.mjs`) pin the behaviour, including one that
asserts no verdict field can reappear. Documented in
`docs/CLAIM_SEARCH_LIMITATIONS.md`.

### P0.2 — Correct misleading coverage statements
**Finding:** several public labels overstated coverage or used incorrect totals.
**Status: Done** — in the UI and in the README.

| Label | Was | Now |
|---|---|---|
| Domains | 12 | **11**, derived from the data and asserted by `npm run validate` |
| GO departments | 38 | **36**, derived |
| Government Orders | "~3,500 GOs" | **3,501 catalogued** vs **186 embedded**, stated separately |
| Debates | "138 transcripts" | **138 links / 38 measured**; the 12,720 pages and 2.17M words are labelled as the 38 only |
| Legislation | flat total | **119 Acts / 95 Bills / 8 Ordinances**, split by legal stage |
| Global search | "Search everything" | "Search records & promises" |
| Nav | "Fact-check" | "Claim lookup" |
| Hero | "verified line by line" | "sourced line by line", plus "as of 18 Jul 2026" |

### P0.3 — Expose auditable provenance
**Finding:** most claims lacked visible page-level provenance and an "as of" date.
**Status: Partial.**

Done: an A–F evidence grade on every record card with a rationale, conservative
auto-grading capped at D, a cut-off date in the hero, and a validation rule
asserting no record is graded above D.

**Open:** 247 of 438 records still carry `page: null` — no page reference back to
the source volume, so a reader cannot spot-check them. The structured
`EvidenceRecord[]` store is designed but unpopulated. The remediation queue for
those 247 records **is** now generated (`docs/remediation_queue.json`, prioritised
27 / 5 / 215). See `docs/EVIDENCE_MODEL.md`.

### P0.4 — Clean the data and status taxonomy
**Status: Done.**

70 issues found by `scripts/data_quality_scan.mjs`. 8 encoding defects repaired,
1 duplicate title disambiguated, 6 compound records flagged `mixedStatus: true`.
55 OCR defects in quoted gazette/GO text were deliberately **left as published**
so the text still matches the source PDF. Every applied change is logged with its
record ID; no ID changed. See `docs/DATA_QUALITY_REPORT.md`.

### P0.5 — Produce a clean, reproducible release package
**Status: Partial.**

Done: `.gitignore` / `.npmignore` / `.nvmrc`, `engines.node >=20`, and the
`test` / `validate` / `baseline` / `a11y` / `docs` npm scripts.
**Open:** `source-package` and `deploy-package` scripts; licensing.

---

## Dataset audit (§4)

| Dataset | Finding | Status |
|---|---|---|
| Records | Counts sound; provenance thin | Grades added; **247 page-less records Open** |
| Promises | Statuses presented as this project's | **Done** — disclosed as the external tracker's, in the UI and in `docs/MANIFESTO_ASSESSMENT_METHODOLOGY.md` |
| Debates | 138 links vs 38 measured conflated | **Done** — split and test-guarded. Extending the measured set is now **blocked**: the Assembly site's robots.txt forbids crawling |
| Government Orders | Archive vs embedded conflated | **Done** |
| Gazette GOs | Large dataset, unused/unintegrated | **Done** — integrated via GovOrders, lazy-loaded |
| Legislation | Stages conflated | **Done** |
| Dashboard | Coarse provenance; one wrong unit | **Done** — Ambedkar chart unit corrected (students, not crore); fertility chart made neutral. Per-value citations **Open** |

---

## UX, accessibility and trust (§5)

| Item | Status |
|---|---|
| Skip-to-content link | Done |
| Dialog semantics, focus trap, Esc, focus restore | Done (`useModalA11y`) |
| Labels on search and claim inputs | Done |
| `aria-expanded` / `aria-controls` on mobile menu | Done |
| `aria-live` for copy success | Done |
| Raise muted-text contrast | **Done, and larger than reported** — a full in-browser audit found 76 dark / 78 light failures, nearly all from identity hues used as text in both themes. Now 0/0. See `docs/ACCESSIBILITY_REPORT.md` |
| Accessible data tables for charts | **Open** |
| Increase 9.5–11px text | **Open** |
| Reduced motion | Already supported; verified |
| About/Methodology disclosure | Done (Footer) — publisher identity, affiliation and funding disclosure **Open** |
| ShareCard implies image export | Done — verdict language removed, copy line states "government-reported; not independently audited". Image export **Open** |
| Deep links / permalinks / URL state | **Open** |
| Print/PDF views | **Open** |

---

## Engineering (§6)

| Item | Status |
|---|---|
| Oversized initial bundle | **Done** — React.lazy for Legislation/GovOrders/Debates + ErrorBoundary. Main bundle 1,179KB → 842KB (244KB gzip); GovOrders split to a 291KB on-demand chunk |
| Error boundary | Done |
| macOS-built dependencies / nested backup shipped | Done — gitignored |
| Inline styles hard to maintain | **Open** — acknowledged, not addressed |

---

## Documentation (§7)

| Document | Status |
|---|---|
| `EVIDENCE_MODEL.md`, `CLAIM_SEARCH_LIMITATIONS.md`, `MANIFESTO_ASSESSMENT_METHODOLOGY.md` | Done — the code already linked to these; they now exist |
| `DATA_QUALITY_REPORT.md`, `SOURCE_COVERAGE_MATRIX.md` | Done — generated from JSON, so they cannot drift |
| `ACCESSIBILITY_REPORT.md`, `SOURCE_ACQUISITION_PLAN.md`, `RTI_GAP_REGISTER.md` | Done |
| `README.md` corrections | Done — 11 domains, catalogue vs embedded totals separated, Node version, gate commands, Limitations and corrections-policy sections added |
| `RELEASE_CHECKLIST.md`, `CHANGELOG.md` | Done |
| Licensing and attribution | **Open** |

---

## Where this leaves the release recommendation

The reviewer's assessment was: *suitable as a beta/reference explorer after the
P0 fixes; not as an authoritative fact checker.* That still holds, and the
remediation has deliberately moved the project **further** from "fact checker" —
the claim tool is now explicitly neutral retrieval, and the evidence model caps
every record at "sanctioned" or "government-reported".

Recommended framing: **public beta evidence explorer**. The honest one-line
description is that this is a searchable, source-linked index of what the Tamil
Nadu government says it did between 2021 and 2026 — not an assessment of whether
it did it.
