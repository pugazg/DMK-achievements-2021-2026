import test from "node:test";
import assert from "node:assert/strict";
import {
  validateEvidenceRecord, validateComponent, gradeFromSources,
  rollUpGrade, rollUpConfidence, isIndependentlyEvidenced,
} from "../src/lib/evidenceRecord.js";
import { EVIDENCE_PILOT } from "../src/data/evidencePilot.js";
import { SECOND_PASS } from "../src/data/evidenceReview.js";
import { STATS, RESULTS } from "../scripts/reviewer_compare.mjs";
import { PACKETS, assertNoLeak } from "../scripts/reviewer_packets.mjs";

/* Phase C0.6 — edge cases the adversarial review said the model must handle.
   Each mirrors a claim shape the corpus actually contains. */

const doc = (over = {}) => ({
  download_status: "not_attempted", extraction_status: "not_attempted",
  extraction_method: "none", text_sha256: null, extraction_confidence: null,
  human_review: "unreviewed", ...over,
});
const rel = (over = {}) => ({
  supports: "Something substantive enough to pass the length check.",
  does_not_prove: "Something else substantive enough to pass the length check.",
  grade_impact: "caps", ...over,
});
const src = (over = {}) => ({
  source_type: "announcement", authority: "primary_official", stage: "announcement",
  stance: "supporting", extraction: "identified", title: "A source",
  document: doc(), relationship: rel(), ...over,
});
const rec = (over = {}) => ({
  id: "t", subject_type: "achievement", subject_id: "x",
  claim: "A claim long enough to satisfy the minimum length requirement for testing.",
  sources: [src()],
  components: [{ id: "c", text: "A component text", status: "asserted_only", grade: "E", confidence: "low", evidence: [0], limitations: ["A limitation"] }],
  assessment: {
    grade: "E", confidence: "low", rationale: "x".repeat(50),
    confidence_rationale: "y".repeat(30), limitations: ["l"], verification_status: "unverified",
  },
  missing: ["something missing"],
  ...over,
});

// ===============================================================
// 1. COMPOUND CLAIMS
// ===============================================================

test("EDGE compound: 'completed, benefiting X people, creating Y jobs' splits three ways", () => {
  // Three assertions of very different evidential difficulty.
  const r = rec({
    claim: "The project was completed, benefiting 5 lakh people and creating 20,000 jobs.",
    sources: [
      src({ source_type: "go", stage: "administrative_sanction", relationship: rel({ grade_impact: "raises" }) }),
      src({ source_type: "other", authority: "other", extraction: "unavailable", stage: "context_only", stance: "contextual" }),
    ],
    components: [
      { id: "completion", text: "The project was completed.", status: "documented", grade: "D", confidence: "medium", evidence: [0], limitations: ["Sanction only; no completion certificate."] },
      { id: "beneficiaries", text: "It benefits 5 lakh people.", status: "asserted_only", grade: "E", confidence: "low", evidence: [1], limitations: ["No beneficiary data."] },
      { id: "jobs", text: "It created 20,000 jobs.", status: "asserted_only", grade: "E", confidence: "low", evidence: [1], limitations: ["No employment data."] },
    ],
    assessment: { grade: "E", confidence: "low", rationale: "x".repeat(50), confidence_rationale: "y".repeat(30), limitations: ["l"], verification_status: "unverified" },
  });
  assert.deepEqual(validateEvidenceRecord(r), []);
  // The parent must take the weakest, never the documented completion.
  assert.equal(rollUpGrade(r.components), "E");
  assert.notEqual(rollUpGrade(r.components), "D", "a documented completion must not carry the beneficiary and jobs claims");
});

test("EDGE compound: a parent asserting the strongest component is rejected", () => {
  const r = rec({
    components: [
      { id: "a", text: "Documented part", status: "documented", grade: "D", confidence: "high", evidence: [0], limitations: ["x"] },
      { id: "b", text: "Undocumented part", status: "asserted_only", grade: "E", confidence: "low", evidence: [0], limitations: ["x"] },
    ],
    assessment: { grade: "D", confidence: "high", rationale: "x".repeat(50), confidence_rationale: "y".repeat(30), limitations: ["l"], verification_status: "unverified" },
  });
  const errs = validateEvidenceRecord(r);
  assert.ok(errs.some((e) => /weakest-component roll-up/.test(e)));
  assert.ok(errs.some((e) => /lowest component confidence/.test(e)));
});

