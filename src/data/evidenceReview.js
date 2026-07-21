/* ============================================================
   SECOND-PASS ASSESSMENT — Phase C0.6 adversarial review

   A reassessment of the 25 pilot subjects made from the BLINDED
   packets in docs/reviewer_packets/packets.json (no grade, no
   confidence, no rationale, no grade_impact visible), applying the
   documented rules in docs/EVIDENCE_MODEL_V2.md and the guidance in
   docs/EVIDENCE_REVIEWER_GUIDE.md.

   ── THE LIMITATION THAT MATTERS MOST ─────────────────────────
   This is NOT an independent review. The same author produced the
   first-pass assessments in the same working session. Blinding the
   packets removes the written grade; it cannot remove memory or the
   habits of mind that produced the original judgement.

   Every number this review reports is therefore a LOWER BOUND on
   the disagreement two genuinely independent reviewers would
   produce. Where this pass agrees with the first, that agreement is
   weak evidence of reproducibility. Where it DISAGREES, that is
   strong evidence of a real problem — a rule that failed to
   constrain even the person who wrote it.

   Read the disagreements. Discount the agreements.
   ─────────────────────────────────────────────────────────────

   Method actually used:
   1. Read the packet's claim and list what it ASSERTS.
   2. Split components strictly by assertion, ignoring the proposed
      split where it disagreed.
   3. Grade each component from its own evidence only.
   4. Assign confidence per the guide's rules.
   5. Roll the parent up to the weakest gradeable component.
   ============================================================ */

export const REVIEW_META = {
  version: "1.0",
  performed: "2026-07-21",
  reviewer: "second pass, same author — NOT independent (see header)",
  basis: "docs/reviewer_packets/packets.json (blinded)",
  rules: "docs/EVIDENCE_MODEL_V2.md v2.0 + docs/EVIDENCE_REVIEWER_GUIDE.md v1.0",
  independence: "none — anchoring is severe; treat disagreement counts as a lower bound",
};

/* Each entry records this pass's own judgement. `components` is the split this
   reviewer would make, which may differ in NUMBER from the first pass. */
