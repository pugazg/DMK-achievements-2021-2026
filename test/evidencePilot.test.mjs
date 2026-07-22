import test from "node:test";
import assert from "node:assert/strict";
import { EVIDENCE_PILOT, PILOT_META } from "../src/data/evidencePilot.js";
import {
  validateEvidenceRecord, validateSource, validateDocument, gradeFromEvidence, gradeFromSources,
  gradeMismatches, rollUpMismatches, componentMismatches, rollUpGrade, rollUpConfidence,
  summarise, isIndependentlyEvidenced, isQuotable,
  SOURCE_TYPES, AUTHORITIES, STAGES, EXTRACTION, STANCE, GRADE_VALUES, CONFIDENCE,
  GRADE_IMPACT, NG_REASONS, DOWNLOAD_STATUS, EXTRACTION_STATUS, HUMAN_REVIEW,
} from "../src/lib/evidenceRecord.js";
import { GRADES } from "../src/lib/evidence.js";

/* The pilot exists to prove the evidence model can hold a complete picture.
   These tests enforce the properties that make that true — above all, that
   nothing can quietly become "verified". */

test("every EvidenceRecord passes full schema validation", () => {
  const errs = EVIDENCE_PILOT.flatMap((r) => validateEvidenceRecord(r));
  assert.deepEqual(errs, [], `schema errors:\n${errs.join("\n")}`);
});

test("pilot composition matches the brief", () => {
  const s = summarise(EVIDENCE_PILOT);
  assert.equal(s.total, 25);
  assert.equal(s.bySubject.achievement, 10);
  assert.equal(s.bySubject.promise, 10);
  assert.equal(s.bySubject.contested_claim, 5);
});

test("achievements span the ten requested domains", () => {
  const domains = EVIDENCE_PILOT.filter((r) => r.subject_type === "achievement").map((r) => r.domain);
  for (const d of ["welfare", "education", "health", "infrastructure", "industry",
                   "women/social welfare", "agriculture", "urban development", "transport", "environment"]) {
    assert.ok(domains.includes(d), `no achievement covers "${d}"`);
  }
  assert.equal(new Set(domains).size, 10, "domains must be distinct");
});

test("promises span the requested maturity levels", () => {
  const m = EVIDENCE_PILOT.filter((r) => r.subject_type === "promise").map((r) => r.maturity);
  for (const level of ["apparently completed", "partially completed", "ongoing",
                       "announcement-only", "difficult to assess"]) {
    assert.ok(m.includes(level), `no promise represents "${level}"`);
  }
});

test("every record has an ID unique across the corpus", () => {
  const ids = EVIDENCE_PILOT.map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length);
});

// ---- required fields -------------------------------------------------

test("every record has required fields", () => {
  for (const r of EVIDENCE_PILOT) {
    for (const f of ["id", "subject_type", "subject_id", "claim", "sources", "assessment", "missing"]) {
      assert.ok(r[f], `${r.id} missing "${f}"`);
    }
    assert.ok(r.claim.length > 25, `${r.id}: claim is too short to be a real claim`);
  }
});

test("every grade has a substantive rationale", () => {
  for (const r of EVIDENCE_PILOT) {
    assert.ok(r.assessment.grade, `${r.id}: no grade`);
    assert.ok(GRADE_VALUES.includes(r.assessment.grade), `${r.id}: grade "${r.assessment.grade}" is not a valid grade`);
    assert.ok(r.assessment.rationale && r.assessment.rationale.length >= 40,
      `${r.id}: rationale missing or too short`);
    assert.ok(r.assessment.assessed_on, `${r.id}: no assessment date`);
  }
});

test("every source has an authority, a type and an extraction status", () => {
  for (const r of EVIDENCE_PILOT) {
    for (const [i, s] of r.sources.entries()) {
      assert.ok(s.authority, `${r.id}.sources[${i}]: no authority`);
      assert.ok(AUTHORITIES.includes(s.authority), `${r.id}.sources[${i}]: bad authority "${s.authority}"`);
      assert.ok(SOURCE_TYPES.includes(s.source_type), `${r.id}.sources[${i}]: bad source_type`);
      assert.ok(EXTRACTION.includes(s.extraction), `${r.id}.sources[${i}]: bad extraction`);
      assert.ok(STANCE.includes(s.stance), `${r.id}.sources[${i}]: bad stance`);
      assert.ok(s.title, `${r.id}.sources[${i}]: no title`);
      if (s.stage) assert.ok(STAGES.includes(s.stage), `${r.id}.sources[${i}]: bad stage "${s.stage}"`);
    }
  }
});

