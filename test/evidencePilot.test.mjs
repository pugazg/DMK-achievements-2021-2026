import test from "node:test";
import assert from "node:assert/strict";
import { EVIDENCE_PILOT, PILOT_META } from "../src/data/evidencePilot.js";
import {
  validateEvidenceRecord, validateSource, gradeFromEvidence, gradeMismatches,
  summarise, isIndependentlyEvidenced, SOURCE_TYPES, AUTHORITIES, STAGES, EXTRACTION, STANCE,
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
    assert.ok(GRADES[r.assessment.grade], `${r.id}: grade "${r.assessment.grade}" is not on the ladder`);
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
    assert.ok(s.note && /name|scheme|state-level/i.test(s.note),
      `audit source "${s.reference || s.title}" does not state its scope`);
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
