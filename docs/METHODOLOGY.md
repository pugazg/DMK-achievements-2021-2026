# Methodology

**Methodology version 1.0** · Last updated 21 July 2026 · Data cut-off 18 July 2026

How records get in, how they are graded, how statuses are assigned, and how
mistakes get fixed. Implemented in `src/lib/evidence.js`, `src/lib/search.js` and
`src/lib/publicMetrics.js`; enforced by `npm run validate` and `npm test`.

---

## 1. Evidence classification

Every achievement record carries a grade describing **the paper trail this
project holds** — never the underlying reality.

| Grade | Name | What it takes to earn it |
|---|---|---|
| **A** | Outcome verified | An independent official dataset or audit confirms the **outcome** — not the activity, the outcome. |
| **B** | Delivery verified | Expenditure records **and** beneficiary or completion records exist and are consistent. |
| **C** | Execution verified | Tender, contract, work-order or physical-progress documentation exists. |
| **D** | Sanctioned | A Government Order, administrative sanction or budget allocation exists. |
| **E** | Announced / government-reported | A government publication (souvenir, speech, press release) reports it. |
| **F** | Unsupported / disputed | Adequate support is absent, or reliable contrary evidence exists. |

The ladder is ordered by **distance from the government's own voice**. A and B
require someone other than the implementing department to have counted something.

### Current distribution

| Grade | Records |
|---|---|
| A / B / C | **0** |
| D | 62 (14.2%) |
| E | 376 (85.8%) |
| F | 0 |

## 2. The distinction that matters most

**A Government Order proves administrative action. It does not prove delivery.**

A GO is an instrument of sanction. It records that a government formally
authorised something and, usually, allocated money to it. That is real evidence
and it is why GO-backed records earn grade D.

It is **not** evidence of:

- **completion** — that the work was finished, or finished as specified;
- **beneficiary delivery** — that the money or service reached the people named;
- **outcome** — that the intended effect occurred.

The gap between sanction and delivery is precisely where public-spending
failures live. A scheme can be sanctioned, funded, tendered and still deliver
nothing. Promoting "sanctioned" to "execution verified" would erase the single
most informative distinction in the ladder, so **D is the ceiling for a GO**.

The same logic applies downward. An **announcement is not an achievement**.
Grade E means a government publication said this happened. It stays E
permanently until a sanction or delivery document is attached.

## 3. Automatic grading is capped at D

`gradeRecord()` assigns:

- **D** — a Government Order in `src/data/govorders.js` names the scheme, or a
  gazetted Act/Bill in `src/data/legislation.js` relates to it.
- **E** — otherwise; the record rests on the government's own summary volumes.

**No record is ever auto-graded A, B or C.** Those grades require document-level
evidence records this dataset does not contain, and awarding them from a keyword
or title match would be exactly the unearned confidence this model exists to
prevent. `npm run validate` asserts the invariant, so it cannot regress silently.

Every automatic grade carries `auto: true` and
`verificationStatus: "unverified"`.

### What is not built yet

The structured `EvidenceRecord[]` store is **designed and piloted, not populated
at scale**. A 25-subject pilot exists under the v2 schema
([`EVIDENCE_MODEL_V2.md`](EVIDENCE_MODEL_V2.md)) covering claim components,
grade-versus-confidence, non-gradeable claims and full document lifecycle. The
other 413 records still carry only the grade computed at render time from their
GO/Act link. Consequences for those records, stated plainly:

- **0%** of records carry a source authority, source URL, document title, or
  evidence stage.
- **247 of 438** carry no page reference and cannot be spot-checked.
- Nothing can move above D, because nothing cites an independent counter.

Queue: [`EVIDENCE_REMEDIATION_QUEUE.md`](EVIDENCE_REMEDIATION_QUEUE.md).

## 4. Source selection and inclusion

**Primary sources.** The Tamil Nadu government's own published record: the
2021–26 achievements souvenir and minister-by-minister volumes, the Economic
Survey of Tamil Nadu, the Government Gazette (Extraordinary), Government Orders
published on tn.gov.in, and the Assembly's published sitting index.

**Inclusion criteria.** A record is included when it:

1. appears in one of those published sources;
2. can be stated **without inventing** a figure, date, amount, beneficiary count
   or status; and
3. can be attributed to a named source volume.

A news report or social-media claim alone is not sufficient grounds for
inclusion.

