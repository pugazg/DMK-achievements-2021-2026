# DMK Achievements 2021–2026 — Complete Artefact Audit

**Audit date:** 19 July 2026  
**Reviewed package:** `DMK Achievements 2021-2026.zip`

## 1. Scope and method

I reviewed all **40 meaningful artefacts** in the package: project configuration, documentation, application shell, every React component and section, every data module, utility code, and the embedded backup. I also performed programmatic integrity checks across the complete embedded datasets:

- 438 achievement records
- 505 manifesto promises
- 138 Assembly sittings
- 186 selected/linkable Government Orders, against a displayed archive total of 3,501
- 788 Gazette-derived GO entries
- 222 legislative rows
- all dashboard series, timelines, references, and cross-links

I excluded generated dependency contents, Git internals, macOS resource-fork files, and compiled output from line-by-line content review, but assessed them as release-packaging artefacts. I also ran a clean dependency installation and production build.

This is a **complete structural, editorial, UX, engineering, and provenance audit of the supplied artefacts**. It is not an independent authentication of every political claim against every original government PDF; the current artefacts do not expose enough page-level evidence to do that reliably.

---

## 2. Overall verdict

The project has a strong foundation: it is unusually rich in primary-source links, the refactored React structure is understandable, internal identifiers and most aggregate counts are sound, and a clean production build succeeds. The old 438-record dataset was preserved exactly during the refactor.

It is **not yet ready to present as an authoritative public fact-checking product**. The highest-risk problems are:

1. The claim checker confidently interprets weak, partial word matches as verification or contradiction.
2. Several public labels overstate dataset coverage or use incorrect totals.
3. Most claims lack directly visible page-level provenance and an “as of” date.
4. The package is not clean or portable because it contains macOS-built dependencies, Git history, compiled output, metadata, and a nested backup.
5. Important accessibility, data-cleaning, and editorial issues remain.

### Suggested readiness assessment

| Area | Assessment |
|---|---|
| Data breadth | Strong |
| Internal structural integrity | Generally strong |
| Claim-level auditability | Needs major improvement |
| Fact-check reliability | Release blocker |
| Accessibility | Needs improvement |
| Performance | Functional, but oversized initial bundle |
| Packaging/reproducibility | Needs correction |
| Public release readiness | Suitable as a beta/reference explorer after P0 fixes; not yet as an authoritative fact checker |

---

## 3. Release blockers — fix before public launch

### P0.1 Replace or redesign the “Fact-check” feature

The current algorithm scores a result when **any individual query token** appears in a record. It does not require the full claim to match and has no understanding of negation, entities, dates, quantities, causal relationships, or context. It also has no confidence threshold or abstention state.

Examples from the supplied code and data:

- “DMK cancelled breakfast scheme” returns hundreds of matches and can present the breakfast-scheme record as a contradiction, despite ignoring the word “cancelled.”
- “new government launched moon mission” still returns 185 records.
- “Tamil Nadu banned all buses” returns 199 records.
- “the free bus scheme ended in 2023” returns 426 records and can rank an unrelated scheme first.

**Required change:** either rename this to **“Search the verified record”** and remove verdict language, or build a real evidence-matching pipeline with:

- stop-word removal and phrase/entity matching;
- all-important-term matching rather than any-token matching;
- negation and numerical/date handling;
- evidence snippets showing why a result matched;
- confidence calibration;
- a prominent **“insufficient evidence / no reliable match”** result;
- adversarial tests for false claims, nonsense claims, and reversals.

Never say that a claim is verified or contradicted solely because a partial record match exists.

### P0.2 Correct misleading coverage statements

The following visible claims must be corrected:

- **“12 domains”** — the data contains **11 actual domains**. The twelfth category is the “All” filter.
- **“38 departments”** — `GO_META` contains **36 departments**.
- **3,501 GOs indexed** — the app embeds only **186 selected/linkable GO rows**. The 3,501 figure is an archive count, not a searchable in-app dataset.
- **Assembly metrics across 138 sittings** — page and word measurements exist for only **38 of 138 sittings**. One hundred sittings have links but no measured page/word metadata.
- **“Search everything”** — global search covers achievement records and promises, not legislation, orders, debates, or the Gazette dataset.
- **“What the House actually enacted”** — the section also includes Bills and Ordinances; Bills are introduced, not necessarily enacted.

### P0.3 Expose auditable provenance

A public political evidence product needs claim-level traceability. Each achievement, promise status, chart, and timeline assertion should expose:

- source title;
- department/institution;
- document date;
- direct URL;
- page/table/paragraph reference;
- date accessed;
- status assessment date;
- who assessed it and under what rule;
- correction/version history.

Currently, **247 of 438 records have no page value**, and source references are often generic. The 505 promise assessments do not offer a direct evidence URL and page for each verdict. “Verified line by line” is not independently reproducible from the UI.

### P0.4 Clean the data and status taxonomy

- Repair corrupted currency text such as `?133 crore`, `?1.41 lakh crore`, and `â‚¹20L`.
- Copy-edit malformed and run-on promise notes.
- Normalize `₹`, `Rs`, dates, GO notation, punctuation, department names, and capitalisation.
- Review records marked `done` that explicitly include planned, sanctioned, being-set-up, or unfinished work.
- Split mixed records into **completed**, **ongoing**, and **announced/sanctioned** components rather than assigning one broad status.

### P0.5 Produce a clean, reproducible release package

The supplied ZIP contains:

- `node_modules` built on macOS;
- `.git` history;
- `dist` output;
- `.DS_Store` and `__MACOSX` metadata;
- a nested backup ZIP.

The included dependencies fail on Linux because Rollup’s platform-specific package is absent. A clean `npm ci` followed by `npm run build` succeeds, confirming that this is a packaging problem rather than broken application source.

Provide two separate deliverables:

1. **Source package:** source, docs, `package.json`, and lockfile only.
2. **Deployment package:** compiled `dist` only.

Do not distribute `.git`, `node_modules`, backup ZIPs, or OS metadata.

---

## 4. Dataset-by-dataset audit

### 4.1 Achievement records — `src/data/records.js`

**What is good**

- 438 unique record IDs.
- All records use recognised categories.
- Balanced origin/status structure: 260 started, 143 expanded, 35 continued; 220 done and 218 ongoing.
- The refactored dataset exactly matches the previous monolithic backup dataset.

**Improvements**

- Correct the claimed category count from 12 to 11 domains.
- Add direct page-level evidence to the 247 records whose `page` is null.
- Resolve the duplicate visible title **“Rural school infrastructure.”**
- Shorten or structure the 89 descriptions over 80 words; some reach roughly 195 words and are difficult to scan or share.
- Reassess at least six `done` records that also mention planned or incomplete elements, including laptops, fish landing centres, TIDEL/Knowledge City, hostels, and environmental initiatives.
- Remove or formally use the inconsistent `promise` string field; promise linkage is already represented in the manifesto dataset.
- Add explicit `asOf`, `evidence`, `scope`, `beneficiaryUnit`, and `statusRationale` fields.

### 4.2 Manifesto promises — `src/data/promises.js`

**What is good**

- 505 unique promises and numbers.
- All referenced achievement IDs resolve correctly.
- Clear top-level taxonomy: fulfilled, modified, in progress, stalled, and not fulfilled.

**Improvements**

- The politically consequential figure of **400 fulfilled promises (79.2%)** needs transparent rules, evidence dates, direct document URLs, and reviewer attribution.
- Explain clearly that the classification appears to mirror an external manifesto tracker and state how it was independently checked.
- Repair currency mojibake and question-mark substitutions.
- Correct unmatched punctuation, especially promise 1.
- Copy-edit unclear notes such as promise 20 and numerous concatenated GO/date/evidence strings.
- Separate evidence facts from editorial interpretation.
- Add `sourceUrl`, `sourcePage`, `assessmentDate`, `assessor`, `criteria`, and `confidence` fields per promise.
- Make global-search promise results navigable to the corresponding promise card.

