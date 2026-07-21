/* ============================================================
   EVIDENCE RECORD — v2 (Phase C0.5 hardening)

   Schema + validators for structured provenance. The pilot corpus
   lives in src/data/evidencePilot.js; the written spec is
   docs/EVIDENCE_MODEL_V2.md.

   WHAT v2 CHANGED, AND WHY (all from the C0 pilot's findings)

   1. RELATIONSHIP NOTES ARE MANDATORY. The pilot found that a
      linked document frequently does not evidence the claim it is
      attached to — two GOs on the Kalaignar hospital concern pay
      wards and staffing, not the 1,000-bed claim. A source may no
      longer be attached without stating what it supports, what it
      does NOT prove, and what it does to the grade.

   2. CLAIM COMPONENTS. Most subjects are compound ("6 done · 10
      planned"). One grade per compound claim is the same flattening
      the artefact audit criticised in the manifesto statuses. A
      parent NEVER inherits its strongest component — it rolls up to
      the WEAKEST, because a claim is only as good as its weakest
      delivered part.

   3. NG (not gradeable). Some promises have no fulfilment criterion
      or depend on an authority other than the one promising. Forcing
      them onto a delivery ladder is a category error.

   4. GRADE ≠ CONFIDENCE. Grade says which rung of the evidence
      ladder is reached. Confidence says how sure we are that it is
      reached. "Sanctioned, with the GO in hand" and "sanctioned,
      inferred from a related order" are both D and are not equally
      certain.

   5. DOCUMENT LIFECYCLE. The pilot's fallback PDF parser produced
      convincing-looking garbage rather than failing. Every document
      now tracks download and extraction separately, with a method,
      a text hash and a confidence — and failed extraction is a
      valid terminal state that can never be silently quoted from.
   ============================================================ */

export const SOURCE_TYPES = [
  "manifesto", "announcement", "go", "budget", "tender", "work_order",
  "completion_record", "audit", "outcome_dataset", "legislation",
  "gazette", "press_release", "assembly", "external_tracker", "other",
];

export const AUTHORITIES = [
  "primary_official",      // the department claiming the achievement
  "independent_official",  // a different official body counting the same thing
  "legislative", "judicial", "audit", "party_source", "news_source",
  "external_tracker", "other",
];

export const STAGES = [
  "manifesto", "announcement", "administrative_sanction", "budget_allocation",
  "revised_allocation", "tender", "contract_award", "work_order", "expenditure",
  "physical_progress", "completion", "beneficiary_delivery", "outcome",
  "independent_audit", "court_or_regulatory_record", "context_only",
];

/* How far we have got with the document itself. */
export const EXTRACTION = [
  "identified",   // known to exist; nobody has opened it
  "retrieved",    // fetched and hashed; contents not read
  "parsed",       // text extracted and read
  "quoted",       // a specific passage read and quoted here
  "failed",       // retrieved but could not be read — see document.extraction_status
  "unavailable",  // sought and could not be obtained; note says why
];

export const STANCE = ["supporting", "contrary", "contextual"];

/* v2: the full grade ladder, including NG. */
export const GRADE_VALUES = ["A", "B", "C", "D", "E", "F", "NG"];

/* Ranked weakest-first for roll-up. NG sits outside the ordering: a
   compound claim with a non-gradeable component is not thereby
   ungradeable, but the component itself stays NG. */
const GRADE_RANK = { F: 0, E: 1, D: 2, C: 3, B: 4, A: 5 };

export const CONFIDENCE = ["high", "medium", "low"];
const CONFIDENCE_RANK = { low: 0, medium: 1, high: 2 };

/* v2: document lifecycle vocabularies. */
export const DOWNLOAD_STATUS = ["not_attempted", "success", "failed", "blocked", "corrupt"];
export const EXTRACTION_STATUS = ["not_attempted", "success", "partial", "failed", "unsupported_format"];
export const EXTRACTION_METHOD = ["pdftotext", "html_parse", "manual_transcription", "ocr", "none"];
export const HUMAN_REVIEW = ["unreviewed", "spot_checked", "reviewed"];

