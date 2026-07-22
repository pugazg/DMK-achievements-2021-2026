# Evidence Model v2

**Schema version 2.0** (Phase C0.5 hardening) · 21 July 2026
**Implementation:** `src/lib/evidenceRecord.js` · **Corpus:** `src/data/evidencePilot.js`
**Enforced by:** `test/evidencePilot.test.mjs` (39 tests) and `npm run validate` (8 checks)
**Supersedes:** the informal model in [`EVIDENCE_MODEL.md`](EVIDENCE_MODEL.md), which
remains the plain-language description of the A–F ladder.

---

## Why v2 exists

The C0 pilot ([`EVIDENCE_PILOT_REPORT.md`](EVIDENCE_PILOT_REPORT.md)) graded 25 real
subjects and found five structural problems. v2 fixes each one, and the fixes are
enforced rather than documented:

| C0 finding | v2 change |
|---|---|
| A linked document often does not evidence the claim it is attached to | **Mandatory relationship note** (§2) |
| Most subjects are compound; one grade per compound claim flattens them | **Claim components** (§3) |
| Some promises have no fulfilment criterion at all | **NG grade** (§4) |
| "Sanctioned, GO in hand" and "sanctioned, inferred" were both just D | **Confidence separate from grade** (§5) |
| A fallback parser produced convincing garbage rather than failing | **Document lifecycle** (§6) |

**The migration changed real outcomes.** Four of 25 subjects were demoted from D to E
once components existed, because in each case the D-grade component was not what the
claim was actually asserting. Three promises moved from E to NG. See §9.

## 1. Schema overview

```
EvidenceRecord
├── id, subject_type, subject_id, domain, claim
├── sources: Source[]              ← every one carries a relationship note
├── components: ClaimComponent[]   ← the claim, split into testable parts
├── assessment
│   ├── grade                A|B|C|D|E|F|NG
│   ├── confidence           high|medium|low
│   ├── rationale            why this grade
│   ├── confidence_rationale why this confidence (must differ from rationale)
│   ├── limitations[]        what this assessment cannot tell you
│   ├── ng_reason            required iff grade === "NG"
│   └── verification_status  "unverified" | "manually_reviewed"
└── missing[]                evidence sought and not held
```

```
Source
├── source_type, authority, stage, stance, extraction
├── title, issuing_authority, date, url, document_no, page
├── relationship { supports, does_not_prove, grade_impact, component_id? }
├── document { download_status, extraction_status, extraction_method,
│              text_sha256, extraction_confidence, human_review }
└── quote?                   ← only if document.extraction_status === "success"
```

```
ClaimComponent
├── id, text, status
├── evidence[]               indices into the record's sources
├── grade, confidence
├── limitations[]
└── ng_reason?               required iff grade === "NG"
```

## 2. Relationship notes (mandatory)

**No source may be attached without one.** Validation fails otherwise.

```js
relationship: {
  supports:       "That the hospital was operating by March 2025.",
  does_not_prove: "The 1,000-bed capacity, the opening date or the ₹240 cr cost.
                   This order is about pay-ward formation and touches none of them.",
  grade_impact:   "raises",
  component_id:   "existence",
}
```

| Field | Rule |
|---|---|
| `supports` | Prose, ≥12 chars. What this document actually establishes. |
| `does_not_prove` | Prose, ≥12 chars. **Equally weighted in the UI.** |
| `grade_impact` | `raises` / `supports_current` / `caps` / `lowers` / `none` |
| `component_id` | Optional. Which component this bears on. |

**Why it is mandatory.** In C0, two Government Orders on the Kalaignar hospital
concerned *pay wards* and *staffing continuance*. Both are genuine evidence that the
hospital exists and operates. Neither says anything about the 1,000 beds, the opening
date or the cost — which is the claim. Without a relationship note, a link count reads
as corroboration it does not provide.

## 3. Claim components

A compound claim is graded part by part. **The parent never inherits its strongest
component — it takes the weakest.**

```js
components: [
  { id: "existence",  text: "A super-speciality hospital exists at Guindy and operates.",
    status: "documented",    grade: "D", confidence: "high", evidence: [0,1,2],
    limitations: ["Both GOs are identified but unread."] },
  { id: "capacity",   text: "It has 1,000 beds and 15 operating theatres.",
    status: "asserted_only", grade: "E", confidence: "low",  evidence: [0,3,4],
    limitations: ["No bed-strength notification or completion certificate located."] },
]
// parent grade = E (weakest), parent confidence = low (lowest)
```