export const SECOND_PASS = [
  {
    id: "ev_hea4",
    components: [
      { id: "capacity", grade: "E", confidence: "low" },
      { id: "cost", grade: "E", confidence: "low" },
      { id: "opening_date", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes:
      "Dropped the first pass's 'existence' component. The claim does not ASSERT that a hospital exists — it presupposes it and asserts four specific facts about it. Creating an 'existence' component gives the two Government Orders somewhere to attach and produces a D-grade component for something nobody disputed. That inflates the apparent evidence base. Under a strict assertion-mapping rule the GOs become contextual: they corroborate a presupposition, not a claim.",
    divergence: "component_count",
  },
  {
    id: "ev_edu3",
    components: [
      { id: "delivered", grade: "E", confidence: "low" },
      { id: "planned", grade: "E", confidence: "medium" },
      { id: "college_scheme", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes: "Agreed on all counts. The split maps cleanly to three distinct assertions and no evidence exists for any of them.",
  },
  {
    id: "ev_soc_b7_hostels",
    components: [
      { id: "programme", grade: "E", confidence: "low" },
      { id: "quantum", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes:
      "Grades agree. Confidence on 'programme' differs: the first pass said medium on the strength of a page reference. A page reference tells you where to look, not what you would find — the volume is not digitised here and nobody has read page 287. Under the guide's rule that confidence reflects how sure we are the rung is reached, an unread page citation supports low, not medium.",
    divergence: "component_confidence",
  },
  {
    id: "ev_inf_b15_cumta",
    components: [
      { id: "authority", grade: "D", confidence: "high" },
      { id: "integration", grade: "E", confidence: "low" },
      { id: "adoption", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes:
      "Full agreement. Unlike ev_hea4, the claim here genuinely asserts the authority's creation ('CUMTA — Chennai Unified Metropolitan Transport Authority'), so 'authority' is an asserted component rather than an invented host, and the Act supports it directly.",
  },
  {
    id: "ev_rur_b2_housing",
    components: [
      { id: "scheme", grade: "E", confidence: "low" },
      { id: "completion_2425", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes:
      "Grades agree. Confidence on 'scheme' differs: first pass medium, this pass low. No sanctioning GO was located for a flagship scheme, which is a conspicuous absence rather than a neutral one — the guide says an absent document of a type that should exist lowers confidence.",
    divergence: "component_confidence",
  },
  {
    id: "ev_eco_b2_tidel",
    components: [
      { id: "built", grade: "E", confidence: "low" },
      { id: "planned", grade: "E", confidence: "medium" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes: "Agreed. Six named locations make 'built' unusually checkable and its total absence of documentation is the finding.",
  },
  {
    id: "ev_wom_b2_gender",
    components: [{ id: "service", grade: "NG", confidence: "high", ng_reason: "no_measurable_criteria" }],
    grade: "NG", confidence: "high", ng_reason: "no_measurable_criteria",
    reviewerNotes:
      "DISAGREE on grade. First pass graded E. The claim — 'Gender Resource / Vanavil Centres providing counselling and legal aid' — states no quantity, no coverage and no outcome, so no document could confirm or refute it as worded. The first pass's own limitation says 'as stated, the claim is not falsifiable', which is the definition of NG in the guide. Grading it E implies better evidence would settle it; nothing would. This is a rule the first pass wrote and then did not apply to itself.",
    divergence: "grade",
  },
  {
    id: "ev_coop_b16_societies",
    components: [{ id: "modernisation", grade: "E", confidence: "low" }],
    grade: "E", confidence: "low",
    reviewerNotes:
      "Dropped the 'legislative' component for the same reason as ev_hea4: the claim asserts that societies were modernised, not that legislation was passed. The 13 linked instruments are contextual — none has been read and which of them bears on modernisation is unknown. A component asserting 'legislation was enacted' is not a restatement of the claim, it is a different and easier claim.",
    divergence: "component_count",
  },
  {
    id: "ev_inf5",
    components: [
      { id: "kilambakkam", grade: "E", confidence: "low" },
      { id: "tiruchi", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes: "Agreed. Splitting the two facilities is right — their evidence differs (one has a cost figure, the other has nothing).",
  },
  {
    id: "ev_env_b4_thoonmai",
    components: [{ id: "return", grade: "E", confidence: "low" }],
    grade: "E", confidence: "low",
    reviewerNotes: "Agreed.",
  },

  // ---- promises ----
  {
    id: "ev_promise_8",
    components: [{ id: "fulfilment", grade: "D", confidence: "low" }],
    grade: "D", confidence: "low",
    reviewerNotes: "Agreed. An unread GO supports sanction at low confidence; nothing supports establishment in fact.",
  },
  {
    id: "ev_promise_17",
    components: [{ id: "fulfilment", grade: "D", confidence: "low" }],
    grade: "D", confidence: "low",
    reviewerNotes:
      "DISAGREE on confidence. First pass said medium, reasoning that 'a department either exists or it does not', so the claim type aligns well with the evidence type. That is an argument about the claim, not about the evidence — and the guide ties confidence to the evidence. The GO is unread. Consistency with ev_promise_8, which has the identical evidential posture and was graded low, requires low here.",
    divergence: "confidence",
  },
  {
    id: "ev_promise_18",
    components: [{ id: "fulfilment", grade: "E", confidence: "low" }],
    grade: "E", confidence: "low",
    reviewerNotes: "Agreed.",
  },
  {
    id: "ev_promise_19",
    components: [{ id: "fulfilment", grade: "E", confidence: "low" }],
    grade: "E", confidence: "low",
    reviewerNotes: "Agreed. Absence from the 222 instruments held is weak evidence given incomplete coverage, correctly reflected in low confidence.",
  },
  {
    id: "ev_promise_1",
    components: [{ id: "fulfilment", grade: "NG", confidence: "high", ng_reason: "no_measurable_criteria" }],
    grade: "NG", confidence: "high", ng_reason: "no_measurable_criteria",
    reviewerNotes: "Agreed, including the reason.",
  },
  {
    id: "ev_promise_10",
    components: [{ id: "fulfilment", grade: "E", confidence: "low" }],
    grade: "E", confidence: "low",
    reviewerNotes: "Agreed.",
  },
  {
    id: "ev_promise_7",
    components: [
      { id: "institute", grade: "E", confidence: "low" },
      { id: "thirukkural", grade: "NG", confidence: "high", ng_reason: "responsible_authority_unclear" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes:
      "Agreed, and the compound split is the right call — the two halves have different responsible authorities. Note the roll-up rule doing real work: the NG half is excluded from the ordering, so the parent takes E from the gradeable half rather than becoming NG.",
  },
  {
    id: "ev_promise_9",
    components: [
      { id: "refurbish", grade: "E", confidence: "low" },
      { id: "all_corporations", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes: "Agreed.",
  },
  {
    id: "ev_promise_2",
    components: [{ id: "fulfilment", grade: "NG", confidence: "high", ng_reason: "responsible_authority_unclear" }],
    grade: "NG", confidence: "high", ng_reason: "responsible_authority_unclear",
    reviewerNotes: "Agreed, including the reason.",
  },
  {
    id: "ev_promise_4",
    components: [
      { id: "oppose_hindi", grade: "NG", confidence: "medium", ng_reason: "not_objectively_assessable" },
      { id: "official_languages", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes:
      "DISAGREE on both grade and split. First pass treated this as one NG component. It is compound: 'oppose Hindi imposition' is a continuous posture and correctly NG, but 'state languages as official languages' is a concrete administrative/legislative act that either happened or did not — assessable in principle, unevidenced in fact, therefore E. Collapsing an assessable half into an NG whole is the same flattening the component model exists to prevent, applied in the opposite direction. The parent then rolls up to E, not NG.",
    divergence: "grade",
  },

  // ---- contested claims ----
  {
    id: "ev_contested_investment_jobs",
    components: [
      { id: "investment", grade: "E", confidence: "low" },
      { id: "jobs", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes: "Agreed.",
  },
  {
    id: "ev_contested_growth_ranking",
    components: [
      { id: "growth_rate", grade: "E", confidence: "low" },
      { id: "ranking", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes: "Agreed. The CAG figure is genuinely non-comparable and the first pass was right not to force it into a confirmation or a refutation.",
  },
  {
    id: "ev_contested_free_bus",
    components: [
      { id: "ridership", grade: "E", confidence: "low" },
      { id: "savings", grade: "E", confidence: "low" },
      { id: "reimbursement", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes:
      "Agreed on grades, with a reservation about the split: 'reimbursement' is not asserted by the claim, it is implied by it. The first pass says so in the component's own limitation. By the assertion-mapping rule applied to ev_hea4 it should arguably be dropped — but unlike 'existence' it lowers no grade and hides nothing, so the inconsistency is noted rather than acted on. The rule needs to say which way this cuts.",
  },
  {
    id: "ev_contested_doorstep_health",
    components: [{ id: "reach", grade: "E", confidence: "low" }],
    grade: "E", confidence: "low",
    reviewerNotes: "Agreed.",
  },
  {
    id: "ev_contested_hospital_completion",
    components: [
      { id: "completion", grade: "E", confidence: "low" },
      { id: "capacity_cost", grade: "E", confidence: "low" },
    ],
    grade: "E", confidence: "low",
    reviewerNotes:
      "Same parent grade, different route. The first pass graded a component 'operating' at D on the strength of a 2025 pay-ward GO. But the claim asserts COMPLETION, not operation. Operation is strong circumstantial evidence for completion — you cannot operate an unbuilt hospital — yet a pay-ward order is not a completion record, and the guide is explicit that inference from a related document caps at E without the document being read. Renamed the component to what the claim asserts and graded it E.",
    divergence: "component_grade",
  },
];