/* Reasons a subject may be NG. Requires one of these to be named. */
export const NG_REASONS = [
  "no_measurable_criteria",
  "not_objectively_assessable",
  "aspirational",
  "responsible_authority_unclear",
];

const INDEPENDENT = new Set(["independent_official", "audit", "judicial"]);
const READ = new Set(["parsed", "quoted"]);

/* Independent scrutiny of any kind — supporting OR contrary. Display and
   coverage counting only. NOT a grading gate. */
export const hasIndependentScrutiny = (s) =>
  INDEPENDENT.has(s.authority) && READ.has(s.extraction);

/* The grading gate. An independent source lifts a grade only if it actually
   SUPPORTS the claim. C0 found the earlier version let contrary audit
   evidence unlock a higher grade — adverse evidence must never be a route
   to "verified". */
export const isIndependentlyEvidenced = (s) =>
  hasIndependentScrutiny(s) && s.stance === "supporting";

export const hasContraryIndependent = (r) =>
  (r.sources || []).some((s) => hasIndependentScrutiny(s) && s.stance === "contrary");

/* A source whose text may legitimately be quoted. Guards lesson 5: a failed
   or unattempted extraction can never back a quote. */
export const isQuotable = (s) =>
  s.extraction === "quoted" &&
  s.document?.extraction_status === "success" &&
  !!s.document?.text_sha256;

// ---------------------------------------------------------------
// validation
// ---------------------------------------------------------------

const REQUIRED_SOURCE = ["source_type", "authority", "title", "extraction", "stance", "stage"];
const REQUIRED_REL = ["supports", "does_not_prove", "grade_impact"];
export const GRADE_IMPACT = ["raises", "supports_current", "caps", "lowers", "none"];

export function validateDocument(d, path) {
  const errs = [];
  if (!d) return [`${path}: missing document lifecycle block`];
  if (!DOWNLOAD_STATUS.includes(d.download_status)) errs.push(`${path}.document: bad download_status "${d.download_status}"`);
  if (!EXTRACTION_STATUS.includes(d.extraction_status)) errs.push(`${path}.document: bad extraction_status "${d.extraction_status}"`);
  if (d.extraction_method && !EXTRACTION_METHOD.includes(d.extraction_method)) {
    errs.push(`${path}.document: bad extraction_method "${d.extraction_method}"`);
  }
  if (!HUMAN_REVIEW.includes(d.human_review)) errs.push(`${path}.document: bad human_review "${d.human_review}"`);
  if (d.extraction_status === "success") {
    if (!d.text_sha256) errs.push(`${path}.document: extraction succeeded but no text_sha256 recorded`);
    if (!d.extraction_method || d.extraction_method === "none") {
      errs.push(`${path}.document: extraction succeeded but no method recorded`);
    }
    if (!CONFIDENCE.includes(d.extraction_confidence)) {
      errs.push(`${path}.document: extraction succeeded but extraction_confidence is missing`);
    }
  }
  // A download that never happened cannot have produced text.
  if (d.download_status !== "success" && d.extraction_status === "success") {
    errs.push(`${path}.document: extraction_status "success" but download_status is "${d.download_status}"`);
  }
  return errs;
}

