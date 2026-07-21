# Evidence Reviewer Guide

**Guide version 1.0** · 21 July 2026 · For schema
[`EVIDENCE_MODEL_V2.md`](EVIDENCE_MODEL_V2.md) v2.1

How to assess a subject. Written after the C0.6 adversarial review, where two
passes over the same 25 subjects disagreed on **8 of 25** — and in almost every
case the divergence was a judgement the rules did not determine rather than a
disagreement about facts. The rules below exist to close those gaps.

Read [`EVIDENCE_ADVERSARIAL_REVIEW.md`](EVIDENCE_ADVERSARIAL_REVIEW.md) alongside
this: it shows what went wrong, and each rule here names the case that produced it.

---

## 1. Before you start

You will be given a **blinded packet**: the claim, the evidence with relationship
notes, and the known missing evidence. You will not see the existing grade,
confidence, or rationale. That is deliberate.

Work in this order. Do not skip to the grade.

1. Write down what the claim **asserts** (§2).
2. Split it into components, one per assertion (§2).
3. Grade each component **from its own evidence only** (§3).
4. Decide whether any component is NG (§4).
5. Assign confidence to each component (§5).
6. Roll up: parent grade = weakest gradeable component; parent confidence =
   lowest of all components.
7. Record what is still missing, and write `reviewerNotes` wherever you made a
   call the rules did not make for you (§6).

## 2. How to split components

### The assertion rule

**Every component must map to something the claim actually asserts.** Not
something it presupposes, not an adjacent easier claim, not context.

This rule exists because the first pass violated it twice:

| Case | What went wrong |
|---|---|
| `ev_hea4` | Claim: *"a 1,000-bed hospital … opened 15 June 2023 for ₹240 cr."* An **"existence"** component was created. The claim presupposes the hospital exists; it asserts four facts about it. The invented component gave two Government Orders a home and produced a **D-grade for something nobody disputed**. |
| `ev_coop_b16_societies` | Claim: *"Co-operative societies modernised."* A **"legislative"** component was created. The claim asserts modernisation, not that laws were passed. Legislation is an easier, different claim. |

Both inflated the apparent evidence base. Ask of every component: **if this
turned out to be false, would the claim be false?** If no, it is not a component.

### Test for splitting

Split when two parts of a claim:

- could be **true independently** of one another, **or**
- would be evidenced by **different documents**, **or**
- sit at **different stages** of the delivery lifecycle, **or**
- have **different responsible authorities**.

**Worked example.** *"The project was completed, benefiting 5 lakh people and
creating 20,000 jobs."* → three components. Completion is evidenced by a
completion certificate; beneficiaries by programme MIS data; jobs by an
independent employment series. Different documents, different stages, and each
could be false while the others are true.

**Counter-example.** *"1,000 beds and 15 operating theatres"* → **one**
component. Both come from the same bed-strength notification. Splitting them
adds bookkeeping without adding discrimination.

### Do not split to avoid a hard grade

If splitting would let a well-documented fragment carry an undocumented claim,
you have split wrongly. The roll-up takes the weakest, so this cannot inflate the
parent — but it does clutter the record and hide where the evidence really sits.

### Compound claims must be split BEFORE any NG decision

From `ev_promise_4`: *"Oppose Hindi imposition; state languages as official
languages."* The first pass graded this as a **single NG** component. But the
second half is a concrete administrative act — assessable in principle,
unevidenced in fact, therefore **E**. Collapsing an assessable half into a
non-assessable whole is the same flattening the component model exists to
prevent, running in the opposite direction.

**Rule: split first, then ask whether each component is NG.**

## 3. How to assign grades

Grade each component **from its own evidence only** — the sources listed in that
component's `evidence` array, and nothing else.

| Grade | Requires |
|---|---|
| **A** | An independent source, **read**, at the `outcome` stage, **supporting** the claim. |
| **B** | An independent source, **read**, at `expenditure` or `beneficiary_delivery`, **supporting**. |
| **C** | A **read** source at `tender`, `contract_award`, `work_order`, `physical_progress` or `completion`. |
| **D** | A Government Order, Act, gazette entry or budget document, at any stage but `context_only`. |
| **E** | Anything else — including a government publication asserting the claim. |
| **F** | Reliable **contrary** evidence exists. Not merely "unsupported" — that is E. |
| **NG** | See §4. |

### Three gates that never bend

1. **A, B and C require an independent source that supports the claim.**
   Independent means `independent_official`, `audit` or `judicial` — never the
   department making the claim.
2. **Contrary evidence never raises a grade.** An audit finding is independent
   and read, but if its stance is `contrary` it cannot lift anything. It can push
   toward F. (The first version of the model got this backwards.)
3. **A document that has not been read caps at what its existence proves.** A GO
   you have not opened proves a sanction exists. It does not prove what the
   sanction says.

### E versus F

**E** = we hold nothing that supports this.
**F** = we hold something that contradicts it.

Do not use F for absence. Most of this corpus is E precisely because absence is
not contradiction.

### Numerical claims

A number asserted by the body that produced it is **E**, however precise. "35
lakh jobs" needs an independent employment series to exceed E; "₹240 cr" needs an
expenditure record. Precision is not evidence — a suspiciously exact figure with
no financial document should *lower* your confidence, not raise it.

## 4. When to use NG

**NG means the claim's *form*, not the evidence, is the obstacle.** No amount of
research would settle it.

Use NG only with one of these reasons, and say which:

| Reason | Use when | Example |
|---|---|---|
| `no_measurable_criteria` | The claim names no outcome, quantity or threshold. | *"Fight to restore the state's lost rights."* |
| `not_objectively_assessable` | A continuous posture with no completion state, or a target beyond the data cut-off. | *"Oppose Hindi imposition."* |
| `aspirational` | An intention rather than a commitment. | *"Make Tamil Nadu a global leader."* |
| `responsible_authority_unclear` | Fulfilment lies with a different authority. | *"Move Education to the State List"* — needs a Union amendment. |

### The test

> **Could any document, if it existed, settle this claim?**
>
> - **Yes, but we do not hold it** → **E** (or D/C/B/A if we do hold it).
> - **No — nothing could** → **NG**.

### NG is not a synonym for "hard"

This is the reason to be careful. NG is an escape hatch and can be abused to
avoid a difficult E. If you find yourself reaching for NG because the evidence
hunt was frustrating, the answer is E.

**But the converse error is also real.** The adversarial review disagreed on
`ev_wom_b2_gender` — *"Gender Resource / Vanavil Centres providing counselling
and legal aid"* — where the first pass said E while recording in its own
limitations that *"as stated, the claim is not falsifiable."* That is the
definition of NG. If your limitation says nothing could settle it, your grade
must be NG.

### NG must be explained

The schema requires `reviewerNotes` or a substantive limitation on any NG
component. Labelling is not explaining.

### NG in a compound claim

An NG component is **excluded from the grade roll-up**. It does not drag a
measurable sibling down, and it can never lift one. A parent is NG only when
**every** component is NG.

## 5. When confidence should be low

Confidence answers a different question from the grade:

> **Grade:** which rung does the evidence reach?
> **Confidence:** how sure are we that it reaches it?

Confidence is about the **evidence**, never about how plausible the claim feels
or how well the claim type happens to suit the evidence type. (The review
diverged on `ev_promise_17` for exactly this reason — one pass raised confidence
because "a department either exists or it does not", which is an argument about
the claim.)

### Use **low** when any of these hold

- The load-bearing source has **not been read** (`identified` or `retrieved`).
- The claim's key term is **undefined** — "modernised", "reached", "done".
- A document of a type that **should exist does not** — no GO for a flagship
  scheme, no tender for a major procurement. *(Class C gap closed: a
  conspicuous absence lowers confidence; it is not neutral.)*
- The figure is **modelled rather than measured** (the ₹13,820 cr savings estimate).
- Multiple linked records **share one underlying source** — apparent corroboration
  that is not.
- A **page reference exists but nobody has read the page**. *(Class C gap closed:
  an unread citation tells you where to look, not what you would find. Low, not
  medium.)*

### Use **medium** when

- The evidence is read and supports the component, but does not cover all of it.
- A statement of future intent is being recorded as intent (a "planned" component).
- The determination is sound but a reasonable reviewer could differ.

### Use **high** when

- The source is read, independent where required, and directly on point; **or**
- the component is **NG** and the reason is structural. Confidence then attaches
  to *the NG determination*, not to any factual claim — hence `NG / high`.

### Confidence rolls up as the lowest

Uncertainty about any part is uncertainty about the whole. Unlike grades, NG
components **are** included.

## 6. Reviewer notes

Write `reviewerNotes` wherever you made a call the rules did not make for you:

- you departed from the proposed component split, and why;
- you chose NG over E, or E over NG;
- you treated a source as contextual rather than supporting;
- a defensible alternative reading exists and you rejected it;
- the grade is not what the evidence mechanically suggests.

The review found that **almost every disagreement was an undocumented
judgement**. A note at the point of decision is what makes an assessment
reproducible by someone else.

Notes are for judgements, not narration. Do not restate the grade.

## 7. Worked example, end to end

**Claim:** *"A 1,000-bed super-speciality hospital was completed and opened on
15 June 2023 at a cost of ₹240 crore."*

**Step 1 — what does it assert?** Completion; 1,000 beds; an opening date; a cost.
It *presupposes* that a hospital exists — that is not an assertion.

**Step 2 — components.** Completion is evidenced differently from the figures, so
split two ways: `completion`, and `capacity_cost` (beds, date and cost all come
from the same absent completion record).

**Step 3 — grade each.**
- `completion`: the only source is a 2025 pay-ward Government Order, unread. It
  strongly implies the hospital operates — but the claim asserts completion, and
  an unread related document caps at **E**.
- `capacity_cost`: no completion certificate, no bed notification, no final bill.
  **E**.

**Step 4 — NG?** No. A completion certificate would settle all of it. The evidence
is missing, not impossible.

**Step 5 — confidence.** Low for both: the load-bearing source is unread and the
absent documents are ones that should exist.

**Step 6 — roll up.** Parent **E / low**.

**Step 7 — notes.** *"A pay-ward GO is being used as existence evidence —
legitimate, but not what the order is for. The claim asserts completion, not
operation."*

**What the first pass did instead:** created an `operating` component graded **D**
on that same GO, which pulled the record to D under v1 and made it look better
evidenced than it is. The adversarial review caught this
(class B, `ev_contested_hospital_completion`).

## 8. Limits of this guide

1. **It does not remove judgement.** It constrains it. Two reviewers following
   this guide will still disagree — the aim is that they disagree about
   *documents*, not about *rules*.
2. **Component granularity remains under-determined.** §2 gives tests, not an
   algorithm. "1,000 beds and 15 theatres" as one component or two is still a call.
3. **Confidence is uncalibrated.** High/medium/low are not probabilities and have
   never been tested against outcomes.
4. **The NG boundary is soft.** §4 narrows it; it does not close it.
5. **The C0.6 review was not independent** — same author, same session. Its 8-of-25
   disagreement rate is a **lower bound**. A genuinely independent reviewer is the
   next thing this model needs, and no amount of guidance substitutes for one.
