# Post-Change Data Reconciliation

**Generated:** 2026-07-21 by `scripts/post_change_reconciliation.mjs`.
**Do not hand-edit** — re-run the script.

Every number below is **recomputed from the source data at run time** and compared
against the value the application declares. This document exists to answer one
question: *do the public numbers still equal the data?*

## Result

| | |
|---|---|
| Measures reconciled | **29** |
| Mismatches | **0** |
| Covered by `npm run validate` | 18 |
| **Not** covered by validation | 11 |

**No mismatch.** Every declared public number equals the number derived from the dataset.

## Full reconciliation

`Guarded` = `npm run validate` fails if the derived and declared values diverge.

| Measure | Derived | Declared | Match | Guarded | Note |
|---|---|---|---|---|---|
| Achievement records | 438 | 438 | ✅ | yes | shown in hero strip; reconciled |
| — unique IDs | 438 | 438 | ✅ | yes |  |
| — without page reference | 247 | 247 | ✅ | **no** | disclosed, not guarded |
| — flagged mixedStatus | 6 | 6 | ✅ | **no** |  |
| Domains (excluding 'All') | 11 | 11 | ✅ | yes | shown in hero strip; was mislabelled 12 pre-change |
| Manifesto promises | 505 | 505 | ✅ | yes | shown in hero strip; reconciled |
| — status = fulfilled | 400 | 400 | ✅ | yes | external tracker's assessment |
| — unique promise numbers | 505 | 505 | ✅ | yes |  |
| Assembly sitting links | 138 | 138 | ✅ | yes |  |
| — measured sittings | 38 | 38 | ✅ | yes | 100 remain unmeasured |
| — sum of measured pages | 12720 | 12720 | ✅ | **no** |  |
| — sum of measured words | 2173509 | 2173509 | ✅ | **no** |  |
| GO archive catalogued | 3501 | 3501 | ✅ | yes | catalogue count, not held here |
| GO records embedded | 186 | 186 | ✅ | yes |  |
| GO departments | 36 | 36 | ✅ | yes | was mislabelled 38 pre-change |
| Gazette GO entries | 788 | 788 | ✅ | **no** |  |
| — weekly issues | 286 | 286 | ✅ | **no** |  |
| Legislative records | 222 | 222 | ✅ | yes |  |
| — Acts | 119 | 119 | ✅ | yes |  |
| — Bills | 95 | 95 | ✅ | yes |  |
| — Ordinances | 8 | 8 | ✅ | yes |  |
| — stages sum to total | 222 | 222 | ✅ | yes |  |
| Promises with GO links | 38 | 38 | ✅ | yes |  |
| Promise→GO link entries | 41 | 41 | ✅ | **no** |  |
| Evidence: grade D | 62 | 62 | ✅ | **no** | derived at render time |
| Evidence: grade E | 376 | 376 | ✅ | **no** | derived at render time |
| Evidence: grades above D | 0 | 0 | ✅ | yes | hard invariant |
| Source registry entries | 108 | 108 | ✅ | **no** |  |
| Source registry fetched | 0 | 0 | ✅ | **no** | nothing ingested |

## Hero strip — the counters a reader sees first

The hero counter strip (`HERO_STRIP` in `src/data/dashboard.js`) previously held
literal numbers that no gate read: the verification audit changed "438 verified
records" to 999 and `npm run validate`, `npm test` and `npm run a11y` all still
passed.

Each counter now takes its value from `DERIVED` in `src/lib/publicMetrics.js` and
names the metric it claims to show. `scripts/validate.mjs` reconciles them on every
run, and `test/metrics.test.mjs` asserts that tampering with any one of them fails.

| Label | Metric | Declared | Derived | Match |
|---|---|---|---|---|
| government-recorded achievements | achievements | 438 | 438 | ✅ |
| manifesto promises tracked | promises | 505 | 505 | ✅ |
| domains of governance | domains | 11 | 11 | ✅ |
| figures invented | — (editorial) | 0 | n/a | not a dataset count |

Reconciler result: **3 counters checked, 0 wrong**; editorial entries not checked: figures invented.

## Numbers that are counts of *catalogue*, not of held content

These are the figures the original audit found misleading. They now appear with
both halves stated, but the distinction is worth restating:

| Figure | Meaning |
|---|---|
| 3501 Government Orders | **catalogued in the portal archive** — 186 are embedded here with detail |
| 138 Assembly sittings | **links to official pages** — 38 have measured page/word counts |
| 286 gazette issues | source of the 788 embedded GO/notification entries |
| 108 sources | **catalogued and reachability-checked** — 0 ingested |

## Evidence grade distribution

| Grade | Meaning | Records |
|---|---|---|
| A / B / C | independently verified | **0** |
| D | sanction document exists | 62 |
| E | government-reported only | 376 |

14.2% of records have a linked
Government Order or Act; 85.8%
rest solely on the government's own published summary.