### 4.3 Assembly debates — `src/data/debates.js`

**What is good**

- Seven session groups and 138 sittings are represented.
- Sitting totals agree with session metadata.
- Direct transcript links are valuable.

**Improvements**

- Only 38 sittings have measured pages/words/signature metadata; 100 do not. The UI must not imply that 12,720 pages and 2,173,509 words describe all 138 sittings.
- Display **“38 transcripts measured; 100 transcript links not yet measured.”**
- Add a coverage/progress indicator and last-crawled date.
- State that the current dataset ends on 15 October 2025 and whether later proceedings are unavailable or merely not collected.
- Add sitting search, date filter, session filter, member/topic indexing, and transcript-level citation links.

### 4.4 Government Orders — `src/data/govorders.js`

**What is good**

- Aggregate year and department totals reconcile internally to 3,501.
- The selected GO links provide useful thematic bridges to schemes, budgets, and laws.

**Improvements**

- Correct department count from 38 to 36 unless two missing departments are added.
- Explain that only **186 selected GO links** are embedded, rather than implying all 3,501 are indexed/searchable.
- 153 of 186 selected rows lack a GO number; improve parsing or label them as entries without captured numbers.
- Clean OCR/scrape defects such as “Honble,” “f the year,” “cre,” “Accded,” broken words, and truncation.
- Preserve raw scraped text separately and show a normalized editorial version.
- Add search and filters for year, department, GO number, linked scheme/law, and topic.
- Add collection date and source snapshot/version.

### 4.5 Gazette-derived GOs — `src/data/gazettegos.js`

**What is good**

- 788 entries and internal part counts reconcile in the data module.
- This could substantially strengthen GO provenance.

**Improvements**

- This 10,000-line dataset is **not imported or displayed anywhere**. Either integrate it into the Orders section or remove it from the production bundle and correct the documentation.
- 238 rows lack GO number/type, 17 lack department, and 5 lack subject.
- Repair the visibly corrupted Tamil/encoding string in one subject.
- Add a validation report and extraction provenance.
- Distinguish partial 2026 coverage from completed years.

### 4.6 Legislation — `src/data/legislation.js`

**What is good**

- 222 rows reconcile to 119 Acts, 95 Bills, and 8 Ordinances.
- Direct Gazette PDF links are a major strength.
- 68 rows connect legislation to achievement records.

**Improvements**

- 123 rows lack an instrument number; improve extraction or expose “number not captured.”
- Clarify the counting method: 222 rows point to 164 unique PDFs, and some PDFs bundle multiple instruments.
- Avoid concatenating multiple Bills/Acts into one title where individual instruments can be split.
- Correct typographical errors such as “Augmentaion.”
- Rename the section to **“Legislation introduced and enacted”** or separate Acts, Bills, and Ordinances by legal stage.
- Explain the `+N more` field in plain language.
- Add title, year, subject, department, and record-link filters.
- Include passage/page anchors where possible, not only PDF-level links.

### 4.7 Dashboard — `src/data/dashboard.js`

**What is good**

- Clear organisation into headline metrics, comparisons, timeline, narratives, and references.
- The data-driven chart design is reusable.

**Improvements**

- Replace generic group-level references with per-chart, per-value citations.
- Correct the 12-domain label.
- Fix the **Ambedkar overseas scholars** unit: the specification contains `unit: "cr"` and an ignored `unitOverride: "students"`, so the chart can show students as crores.
- Remove unused/inconsistently implemented specification properties or make the renderer support them.
- Treat fertility-rate direction neutrally; `lowerIsBetter` encodes a normative judgement that is not always appropriate.
- Clearly distinguish factual measurements from editorial narratives.
- Add update dates, denominators, base years, nominal/real-price context, and measurement definitions.

---

## 5. UX, accessibility, and trust improvements

