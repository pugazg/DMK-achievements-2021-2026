import { GO_LINKS } from "../data/govorders.js";
import { LEGISLATION } from "../data/legislation.js";

/* ============================================================
   EVIDENCE MODEL — stages, authorities and grades.
   Full schema: docs/EVIDENCE_MODEL.md. The grade ladder is:

   A — Outcome verified    independent official dataset or audit confirms outcome
   B — Delivery verified   expenditure + beneficiary/completion records available
   C — Execution verified  tender/contract/work-order/physical-progress evidence
   D — Sanctioned          Government Order / administrative sanction / allocation
   E — Announced           government-reported publication (souvenir, speech, PR)
   F — Unsupported         adequate support absent, or reliable contrary evidence

   AUTO-GRADING IS DELIBERATELY CONSERVATIVE. The embedded corpus
   is quoted from government-published summary material, so no
   record is auto-graded above D. A/B/C require document-level
   evidence records that do not yet exist in this dataset. Every
   auto grade is marked unverified pending manual review.
   ============================================================ */

export const EVIDENCE_STAGES = [
  "manifesto", "announcement", "administrative_sanction", "budget_allocation",
  "revised_allocation", "tender", "contract_award", "work_order", "expenditure",
  "physical_progress", "completion", "beneficiary_delivery", "outcome",
  "independent_audit", "court_or_regulatory_record", "context_only",
];

export const SOURCE_AUTHORITIES = [
  "primary_official", "independent_official", "legislative", "judicial",
  "audit", "party_source", "news_source", "social_media", "other",
];

export const GRADES = {
  A: { label: "A · Outcome verified",   color: "#22c55e" },
  B: { label: "B · Delivery verified",  color: "#4ade80" },
  C: { label: "C · Execution verified", color: "#0891b2" },
  D: { label: "D · Sanctioned",         color: "#c9a84c" },
  E: { label: "E · Gov-reported",       color: "#8a8aa0" },
  F: { label: "F · Unsupported",        color: "#c0392b" },
};

// record ids that a Government Order names directly (scheme-linked GOs)
const GO_BACKED = new Set(GO_LINKS.flatMap((g) => g.records || []));
// record ids linked from a gazetted Act/Bill
const LAW_BACKED = new Set(LEGISLATION.flatMap((l) => l.records || []));

/* Conservative automatic grade for an achievement record.
   Never exceeds D; always flagged as pending manual review. */
export function gradeRecord(rec) {
  if (GO_BACKED.has(rec.id)) {
    return {
      grade: "D",
      rationale: "A Government Order in the Orders section names this scheme — administrative sanction exists. Delivery and outcome are reported by the government source but not independently verified here.",
      auto: true, verificationStatus: "unverified",
    };
  }
  if (LAW_BACKED.has(rec.id)) {
    return {
      grade: "D",
      rationale: "A gazetted legislative instrument relates to this record — a statutory basis exists. Delivery and outcome are reported by the government source but not independently verified here.",
      auto: true, verificationStatus: "unverified",
    };
  }
  return {
    grade: "E",
    rationale: "Sourced from the government's own published record (souvenir / summary volumes). This is government-reported evidence of an announcement or claim; it has not been independently verified against primary delivery or outcome documents.",
    auto: true, verificationStatus: "unverified",
  };
}
