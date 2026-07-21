/* ============================================================
   EVIDENCE RECORD — the structured provenance object that
   docs/EVIDENCE_MODEL.md describes but the dataset never had.

   Phase C0 pilot. This is the schema plus its validators; the
   pilot corpus itself lives in src/data/evidencePilot.js.

   Design rules, learned from the audits that preceded this:

   1. A source is a CITATION, not a claim. Every source states
      what document it is, who issued it, and whether anyone has
      actually read it (`extraction`). "We know this document
      exists" and "we have read this document" are different
      facts and must never collapse into one.

   2. Missing evidence is DATA, not absence of data. A record
      with an empty `missing` array is suspicious, not clean —
      it means nobody looked. The UI renders `missing` as
      prominently as the sources.

   3. Adverse evidence is first-class. `sources[].stance` marks a
      document as supporting, contrary or contextual. A record
      whose sources are all `supporting` has not been researched,
      it has been confirmed — which is a different and weaker
      thing.

   4. Nothing may become "verified" implicitly. `assessment.grade`
      is asserted against the evidence actually attached, by
      gradeFromEvidence(). A grade above D requires an
      independent_official / audit authority source that has been
      READ. There is no other route.
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

/* Where in the delivery lifecycle a document sits. Mirrors
   EVIDENCE_STAGES in evidence.js; kept here so a source can name its
   own stage independently of the record's overall assessment. */
export const STAGES = [
  "manifesto", "announcement", "administrative_sanction", "budget_allocation",
  "revised_allocation", "tender", "contract_award", "work_order", "expenditure",
  "physical_progress", "completion", "beneficiary_delivery", "outcome",
  "independent_audit", "court_or_regulatory_record", "context_only",
];

/* How far this project has actually got with the document.
   The distinction between `identified` and `parsed` is the whole
   difference between a bibliography and evidence. */
export const EXTRACTION = [
  "identified",   // we know it exists and where; nobody has opened it
  "retrieved",    // fetched and hashed; contents not read
  "parsed",       // text extracted and read
  "quoted",       // a specific passage has been read and quoted here
  "unavailable",  // sought and could not be obtained; `note` says why
];

export const STANCE = ["supporting", "contrary", "contextual"];

/* Only these authorities can lift a record above grade D, and only
   when the document has actually been read. */
const INDEPENDENT = new Set(["independent_official", "audit", "judicial"]);
const READ = new Set(["parsed", "quoted"]);

/* Independent scrutiny of any kind — supporting OR contrary. Used for
   display ("has this been looked at by anyone outside the department?")
   and for counting adverse coverage. NOT a grading gate. */
export const hasIndependentScrutiny = (s) =>
  INDEPENDENT.has(s.authority) && READ.has(s.extraction);

/* The grading gate. An independent source can only lift a grade if it
   actually SUPPORTS the claim.

   The C0 pilot caught this: the first version asked only whether an
   independent read source existed, so attaching a CONTRARY audit finding
   made a higher grade easier to justify. That is precisely backwards —
   adverse evidence must never be a route to "verified". A contrary
   independent source can lower a grade toward F; it can never raise one. */
export const isIndependentlyEvidenced = (s) =>
  hasIndependentScrutiny(s) && s.stance === "supporting";

/* True when independent scrutiny exists and contradicts the claim. */
export const hasContraryIndependent = (r) =>
  (r.sources || []).some((s) => hasIndependentScrutiny(s) && s.stance === "contrary");

/* ---------------- validation ----------------
   Returns [] when valid, otherwise a list of human-readable problems.
   Used by test/evidencePilot.test.mjs and scripts/validate.mjs. */

const REQUIRED_SOURCE = ["source_type", "authority", "title", "extraction", "stance"];