### Search and navigation

- Index all advertised datasets or rename “Search everything.”
- Add deep links/permalinks for records, promises, GOs, sittings, and laws.
- Preserve search/filter state in the URL.
- Add result-type filters and highlighted matching evidence.

### Accessibility

- Add a skip-to-content link.
- Give overlays proper `role="dialog"`, `aria-modal`, accessible names, focus trapping, Escape handling, and focus restoration.
- Add visible or screen-reader labels to search and claim inputs; placeholders alone are insufficient.
- Add `aria-expanded` and `aria-controls` to the mobile menu button.
- Provide accessible textual data tables for charts.
- Announce copy success/failure via `aria-live` and add a clipboard fallback.
- Increase the contrast of muted text. Several dark and light theme combinations are below WCAG AA for normal text.
- Increase 9.5–11px chart and metadata text, especially on mobile.
- Respect reduced motion consistently; existing support is a positive foundation.

### Transparency and credibility

Add a visible About/Methodology area containing:

- publisher/maintainer identity;
- political affiliation or advocacy purpose;
- funding/sponsorship disclosure;
- exact coverage dates;
- assessment methodology;
- source inclusion/exclusion rules;
- corrections policy and public change log;
- known limitations;
- independent/contrary evidence policy.

For an advocacy-oriented site, transparency strengthens rather than weakens credibility.

### Sharing and presentation

- ShareCard currently copies text; it does not produce a shareable image despite the card-like UI. Either label it clearly or add image export.
- Shorten long record bodies in share output and link to the full evidence page.
- Avoid time-sensitive wording such as “not the present one”; use named governments and exact dates.
- Add print/PDF-friendly views.
- Consider Tamil UI/content alongside English for the intended audience.

---

## 6. Engineering and performance improvements

### Build and dependencies

- Clean production build: **passes after `npm ci`**.
- Current bundled `node_modules`: not portable across operating systems.
- Clean build output includes an approximately **870 kB minified JavaScript bundle** (about 247 kB gzip), triggering Vite’s >500 kB warning.
- Dependency audit reports one high and one moderate development-tool vulnerability in the current Vite/esbuild chain. Upgrade Vite deliberately and retest rather than applying a blind forced major upgrade.

### Recommended architecture work

- Lazy-load Manifesto, Legislation, Orders, and Debates sections.
- Split large datasets into on-demand JSON chunks by section/year.
- Do not eagerly include the unused 788-row Gazette module.
- Add an indexed search layer or Web Worker once all datasets enter global search.
- Add an Error Boundary.
- Add ESLint, formatting, Vitest/React Testing Library, data-schema validation, broken-link checks, and build checks in CI.
- Store generated data as validated JSON with schemas and provenance fields rather than large hand-edited JavaScript arrays.
- Add a supported Node version through `engines` and/or `.nvmrc`.
- Clarify “offline”: a static downloaded build works without a backend, but a hosted site is not guaranteed offline after first visit without a service worker/cache strategy.

---

## 7. Documentation inconsistencies

### `README.md`

Correct or add:

- 11 actual domains, not 12;
- exact scope of global search;
- distinction between 138 transcript links and 38 measured transcripts;
- distinction between 3,501 archive entries and 186 embedded selected GO links;
- current data cut-off and generated date;
- supported Node version and clean setup instructions;
- test/lint/data-generation commands;
- deployment steps;
- licensing and attribution;
- correction/versioning process;
- limitations and political/editorial disclosure;
- complete current project tree, including debates, legislation, orders, and Gazette modules.

### `docs/GAZETTE_SOURCES.md`

Resolve these internal inconsistencies:

- documentation says 289 weekly issues, while data metadata says 286;
- documentation lists Part I as 47 while data says 15;
- the documented part totals do not arithmetically equal 788;
- Part III-2 exists in data but is not consistently described;
- Part IV “48 extraordinary entries” and 222 legislative rows need an explanation of whether these are PDFs/issues versus extracted instruments;
- it claims the Gazette dataset backs the Orders UI, but the module is unused.