test("missing evidence is present and visible on every record", () => {
  for (const r of EVIDENCE_PILOT) {
    assert.ok(Array.isArray(r.missing) && r.missing.length > 0,
      `${r.id}: missing-evidence list is empty — that means nobody looked`);
    for (const m of r.missing) assert.ok(m.length > 8, `${r.id}: missing item too vague: "${m}"`);
  }
  const s = summarise(EVIDENCE_PILOT);
  assert.ok(s.missingItems >= 25, "the corpus should log substantial missing evidence");
});

test("every assessment states at least one limitation", () => {
  for (const r of EVIDENCE_PILOT) {
    assert.ok(r.assessment.limitations.length > 0, `${r.id}: no limitations stated`);
  }
});

// ---- the core safety invariant --------------------------------------

test("CRITICAL: no record can silently become verified", () => {
  for (const r of EVIDENCE_PILOT) {
    assert.equal(r.assessment.verification_status, "unverified",
      `${r.id}: verification_status is not "unverified"`);
    // A/B/C require an independent authority whose document was actually read.
    if (["A", "B", "C"].includes(r.assessment.grade)) {
      assert.ok(r.sources.some(isIndependentlyEvidenced),
        `${r.id}: grade ${r.assessment.grade} without an independently-read source`);
    }
  }
});

test("CRITICAL: asserted grade always equals what the evidence supports", () => {
  const mism = gradeMismatches(EVIDENCE_PILOT);
  assert.deepEqual(mism, [],
    `asserted grades diverge from evidence:\n${mism.map((m) => `${m.id}: asserted ${m.asserted}, supported ${m.supported}`).join("\n")}`);
});

test("REGRESSION: a fabricated A grade is rejected", () => {
  const forged = {
    ...EVIDENCE_PILOT[0],
    id: "forged",
    assessment: { ...EVIDENCE_PILOT[0].assessment, grade: "A" },
  };
  const errs = validateEvidenceRecord(forged);
  assert.ok(errs.some((e) => /requires a source from an independent/.test(e)),
    "an A grade without independent read evidence must be rejected");
});

test("REGRESSION: an unread source cannot support a high grade", () => {
  const rec = {
    id: "unread", subject_type: "achievement", subject_id: "x",
    claim: "A claim long enough to pass the length check for testing purposes.",
    sources: [{
      source_type: "audit", authority: "audit", title: "An audit report",
      stage: "outcome", extraction: "identified", stance: "supporting",
    }],
    assessment: { grade: "A", rationale: "x".repeat(50), limitations: ["l"], verification_status: "unverified" },
    missing: ["something"],
  };
  assert.ok(validateEvidenceRecord(rec).some((e) => /independent/.test(e)));
  // identified-only evidence supports E, not A
  assert.equal(gradeFromEvidence(rec), "E");
});

test("REGRESSION: a source claiming a quote must carry the quote", () => {
  const errs = validateSource({
    source_type: "audit", authority: "audit", title: "t",
    extraction: "quoted", stance: "contrary", url: "https://example.gov/x",
  });
  assert.ok(errs.some((e) => /no quote provided/.test(e)));
});

test("REGRESSION: a record with no missing-evidence list is rejected", () => {
  const r = { ...EVIDENCE_PILOT[0], id: "nomissing", missing: [] };
  assert.ok(validateEvidenceRecord(r).some((e) => /must list what evidence is unavailable/.test(e)));
});

// ---- adverse evidence was actually sought ---------------------------

test("the pilot contains real contrary evidence, not only supporting sources", () => {
  const s = summarise(EVIDENCE_PILOT);
  assert.ok(s.contrary >= 10, `only ${s.contrary} contrary sources — adverse evidence was not sought`);
  assert.ok(s.withContrary >= 10, `only ${s.withContrary} records carry contrary evidence`);
});

