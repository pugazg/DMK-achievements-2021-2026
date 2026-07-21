# Evidence Model — Adversarial Review (Phase C0.6)

**Generated:** 2026-07-21 by `scripts/reviewer_compare.mjs`.
**Do not hand-edit** — re-run the script.
**Packets:** `docs/reviewer_packets/packets.json` (blinded) ·
**Second pass:** `src/data/evidenceReview.js` ·
**Guide:** [`EVIDENCE_REVIEWER_GUIDE.md`](EVIDENCE_REVIEWER_GUIDE.md)

---

## ⚠ Read this before the numbers

**This was not an independent review.** The same author produced both passes, in
the same working session. Blinding the packets removed the written grade; it could
not remove memory.

Consequently:

- **The agreement rate below is inflated** and is weak evidence of anything.
- **The disagreement rate is a lower bound.** Two genuinely independent reviewers
  would diverge more.
- **The disagreements are the finding.** Each one is a case where the written rules
  failed to constrain even the person who wrote them.

Reproducibility has **not** been demonstrated by this exercise. What has been
demonstrated is that the ruleset contains at least 3 classes of defect, listed below.

## Result

| Measure | Count | Share |
|---|---|---|
| Subjects reviewed | 25 | — |
| **Exact matches** (grade, confidence and split all identical) | **17** | 68% |
| **Any disagreement** | **8** | 32% |
| Parent grade differs | 2 | 8% |
| Parent confidence differs | 3 | 12% |
| Component split differs | 4 | 16% |
| Component-level grade differences | 1 | — |
| Component-level confidence differences | 4 | — |
| Second-pass roll-up rule violations | 0 | — |

### Disagreements by class

| Class | Meaning | Count |
|---|---|---|
| **A** | Schema problem — the model permits or forces the wrong answer | 3 |
| **B** | Evidence interpretation problem — same rules, different reading of a document | 1 |
| **C** | Insufficient documentation — the guidance does not say which answer is right | 4 |
| **D** | Normal expert judgement difference — both readings defensible | 0 |

**Class A dominates the grade-level disagreements**, which is the worst
case: it means the schema permits the wrong answer rather than the reviewers
disagreeing about facts.

## Every disagreement

### ev_hea4 — class A

| | First pass | Second pass |
|---|---|---|
| Grade | E | **E** |
| Confidence | low | **low** |
| Components | existence, capacity, cost, opening_date | capacity, cost, opening_date ⟵ differs |

**Why it is class A:** The model lets a reviewer create a component for something the claim presupposes rather than asserts, giving supporting evidence a home and producing a D-grade component nobody disputed. Nothing in the schema or the rules forbids it.

**Reviewer notes:** Dropped the first pass's 'existence' component. The claim does not ASSERT that a hospital exists — it presupposes it and asserts four specific facts about it. Creating an 'existence' component gives the two Government Orders somewhere to attach and produces a D-grade component for something nobody disputed. That inflates the apparent evidence base. Under a strict assertion-mapping rule the GOs become contextual: they corroborate a presupposition, not a claim.

### ev_soc_b7_hostels — class C

| | First pass | Second pass |
|---|---|---|
| Grade | E | **E** |
| Confidence | low | **low** |
| Components | programme, quantum | programme, quantum |
| Component confidence differs on | — | programme |

**Why it is class C:** Whether an unread page reference supports medium or low confidence is not stated anywhere. Both readings are consistent with the written rule.

**Reviewer notes:** Grades agree. Confidence on 'programme' differs: the first pass said medium on the strength of a page reference. A page reference tells you where to look, not what you would find — the volume is not digitised here and nobody has read page 287. Under the guide's rule that confidence reflects how sure we are the rung is reached, an unread page citation supports low, not medium.

### ev_rur_b2_housing — class C

| | First pass | Second pass |
|---|---|---|
| Grade | E | **E** |
| Confidence | low | **low** |
| Components | scheme, completion_2425 | scheme, completion_2425 |
| Component confidence differs on | — | scheme |

**Why it is class C:** Whether a conspicuously absent document (no GO for a flagship scheme) lowers confidence, or is merely neutral, is not stated.

**Reviewer notes:** Grades agree. Confidence on 'scheme' differs: first pass medium, this pass low. No sanctioning GO was located for a flagship scheme, which is a conspicuous absence rather than a neutral one — the guide says an absent document of a type that should exist lowers confidence.

### ev_wom_b2_gender — class C

| | First pass | Second pass |
|---|---|---|
| Grade | E | **NG** ⟵ differs |
| Confidence | low | **high** ⟵ differs |
| Components | service | service |
| Component grades differ on | — | service |
| Component confidence differs on | — | service |

**Why it is class C:** The guide defines NG as 'no measurable criteria' but does not say that an unquantified service claim qualifies. Both passes read the same rule and reached opposite answers; the rule is underspecified, not misapplied.

**Reviewer notes:** DISAGREE on grade. First pass graded E. The claim — 'Gender Resource / Vanavil Centres providing counselling and legal aid' — states no quantity, no coverage and no outcome, so no document could confirm or refute it as worded. The first pass's own limitation says 'as stated, the claim is not falsifiable', which is the definition of NG in the guide. Grading it E implies better evidence would settle it; nothing would. This is a rule the first pass wrote and then did not apply to itself.