export function validateSource(s, path = "source") {
  const errs = [];
  for (const f of REQUIRED_SOURCE) if (!s[f]) errs.push(`${path}: missing required field "${f}"`);
  if (s.source_type && !SOURCE_TYPES.includes(s.source_type)) errs.push(`${path}: unknown source_type "${s.source_type}"`);
  if (s.authority && !AUTHORITIES.includes(s.authority)) errs.push(`${path}: unknown authority "${s.authority}"`);
  if (s.stage && !STAGES.includes(s.stage)) errs.push(`${path}: unknown stage "${s.stage}"`);
  if (s.extraction && !EXTRACTION.includes(s.extraction)) errs.push(`${path}: unknown extraction "${s.extraction}"`);
  if (s.stance && !STANCE.includes(s.stance)) errs.push(`${path}: unknown stance "${s.stance}"`);

  // v2 §1 — the relationship note is mandatory and must be substantive.
  const rel = s.relationship;
  if (!rel) {
    errs.push(`${path}: no relationship note — a source may not be attached without stating what it supports and what it does not prove`);
  } else {
    // `supports` and `does_not_prove` are prose and must be substantive.
    for (const f of ["supports", "does_not_prove"]) {
      if (!rel[f] || String(rel[f]).trim().length < 12) {
        errs.push(`${path}.relationship: "${f}" missing or too short to be meaningful`);
      }
    }
    // `grade_impact` is a controlled value, not prose.
    if (!GRADE_IMPACT.includes(rel.grade_impact)) {
      errs.push(`${path}.relationship: grade_impact must be one of ${GRADE_IMPACT.join("|")}`);
    }
    if (rel.component_id !== undefined && typeof rel.component_id !== "string") {
      errs.push(`${path}.relationship: component_id must be a string when present`);
    }
  }

  // v2 §5 — document lifecycle
  errs.push(...validateDocument(s.document, path));

  // Quoting rules: a quote must be backed by a successful extraction.
  if (s.extraction === "quoted") {
    if (!s.quote) errs.push(`${path}: extraction "quoted" but no quote provided`);
    if (!isQuotable(s)) {
      errs.push(`${path}: quoted, but the document's extraction did not succeed with a recorded text hash — a failed extraction must never be quoted`);
    }
  }
  if (s.extraction === "failed" && s.quote) {
    errs.push(`${path}: extraction failed but a quote is present`);
  }
  if (READ.has(s.extraction) && !s.url && !s.document_no) {
    errs.push(`${path}: read but has neither url nor document_no`);
  }
  if (s.url && !/^https?:\/\//.test(s.url)) errs.push(`${path}: url is not http(s)`);
  return errs;
}

export function validateComponent(c, path, sourceIds) {
  const errs = [];
  if (!c.id) errs.push(`${path}: component has no id`);
  if (!c.text || c.text.length < 10) errs.push(`${path}: component text missing or too short`);
  if (!c.status) errs.push(`${path}: component has no status`);
  if (!GRADE_VALUES.includes(c.grade)) errs.push(`${path}: bad component grade "${c.grade}"`);
  if (!CONFIDENCE.includes(c.confidence)) errs.push(`${path}: component confidence missing or invalid`);
  if (!Array.isArray(c.limitations) || c.limitations.length === 0) {
    errs.push(`${path}: component must state at least one limitation`);
  }
  if (!Array.isArray(c.evidence)) errs.push(`${path}: component.evidence must be an array of source indices`);
  else {
    for (const i of c.evidence) {
      if (!sourceIds.has(i)) errs.push(`${path}: evidence index ${i} does not match a source on this record`);
    }
  }
  if (c.grade === "NG" && !NG_REASONS.includes(c.ng_reason)) {
    errs.push(`${path}: grade NG requires ng_reason one of ${NG_REASONS.join("|")}`);
  }
  return errs;
}

export function validateEvidenceRecord(r) {
  const errs = [];
  const id = r?.id || "(no id)";
  if (!r || typeof r !== "object") return [`${id}: not an object`];

  for (const f of ["id", "subject_type", "subject_id", "claim"]) {
    if (!r[f]) errs.push(`${id}: missing required field "${f}"`);
  }
  if (!["achievement", "promise", "contested_claim"].includes(r.subject_type)) {
    errs.push(`${id}: subject_type must be achievement | promise | contested_claim`);
  }

  if (!Array.isArray(r.sources) || r.sources.length === 0) {
    errs.push(`${id}: must have at least one source (use extraction "unavailable" if none exists)`);
  } else {
    r.sources.forEach((s, i) => errs.push(...validateSource(s, `${id}.sources[${i}]`)));
  }

  // v2 §2 — components
  const sourceIdx = new Set((r.sources || []).map((_, i) => i));
  if (!Array.isArray(r.components) || r.components.length === 0) {
    errs.push(`${id}: must have at least one claim component`);
  } else {
    r.components.forEach((c, i) => errs.push(...validateComponent(c, `${id}.components[${i}]`, sourceIdx)));
    const ids = r.components.map((c) => c.id);
    if (new Set(ids).size !== ids.length) errs.push(`${id}: component ids must be unique`);
  }

  const a = r.assessment;
  if (!a) errs.push(`${id}: missing assessment`);
  else {
    if (!GRADE_VALUES.includes(a.grade)) errs.push(`${id}: bad grade "${a.grade}"`);
    if (!a.rationale || a.rationale.length < 40) errs.push(`${id}: every grade needs a substantive rationale (>=40 chars)`);
    // v2 §4 — confidence is mandatory and separate from grade.
    if (!CONFIDENCE.includes(a.confidence)) errs.push(`${id}: assessmentConfidence missing or invalid — grade and confidence are separate judgements`);
    if (!a.confidence_rationale || a.confidence_rationale.length < 20) {
      errs.push(`${id}: confidence needs its own rationale, distinct from the grade rationale`);
    }
    if (!Array.isArray(a.limitations) || a.limitations.length === 0) errs.push(`${id}: assessment must state at least one limitation`);
    if (a.verification_status !== "unverified" && a.verification_status !== "manually_reviewed") {
      errs.push(`${id}: verification_status must be "unverified" or "manually_reviewed"`);
    }
    if (a.grade === "NG" && !NG_REASONS.includes(a.ng_reason)) {
      errs.push(`${id}: grade NG requires ng_reason one of ${NG_REASONS.join("|")}`);
    }

    // The invariant the model exists to protect.
    const supported = (r.sources || []).some(isIndependentlyEvidenced);
    if (["A", "B", "C"].includes(a.grade) && !supported) {
      errs.push(
        `${id}: grade ${a.grade} requires a source from an independent_official/audit/judicial authority ` +
        `that has actually been read (extraction parsed|quoted) AND supports the claim. None attached.`,
      );
    }

    // v2 §2 — a parent must never inherit its strongest component.
    if (Array.isArray(r.components) && r.components.length && a.grade !== "NG") {
      const rolled = rollUpGrade(r.components);
      if (rolled && a.grade !== rolled) {
        errs.push(
          `${id}: parent grade "${a.grade}" does not match the weakest-component roll-up "${rolled}". ` +
          `A compound claim is only as strong as its weakest delivered part.`,
        );
      }
      const rc = rollUpConfidence(r.components);
      if (rc && a.confidence !== rc) {
        errs.push(`${id}: parent confidence "${a.confidence}" does not match the lowest component confidence "${rc}"`);
      }
    }
  }

  if (!Array.isArray(r.missing) || r.missing.length === 0) {
    errs.push(`${id}: "missing" must list what evidence is unavailable (an empty list means nobody looked)`);
  }
  return errs;
}

/* Weakest gradeable component wins. NG components are excluded from the
   ordering — a non-gradeable part does not drag a measurable claim down,
   but it is never allowed to lift one either. */
export function rollUpGrade(components) {
  const gradeable = (components || []).filter((c) => c.grade !== "NG" && GRADE_RANK[c.grade] !== undefined);
  if (!gradeable.length) return "NG";
  return gradeable.reduce((worst, c) => (GRADE_RANK[c.grade] < GRADE_RANK[worst] ? c.grade : worst), gradeable[0].grade);
}

/* Lowest component confidence wins, NG included: uncertainty about any part
   is uncertainty about the whole. */
export function rollUpConfidence(components) {
  if (!components?.length) return null;
  return components.reduce(
    (low, c) => (CONFIDENCE_RANK[c.confidence] < CONFIDENCE_RANK[low] ? c.confidence : low),
    components[0].confidence,
  );
}

/* The grade a SET of sources can support. Used per component — never across a
   whole record, because taking the best grade any source supports is exactly
   the "parent inherits its strongest component" behaviour v2 forbids. */
export function gradeFromSources(sources) {
  const src = (sources || []).filter((s) => s.stance === "supporting");
  const has = (pred) => src.some(pred);
  const read = (s) => READ.has(s.extraction);

  if (has((s) => isIndependentlyEvidenced(s) && s.stage === "outcome")) return "A";
  if (has((s) => isIndependentlyEvidenced(s) && ["beneficiary_delivery", "expenditure"].includes(s.stage))) return "B";
  if (has((s) => read(s) && ["tender", "contract_award", "work_order", "physical_progress", "completion"].includes(s.stage))) return "C";
  if (has((s) => ["go", "legislation", "gazette", "budget"].includes(s.source_type) && s.stage !== "context_only")) return "D";
  return "E";
}

/* The grade the record's evidence can support, computed component by
   component and then rolled up to the weakest. NG components are preserved. */
export function gradeFromEvidence(r) {
  if (!r.components?.length) return gradeFromSources(r.sources);
  const perComponent = r.components.map((c) => {
    if (c.grade === "NG") return "NG";
    return gradeFromSources((c.evidence || []).map((i) => r.sources[i]).filter(Boolean));
  });
  return rollUpGrade(perComponent.map((g) => ({ grade: g })));
}

/* Components whose declared grade is stronger than their own evidence supports. */
export const componentMismatches = (records) =>
  records.flatMap((r) =>
    (r.components || [])
      .filter((c) => c.grade !== "NG")
      .map((c) => ({
        id: `${r.id}.${c.id}`,
        declared: c.grade,
        supported: gradeFromSources((c.evidence || []).map((i) => r.sources[i]).filter(Boolean)),
      }))
      .filter((x) => x.declared !== x.supported),
  );

export const gradeMismatches = (records) =>
  records
    .filter((r) => r.assessment?.grade !== "NG")
    .map((r) => ({ id: r.id, asserted: r.assessment?.grade, supported: gradeFromEvidence(r) }))
    .filter((x) => x.asserted !== x.supported);

/* Records whose parent grade does not equal the weakest-component roll-up. */
export const rollUpMismatches = (records) =>
  records
    .filter((r) => r.assessment?.grade !== "NG" && r.components?.length)
    .map((r) => ({ id: r.id, parent: r.assessment.grade, rolled: rollUpGrade(r.components) }))
    .filter((x) => x.parent !== x.rolled);

export const summarise = (records) => {
  const sources = records.flatMap((r) => r.sources);
  return {
    total: records.length,
    bySubject: records.reduce((a, r) => ((a[r.subject_type] = (a[r.subject_type] || 0) + 1), a), {}),
    byGrade: records.reduce((a, r) => ((a[r.assessment.grade] = (a[r.assessment.grade] || 0) + 1), a), {}),
    byConfidence: records.reduce((a, r) => ((a[r.assessment.confidence] = (a[r.assessment.confidence] || 0) + 1), a), {}),
    components: records.reduce((n, r) => n + (r.components?.length || 0), 0),
    compound: records.filter((r) => (r.components?.length || 0) > 1).length,
    notGradeable: records.filter((r) => r.assessment.grade === "NG").length,
    sources: sources.length,
    read: sources.filter((s) => READ.has(s.extraction)).length,
    extractionFailed: sources.filter((s) => s.document?.extraction_status === "failed").length,
    contrary: sources.filter((s) => s.stance === "contrary").length,
    withContrary: records.filter((r) => r.sources.some((s) => s.stance === "contrary")).length,
    independentScrutiny: records.filter((r) => r.sources.some(hasIndependentScrutiny)).length,
    independentSupporting: records.filter((r) => r.sources.some(isIndependentlyEvidenced)).length,
    missingItems: records.reduce((n, r) => n + r.missing.length, 0),
  };
};