test("contrary sources are real documents that were read, not assertions", () => {
  const contrary = EVIDENCE_PILOT.flatMap((r) => r.sources.filter((s) => s.stance === "contrary"));
  assert.ok(contrary.length > 0);
  for (const s of contrary) {
    // Every contrary source must either be quoted from a retrieved document,
    // or be explicitly marked unavailable. It may never be a bare assertion.
    assert.ok(["quoted", "parsed", "unavailable"].includes(s.extraction),
      `contrary source "${s.title}" is neither read nor marked unavailable`);
    if (s.extraction === "quoted") {
      assert.ok(s.quote && s.quote.length > 40, "a quoted contrary source needs its quote");
      assert.ok(s.url, "a quoted contrary source needs its URL");
      assert.ok(s.sha256, "a quoted contrary source needs the hash of the retrieved file");
    }
  }
});

test("quoted audit sources carry an attribution note limiting their scope", () => {
  // The CAG findings are state-level and name no scheme. Every use must say so,
  // otherwise the pilot would imply an audit finding against a named project.
  const audits = EVIDENCE_PILOT.flatMap((r) => r.sources.filter((s) => s.authority === "audit" && s.extraction === "quoted"));
  assert.ok(audits.length > 0, "no quoted audit evidence in the pilot");
  for (const s of audits) {
    // v2: the scope statement moved into the mandatory relationship note.
    const scope = `${s.relationship?.supports || ""} ${s.relationship?.does_not_prove || ""}`;
    assert.ok(/name|scheme|state-level/i.test(scope),
      `audit source "${s.reference || s.title}" does not state its scope in its relationship note`);
  }
});

test("no source is marked read unless it can be located", () => {
  for (const r of EVIDENCE_PILOT) {
    for (const s of r.sources) {
      if (["parsed", "quoted"].includes(s.extraction)) {
        assert.ok(s.url || s.document_no, `${r.id}: "${s.title}" read but not locatable`);
      }
    }
  }
});

