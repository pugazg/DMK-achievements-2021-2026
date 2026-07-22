// Generate blinded reviewer packets from the pilot corpus.
//
// A packet contains everything a reviewer needs to assess a subject and
// NOTHING that reveals the existing assessment: no grade, no confidence, no
// rationale, no component grades, no roll-up. The reviewer sees the claim,
// the evidence with its relationship notes, and the documented rules.
//
// The blinding is enforced, not trusted: assertNoLeak() walks the serialised
// packet and fails if any withheld field survives.
//
// Run: npm run reviewer-packets
import { writeFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { EVIDENCE_PILOT, PILOT_META } from "../src/data/evidencePilot.js";
import { VERSION } from "../src/lib/version.js";

/* Generated documents must be REPRODUCIBLE: regenerating them without a data
   change must produce byte-identical output, or CI's drift check fails every
   day the clock rolls over. So the stamp comes from the data's own version,
   not from the wall clock. */

/* Fields that would anchor a reviewer to the existing judgement. */
const WITHHELD_RECORD = ["assessment"];
const WITHHELD_COMPONENT = ["grade", "confidence", "ng_reason"];
const WITHHELD_SOURCE = ["relationship.grade_impact"];

const packetFor = (r) => ({
  id: r.id,
  subject_type: r.subject_type,
  subject_id: r.subject_id,
  domain: r.domain,
  ...(r.maturity ? { maturity_hint: r.maturity } : {}),

  // 1. the claim as written
  claim: r.claim,

  // 2. component TEXT only — the reviewer must assign grade/confidence and may
  //    disagree with the split itself, so `proposed_components` is explicitly
  //    labelled as a proposal rather than a given.
  proposed_components: r.components.map((c) => ({
    id: c.id,
    text: c.text,
    status: c.status,
    evidence: c.evidence,
    limitations: c.limitations,
  })),

  // 3. the evidence, with relationship notes but WITHOUT grade_impact
  sources: r.sources.map((s, i) => ({
    index: i,
    source_type: s.source_type,
    authority: s.authority,
    stage: s.stage,
    stance: s.stance,
    extraction: s.extraction,
    title: s.title,
    issuing_authority: s.issuing_authority,
    document_no: s.document_no ?? null,
    date: s.date ?? null,
    page: s.page ?? null,
    url: s.url ?? null,
    quote: s.quote ?? null,
    relationship: {
      supports: s.relationship.supports,
      does_not_prove: s.relationship.does_not_prove,
      // grade_impact deliberately withheld
    },
    document: {
      download_status: s.document.download_status,
      extraction_status: s.document.extraction_status,
      extraction_method: s.document.extraction_method,
      extraction_confidence: s.document.extraction_confidence,
      human_review: s.document.human_review,
      text_sha256: s.document.text_sha256,
    },
  })),

  // 4. what is known to be missing
  missing_evidence: r.missing,

  // 5. limitations already recorded at component level (parent limitations
  //    are withheld — they often restate the grade rationale)
  known_limitations: r.components.flatMap((c) => c.limitations),

  reviewer_task: [
    "Assign a grade to each component (A/B/C/D/E/F/NG).",
    "Assign a confidence to each component (high/medium/low).",
    "If NG, name the reason.",
    "Add or remove components if the proposed split is wrong.",
    "List any missing evidence the packet does not already record.",
    "Roll the parent up from the components per the documented rules.",
  ],
});

/* Blinding is enforced rather than assumed. */
export function assertNoLeak(packets, originals) {
  const problems = [];
  const byId = Object.fromEntries(originals.map((r) => [r.id, r]));
  for (const p of packets) {
    const blob = JSON.stringify(p);
    const o = byId[p.id];
    if ("assessment" in p) problems.push(`${p.id}: assessment survived blinding`);
    for (const c of p.proposed_components) {
      for (const f of WITHHELD_COMPONENT) {
        if (f in c) problems.push(`${p.id}.${c.id}: component "${f}" survived blinding`);
      }
    }
    for (const s of p.sources) {
      if (s.relationship && "grade_impact" in s.relationship) {
        problems.push(`${p.id}.sources[${s.index}]: grade_impact survived blinding`);
      }
    }
    // The rationale text often names the grade in prose ("grades E because…").
    if (o?.assessment?.rationale && blob.includes(o.assessment.rationale.slice(0, 60))) {
      problems.push(`${p.id}: assessment rationale text leaked into the packet`);
    }
    if (o?.assessment?.confidence_rationale && blob.includes(o.assessment.confidence_rationale.slice(0, 40))) {
      problems.push(`${p.id}: confidence rationale leaked into the packet`);
    }
  }
  return problems;
}

export const PACKETS = EVIDENCE_PILOT.map(packetFor);

/* The repository path contains spaces, which import.meta.url percent-encodes
   and process.argv[1] does not — so the usual string comparison never matches.
   pathToFileURL normalises both sides. */
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const leaks = assertNoLeak(PACKETS, EVIDENCE_PILOT);
  if (leaks.length) {
    console.error("BLINDING FAILED:");
    leaks.forEach((l) => console.error("  " + l));
    process.exit(1);
  }
  mkdirSync("docs/reviewer_packets", { recursive: true });
  writeFileSync(
    "docs/reviewer_packets/packets.json",
    JSON.stringify(
      {
        generated: VERSION.dataUpdated,
        pilot_version: PILOT_META.version,
        blinded_fields: { record: WITHHELD_RECORD, component: WITHHELD_COMPONENT, source: WITHHELD_SOURCE },
        note:
          "Grades, confidences, rationales and grade_impact are withheld. A reviewer works from the claim, the evidence and the documented rules only.",
        count: PACKETS.length,
        packets: PACKETS,
      },
      null,
      1,
    ) + "\n",
  );
  console.log(`wrote docs/reviewer_packets/packets.json — ${PACKETS.length} blinded packets, 0 leaks`);
}
