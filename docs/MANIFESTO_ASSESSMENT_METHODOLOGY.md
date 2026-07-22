# Manifesto Assessment Methodology

**Applies to:** the Manifesto section (`src/sections/Manifesto.jsx`, `src/data/promises.js`).
**Data as published:** 18 July 2026.

---

## The essential disclosure

**This project did not assess these promises.** The five statuses and the per-promise notes
mirror an external tracker — the *Pudhiyavan DMK Manifesto 2021 Tracker* — matched to this
dataset by promise number. The headline "400 of 505 fulfilled" is **that tracker's finding,
reproduced**, and it inherits that tracker's methodology, judgement calls, and any errors.

This is stated in the interface itself, in a collapsible note directly above the counts, so
that a reader who never opens this file still sees it.

## What the dataset contains

| Field | Meaning |
|---|---|
| `num` | Promise number in the 2021 manifesto — the join key to the external tracker. |
| `theme` | One of 15 thematic groups. |
| `status` | The external tracker's assessment (see below). |
| `text` | A **condensed English summary** of the promise — not the manifesto's original wording. |
| `note` | The tracker's detail note, transcribed. |
| `records` | Achievement records in this dataset whose subject matches, for cross-reading. |

### Status distribution (505 promises)

| Status | Count |
|---|---|
| Fulfilled | 400 |
| In progress | 61 |
| Modified | 21 |
| Stalled | 14 |
| Not fulfilled | 9 |

## Limitations a reader must carry

1. **Not independently verified.** No status in this dataset has been checked against
   primary documents by this project. A promise marked "fulfilled" means the external
   tracker judged it fulfilled.
2. **"Fulfilled" is a contested judgement, not a measurement.** Manifesto promises are
   frequently open-ended ("strengthen", "expand", "fight to restore"). Deciding when such a
   promise is discharged is interpretive. Different assessors reach different totals from
   the same record, and the direction of any bias depends on who is assessing.
3. **The promise text is a summary, not the manifesto.** Condensation loses qualifiers, and
   qualifiers are where promises are won and lost. Read the original manifesto for the
   binding wording; the party's published manifesto is listed in the source registry
   (`eci-manifesto`, `dmk-manifesto`).
4. **Partial fulfilment is flattened.** A promise delivered in one district and not another,
   or announced but not funded, still resolves to a single status.
5. **No date of fulfilment.** The dataset does not record *when* a promise moved to
   fulfilled, so trend or pace claims cannot be made from it.
6. **Linked records are subject-matched, not evidential.** The `records` array points at
   achievement records on the same topic to make cross-reading easy. A linked record does
   not substantiate the status — those records are themselves mostly grade E
   (government-reported); see `docs/EVIDENCE_MODEL.md`.
7. **Promise→GO links are sparse.** 41 links across 38 promises connect a promise to a
   Government Order. That is under 8% of the manifesto, and the absence of a link means
   nothing has been located, not that nothing exists.

## Corrections applied to this dataset

Seven promise notes had their rupee sign destroyed in transcoding (a UTF-8 `₹` read as
Windows-1252, or lost entirely as `?`). These were repaired; the character fix is logged
per-promise in `docs/migration_currency.json`. **No promise text, status, or figure was
otherwise altered.** See `docs/DATA_QUALITY_REPORT.md`.

## What would make this stronger

Independent assessment would require, per promise: the original manifesto wording; a
defined fulfilment criterion fixed *before* looking at the evidence; and at least one
primary document (GO, budget line, or audit finding) per judgement, recorded with the
evidence model's stage and authority fields. That work is not done and is not scheduled
here. Until it is, this section should be read as **a reproduction of an external
tracker's assessment, presented transparently**, and cited as such.