test("EDGE compound: the corpus contains real compound claims and none inherits upward", () => {
  const compound = EVIDENCE_PILOT.filter((r) => r.components.length > 1);
  assert.ok(compound.length >= 10, `only ${compound.length} compound subjects`);
  for (const r of compound) {
    if (r.assessment.grade === "NG") continue;
    assert.equal(r.assessment.grade, rollUpGrade(r.components), `${r.id}`);
  }
});

// ===============================================================
// 2. ASPIRATIONAL CLAIMS
// ===============================================================

test("EDGE aspirational: 'make Tamil Nadu a global leader' is NG, not E", () => {
  const r = rec({
    claim: "Make Tamil Nadu a global leader in the knowledge economy.",
    components: [{
      id: "aspiration", text: "Tamil Nadu became a global leader.",
      status: "not_assessable", grade: "NG", ng_reason: "aspirational",
      confidence: "high", evidence: [0],
      limitations: ["'Global leader' names no threshold, no comparator set and no measurement."],
      reviewerNotes: "Graded NG rather than E: no document could settle this, so implying that better evidence would is misleading.",
    }],
    assessment: {
      grade: "NG", ng_reason: "aspirational", confidence: "high",
      rationale: "x".repeat(50), confidence_rationale: "y".repeat(30),
      limitations: ["No fulfilment criterion exists."], verification_status: "unverified",
    },
  });
  assert.deepEqual(validateEvidenceRecord(r), []);
  assert.equal(rollUpGrade(r.components), "NG");
});

test("EDGE aspirational: NG without a reason, or without explanation, is rejected", () => {
  const noReason = validateComponent(
    { id: "c", text: "A component text", status: "s", grade: "NG", confidence: "high", evidence: [], limitations: ["short"] },
    "t", new Set());
  assert.ok(noReason.some((e) => /requires ng_reason/.test(e)));
  assert.ok(noReason.some((e) => /reviewerNotes or a substantive limitation/.test(e)),
    "NG must be explained, not merely labelled");
});

test("EDGE aspirational: an NG component never lifts a gradeable sibling", () => {
  // NG is excluded from the ordering — it must not become the answer for the whole.
  assert.equal(rollUpGrade([{ grade: "NG" }, { grade: "E" }]), "E");
  assert.equal(rollUpGrade([{ grade: "NG" }, { grade: "D" }, { grade: "E" }]), "E");
  // …but uncertainty about the NG part still drags confidence down.
  assert.equal(rollUpConfidence([{ confidence: "high" }, { confidence: "low" }]), "low");
});

// ===============================================================
// 3. NUMERICAL CLAIMS
// ===============================================================

test("EDGE numerical: 'created 35 lakh jobs' cannot exceed E without an independent counter", () => {
  const r = EVIDENCE_PILOT.find((x) => x.id === "ev_contested_investment_jobs");
  const jobs = r.components.find((c) => c.id === "jobs");
  assert.equal(jobs.grade, "E");
  // The department's own announcement can never evidence its own headcount.
  const jobSources = jobs.evidence.map((i) => r.sources[i]);
  assert.ok(!jobSources.some(isIndependentlyEvidenced),
    "no independent source supports the jobs figure");
  assert.equal(gradeFromSources(jobSources), "E");
});

test("EDGE numerical: a precise figure with no financial document stays E", () => {
  // A government announcement quoting its own number is still an announcement.
  const announcementOnly = [src({ relationship: rel({ grade_impact: "caps" }) })];
  assert.equal(gradeFromSources(announcementOnly), "E");
  // Adding a GO lifts it to D — sanction, not delivery of the number.
  const withGo = [...announcementOnly, src({ source_type: "go", stage: "administrative_sanction" })];
  assert.equal(gradeFromSources(withGo), "D");
  // Only an independent read source at a delivery stage reaches B.
  const withIndependent = [...withGo, src({
    source_type: "audit", authority: "audit", stage: "expenditure",
    extraction: "quoted", stance: "supporting",
    document: doc({ download_status: "success", extraction_status: "success", extraction_method: "pdftotext", text_sha256: "a".repeat(64), extraction_confidence: "high", human_review: "reviewed" }),
  })];
  assert.equal(gradeFromSources(withIndependent), "B");
});

