# The Dravidian Model · Tamil Nadu 2021–2026

An interactive, **fully-offline** evidence explorer for the Tamil Nadu government's
2021–2026 record: 438 achievement records, the 505-promise 2021 manifesto, 222 Acts and
Bills, Government Orders, and the 16th Assembly's sitting index — each linked back to the
document it came from.

> **What this is.** A searchable, source-linked index of **what the Tamil Nadu government
> says it did** between 2021 and 2026, with an explicit evidence grade on every record.
>
> **What this is not.** A fact-checking platform, and not an assessment of whether the
> government did what it says. Nothing here is independently verified. See
> [Limitations](#limitations).

**Data cut-off:** 18 July 2026. **Documentation generated:** 21 July 2026.

---

## What's inside

| Section | What it does |
|---|---|
| **Overview** | Headline figures from the state record — GSDP growth, free-bus trips, doorstep-care reach. |
| **Dashboard** | A domain donut plus themed chart groups (Economy, Health, Women, Education) as hand-rolled inline SVG, each carrying its own source line. |
| **The Method** | Narrative essays and a term timeline. Editorial framing, not data. |
| **Explore** | All 438 records across **11 domains**, filterable and searchable, each with an evidence grade and a shareable card. |
| **Claim lookup** | Paste a claim; the tool retrieves records that *may* relate to it and shows why they matched. **It never returns a verdict** — see [`docs/CLAIM_SEARCH_LIMITATIONS.md`](docs/CLAIM_SEARCH_LIMITATIONS.md). |
| **Manifesto** | All 505 promises with a status (Fulfilled / Modified / In progress / Stalled / Not fulfilled). **These statuses are an external tracker's, reproduced — not this project's verification.** See [`docs/MANIFESTO_ASSESSMENT_METHODOLOGY.md`](docs/MANIFESTO_ASSESSMENT_METHODOLOGY.md). |
| **Laws** | 222 legislative instruments — **119 Acts, 95 Bills, 8 Ordinances** — from the Government Gazette (Extraordinary), each linked to its official PDF. |
| **Orders** | **3,501 catalogued** portal GOs across **36 departments**, of which **186 are embedded** here with full detail, plus 788 GO/notification entries from the Gazette. The catalogue total is a count of what exists, not of what is held here. See [`docs/GAZETTE_SOURCES.md`](docs/GAZETTE_SOURCES.md). |
| **Debates** | **138 sitting links** for the 16th Assembly (May 2021 – Oct 2025). **38 of those are measured** for page and word counts; the other 100 are links only. |

Plus: sticky scroll-spy nav, global search over **records and promises** (`⌘/Ctrl-K` or
`/`), light/dark theme, shareable cards, and full reduced-motion support.

## Evidence grades

Every record carries an A–F grade describing **the paper trail this project holds**, never
the underlying reality:

| Grade | Meaning |
|---|---|
| A / B / C | Outcome / delivery / execution verified by documents |
| **D** | **Sanctioned** — a Government Order or Act names the scheme |
| **E** | **Government-reported** — it appears in an official publication |
| F | Unsupported, or reliable contrary evidence exists |

**Auto-grading never exceeds D**, and every record here is auto-graded. A and B require an
official body other than the implementing department to have counted something, and the
embedded corpus contains no such source. This is enforced by `npm run validate`.
Full model: [`docs/EVIDENCE_MODEL.md`](docs/EVIDENCE_MODEL.md).

## Limitations

Read these before citing anything here.

- **Nothing is independently verified.** The corpus is transcribed from the government's
  own summary publications. That is a legitimate primary source for *what was claimed*,
  not evidence that it happened.
- **247 of 438 records have no page reference** back to the source volume, so they cannot
  be spot-checked by a reader today.
- **Manifesto statuses are reproduced from an external tracker**, including the headline
  "400 fulfilled". This project did not assess them.
- **Claim lookup is retrieval, not verification.** `not found` means *not in this dataset*,
  never *false*.
- **The corpus is written in English.** Only 20 of 438 records carry a Tamil scheme name,
  so a Tamil-language claim may be unmatchable. The tool reports that as a coverage limit,
  never as an absence of evidence.
- **The source pipeline has catalogued 108 sources but ingested none of them.** Ten pilot
  documents have been fetched. No claim in the app is currently backed by that pipeline.
  See [`docs/SOURCE_COVERAGE_MATRIX.md`](docs/SOURCE_COVERAGE_MATRIX.md).
- **Origin markers** (started / expanded / continued under DMK) reflect the state record's
  own framing of a contested question.
- Known gaps are registered in [`docs/RTI_GAP_REGISTER.md`](docs/RTI_GAP_REGISTER.md).

## Corrections policy

Data corrections are logged per record ID in [`CHANGELOG.md`](CHANGELOG.md) and in
migration files (`docs/migration_*.json`). **Record IDs are stable and never reused.**
Text quoted from a gazette or Government Order is preserved verbatim, OCR defects
included, so it still matches the source PDF. Report issues via the repository.

## Run it

Requires **Node ≥ 20** (see `.nvmrc`).

```bash
cd app
npm ci             # clean, reproducible install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/

npm run test       # 29 tests: claim safety, Tamil handling, metric reconciliation
npm run validate   # dataset + displayed-metric integrity checks
npm run a11y       # WCAG AA contrast check, both themes
npm run docs       # regenerate the generated documents from the data
npm run baseline   # regenerate docs/BASELINE_MANIFEST.json
```

Before any public deploy, work through
[`docs/RELEASE_CHECKLIST.md`](docs/RELEASE_CHECKLIST.md).

## Design principles

- **Fully offline, zero runtime dependencies beyond React.** No CDN, no web fonts, no chart
  library, no network call at runtime. The report runs anywhere and can be audited against
  its own sources.
- **Never invent a fact.** Data lives in `src/data/*`, extracted from the record; every
  chart block carries its own source line.
- **Never overstate coverage.** Catalogue totals are reported separately from embedded
  content, and every count shown in the UI is derived from the datasets via
  `src/lib/publicMetrics.js` and reconciled by `npm run validate` — a displayed
  number cannot be a stale literal.
- **Keep uncertainty explicit.** Where a classification is uncertain, the interface says so
  rather than resolving it.

## Project layout

```
app/
  src/
    data/        records.js (438) · promises.js (505) · legislation.js (222)
                 govorders.js · gazettegos.js (788) · debates.js (138)
                 promiseGoLinks.js · sourceRegistry.json (108) · dashboard.js
    lib/         theme.js (incl. textSafe contrast helper) · search.js
                 evidence.js · publicMetrics.js · version.js · hooks.js · format.js
    components/  charts.jsx · Nav · SearchOverlay · ShareCard · RecordCard
                 Counter · RisingSun · layout
    sections/    Hero · Dashboard · Method · Explore · Claim · Manifesto
                 Legislation · GovOrders · Debates · Footer · Transparency
    App.jsx      composition, theme provider, lazy routes, error boundary
  scripts/       validate · baseline · data_quality_scan · check_contrast
                 source_registry_seed · verify_sources · recheck_sources
                 fetch_robots · patch_source_registry · pilot_ingest
                 source_coverage_matrix · data_quality_doc
  docs/          evidence model · methodology · limitations · coverage matrix
                 data quality · accessibility · acquisition plan · RTI register
                 release checklist · audit remediation
  test/          claim · metrics · tamil · transparency .test.mjs
```

## Sources

Tamil Nadu Government 2021–26 achievement record (souvenir + minister-by-minister
volumes); Economic Survey of Tamil Nadu 2025–26; DMK Election Manifesto 2021; SRS 2021–23;
StartupTN / TANSIM published data; Tamil Nadu Legislative Assembly Digital Library
(16th Assembly, 2021–2026); Tamil Nadu Government Gazette (Extraordinary), Dept. of
Stationery & Printing; Government Orders, Government of Tamil Nadu (tn.gov.in).

The full registry of 108 catalogued sources, with reachability and robots status for each,
is in [`docs/SOURCE_COVERAGE_MATRIX.md`](docs/SOURCE_COVERAGE_MATRIX.md).

## Publisher, affiliation and licence

| | |
|---|---|
| Maintainer | **Pugazhendhi R** — independently maintained by one person |
| Affiliation | **None.** No affiliation with DMK, any other party, any government body or any campaign organisation. Not commissioned. |
| Funding | **Self-funded.** No government, party, grant or institutional money. No advertisements, sponsorships or donations. |
| Software licence | **MIT** — [`LICENSE`](LICENSE) |
| Data licence | **CC BY 4.0** — [`LICENSE-DATA`](LICENSE-DATA) |
| Government documents | **Not licensed here.** They belong to their issuing authorities under their own terms; this project claims no ownership and links to the authority's own copy. |
| Corrections | [`docs/CORRECTIONS.md`](docs/CORRECTIONS.md) · [open an issue](https://github.com/pugazg/DMK-achievements-2021-2026/issues) |

Two things a reader should weigh even so: the source material is **one-sided by
construction** (drawn almost entirely from the government's own publications, with no
adverse or contrary evidence yet ingested), and some framing is **editorial and
sympathetic** in tone. Both are stated in full in
[`docs/PUBLISHER_TRANSPARENCY.md`](docs/PUBLISHER_TRANSPARENCY.md), which is also
published in the app itself under **Transparency**.

## Versions

| Version | Value |
|---|---|
| Release | 2.0.0 |
| Data cut-off | 2026-07-18 |
| Data last updated | 2026-07-21 |
| Methodology | **1.0** — [`docs/METHODOLOGY.md`](docs/METHODOLOGY.md) |

Methodology is versioned separately from the data because changing the rules can change
what an existing record *means* without any data changing. Defined once in
`src/lib/version.js`.
