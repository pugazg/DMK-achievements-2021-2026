# Evidence Model

**Status:** in force since the audit remediation (July 2026).
**Implementation:** `src/lib/evidence.js`; enforced by `scripts/validate.mjs`.

This document defines what a piece of evidence means in this project, and — more
importantly — what a grade does **not** claim.

---

## 1. The problem this model solves

The 438 achievement records in `src/data/records.js` are transcribed from the Tamil Nadu
government's own published summary material (the 2021–26 achievements souvenir and the
minister-by-minister volumes), supplemented by the Economic Survey. That material is a
legitimate primary source for **what the government says it did**. It is not evidence that
the thing was done, delivered, or produced the stated outcome.

Before remediation the interface presented these records as "verified". They were not
verified; they were *transcribed accurately from an official publication*. The evidence
model exists to make that distinction visible on every single record instead of leaving
it to a disclaimer nobody reads.

## 2. The grade ladder

| Grade | Name | What it takes to earn it |
|---|---|---|
| **A** | Outcome verified | An independent official dataset or audit confirms the outcome — not the activity, the outcome. |
| **B** | Delivery verified | Expenditure records *plus* beneficiary or completion records are available and consistent. |
| **C** | Execution verified | Tender, contract, work-order or physical-progress documentation exists. |
| **D** | Sanctioned | A Government Order, administrative sanction, or budget allocation exists. |
| **E** | Announced / government-reported | A government publication (souvenir, speech, press release) reports it. |
| **F** | Unsupported | Adequate support is absent, or reliable contrary evidence exists. |

The ladder is deliberately ordered by **distance from the government's own voice**.
A and B require someone other than the implementing department to have counted something.

## 3. Auto-grading is capped at D

`gradeRecord()` assigns:

- **D** if a Government Order in `src/data/govorders.js` names the record's scheme, or a
  gazetted Act/Bill in `src/data/legislation.js` relates to it. A sanction demonstrably exists.
- **E** otherwise — the record rests on the government's own summary publication.

**No record is ever auto-graded A, B, or C.** Those grades require document-level evidence
records that this dataset does not yet contain, and awarding them from keyword matching
would be exactly the kind of unearned confidence the audit flagged. `scripts/validate.mjs`
asserts this invariant (`no record auto-graded above D`) so it cannot regress silently.

Every automatic grade carries `auto: true` and `verificationStatus: "unverified"`. A grade
is a statement about *the paper trail this project holds*, never about the underlying reality.

### Why D and not C for GO-backed records

A Government Order proves that money or authority was formally sanctioned. It proves
nothing about tendering, execution, or completion — the gap between sanction and delivery
is precisely where public-spending failures live. Promoting sanction to "execution
verified" would erase the most informative distinction in the ladder.

## 4. Stages and authorities

`EVIDENCE_STAGES` (16 values) tracks where in the delivery lifecycle a document sits:

```
manifesto → announcement → administrative_sanction → budget_allocation →
revised_allocation → tender → contract_award → work_order → expenditure →
physical_progress → completion → beneficiary_delivery → outcome →
independent_audit → court_or_regulatory_record → context_only
```

`SOURCE_AUTHORITIES` (9 values) tracks who is speaking:

```
primary_official · independent_official · legislative · judicial · audit ·
party_source · news_source · social_media · other
```

The distinction between `primary_official` (the department claiming the achievement) and
`independent_official` (a different official body counting the same thing) is what makes
grades A and B reachable at all.

## 5. What is not yet built

The structured `EvidenceRecord[]` store — one row per document, with source title,
issuing authority, document date, page/paragraph reference, stage, authority class, and
assessment date — is **designed but not populated**. Today the model surfaces as a grade
chip with a rationale tooltip on each record card, backed by the derived GO/legislation
links rather than by per-document rows.

Consequences to be honest about:

- 247 of the 438 records carry `page: null` — the transcription does not record which page
  of the souvenir the claim came from. Those cannot be spot-checked by a reader today.
- Nothing in the dataset can currently move above D, because nothing in the dataset cites
  an independent counter.

The remediation queue for the page-less records is `docs/remediation_queue.json`
(`npm run remediation-queue`). The design of the evidence store and the wider gaps are
tracked in `docs/SOURCE_ACQUISITION_PLAN.md` and `docs/RTI_GAP_REGISTER.md`.

## 6. Rules for anyone extending this

1. Never assign A/B/C from a keyword or title match. Those grades require a named document.
2. A government source describing its own performance is `primary_official`, whatever its
   format — a press release and a souvenir chapter are the same authority class.
3. An announcement is not an achievement. Announcements are grade E, permanently, until a
   sanction or delivery document is attached.
4. If a grade changes, log it. Grades are user-visible claims about evidence and must have
   the same audit trail as the data itself (`CHANGELOG.md`).
5. When in doubt, grade lower. The cost of understating evidence is a reader who checks;
   the cost of overstating it is a reader who is misled.