**Roll-up rules**

- `rollUpGrade()` returns the **weakest gradeable** component. Ranking:
  `F < E < D < C < B < A`.
- NG components are **excluded** from the grade ranking — a non-gradeable part does
  not drag a measurable claim down, and can never lift one.
- If *every* component is NG, the record is NG.
- `rollUpConfidence()` returns the **lowest** confidence, NG components included:
  uncertainty about any part is uncertainty about the whole.
- Validation fails if the parent's grade or confidence differs from the roll-up.

**Why weakest and not average.** A claim asserting four things is wrong if any one of
them is wrong. Averaging would let a well-documented trivial component offset an
undocumented load-bearing one — which is precisely how "1,000-bed hospital completed
for ₹240 cr" earned a D in C0 on the strength of a pay-ward order.

## 4. NG — not gradeable

`NG` is not a low grade. It records that **the claim's form, not the evidence, is the
obstacle** — no amount of research would settle it.

Use NG when one of these applies, and name which:

| `ng_reason` | Use when |
|---|---|
| `no_measurable_criteria` | The claim defines no outcome. *"Fight to restore the state's lost rights."* |
| `not_objectively_assessable` | A continuous posture with no completion state. *"Oppose Hindi imposition."* |
| `aspirational` | An intention rather than a commitment. |
| `responsible_authority_unclear` | Fulfilment lies with a different authority. *"Move Education to the State List"* needs a Union constitutional amendment. |

**Grading these E would be misleading**, because E implies better evidence could
change the answer. Nothing could.

Confidence on an NG record attaches to **the NG determination itself**, not to any
factual claim — hence promise #1 is `NG / high confidence`: we are confident it cannot
be assessed.

## 5. Grade versus confidence

Two independent axes. Conflating them was a real defect in v1.

| | Answers |
|---|---|
| **Grade** | Which rung of the evidence ladder is reached? |
| **Confidence** | How sure are we that it is reached? |

| Situation | Grade | Confidence |
|---|---|---|
| Sanctioned, GO retrieved and read | D | high |
| Sanctioned, inferred from a related order's title | D | low |
| Completion asserted, no certificate | E | low |
| Completion with contract + progress records, no final certificate | C | medium |
| Department created, GO linked but unread | D | medium |
| Not gradeable, and the reason is structural | NG | high |

Both require their own rationale, and validation rejects a `confidence_rationale`
identical to the grade `rationale`. In the pilot the pair takes 4 distinct
combinations across 25 subjects, so the axes demonstrably move independently.

## 6. Document lifecycle

Download and extraction are tracked **separately**, because succeeding at one says
nothing about the other.

```js
document: {
  download_status:       "success",     // not_attempted|success|failed|blocked|corrupt
  extraction_status:     "success",     // not_attempted|success|partial|failed|unsupported_format
  extraction_method:     "pdftotext",   // pdftotext|html_parse|manual_transcription|ocr|none
  text_sha256:           "743f3315…",   // hash of the EXTRACTED TEXT, not the PDF
  extraction_confidence: "high",        // high|medium|low
  human_review:          "reviewed",    // unreviewed|spot_checked|reviewed
}
```

**Failed extraction is a valid terminal state and is never silently used.** Enforced:

- A `quote` requires `extraction_status === "success"` **and** a `text_sha256`.
  `isQuotable()` gates this and validation rejects violations.
- `extraction: "failed"` with a quote present is rejected.
- `extraction_status: "success"` with `download_status !== "success"` is rejected.
- A successful extraction with no method, hash or confidence is rejected.

**Why.** C0's fallback PDF parser produced fluent-looking garbage from a CID-encoded
PDF rather than failing. For an evidence pipeline that is the worst possible failure
mode: it manufactures quotable text. The hash of the extracted text is stored so a
reviewer can confirm the quote came from what was actually parsed.

## 7. Grading rules

The ladder is unchanged from [`EVIDENCE_MODEL.md`](EVIDENCE_MODEL.md): A outcome
verified, B delivery verified, C execution verified, D sanctioned, E
announced/government-reported, F unsupported or disputed, plus NG.