**Exclusion.** Nothing has been excluded for being unflattering. But **nothing
adverse has been ingested either** — no audit findings, opposition material or
press criticism. That is a gap, not a filter, and it is the project's largest
editorial weakness. See
[`SOURCE_ACQUISITION_PLAN.md`](SOURCE_ACQUISITION_PLAN.md).

**Acquisition ethics.** `robots.txt`, CAPTCHA and terms of service are
respected; blocked sources go to a manual queue and no bypass is built. A source
counts as reviewed only if a document was actually fetched and hashed —
currently **0 of 108**.

## 5. Status classification

**Achievement records** carry the government's own status framing (`done`,
ongoing, planned). Two rules constrain how that is presented:

- Where a record's own detail text mixes delivered components with planned or
  ongoing ones, it is flagged `mixedStatus: true` (6 records). The interface must
  not present those as wholly complete.
- Where a record says "done" but no sanction or delivery document is linked, the
  grade stays E. **192 records are in this position.**

**Manifesto promises** carry one of five statuses — Fulfilled, Modified, In
progress, Stalled, Not fulfilled. **These are not this project's assessment.**
They mirror the external *Pudhiyavan DMK Manifesto 2021 Tracker* as published on
18 July 2026, matched by promise number, and they inherit that tracker's
methodology and any errors.

Measured against this project's own evidence, of the 400 promises the tracker
marks fulfilled: **0** are outcome-verified, **79** have a linked GO or Act,
**163** have only a government-reported record, and **158** have nothing linked
at all. Full detail:
[`MANIFESTO_ASSESSMENT_METHODOLOGY.md`](MANIFESTO_ASSESSMENT_METHODOLOGY.md).

## 6. Claim lookup

The claim tool is **retrieval, not verification**. It returns records that may
relate to a pasted claim and shows which terms matched. It never returns a
verdict — there is no boolean, score or confidence value in its output, and a
test asserts none can be reintroduced.

Four outcomes:

| Outcome | Meaning |
|---|---|
| `related_records` | Strong topical overlap. Still **not** verification. |
| `insufficient_match` | Related records found, but insufficient evidence for assessment. |
| `language_unsupported` | The query is mainly Tamil and the corpus is indexed in English. A coverage limit — **not** evidence about the claim. |
| `not_found` | No meaningful term matched any record. Means *not in this dataset*, never *false*. |

To reach `related_records` the top match must have ≥60% term coverage, ≥2
matched terms, and at least one distinctive term. Negated claims
("cancelled", "stopped", "banned") are flagged, because the presence or absence
of a record cannot confirm or deny a negative.

Limits: matching is literal, English-first, and cannot detect that a claim's
number or date is wrong. Full detail:
[`CLAIM_SEARCH_LIMITATIONS.md`](CLAIM_SEARCH_LIMITATIONS.md).

## 7. Data integrity rules

1. **Never invent** a figure, URL, page, date, amount, beneficiary count or status.
2. **Never silently rewrite** a record. Every applied change is logged with its
   record ID in [`CHANGELOG.md`](../CHANGELOG.md) and `docs/migration_*.json`.
3. **Record IDs are stable** and never reused or renumbered.
4. **Quoted source text is preserved verbatim**, OCR defects included, so it can
   be matched against the original PDF. 55 known defects are flagged, not fixed.
5. **Displayed numbers are derived, not written.** Every public count comes from
   `src/lib/publicMetrics.js` and is reconciled by `npm run validate`; a test
   asserts that a tampered count fails.
6. **Catalogue totals are never presented as held content** (3,501 catalogued GOs
   vs 186 embedded; 138 sitting links vs 38 measured).

## 8. Corrections

See [`CORRECTIONS.md`](CORRECTIONS.md) for how to report an error and what
happens next.

## 9. Versioning

Three versions move independently:

| Version | Current | Changes when |
|---|---|---|
| Release | 2.0.0 | Application code changes. |
| Data | 2026-07-18 | The record cut-off moves. |
| Methodology | **1.0** | These rules change. |

The methodology version is separate because changing it can change what an
existing record *means* without any data changing. A bump requires a documented
reason here.

### History

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-21 | First formal statement. Consolidates the A–F evidence ladder with the D cap, the neutral claim-lookup semantics (including the Tamil coverage outcome), source selection and inclusion criteria, status classification, the data-integrity rules, and the correction process. |