test("pilot metadata declares its version and provenance", () => {
  assert.match(PILOT_META.version, /^\d+\.\d+$/);
  assert.match(PILOT_META.compiled, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(PILOT_META.fetch_manifest.includes("manifest"));
});

// ===============================================================
// Phase C0.5 — hardened model (v2)
// ===============================================================

test("v2: every source carries a mandatory relationship note", () => {
  for (const r of EVIDENCE_PILOT) {
    for (const [i, s] of r.sources.entries()) {
      const rel = s.relationship;
      assert.ok(rel, `${r.id}.sources[${i}]: no relationship note`);
      assert.ok(rel.supports && rel.supports.length >= 12, `${r.id}.sources[${i}]: "supports" too short`);
      assert.ok(typeof rel.does_not_prove === "string", `${r.id}.sources[${i}]: no "does_not_prove"`);
      assert.ok(GRADE_IMPACT.includes(rel.grade_impact), `${r.id}.sources[${i}]: bad grade_impact`);
    }
  }
});

test("v2 REGRESSION: a source without a relationship note is rejected", () => {
  const errs = validateSource({
    source_type: "go", authority: "primary_official", title: "t", stage: "administrative_sanction",
    extraction: "identified", stance: "supporting",
    document: { download_status: "not_attempted", extraction_status: "not_attempted", extraction_method: "none", text_sha256: null, extraction_confidence: null, human_review: "unreviewed" },
  });
  assert.ok(errs.some((e) => /no relationship note/.test(e)));
});

test("v2 REGRESSION: a relationship note must say what the source does NOT prove", () => {
  const base = {
    source_type: "go", authority: "primary_official", title: "t", stage: "administrative_sanction",
    extraction: "identified", stance: "supporting",
    document: { download_status: "not_attempted", extraction_status: "not_attempted", extraction_method: "none", text_sha256: null, extraction_confidence: null, human_review: "unreviewed" },
    relationship: { supports: "Something substantial here", does_not_prove: "", grade_impact: "raises" },
  };
  assert.ok(validateSource(base).some((e) => /does_not_prove/.test(e)));
});

// ---- claim components ------------------------------------------------

test("v2: every record has claim components with grade, confidence and limitations", () => {
  for (const r of EVIDENCE_PILOT) {
    assert.ok(Array.isArray(r.components) && r.components.length > 0, `${r.id}: no components`);
    for (const c of r.components) {
      assert.ok(c.id && c.text && c.status, `${r.id}.${c.id}: incomplete component`);
      assert.ok(GRADE_VALUES.includes(c.grade), `${r.id}.${c.id}: bad grade`);
      assert.ok(CONFIDENCE.includes(c.confidence), `${r.id}.${c.id}: bad confidence`);
      assert.ok(c.limitations.length > 0, `${r.id}.${c.id}: no limitations`);
      for (const i of c.evidence) assert.ok(r.sources[i], `${r.id}.${c.id}: dangling evidence index ${i}`);
    }
  }
});

test("v2 CRITICAL: a parent never inherits its strongest component", () => {
  assert.deepEqual(rollUpMismatches(EVIDENCE_PILOT), []);
  for (const r of EVIDENCE_PILOT) {
    if (r.assessment.grade === "NG") continue;
    const gradeable = r.components.filter((c) => c.grade !== "NG");
    if (gradeable.length < 2) continue;
    const rank = { F: 0, E: 1, D: 2, C: 3, B: 4, A: 5 };
    const best = gradeable.reduce((b, c) => (rank[c.grade] > rank[b] ? c.grade : b), gradeable[0].grade);
    const worst = rollUpGrade(r.components);
    assert.equal(r.assessment.grade, worst, `${r.id}: parent should equal the weakest component`);
    if (best !== worst) {
      assert.notEqual(r.assessment.grade, best, `${r.id}: parent inherited its STRONGEST component`);
    }
  }
});

test("v2 REGRESSION: componentisation demoted the compound claims it should have", () => {
  // These four graded D under v1 because one strong component carried them.
  for (const id of ["ev_hea4", "ev_inf_b15_cumta", "ev_coop_b16_societies", "ev_contested_hospital_completion"]) {
    const r = EVIDENCE_PILOT.find((x) => x.id === id);
    assert.ok(r, `${id} missing`);
    assert.ok(r.components.some((c) => c.grade === "D"), `${id}: expected a D component`);
    assert.equal(r.assessment.grade, "E", `${id}: parent must roll up to the weaker component`);
  }
});

test("v2: rollUpGrade and rollUpConfidence take the weakest/lowest", () => {
  assert.equal(rollUpGrade([{ grade: "A" }, { grade: "D" }, { grade: "B" }]), "D");
  assert.equal(rollUpGrade([{ grade: "NG" }, { grade: "C" }]), "C");
  assert.equal(rollUpGrade([{ grade: "NG" }]), "NG");
  assert.equal(rollUpConfidence([{ confidence: "high" }, { confidence: "low" }]), "low");
  assert.equal(rollUpConfidence([{ confidence: "high" }, { confidence: "medium" }]), "medium");
});

// ---- NG --------------------------------------------------------------

test("v2: NG is used only with a stated reason", () => {
  const ng = EVIDENCE_PILOT.filter((r) => r.assessment.grade === "NG");
  assert.ok(ng.length >= 3, "the pilot should contain non-gradeable subjects");
  for (const r of ng) {
    assert.ok(NG_REASONS.includes(r.assessment.ng_reason), `${r.id}: NG without a valid reason`);
  }
  for (const r of EVIDENCE_PILOT) {
    for (const c of r.components.filter((c) => c.grade === "NG")) {
      assert.ok(NG_REASONS.includes(c.ng_reason), `${r.id}.${c.id}: NG component without a reason`);
    }
  }
});

test("v2 REGRESSION: NG without a reason is rejected", () => {
  const r = EVIDENCE_PILOT.find((x) => x.assessment.grade === "NG");
  const bad = { ...r, id: "bad_ng", assessment: { ...r.assessment, ng_reason: undefined } };
  assert.ok(validateEvidenceRecord(bad).some((e) => /requires ng_reason/.test(e)));
});

// ---- confidence ------------------------------------------------------

test("v2: grade and confidence are separate, each with its own rationale", () => {
  for (const r of EVIDENCE_PILOT) {
    assert.ok(CONFIDENCE.includes(r.assessment.confidence), `${r.id}: no confidence`);
    assert.ok(r.assessment.confidence_rationale?.length >= 20, `${r.id}: no confidence rationale`);
    assert.notEqual(r.assessment.confidence_rationale, r.assessment.rationale,
      `${r.id}: confidence rationale duplicates the grade rationale`);
  }
  // The two dimensions must actually vary independently in the corpus.
  const pairs = new Set(EVIDENCE_PILOT.map((r) => `${r.assessment.grade}/${r.assessment.confidence}`));
  assert.ok(pairs.size >= 3, "grade and confidence should not move in lockstep");
});

test("v2 REGRESSION: a missing confidence is rejected", () => {
  const r = { ...EVIDENCE_PILOT[0], id: "noconf", assessment: { ...EVIDENCE_PILOT[0].assessment, confidence: undefined } };
  assert.ok(validateEvidenceRecord(r).some((e) => /assessmentConfidence missing/.test(e)));
});

// ---- document lifecycle ---------------------------------------------

test("v2: every source tracks its document lifecycle", () => {
  for (const r of EVIDENCE_PILOT) {
    for (const [i, s] of r.sources.entries()) {
      const d = s.document;
      assert.ok(d, `${r.id}.sources[${i}]: no document block`);
      assert.ok(DOWNLOAD_STATUS.includes(d.download_status));
      assert.ok(EXTRACTION_STATUS.includes(d.extraction_status));
      assert.ok(HUMAN_REVIEW.includes(d.human_review));
    }
  }
});

test("v2 CRITICAL: a failed extraction can never be quoted", () => {
  for (const r of EVIDENCE_PILOT) {
    for (const s of r.sources) {
      if (s.quote) {
        assert.ok(isQuotable(s), `${r.id}: quote present but extraction did not succeed`);
        assert.equal(s.document.extraction_status, "success");
        assert.ok(s.document.text_sha256, "a quote needs the hash of the extracted text");
      }
    }
  }
  // and the validator rejects the forgery
  const forged = {
    source_type: "audit", authority: "audit", title: "t", stage: "independent_audit",
    extraction: "quoted", stance: "contrary", url: "https://cag.gov.in/x.pdf",
    quote: "Something that was never actually extracted from the document.",
    relationship: { supports: "Something substantial", does_not_prove: "Something else substantial", grade_impact: "caps" },
    document: { download_status: "success", extraction_status: "failed", extraction_method: "pdftotext", text_sha256: null, extraction_confidence: null, human_review: "reviewed" },
  };
  assert.ok(validateSource(forged).some((e) => /failed extraction must never be quoted/.test(e)));
});

test("v2 REGRESSION: extraction cannot succeed without a download", () => {
  const errs = validateDocument({
    download_status: "failed", extraction_status: "success", extraction_method: "pdftotext",
    text_sha256: "abc", extraction_confidence: "high", human_review: "reviewed",
  }, "x");
  assert.ok(errs.some((e) => /extraction_status "success" but download_status/.test(e)));
});

test("v2 REGRESSION: successful extraction requires method, hash and confidence", () => {
  const errs = validateDocument({
    download_status: "success", extraction_status: "success", extraction_method: "none",
    text_sha256: null, extraction_confidence: null, human_review: "unreviewed",
  }, "x");
  assert.ok(errs.some((e) => /no text_sha256/.test(e)));
  assert.ok(errs.some((e) => /no method recorded/.test(e)));
  assert.ok(errs.some((e) => /extraction_confidence is missing/.test(e)));
});

test("v2: the CAG evidence is genuinely extracted, not asserted", () => {
  const cag = EVIDENCE_PILOT.flatMap((r) => r.sources).filter((s) => s.authority === "audit" && s.quote);
  assert.ok(cag.length >= 5, "expected the CAG passages");
  for (const s of cag) {
    assert.equal(s.document.download_status, "success");
    assert.equal(s.document.extraction_status, "success");
    assert.equal(s.document.extraction_method, "pdftotext");
    assert.equal(s.document.human_review, "reviewed");
    assert.match(s.document.text_sha256, /^[0-9a-f]{64}$/);
  }
});

// ---- grading consistency --------------------------------------------

test("v2 CRITICAL: no component claims a grade its own evidence cannot support", () => {
  assert.deepEqual(componentMismatches(EVIDENCE_PILOT), []);
});

test("v2: gradeFromSources never returns above D without independent support", () => {
  const goOnly = [{ source_type: "go", authority: "primary_official", stance: "supporting", stage: "administrative_sanction", extraction: "identified" }];
  assert.equal(gradeFromSources(goOnly), "D");
  const contraryAudit = [{ source_type: "audit", authority: "audit", stance: "contrary", stage: "outcome", extraction: "quoted" }];
  assert.equal(gradeFromSources(contraryAudit), "E", "contrary independent evidence must never lift a grade");
});