export function validateSource(s, path = "source") {
  const errs = [];
  for (const f of REQUIRED_SOURCE) {
    if (!s[f]) errs.push(`${path}: missing required field "${f}"`);
  }
  if (s.source_type && !SOURCE_TYPES.includes(s.source_type)) errs.push(`${path}: unknown source_type "${s.source_type}"`);
  if (s.authority && !AUTHORITIES.includes(s.authority)) errs.push(`${path}: unknown authority "${s.authority}"`);
  if (s.stage && !STAGES.includes(s.stage)) errs.push(`${path}: unknown stage "${s.stage}"`);
  if (s.extraction && !EXTRACTION.includes(s.extraction)) errs.push(`${path}: unknown extraction "${s.extraction}"`);
  if (s.stance && !STANCE.includes(s.stance)) errs.push(`${path}: unknown stance "${s.stance}"`);
  // A quoted source must actually carry the quote it claims to have read.
  if (s.extraction === "quoted" && !s.quote) errs.push(`${path}: extraction "quoted" but no quote provided`);
  // Anything retrieved or better must say where it came from.
  if (READ.has(s.extraction) && !s.url && !s.document_no) {
    errs.push(`${path}: read but has neither url nor document_no`);
  }
  if (s.url && !/^https?:\/\//.test(s.url)) errs.push(`${path}: url is not http(s)`);
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

  // sources
  if (!Array.isArray(r.sources) || r.sources.length === 0) {
    errs.push(`${id}: must have at least one source (use extraction "unavailable" if none exists)`);
  } else {
    r.sources.forEach((s, i) => errs.push(...validateSource(s, `${id}.sources[${i}]`)));
  }

  // assessment
  const a = r.assessment;
  if (!a) errs.push(`${id}: missing assessment`);
  else {
    if (!a.grade) errs.push(`${id}: assessment has no grade`);
    if (!a.rationale || a.rationale.length < 40) {
      errs.push(`${id}: every grade needs a substantive rationale (>=40 chars)`);
    }
    if (!Array.isArray(a.limitations) || a.limitations.length === 0) {
      errs.push(`${id}: assessment must state at least one limitation`);
    }
    if (a.verification_status !== "unverified" && a.verification_status !== "manually_reviewed") {
      errs.push(`${id}: verification_status must be "unverified" or "manually_reviewed"`);
    }
    // The invariant the whole model exists to protect.
    const supported = (r.sources || []).some(isIndependentlyEvidenced);
    if (["A", "B", "C"].includes(a.grade) && !supported) {
      errs.push(
        `${id}: grade ${a.grade} requires a source from an independent_official/audit/judicial authority ` +
        `that has actually been read (extraction parsed|quoted). None attached.`,
      );
    }
  }

  // missing evidence must be explicit
  if (!Array.isArray(r.missing) || r.missing.length === 0) {
    errs.push(`${id}: "missing" must list what evidence is unavailable (an empty list means nobody looked)`);
  }
  return errs;
}

/* The grade the attached evidence can actually support. Deliberately
   conservative and independent of whatever the record asserts, so a
   mismatch between the two is detectable. */
export function gradeFromEvidence(r) {
  const src = r.sources || [];
  const has = (pred) => src.some(pred);
  const read = (s) => READ.has(s.extraction);

  if (has((s) => isIndependentlyEvidenced(s) && s.stage === "outcome")) return "A";
  if (has((s) => isIndependentlyEvidenced(s) && ["beneficiary_delivery", "expenditure"].includes(s.stage))) return "B";
  if (has((s) => read(s) && ["tender", "contract_award", "work_order", "physical_progress", "completion"].includes(s.stage))) return "C";
  if (has((s) => ["go", "legislation", "gazette", "budget"].includes(s.source_type) && s.stage !== "context_only")) return "D";
  return "E";
}

/* Records whose asserted grade differs from what the evidence supports.
   Any output here is a bug in the corpus, not a judgement call. */
export const gradeMismatches = (records) =>
  records
    .map((r) => ({ id: r.id, asserted: r.assessment?.grade, supported: gradeFromEvidence(r) }))
    .filter((x) => x.asserted !== x.supported);

export const summarise = (records) => ({
  total: records.length,
  bySubject: records.reduce((a, r) => ((a[r.subject_type] = (a[r.subject_type] || 0) + 1), a), {}),
  byGrade: records.reduce((a, r) => ((a[r.assessment.grade] = (a[r.assessment.grade] || 0) + 1), a), {}),
  sources: records.reduce((n, r) => n + r.sources.length, 0),
  read: records.reduce((n, r) => n + r.sources.filter((s) => READ.has(s.extraction)).length, 0),
  contrary: records.reduce((n, r) => n + r.sources.filter((s) => s.stance === "contrary").length, 0),
  withContrary: records.filter((r) => r.sources.some((s) => s.stance === "contrary")).length,
  independentScrutiny: records.filter((r) => r.sources.some(hasIndependentScrutiny)).length,
  independentSupporting: records.filter((r) => r.sources.some(isIndependentlyEvidenced)).length,
  missingItems: records.reduce((n, r) => n + r.missing.length, 0),
});