test("EDGE numerical: the corpus's numeric claims are all E", () => {
  for (const id of ["ev_contested_investment_jobs", "ev_contested_free_bus", "ev_contested_doorstep_health"]) {
    assert.equal(EVIDENCE_PILOT.find((r) => r.id === id).assessment.grade, "E",
      `${id}: a headline number should not exceed E without an independent counter`);
  }
});

// ===============================================================
// 4. TIME-BASED CLAIMS
// ===============================================================

test("EDGE time-based: 'completed by 2025' splits completion from timing", () => {
  const r = rec({
    claim: "The programme was completed by 2025, on schedule.",
    sources: [
      src({ source_type: "go", stage: "administrative_sanction", relationship: rel({ grade_impact: "raises" }) }),
      src({
        source_type: "audit", authority: "audit", stage: "independent_audit",
        stance: "contrary", extraction: "quoted", url: "https://cag.gov.in/x.pdf",
        quote: "There were delays ranged between one day and 106 days in release of funds.",
        document: doc({ download_status: "success", extraction_status: "success", extraction_method: "pdftotext", text_sha256: "b".repeat(64), extraction_confidence: "high", human_review: "reviewed" }),
        relationship: rel({ grade_impact: "lowers" }),
      }),
    ],
    components: [
      { id: "completion", text: "The programme was completed.", status: "documented", grade: "D", confidence: "medium", evidence: [0], limitations: ["Sanction only."] },
      { id: "timing", text: "It was completed by 2025, on schedule.", status: "contested", grade: "E", confidence: "low", evidence: [0, 1], limitations: ["Independent audit records delays in the same period."] },
    ],
    assessment: { grade: "E", confidence: "low", rationale: "x".repeat(50), confidence_rationale: "y".repeat(30), limitations: ["l"], verification_status: "unverified" },
  });
  assert.deepEqual(validateEvidenceRecord(r), []);
  assert.equal(rollUpGrade(r.components), "E", "a timing claim contradicted by audit must not ride on the completion component");
});

test("EDGE time-based: a deadline claim whose date is in the future is not yet assessable", () => {
  const r = rec({
    claim: "A US $1 trillion economy will be achieved by 2030.",
    components: [{
      id: "target", text: "The 2030 target will be met.", status: "not_assessable",
      grade: "NG", ng_reason: "not_objectively_assessable", confidence: "high", evidence: [0],
      limitations: ["The target date is after the data cut-off; no evidence could settle it yet."],
      reviewerNotes: "A forward-looking target is not a delivery claim. Grading it E would imply present evidence bears on it.",
    }],
    assessment: {
      grade: "NG", ng_reason: "not_objectively_assessable", confidence: "high",
      rationale: "x".repeat(50), confidence_rationale: "y".repeat(30),
      limitations: ["Target date beyond the data cut-off."], verification_status: "unverified",
    },
  });
  assert.deepEqual(validateEvidenceRecord(r), []);
});

// ===============================================================
// 5. NEGATIVE EVIDENCE
// ===============================================================

test("EDGE negative: contrary audit evidence can never raise a grade", () => {
  const contrary = [src({
    source_type: "audit", authority: "audit", stage: "outcome",
    extraction: "quoted", stance: "contrary", url: "https://cag.gov.in/x.pdf",
    quote: "Non-submission of utilisation certificates indicates failure to comply with the rules.",
    document: doc({ download_status: "success", extraction_status: "success", extraction_method: "pdftotext", text_sha256: "c".repeat(64), extraction_confidence: "high", human_review: "reviewed" }),
  })];
  // An outcome-stage, independent, READ source — but contrary. Must not reach A.
  assert.equal(gradeFromSources(contrary), "E");
  assert.ok(!contrary.some(isIndependentlyEvidenced));
});