---

## 8. File-by-file artefact checklist

| # | Artefact | Assessment and room for improvement |
|---:|---|---|
| 1 | `.claude/launch.json` | Development convenience only. Do not include unless collaborators use Claude tooling; document it or exclude it from public release. |
| 2 | `BACKUP_DMK-achievements-2021-2026_20260718-110925.zip` | Data migration is intact, but a nested backup should not be shipped. Keep it in release storage/version control outside the deliverable. |
| 3 | `app/.gitignore` | Too minimal. Add environment files, logs, coverage, caches, temporary exports, OS metadata, and backup archives. |
| 4 | `app/README.md` | Clear introduction, but stale/inaccurate scope claims and missing reproducibility, methodology, limitation, and licensing details. |
| 5 | `app/docs/GAZETTE_SOURCES.md` | Useful provenance intent, but counts conflict internally and with the data; describes an integration that does not exist. |
| 6 | `app/index.html` | Good basic metadata; add canonical URL, social image, `og:url`, Twitter cards, structured data, author/publisher, and dynamic theme colour. |
| 7 | `app/package-lock.json` | Correct to retain for reproducibility. Refresh after tested dependency upgrades; do not bundle `node_modules`. |
| 8 | `app/package.json` | Small and understandable. Add `engines`, lint/test/validate scripts, and dependency upgrade plan. |
| 9 | `src/App.jsx` | Clear section composition. Add Error Boundary, route/deep-link strategy, and lazy imports to reduce initial bundle. |
| 10 | `src/components/Counter.jsx` | Simple and reusable. Verify number animation with assistive technology and reduced motion; expose final value accessibly. |
| 11 | `src/components/Nav.jsx` | Functional responsive navigation. Add mobile menu ARIA state/control and stronger keyboard/focus behaviour. |
| 12 | `src/components/RecordCard.jsx` | Good card abstraction. Add permalink, compact evidence block, status rationale, and better handling for very long descriptions. |
| 13 | `src/components/RisingSun.jsx` | Lightweight decorative component. Mark decorative SVG appropriately and ensure no unnecessary assistive-tech noise. |
| 14 | `src/components/SearchOverlay.jsx` | Visually useful but incomplete as a modal and not truly “everything” search. Add dialog/focus semantics, filters, and all datasets. |
| 15 | `src/components/ShareCard.jsx` | Convenient copying, but needs dialog accessibility, Escape/focus handling, clipboard fallback, live announcements, and accurate “share card” expectations. |
| 16 | `src/components/charts.jsx` | Reusable chart primitives. Fix ignored `unitOverride`, improve accessible data equivalents, label sizes, definitions, and estimated-value representation. |
| 17 | `src/components/layout.jsx` | Useful layout primitives. Inline styling is becoming difficult to maintain; migrate repeated patterns to CSS modules/tokens. |
| 18 | `src/data/dashboard.js` | Rich content, but provenance is too coarse and one unit is wrong. Add per-value citations and neutral analytical language. |
| 19 | `src/data/debates.js` | All 138 sitting links are represented, but quantitative coverage is only 38 sittings. Make incompleteness explicit and continue extraction. |
| 20 | `src/data/gazettegos.js` | Large, internally coherent dataset but unused and partly incomplete/corrupted. Integrate, validate, or exclude from bundle. |
| 21 | `src/data/govorders.js` | Aggregate totals reconcile; embedded detail is only 186 selected rows. Correct coverage claims and clean source text. |
| 22 | `src/data/legislation.js` | Valuable direct PDFs and coherent totals. Improve instrument extraction, split bundled titles, explain counting, and add filters. |
| 23 | `src/data/promises.js` | Structurally coherent. Requires substantial editorial cleanup and evidence-level auditability before presenting status counts as fact. |
| 24 | `src/data/records.js` | Strong core corpus and valid IDs. Improve page provenance, status granularity, duplicate title, long copy, and schema. |
| 25 | `src/lib/format.js` | Small utility layer. Add unit tests for compact numbers, currency, decimals, negative values, and missing input. |
| 26 | `src/lib/hooks.js` | Useful theme/scroll/responsive hooks. Add tests, avoid browser-only assumptions, and verify observer/focus behaviour across devices. |
| 27 | `src/lib/search.js` | Critical flaw: token-overlap search is used as a verdict engine. Redesign or restrict to neutral record lookup. |
| 28 | `src/lib/theme.js` | Consistent tokens and theme support. Raise muted-text contrast, support system preference, and synchronize browser theme metadata. |
| 29 | `src/main.jsx` | Appropriate minimal entry point. Add top-level Error Boundary and optional strict-mode/dev diagnostics. |
| 30 | `src/sections/Claim.jsx` | Strong presentation idea, but its certainty is unsupported by the matcher. Must abstain, show evidence, and avoid verdict wording. |
| 31 | `src/sections/Dashboard.jsx` | Concise data-driven rendering. Add source links adjacent to charts and explanations of definitions/coverage. |
| 32 | `src/sections/Debates.jsx` | Direct access is valuable. Clearly show measured-versus-unmeasured coverage, date range, and search/filter controls. |
| 33 | `src/sections/Explore.jsx` | Useful record browsing. Correct domain count; add URL-persisted filters, evidence completeness filter, and pagination/virtualisation if expanded. |
| 34 | `src/sections/Footer.jsx` | Clean but too sparse for a trust product. Add methodology, ownership, corrections, licence, version, and update date. |
| 35 | `src/sections/GovOrders.jsx` | Attractive overview, but overstates embedded/indexed coverage. Add full search/filtering or relabel as selected GOs. |
| 36 | `src/sections/Hero.jsx` | Effective messaging, but headline scope claims need precision and an “as of” date. Avoid unverifiable authority language. |
| 37 | `src/sections/Legislation.jsx` | Useful legal archive view. Rename/segment legal stages, add search, and clarify PDF bundles and `+N` counts. |
| 38 | `src/sections/Manifesto.jsx` | Strong visual tracker. Add transparent criteria, direct evidence per promise, assessment date, and navigable search results. |
| 39 | `src/sections/Method.jsx` | Good intention, but current assurance exceeds visible evidence. Add limitations, audit protocol, reviewer identity, and correction log. |
| 40 | `app/vite.config.js` | Minimal and functional. Add intentional chunk splitting, base-path/deployment documentation, and tested build configuration. |

