# Project Handover — DMK Achievements 2021–2026 Evidence Explorer

**Handover date:** 21 July 2026
**Purpose:** Resume the audit-remediation work in a fresh chat without losing context.
**Read this first, then `docs/DMK_Achievements_Artefact_Audit_2026-07-19.md` (the reviewer's audit) and the remediation brief.**

---

## 1. What this project is

An interactive, source-linked React/Vite explorer of the Tamil Nadu (DMK) government's
2021–2026 record. It started as a promotional dashboard and is being converted into a
**transparent, source-driven public evidence explorer** per a reviewer's audit + a 12-phase
remediation brief + a source link-pack.

- **GitHub repo:** `pugazg/DMK-achievements-2021-2026` (authenticated via `gh`, user `pugazg`).
- **Local working copy:** `~/Documents/DMK Achievements 2021-2026/app` (the app lives in `app/`).
- **Node:** v22 present; `engines.node >=20`, `.nvmrc` = `>=20`.
- **Build:** `npm ci` then `npm run build` (Vite). Zero runtime deps beyond React; charts are hand-rolled inline SVG; fully offline/static.

### Key commands
```
cd "~/Documents/DMK Achievements 2021-2026/app"
npm ci
npm run build       # vite production build
npm run test        # node --test  (adversarial claim-lookup tests)
npm run validate    # scripts/validate.mjs — 19 dataset/label integrity checks
npm run a11y        # scripts/check_contrast.mjs — WCAG AA contrast, both themes
npm run docs        # regenerate the three generated docs from the data
npm run baseline    # regenerate docs/BASELINE_MANIFEST.json (DO NOT overwrite the committed pre-change baseline casually)
```

---

## 2. Git state (IMPORTANT)

- **Active branch:** `audit-remediation` (branched from `origin/main`).
- **Last commit:** `0ff9ad0` — "Audit remediation P0-P2 + P4/P7/P9/P10…" (all P0-P2 work committed, working tree clean at handover).
- **`main`** already has PRs #1–#6 merged (report expansion, Debates, Laws, Orders, Gazette 2nd source, manifesto→GO links).
- **`audit-remediation` is NOT yet pushed / no PR opened.** Next chat should: continue remaining phases → push branch → open PR → (user merges).
- Pre-change backups exist: branch `backup-pre-expansion-20260718` + a local zip in the working dir.

### Branch hygiene note
Earlier feature work used per-feature branches merged into `main`. There is also a local
`debates-content` branch holding the enriched debates data (38 measured sittings) + earlier
WIP; the audit branch already pulled `src/data/debates.js` + `src/sections/Debates.jsx` from it.

---

## 3. Dataset facts (verified from source — use these, they're in tests)

| Dataset | Count | Notes |
|---|---|---|
| Achievement records (`src/data/records.js`) | **438** | unique IDs; 247 have `page: null`; 6 flagged `mixedStatus:true` |
| Domains (`CATEGORIES`) | **11** | + an "All" filter (do NOT count as a 12th domain) |
| Manifesto promises (`src/data/promises.js`) | **505** | 400 status=fulfilled; statuses MIRROR the external Pudhiyavan tracker |
| Assembly sittings (`src/data/debates.js`) | **138 links / 38 measured** | pages=12,720 & words=2.17M are for the **38 measured only** |
| Government Orders (`src/data/govorders.js`) | **3,501 archive / 186 embedded** | `GO_META.byDept` = **36** departments |
| Gazette GOs (`src/data/gazettegos.js`) | **788** | 286 weekly issues; ~340KB (lazy-loaded via GovOrders) |
| Legislation (`src/data/legislation.js`) | **222** | 119 Acts, 95 Bills, 8 Ordinances; 164 unique PDFs |
| Promise→GO links (`src/data/promiseGoLinks.js`) | 41 links / 38 promises | |

Baseline snapshot: `docs/BASELINE_MANIFEST.json`.

---

## 4. What has been DONE on `audit-remediation` (committed in 0ff9ad0)

- **Phase 0 baseline:** `scripts/baseline.mjs` → `docs/BASELINE_MANIFEST.json`; clean `npm ci` + build verified.
- **Phase 1 labels (all corrected & test-guarded):** 12→11 domains (derived); 38→36 GO depts (derived); GO stats now separate "3,501 catalogued" vs "186 embedded"; Debates split "138 links / 38 measured"; Legislation split Acts/Bills/Ordinances by legal stage ("Legislation: introduced and enacted"); Nav "Fact-check"→"Claim lookup"; search title "Search everything"→"Search records & promises"; Hero "verified line by line"→"sourced line by line" + "as of 18 Jul 2026"; Ambedkar chart unit fixed (students not cr); fertility chart made `neutral` (no good/bad colour).
- **Phase 3 Claim rewrite (KEY):** `src/lib/search.js` `lookupClaim()` + `src/sections/Claim.jsx`. Neutral retrieval only — abstains (`not_found`/`insufficient_match`) on weak matches, flags negation ("cancelled/banned/stopped/…"), requires ≥60% coverage + ≥2 matched terms + one distinctive (≥6-char) term, NEVER returns a verdict. Tests: `test/claim.test.mjs` (8 adversarial cases, all pass).
- **Phase 4 evidence grades:** `src/lib/evidence.js` — A–F ladder, conservative auto-grade (≤D only; E default for souvenir-sourced, D if a GO/Act names the scheme). Grade chip on every `RecordCard` with rationale tooltip. Validation asserts no record graded A/B/C.
- **Phase 5 manifesto disclosure:** collapsible "How these statuses were assessed" note in `Manifesto.jsx` (statuses = external tracker's, not this project's verification; texts are condensed English summaries).
- **Phase 7 data quality:** `scripts/data_quality_scan.mjs` → `docs/data_quality_report.json` (70 issues). Applied + logged: 7 currency-mojibake promise fixes (`docs/migration_currency.json`), duplicate "Rural school infrastructure" titles disambiguated + 6 compound-done records flagged `mixedStatus` (`docs/migration_records.json`). Original wording preserved; IDs unchanged.
- **Phase 9 accessibility:** `useModalA11y` hook (focus trap + Esc + focus restore); dialog role/aria-modal on SearchOverlay & ShareCard; skip-to-content link; mobile menu `aria-expanded`/`aria-controls`; raised muted-text contrast (dark + light); ShareCard verdict language removed ("VERIFIED RECORD"→"FROM THE STATE RECORD", copy line now says "government-reported; not independently audited"); About/Methodology section added (Footer).
- **Phase 10 performance:** React.lazy for Legislation/GovOrders/Debates + `ErrorBoundary`. **Main bundle 1,179KB → 840KB** (243KB gzip); GovOrders (with 340KB gazette data) split to a 291KB on-demand chunk.
- **Phase 6 source registry (partial):** `src/data/sourceRegistry.json` (108 sources from the link pack). Verifier `scripts/verify_sources.sh` → `scripts/source_verification.tsv`: **92/108 reachable (HTTP 200)**, 3×403, 13×000. Pilot ingest `scripts/pilot_ingest.sh` → `sources/pilot/manifest.tsv`: **11/11 sample docs fetched with sha256** (3 Economic-Survey PDFs + finance/CAG/DMK/press/assembly/dept index pages).
- **Phase 11 packaging:** `.gitignore`, `.npmignore`, `.nvmrc`, `engines`, npm scripts (test/validate/baseline).

**Gate status at handover:** `npm run test` 8/8 pass · `npm run validate` 19/19 pass · `npm run build` passes (840KB main).

---

## 5. What REMAINS (next-chat TODO, in priority order)

**Updated 21 Jul 2026.** Commits since the original handover: `966696d`, `f7a2228`,
`2fb5c94`, `c58cdc1`, `06a1b4f` — all on `audit-remediation`, tree clean, **not yet pushed**.

### Done since handover

1. ~~Phase 6/12 registry patch~~ — **done**. Registry now carries `http_status` /
   `accessibility` / `automation_allowed` / `acquisition_mode` / `last_checked_at`.
   92 reachable · 3 blocked (403) · 6 server_error · 7 unreachable · 40 in the manual
   queue (`docs/SOURCE_MANUAL_QUEUE.json`). The 6 DES pages moved from timeout to HTTP
   500 on a 60s re-check — host up, application erroring; worth re-checking periodically.
2. ~~Phase 12 documentation~~ — **done**. All 11 documents written. Three are generated
   (`npm run docs`) so they cannot drift: `SOURCE_COVERAGE_MATRIX.md`,
   `DATA_QUALITY_REPORT.md`, `remediation_queue.json`.
3. ~~Phase 2 remediation queue~~ — **done**. `docs/remediation_queue.json`, 247 records,
   prioritised 27 (document-backed) / 5 (mixed-status) / 215 (souvenir only).
   The structured `EvidenceRecord[]` store is still designed-not-built.
4. ~~README update~~ — **done**. Rewritten with 11 domains, catalogue-vs-embedded totals,
   Node version, all gate commands, Limitations, corrections policy.
5. ~~Phase 9 accessibility~~ — **went well beyond the audit's finding.** A full in-browser
   audit found **76 contrast failures on dark, 78 on light**. Nearly all were one systemic
   defect: identity hues (category / grade / origin / kind / status) used verbatim as text
   in both themes. The grade chip on all 438 cards sat at 2.25:1 in light mode. Fixed with
   `textSafe()` in `src/lib/theme.js`. **Now 0/0**, guarded by `npm run a11y`.

### Still open

1. **Packaging scripts** — `source-package` / `deploy-package` (Phase 11).
2. **Final deliverables report** — executive summary, file-change report, dataset
   reconciliation, source coverage, test results, manual-review queue, release
   recommendation. Recommendation stands: **public beta evidence explorer**, not a
   fact-checking platform.
3. **Push `audit-remediation` + open PR.** Not done — deliberately left for the user.
4. **Publisher identity, political affiliation, funding disclosure, licensing.** Unwritten,
   and a genuine launch blocker for a politically-charged artefact. Flagged in the README
   and `docs/RELEASE_CHECKLIST.md`.
5. **Chart data-table alternatives**, real AT testing, `lang="ta"` tagging, permalinks /
   URL state, print views, per-value chart citations. All logged as Open in
   `docs/ARTEFACT_AUDIT_REMEDIATION.md`.

### IMPORTANT compliance finding (new)

`robots.txt` was read for all 60 origins. **`assembly.tn.gov.in` and `tn.data.gov.in`
publish a blanket `User-agent: * / Disallow: /`.** The outstanding work to measure the
remaining 100 of 138 Assembly sittings therefore **must not be done by crawling** — the
resumable-queue plan in the original handover is not available. Needs a manual process or
permission from the Assembly. The 138 outbound links are unaffected; linking is not
crawling. A further 30 sources serve an HTML soft-404 at `/robots.txt`, recorded as
**unknown**, never as permission.

### Correction to the original handover

"11/11 pilot docs fetched" counted the manifest header row. It is **10 documents**.
Separately: the data-quality scan flagged 8 currency-encoding defects but only 7 had been
repaired — promise **#162** was skipped because the unit pattern was case-sensitive and
that note reads "?169 Cr". Fixed and logged (`migration_currency.json`, changeCount 8).

### Deferred / large source-acquisition (Phase 6 priorities 1-14)

Architecture + registry + pilot are done; **0 of 108 registry sources ingested**. Full
ingestion remains a resumable queue — do NOT claim any source reviewed unless actually
fetched and hashed. Respect robots/CAPTCHA/ToS; blocked ones go to the manual queue.
See `docs/SOURCE_ACQUISITION_PLAN.md`.

## 6. Non-negotiable rules (from the brief — keep enforcing)

- Never invent evidence, URLs, pages, dates, amounts, beneficiary counts, or statuses.
- Don't convert an announcement into a completed achievement. Government souvenir = "announced/gov-reported" (grade E), not verified outcome.
- Don't silently rewrite records or manifesto wording; log every correction (migration files + CHANGELOG).
- Preserve stable record IDs (any migration needs a mapping file).
- Keep uncertain classifications explicitly uncertain; no political verdicts from keyword overlap.
- UI must not imply more coverage than the embedded data holds.
- Don't call it a "fact-checking platform" — the claim tool is neutral retrieval.

---

## 7. Working artifacts & paths

- **Scripts:** `app/scripts/` — baseline, data_quality_scan, apply_currency_fixes, apply_record_flags, source_registry_seed, verify_sources, pilot_ingest, validate.
- **Generated docs/JSON:** `app/docs/BASELINE_MANIFEST.json`, `data_quality_report.json`, `migration_currency.json`, `migration_records.json`, `GAZETTE_SOURCES.md`.
- **Source data:** `app/src/data/sourceRegistry.json`, `app/scripts/source_verification.tsv`, `app/sources/pilot/manifest.tsv` (+ downloaded pilot files, gitignored).
- **Scratchpad (this session, ephemeral — may be gone next chat):** `/private/tmp/claude-501/.../03c8cba6-.../scratchpad`. The debates OCR crawl `txt/` from earlier sessions was NOT found at handover (assume the 38-sitting measured data already baked into `debates.js` is the source of truth; the crawl to measure the remaining 100 is a resumable queue).
- **Reviewer inputs:** `~/Documents/DMK_Achievements_Artefact_Audit_2026-07-19.md` (audit) + the remediation brief + link-pack were pasted into chat.

---

## 8. Suggested first message for the new chat

> "Continue the DMK Achievements audit-remediation on branch `audit-remediation` in
> `~/Documents/DMK Achievements 2021-2026/app`. Read `docs/PROJECT_HANDOVER.md` first.
> Resume at Section 5 TODO: (1) patch source registry with verification results,
> (2) write the Phase-12 docs, (3) update README, then push the branch and open a PR.
> Keep the non-negotiable rules. Run `npm run test`, `npm run validate`, `npm run build`
> before committing."