**Hard gates, all enforced by validation:**

1. **A, B and C require an independent source that has been read AND supports the
   claim.** `isIndependentlyEvidenced()` requires `authority ∈ {independent_official,
   audit, judicial}`, `extraction ∈ {parsed, quoted}`, **and `stance === "supporting"`**.
2. **Contrary evidence can never raise a grade.** C0's first gate asked only whether
   an independent read source *existed* — so attaching a CAG finding made a higher
   grade easier to justify. Adverse evidence must never be a route to "verified".
3. **Grades are computed per component, then rolled up.** `gradeFromSources()` runs
   over a component's own evidence. Running it across a whole record would return the
   best grade any source supports — exactly the inheritance §3 forbids.
4. **`verification_status` is `unverified`** unless a human has reviewed it.
5. **`missing[]` may not be empty.** An empty list means nobody looked.

## 8. Validation

`validateEvidenceRecord()` fails on any of:

- a source with **no relationship note**, or with `supports` / `does_not_prove` too short
- an invalid `grade_impact`
- a grade with **no rationale** (≥40 chars)
- **missing confidence** or a confidence rationale duplicating the grade rationale
- a **missing stance** or **missing extraction status**
- a missing `document` block, or an incoherent one (§6)
- a **quote on a failed extraction**
- `NG` without an `ng_reason`
- a **parent grade that is not the weakest-component roll-up**
- a component claiming more than its own evidence supports
- A/B/C without independent supporting evidence
- an empty `missing[]`

Run: `npm test` (39 pilot tests) and `npm run validate` (8 pilot checks).

## 9. What the migration changed

Same 25 subjects, no additions. Componentisation moved seven:

| Subject | v1 | v2 | Why |
|---|---|---|---|
| `ev_hea4` Kalaignar hospital | D | **E** | `existence` D, but `capacity`/`cost`/`opening_date` all E |
| `ev_inf_b15_cumta` CUMTA | D | **E** | `authority` D (the Act), but `integration`/`adoption` E |
| `ev_coop_b16_societies` | D | **E** | `legislative` D, but `modernisation` E |
| `ev_contested_hospital_completion` | D | **E** | `operating` D, but `capacity_cost` E |
| `ev_promise_1` lost rights | E | **NG** | no measurable criteria |
| `ev_promise_2` Education to State List | E | **NG** | responsible authority unclear |
| `ev_promise_4` Hindi imposition | E | **NG** | not objectively assessable |

**16% of the pilot was over-graded by compound flattening.** In every case the D
component was real but was not what the claim asserted.

### Corpus after migration

| Measure | Value |
|---|---|
| Subjects | 25 |
| Claim components | **44** (14 subjects are compound) |
| Grades | 20 E · 2 D · **3 NG** · 0 A/B/C |
| Confidence | 21 low · 2 medium · 2 high |
| Sources | 86 (15 read, 14 contrary, 0 failed extraction) |
| Subjects with an independent source *supporting* them | **0** |
| Missing-evidence items | 95 |

## 10. Limitations of this model

Stated because a model document that omits them repeats the original mistake.

1. **Grades still encode judgement.** The rules constrain it — they do not remove it.
   One maintainer assigns every grade and there is no second reviewer.
2. **Weakest-component roll-up can be harsh.** A claim that is 90% well-evidenced and
   10% asserted grades at the 10%. This is deliberate but will understate some records.
3. **Component boundaries are themselves a judgement.** Splitting "1,000 beds and 15
   theatres" into one component or two changes the outcome. There is no rule fixing this.
4. **`does_not_prove` cannot be validated for accuracy** — only for presence and length.
   A lazy or misleading relationship note passes.
5. **NG can be misused as an escape hatch** for claims that are merely hard. The four
   reasons narrow this but do not close it.
6. **Confidence is uncalibrated.** "High" and "low" are not probabilities and have
   never been tested against outcomes.
7. **The model cannot detect a claim that is simply false** where supporting documents
   exist. It measures the paper trail, not reality.
8. **No independent source supports any subject in the corpus.** Grades A and B remain
   unreachable in principle until an independent counter is ingested — the model can
   express them, and nothing yet earns them.