---

## 9. Prioritised implementation sequence

### Phase 1 — credibility and correctness

1. Disable verdict-style claim checking or convert it to neutral lookup.
2. Correct all visible totals and coverage language.
3. Add “as of” dates and evidence-level links/pages.
4. Clean promise/GO encoding and editorial defects.
5. Reclassify mixed-status records.
6. Publish explicit methodology, limitations, ownership, and corrections policy.

### Phase 2 — engineering and accessibility

1. Produce clean source/deployment packages.
2. Add schema validation, tests, linting, CI, and link checks.
3. Fix modal/input/menu/chart accessibility and colour contrast.
4. Lazy-load sections and large datasets.
5. Integrate or remove the unused Gazette module.

### Phase 3 — stronger public product

1. Search across all datasets with deep links.
2. Complete Assembly transcript measurements.
3. Make the full GO dataset genuinely searchable.
4. Add Tamil localisation, printable evidence sheets, and share-image export.
5. Add independent-review/correction workflow and a public version history.

---

## 10. Final assessment

There is substantial room for improvement, but the work already done is valuable. The project should be positioned, in its current form, as a **well-built beta evidence explorer with selected official-source links**, not yet as a definitive fact-checker or a fully indexed government-record archive.

After the P0 fixes—especially removing false certainty from the claim checker, correcting coverage labels, and exposing claim-level provenance—the project can become a credible and unusually useful public archive.
