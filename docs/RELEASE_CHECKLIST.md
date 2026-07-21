# Release Checklist

Run through this before any public deploy. Anything unchecked is a reason to
delay, not a reason to add a caveat.

---

## Gates (must all pass)

```bash
cd app
npm ci
npm run test        # claim safety, Tamil handling, displayed-metric reconciliation
npm run validate    # dataset + displayed-metric integrity checks
npm run a11y        # WCAG AA contrast over every text colour, both themes
npm run build       # vite production build
```

| Gate | Expected | Last run (21 Jul 2026) |
|---|---|---|
| `npm run test` | all pass | ✅ 29/29 |
| `npm run validate` | all pass | ✅ passed |
| `npm run a11y` | 0 failures | ✅ 0 |
| `npm run build` | succeeds | ✅ 842KB main / 244KB gzip |

## Claims discipline

- [ ] No label states a number the data does not hold. Every displayed metric is
      derived via `src/lib/publicMetrics.js` and reconciled by `npm run validate`;
      `test/metrics.test.mjs` asserts that a tampered count fails.
- [ ] Catalogue totals are stated separately from embedded content
      (3,501 catalogued vs 186 embedded; 138 links vs 38 measured).
- [ ] The word "verified" does not appear where the evidence is
      government-reported. The hero says *sourced* line by line.
- [ ] The claim tool is not described as fact-checking anywhere, including
      metadata, social cards and the README.
- [ ] No record is graded above D. Asserted by `npm run validate`.
- [ ] The manifesto section still discloses that its statuses are an external
      tracker's, above the headline count.
- [ ] The data cut-off date shown in the hero matches the actual data.

## Data integrity

- [ ] `npm run baseline` diff reviewed — record and promise counts unchanged, or
      the change is intentional and logged.
- [ ] Every data correction since the last release is in `CHANGELOG.md` and in a
      migration file with per-ID entries.
- [ ] No record ID changed without a mapping file.
- [ ] Quoted source text (gazette/GO subjects) is unmodified, including its OCR
      defects.

## Accessibility

- [ ] `npm run a11y` passes.
- [ ] Spot-check both themes in a browser; the automated check covers colour
      values, not layout or focus order.
- [ ] Keyboard-only pass: skip link → nav → search overlay (Esc closes, focus
      restored) → a record card → share card.
- [ ] Known gaps still listed honestly in `docs/ACCESSIBILITY_REPORT.md`
      (chart data tables, real AT testing, focus-visible styling).

## Package

- [ ] `npm ci` from a clean clone succeeds on Node ≥20.
- [ ] `dist/` builds from a clean tree.
- [ ] No `node_modules`, `dist`, `.DS_Store`, `__MACOSX`, zip archives, logs or
      fetched source documents in the commit.
- [ ] `sources/pilot/` and `sources/robots/` remain gitignored — they are fetched
      artefacts, not project content.

## Sources

- [ ] `docs/SOURCE_COVERAGE_MATRIX.md` regenerated if the registry changed:
      `node scripts/source_coverage_matrix.mjs`.
- [ ] The matrix still leads with the distinction between *checked* and *read*.
- [ ] No source is marked `fetched` unless a document was actually retrieved and
      hashed.
- [ ] Nothing in the manual queue was acquired by bypassing a block, CAPTCHA or a
      robots.txt disallow.

## Framing

- [ ] The release is described as an **evidence explorer**, not a fact-checking
      platform — in the UI, the README, and the `index.html` meta/OpenGraph tags
      that generate social previews.
- [ ] Publisher identity, political affiliation and funding disclosure are
      present. **Currently Open — this is a genuine blocker for a public launch**
      of a politically-charged artefact. Template and outstanding fields:
      `docs/PUBLISHER_TRANSPARENCY.md`.
- [ ] Licence and attribution stated. **Currently Open.**
- [ ] Corrections policy and a public change log are reachable from the page.

## Known-open items at last review

These are not gates, but they must be disclosed rather than quietly carried:

- 247 of 438 records have no page-level provenance.
- 0 of 108 registry sources have been ingested; 10 pilot documents exist.
- 100 of 138 Assembly sittings are unmeasured, and the site's robots.txt forbids
  crawling to close the gap.
- No chart has a textual data-table equivalent.
- No testing with real assistive technology.
- Publisher identity, funding disclosure and licensing are not yet written
  (`docs/PUBLISHER_TRANSPARENCY.md`).
- Tamil search coverage is partial: 20 of 438 records carry a Tamil scheme name.
- No contrary or adverse evidence (e.g. CAG findings) has been ingested.
