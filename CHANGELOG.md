# Changelog

All notable changes to the data and the interface. Data corrections are listed
per record ID; record IDs are stable and are never reused or renumbered.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — Phase B: public transparency and methodology

**Data 2026-07-18 · Methodology v1.0 · Build 2.0.0**

### Added — transparency

- **Publisher disclosure completed** (`docs/PUBLISHER_TRANSPARENCY.md`). Every
  field that was `[NOT YET DECIDED]` is now stated: maintainer **Pugazhendhi R**,
  independently maintained, **no political affiliation** with DMK or any party,
  government body or campaign, not commissioned, **self-funded** with no
  advertisements, sponsorships or donations.
- Two perspective caveats are stated rather than buried: the source material is
  **one-sided by construction** (no adverse or contrary evidence has been
  ingested), and some framing is **editorial and sympathetic** in tone.
- **In-app Transparency section** (`#transparency`, lazy-loaded), linked from the
  nav, the About section and the footer. Publisher, purpose, affiliation,
  funding, the grade ladder with live counts, the Government Order caveat,
  methodology, limitations, corrections and licence.
- **`docs/METHODOLOGY.md`** (methodology v1.0) — evidence classification,
  source selection, inclusion criteria, status classification, data-integrity
  rules, and a version history. States plainly that a Government Order proves
  administrative action but **not** completion, beneficiary delivery or outcome.
- **`docs/CORRECTIONS.md`** — correction process with issue type, record ID,
  source reference, explanation and a review-status flow. Contrary evidence is
  explicitly invited; corrections are announced, never silent.
- **Licences.** MIT for the software (`LICENSE`), CC BY 4.0 for the data
  compilation (`LICENSE-DATA`). Both state that **government documents are not
  licensed by this project** — they belong to their issuing authorities, are
  linked rather than rehosted, and no ownership is claimed.
- **Version information** (`src/lib/version.js`) — release, data cut-off, data
  last-updated and methodology version, shown in the footer and the Transparency
  section. Methodology is versioned separately because changing the rules can
  change what an existing record *means*.
- `test/transparency.test.mjs` — 14 tests guarding the disclosures: no
  unresolved placeholder reaches the page, affiliation and funding cover every
  route, the grade ladder cannot drift from `GRADES`, the licence never claims
  government documents, version matches `package.json`, and no copy claims
  verification.

### Changed

- README carries the publisher, affiliation, funding, licence and version
  tables instead of a "not yet stated" placeholder.
- Release checklist: publisher, licence and corrections items now checked.

---

## [Unreleased] — audit remediation

Remediation of the reviewer's artefact audit of 19 July 2026. Traceability from
each finding to its outcome is in `docs/ARTEFACT_AUDIT_REMEDIATION.md`.

### Changed — framing and labels

- **"Fact-check" is now "Claim lookup".** The tool retrieves records that may
  relate to a pasted claim and explains the match. It no longer returns a
  verdict of any kind, and cannot: there is no boolean, score or rebuttal in its
  output. Keyword overlap is not verification.
- Hero: "verified line by line" → **"sourced line by line"**, with an explicit
  "as of 18 Jul 2026" cut-off.
- Global search: "Search everything" → **"Search records & promises"**, which is
  what it actually indexes.
- Domains corrected **12 → 11** (the "All" filter was being counted as a domain).
- GO departments corrected **38 → 36**.
- Government Orders now state **3,501 catalogued** and **186 embedded**
  separately, instead of implying the archive is held here.
- Debates now state **138 links / 38 measured**; the 12,720 pages and 2.17M words
  are labelled as covering the 38 measured sittings only.
- Legislation split by legal stage: **119 Acts, 95 Bills, 8 Ordinances**.
- Share card: "VERIFIED RECORD" → **"FROM THE STATE RECORD"**; the copied text
  now says "government-reported; not independently audited".

All of the above counts are now *derived from the data* and asserted by
`npm run validate`.

**Correction (Phase A):** an earlier revision of this entry claimed this already
covered every label. It did not. The hero counter strip hard-coded its numbers in
`src/data/dashboard.js` and no gate read them — the verification audit changed
"438 verified records" to "999" and every check still passed. The hero strip now
derives its values from `src/lib/publicMetrics.js`, `scripts/validate.mjs`
reconciles every displayed metric against the datasets, and `test/metrics.test.mjs`
asserts that a tampered count fails.

### Added — evidence and disclosure

- **Evidence model** (`src/lib/evidence.js`): an A–F grade on every record with a
  rationale. Auto-grading is capped at **D** — no record can be automatically
  graded "outcome verified", because nothing in the corpus is counted by anyone
  other than the implementing department. Enforced by validation.
- **Manifesto disclosure**: a note above the headline count stating that all 505
  statuses mirror an external tracker and have not been independently verified
  by this project.