### ev_coop_b16_societies — class A

| | First pass | Second pass |
|---|---|---|
| Grade | E | **E** |
| Confidence | low | **low** |
| Components | legislative, modernisation | modernisation ⟵ differs |

**Why it is class A:** Same defect as ev_hea4: a 'legislative' component restates an easier claim than the one made. The schema has no rule tying components to assertions.

**Reviewer notes:** Dropped the 'legislative' component for the same reason as ev_hea4: the claim asserts that societies were modernised, not that legislation was passed. The 13 linked instruments are contextual — none has been read and which of them bears on modernisation is unknown. A component asserting 'legislation was enacted' is not a restatement of the claim, it is a different and easier claim.

### ev_promise_17 — class C

| | First pass | Second pass |
|---|---|---|
| Grade | D | **D** |
| Confidence | medium | **low** ⟵ differs |
| Components | fulfilment | fulfilment |
| Component confidence differs on | — | fulfilment |

**Why it is class C:** The guide ties confidence to the evidence but does not say whether the claim TYPE may raise it. First pass reasoned from claim type, second from document state. The guide does not adjudicate.

**Reviewer notes:** DISAGREE on confidence. First pass said medium, reasoning that 'a department either exists or it does not', so the claim type aligns well with the evidence type. That is an argument about the claim, not about the evidence — and the guide ties confidence to the evidence. The GO is unread. Consistency with ev_promise_8, which has the identical evidential posture and was graded low, requires low here.

### ev_promise_4 — class A

| | First pass | Second pass |
|---|---|---|
| Grade | NG | **E** ⟵ differs |
| Confidence | medium | **low** ⟵ differs |
| Components | fulfilment | oppose_hindi, official_languages ⟵ differs |

**Why it is class A:** The model allowed a compound promise to be graded as a single NG component, flattening an assessable half into a non-assessable whole — the exact failure the component model was built to prevent, in the opposite direction. No rule required the split.

**Reviewer notes:** DISAGREE on both grade and split. First pass treated this as one NG component. It is compound: 'oppose Hindi imposition' is a continuous posture and correctly NG, but 'state languages as official languages' is a concrete administrative/legislative act that either happened or did not — assessable in principle, unevidenced in fact, therefore E. Collapsing an assessable half into an NG whole is the same flattening the component model exists to prevent, applied in the opposite direction. The parent then rolls up to E, not NG.

### ev_contested_hospital_completion — class B

| | First pass | Second pass |
|---|---|---|
| Grade | E | **E** |
| Confidence | low | **low** |
| Components | operating, capacity_cost | completion, capacity_cost ⟵ differs |

**Why it is class B:** Both passes read the same pay-ward GO. One took it as evidence of the operating state (D), the other held that the claim asserts completion and inference from a related unread document caps at E. A genuine difference in reading the document's bearing.

**Reviewer notes:** Same parent grade, different route. The first pass graded a component 'operating' at D on the strength of a 2025 pay-ward GO. But the claim asserts COMPLETION, not operation. Operation is strong circumstantial evidence for completion — you cannot operate an unbuilt hospital — yet a pay-ward order is not a completion record, and the guide is explicit that inference from a related document caps at E without the document being read. Renamed the component to what the claim asserts and graded it E.

## Subjects where both passes agreed

- `ev_edu3` — E / low
- `ev_inf_b15_cumta` — E / low
- `ev_eco_b2_tidel` — E / low
- `ev_inf5` — E / low
- `ev_env_b4_thoonmai` — E / low
- `ev_promise_8` — D / low
- `ev_promise_18` — E / low
- `ev_promise_19` — E / low
- `ev_promise_1` — NG / high
- `ev_promise_10` — E / low
- `ev_promise_7` — E / low
- `ev_promise_9` — E / low
- `ev_promise_2` — NG / high
- `ev_contested_investment_jobs` — E / low
- `ev_contested_growth_ranking` — E / low
- `ev_contested_free_bus` — E / low
- `ev_contested_doorstep_health` — E / low

Agreement here is weak evidence, for the reason in the header. It is recorded for
completeness, not as validation.

## What this changes

The Class A findings are defects in the model, not in the assessments:

1. **Components are not tied to assertions.** A reviewer may create a component
   for something the claim *presupposes* (`ev_hea4` "existence") or for an
   easier adjacent claim (`ev_coop_b16_societies` "legislative"). Both give
   supporting evidence a home and manufacture a D-grade component for something
   nobody disputed. **Fix: the reviewer guide now requires every component to map
   to an assertion the claim actually makes** (§2 of the guide).

2. **Compound claims can still be flattened — upward into NG.** `ev_promise_4`
   collapsed an assessable half ("state languages as official languages") into a
   non-assessable whole. The component model was built to stop exactly this and
   did not, because no rule required the split. **Fix: the guide now requires
   splitting before any NG determination** (§4).

The Class C findings are gaps in the guidance, now closed in the guide:
confidence rules for unread page references, for conspicuously absent documents,
and for whether claim type may raise confidence (§5).

The single Class B finding is a genuine difference in reading a document and is
left standing — it is what expert disagreement looks like when the rules work.
