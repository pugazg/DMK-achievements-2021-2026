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

1. **Finish Phase 6/12 registry docs** (in progress when handover was requested):
   - Patch `sourceRegistry.json` entries with `http_status`/`accessibility`/`last_checked_at` from `scripts/source_verification.tsv`.
   - Blocked/unreachable to put in a manual queue: `403` = eci-manifesto, adb-tnhousing, eci-results; `000` (timeout/JS/DNS) = most DES pages, aishe-dash, paimana(×2), elcot, tnrdc(×2), egazette. Re-check DES with longer timeout / trailing slash; several are JS/CAPTCHA (record as manual, don't bypass).
2. **Phase 12 documentation** (create these; brief lists exact names):
   `docs/ARTEFACT_AUDIT_REMEDIATION.md`, `docs/SOURCE_COVERAGE_MATRIX.md`, `docs/EVIDENCE_MODEL.md`, `docs/MANIFESTO_ASSESSMENT_METHODOLOGY.md`, `docs/CLAIM_SEARCH_LIMITATIONS.md`, `docs/DATA_QUALITY_REPORT.md` (human-readable wrapper over the JSON), `docs/ACCESSIBILITY_REPORT.md`, `docs/RELEASE_CHECKLIST.md`, `docs/SOURCE_ACQUISITION_PLAN.md`, `docs/RTI_GAP_REGISTER.md`, `CHANGELOG.md`. (The code already references `CLAIM_SEARCH_LIMITATIONS.md`, `EVIDENCE_MODEL.md`, `MANIFESTO_ASSESSMENT_METHODOLOGY.md`, `GAZETTE_SOURCES.md` — write them.)
3. **Phase 2 provenance model (deeper):** optional structured `EvidenceRecord[]` store + a provenance display on records (source title/authority/date/page/stage/assessment-date). Currently only the grade chip exists. The remediation-queue for the 247 page-less records should be emitted as `docs/remediation_queue.json`.
4. **README update:** correct 12→11 domains, search scope, 138-vs-38, 3,501-vs-186, add cut-off date, Node version, test/validate commands, methodology/limitations/ownership disclosure.
5. **Packaging scripts:** add `source-package` / `deploy-package` npm scripts (Phase 11).
6. **Optional accessibility:** textual data-table alternative for charts; automated a11y check.
7. **Update the reviewer README table** in `app/README.md` (still says "Fact-check … who actually started it" and "12 domains").
8. **Final deliverables report** (executive summary, file-change report, dataset reconciliation, audit remediation table, source coverage report, test results, remaining manual-review queue, release recommendation). Recommendation so far: **Public beta evidence explorer** — NOT a fact-checking platform (claim logic is neutral retrieval by design).
9. **Push `audit-remediation` + open PR** when a coherent chunk is ready.

### Deferred / large source-acquisition (Phase 6 priorities 1–14)
Architecture + registry + pilot are done. Full ingestion (budget PDFs, policy notes, CAG, Assembly committee reports, press releases, tenders, statistics, Union cross-checks, local bodies, PSUs, courts, RTI) is a **resumable queue** — do NOT claim any source reviewed unless actually fetched. Respect robots/CAPTCHA/ToS; put blocked ones in the manual queue.

---

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