- **About / Methodology** section in the footer.
- Documentation: `EVIDENCE_MODEL.md`, `CLAIM_SEARCH_LIMITATIONS.md`,
  `MANIFESTO_ASSESSMENT_METHODOLOGY.md`, `DATA_QUALITY_REPORT.md`,
  `SOURCE_COVERAGE_MATRIX.md`, `ACCESSIBILITY_REPORT.md`,
  `SOURCE_ACQUISITION_PLAN.md`, `RTI_GAP_REGISTER.md`, `RELEASE_CHECKLIST.md`,
  `ARTEFACT_AUDIT_REMEDIATION.md`.

### Fixed — data corrections

Every change below is logged per-ID in a migration file. **No record ID changed;
no figure, status or wording was altered beyond what is listed.**

**`src/data/promises.js`** — 8 encoding repairs (`docs/migration_currency.json`).
The rupee sign had been destroyed in transcoding. Promises
#10, #26, #70, #87, #162, #178, #182 (lost as `?`) and #261 (UTF-8 `₹` read as
Windows-1252). Character repair only — no amount was changed.

  Promise #162 was detected by the scan but **missed by the first repair pass**:
  the unit pattern was case-sensitive, and that note reads "?169 Cr", not "cr".
  `scripts/apply_currency_fixes.mjs` now matches the unit case-insensitively.

**`src/data/records.js`** (`docs/migration_records.json`):

- `rur_b2_schools` — duplicate visible title "Rural school infrastructure"
  disambiguated to "Rural school classrooms (CESIDS)".
- `rur_b6_schools` — same duplicate disambiguated to "Rural school classrooms
  (RD dept)".
- `edu3`, `hea4`, `inf5`, `eco_b2_tidel`, `her_b2_temples`, `env_b4_thoonmai` —
  flagged `mixedStatus: true`. Each is presented as an achievement but its own
  detail text mixes delivered components with planned or ongoing ones. The
  original wording is untouched; the flag adds information rather than replacing
  the government's framing.

**Deliberately not fixed:** 55 OCR defects in text quoted from gazettes, GOs and
legislation (52 × "Honble", 3 other typos). Silently correcting quoted source
text would break a reader's ability to match it against the original PDF. They
are flagged in `docs/data_quality_report.json`.

**`src/data/dashboard.js`** — the Ambedkar chart's unit was wrong (crore, should
be students). The fertility chart was recoloured `neutral`: a falling fertility
rate is not self-evidently good or bad and should not be presented in a
good/bad palette.

### Fixed — accessibility

- **Text contrast across both themes.** An in-browser audit of every rendered
  text node found **76 failures on dark, 78 on light**. Nearly all were one
  systemic defect: category, evidence-grade, origin, legislation-kind and
  manifesto-status hues are identity colours that were used verbatim as text in
  both themes, so each failed in one theme or the other. The evidence-grade chip
  — which appears on all 438 record cards and carries the project's central
  caveat — sat at **2.25:1** in light mode.
  Fixed by `textSafe()`, which re-lightens a hue against the active theme while
  preserving its identity. Now **0 failures in both themes** across 1,585 nodes,
  guarded by `npm run a11y`.
- Modal dialogs: focus trap, Esc to close, focus restored on close,
  `role="dialog"` + `aria-modal` + accessible names.
- Skip-to-content link; `aria-expanded`/`aria-controls` on the mobile menu;
  `aria-live` on claim results and copy confirmation.
- The evidence-grade chip is now focusable and exposes its rationale as an
  accessible name, instead of hiding it in a `title` tooltip.
- The claim submit button is a genuinely disabled control when the field is
  empty, rather than a live control painted in a low-contrast style.

### Fixed — performance

- Legislation, Government Orders and Debates are lazy-loaded behind an
  `ErrorBoundary`. Measured against a build of `origin/main`: **initial load
  1,133.4 KB → 830.7 KB (−26.7%)**; main chunk 1,152 kB → 842 kB (275.4 → 244.2 kB
  gzip). Government Orders, which carries the ~340KB gazette dataset, is a 291 kB
  on-demand chunk. Total shipped bytes rose 1,136 → 1,168 KB (splitting overhead).
  (An earlier revision of this entry said "1,179KB → 842KB"; that before-figure was
  inherited from the handover and never measured.)

### Added — source pipeline

- Source registry of **108 sources** (`src/data/sourceRegistry.json`), verified
  for reachability and robots policy: 92 reachable, 3 blocked (403), 6 server
  error, 7 unreachable; 40 in the manual-acquisition queue.
- Pilot ingest retrieved and hashed **10 documents** (`sources/pilot/manifest.tsv`).

  **No registry source has been ingested.** Nothing in the app is currently
  backed by a document from this pipeline, and the coverage matrix says so.

- **Compliance finding:** `assembly.tn.gov.in` and `tn.data.gov.in` publish a
  blanket `Disallow: /`. The outstanding work to measure the remaining 100 of
  138 Assembly sittings therefore cannot be done by crawling. The existing 138
  outbound links are unaffected — linking is not crawling.

### Known open

Carried forward and disclosed rather than closed:

- 247 of 438 records have no page-level provenance (`page: null`).
- No textual data-table alternative for charts; no testing with real assistive
  technology.
- Publisher identity, funding disclosure and licensing are not yet written.