test("EDGE negative: an F grade requires reliable contrary evidence, and is available", () => {
  const r = rec({
    claim: "The scheme delivered housing to one lakh families in 2024-25.",
    sources: [
      src({ relationship: rel({ grade_impact: "caps" }) }),
      src({
        source_type: "audit", authority: "audit", stage: "independent_audit",
        stance: "contrary", extraction: "quoted", url: "https://cag.gov.in/y.pdf",
        quote: "The unspent amounts lying in the scheme accounts was Rs 10,083.87 crore as on 31 March 2024.",
        document: doc({ download_status: "success", extraction_status: "success", extraction_method: "pdftotext", text_sha256: "d".repeat(64), extraction_confidence: "high", human_review: "reviewed" }),
        relationship: rel({ grade_impact: "lowers" }),
      }),
    ],
    components: [{
      id: "delivery", text: "One lakh families received housing in 2024-25.",
      status: "contested", grade: "F", confidence: "medium", evidence: [0, 1],
      limitations: ["Independent audit records the funds as substantially unspent in the same period."],
      reviewerNotes: "Graded F rather than E because contrary independent evidence exists, not merely because supporting evidence is absent.",
    }],
    assessment: {
      grade: "F", confidence: "medium", rationale: "x".repeat(50),
      confidence_rationale: "y".repeat(30), limitations: ["l"], verification_status: "unverified",
    },
  });
  assert.deepEqual(validateEvidenceRecord(r), []);
  // F is the weakest rung, so a compound claim containing it takes F.
  assert.equal(rollUpGrade([{ grade: "F" }, { grade: "D" }]), "F");
});

test("EDGE negative: the corpus attaches contrary evidence without letting it inflate grades", () => {
  const withContrary = EVIDENCE_PILOT.filter((r) => r.sources.some((s) => s.stance === "contrary"));
  assert.ok(withContrary.length >= 10);
  for (const r of withContrary) {
    assert.ok(!["A", "B", "C"].includes(r.assessment.grade),
      `${r.id}: carries contrary evidence yet grades ${r.assessment.grade}`);
  }
});

// ===============================================================
// The review process itself
// ===============================================================

test("REVIEW: packets are blinded — no grade, confidence or rationale leaks", () => {
  assert.deepEqual(assertNoLeak(PACKETS, EVIDENCE_PILOT), []);
  assert.equal(PACKETS.length, EVIDENCE_PILOT.length);
  for (const p of PACKETS) {
    assert.ok(!("assessment" in p));
    for (const c of p.proposed_components) {
      assert.ok(!("grade" in c) && !("confidence" in c));
    }
  }
});

test("REVIEW: the second pass covers every subject and obeys the roll-up rules", () => {
  assert.equal(SECOND_PASS.length, EVIDENCE_PILOT.length);
  const ids = new Set(EVIDENCE_PILOT.map((r) => r.id));
  for (const s of SECOND_PASS) assert.ok(ids.has(s.id), `${s.id} is not a pilot subject`);
  assert.deepEqual(STATS.rollUpFailures, [], "the second pass must obey its own roll-up rules");
});

test("REVIEW: every disagreement carries reviewer notes and a classification", () => {
  for (const r of RESULTS.filter((x) => !x.agreed)) {
    assert.ok(r.reviewerNotes?.length > 60, `${r.id}: disagreement without substantive notes`);
    assert.ok(["A", "B", "C", "D"].includes(r.classification.class), `${r.id}: unclassified`);
    assert.ok(r.classification.why?.length > 40, `${r.id}: classification without reasoning`);
  }
});

test("REVIEW: the exercise found real disagreement — agreement alone would be suspicious", () => {
  // A same-author second pass reporting 100% agreement would mean the blinding
  // failed or the reviewer did not re-derive anything.
  assert.ok(STATS.total - STATS.exactMatches >= 5,
    `only ${STATS.total - STATS.exactMatches} disagreements — suspiciously high agreement for a same-author pass`);
  assert.ok(STATS.byClass.A >= 1, "expected the review to surface at least one schema defect");
});
