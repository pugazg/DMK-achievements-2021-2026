// Compare the second-pass assessment against the first and classify every
// disagreement. Writes docs/EVIDENCE_ADVERSARIAL_REVIEW.md.
//
// Run: npm run reviewer-compare
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { EVIDENCE_PILOT } from "../src/data/evidencePilot.js";
import { SECOND_PASS, REVIEW_META } from "../src/data/evidenceReview.js";
import { rollUpGrade, rollUpConfidence } from "../src/lib/evidenceRecord.js";
import { VERSION } from "../src/lib/version.js";

/* Generated documents must be REPRODUCIBLE: regenerating them without a data
   change must produce byte-identical output, or CI's drift check fails every
   day the clock rolls over. So the stamp comes from the data's own version,
   not from the wall clock. */

/* Disagreement taxonomy from the phase brief. */
export const CLASSES = {
  A: "Schema problem — the model permits or forces the wrong answer",
  B: "Evidence interpretation problem — same rules, different reading of a document",
  C: "Insufficient documentation — the guidance does not say which answer is right",
  D: "Normal expert judgement difference — both readings defensible",
};

/* Which class a disagreement falls into is itself a judgement, so each is
   recorded with its reasoning rather than inferred from the diff shape. */
const CLASSIFICATION = {
  ev_hea4: { class: "A", why: "The model lets a reviewer create a component for something the claim presupposes rather than asserts, giving supporting evidence a home and producing a D-grade component nobody disputed. Nothing in the schema or the rules forbids it." },
  ev_coop_b16_societies: { class: "A", why: "Same defect as ev_hea4: a 'legislative' component restates an easier claim than the one made. The schema has no rule tying components to assertions." },
  ev_wom_b2_gender: { class: "C", why: "The guide defines NG as 'no measurable criteria' but does not say that an unquantified service claim qualifies. Both passes read the same rule and reached opposite answers; the rule is underspecified, not misapplied." },
  ev_promise_4: { class: "A", why: "The model allowed a compound promise to be graded as a single NG component, flattening an assessable half into a non-assessable whole — the exact failure the component model was built to prevent, in the opposite direction. No rule required the split." },
  ev_contested_hospital_completion: { class: "B", why: "Both passes read the same pay-ward GO. One took it as evidence of the operating state (D), the other held that the claim asserts completion and inference from a related unread document caps at E. A genuine difference in reading the document's bearing." },
  ev_promise_17: { class: "C", why: "The guide ties confidence to the evidence but does not say whether the claim TYPE may raise it. First pass reasoned from claim type, second from document state. The guide does not adjudicate." },
  ev_soc_b7_hostels: { class: "C", why: "Whether an unread page reference supports medium or low confidence is not stated anywhere. Both readings are consistent with the written rule." },
  ev_rur_b2_housing: { class: "C", why: "Whether a conspicuously absent document (no GO for a flagship scheme) lowers confidence, or is merely neutral, is not stated." },
};

const byId = Object.fromEntries(EVIDENCE_PILOT.map((r) => [r.id, r]));

const compare = () =>
  SECOND_PASS.map((s) => {
    const o = byId[s.id];
    const firstComponents = o.components.map((c) => c.id);
    const secondComponents = s.components.map((c) => c.id);

    const gradeSame = o.assessment.grade === s.grade;
    const confSame = o.assessment.confidence === s.confidence;
    const splitSame =
      firstComponents.length === secondComponents.length &&
      firstComponents.every((id) => secondComponents.includes(id));

    // Component-level grade/confidence differences, on shared component ids.
    const shared = firstComponents.filter((id) => secondComponents.includes(id));
    const compGradeDiffs = shared.filter(
      (id) => o.components.find((c) => c.id === id).grade !== s.components.find((c) => c.id === id).grade,
    );
    const compConfDiffs = shared.filter(
      (id) => o.components.find((c) => c.id === id).confidence !== s.components.find((c) => c.id === id).confidence,
    );

    const agreed = gradeSame && confSame && splitSame && !compGradeDiffs.length && !compConfDiffs.length;

    return {
      id: s.id,
      subject_type: o.subject_type,
      first: { grade: o.assessment.grade, confidence: o.assessment.confidence, components: firstComponents },
      second: { grade: s.grade, confidence: s.confidence, components: secondComponents },
      gradeSame, confSame, splitSame,
      compGradeDiffs, compConfDiffs, agreed,
      classification: agreed ? null : CLASSIFICATION[s.id] || { class: "D", why: "Unclassified difference." },
      reviewerNotes: s.reviewerNotes,
      // The roll-up must hold for the second pass too, or the review itself is invalid.
      rollUpOk:
        s.grade === (s.components.every((c) => c.grade === "NG") ? "NG" : rollUpGrade(s.components)) &&
        s.confidence === rollUpConfidence(s.components),
    };
  });

export const RESULTS = compare();

export const STATS = {
  total: RESULTS.length,
  exactMatches: RESULTS.filter((r) => r.agreed).length,
  gradeDiffs: RESULTS.filter((r) => !r.gradeSame).length,
  confidenceDiffs: RESULTS.filter((r) => !r.confSame).length,
  splitDiffs: RESULTS.filter((r) => !r.splitSame).length,
  componentGradeDiffs: RESULTS.reduce((n, r) => n + r.compGradeDiffs.length, 0),
  componentConfDiffs: RESULTS.reduce((n, r) => n + r.compConfDiffs.length, 0),
  byClass: RESULTS.filter((r) => !r.agreed).reduce((a, r) => ((a[r.classification.class] = (a[r.classification.class] || 0) + 1), a), {}),
  rollUpFailures: RESULTS.filter((r) => !r.rollUpOk).map((r) => r.id),
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const pct = (n) => `${((100 * n) / STATS.total).toFixed(0)}%`;
  const dis = RESULTS.filter((r) => !r.agreed);

  const md = `# Evidence Model — Adversarial Review (Phase C0.6)

**Generated:** ${VERSION.dataUpdated} by \`scripts/reviewer_compare.mjs\`.
**Do not hand-edit** — re-run the script.
**Packets:** \`docs/reviewer_packets/packets.json\` (blinded) ·
**Second pass:** \`src/data/evidenceReview.js\` ·
**Guide:** [\`EVIDENCE_REVIEWER_GUIDE.md\`](EVIDENCE_REVIEWER_GUIDE.md)

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
demonstrated is that the ruleset contains at least ${Object.keys(STATS.byClass).length} classes of defect, listed below.

## Result

| Measure | Count | Share |
|---|---|---|
| Subjects reviewed | ${STATS.total} | — |
| **Exact matches** (grade, confidence and split all identical) | **${STATS.exactMatches}** | ${pct(STATS.exactMatches)} |
| **Any disagreement** | **${STATS.total - STATS.exactMatches}** | ${pct(STATS.total - STATS.exactMatches)} |
| Parent grade differs | ${STATS.gradeDiffs} | ${pct(STATS.gradeDiffs)} |
| Parent confidence differs | ${STATS.confidenceDiffs} | ${pct(STATS.confidenceDiffs)} |
| Component split differs | ${STATS.splitDiffs} | ${pct(STATS.splitDiffs)} |
| Component-level grade differences | ${STATS.componentGradeDiffs} | — |
| Component-level confidence differences | ${STATS.componentConfDiffs} | — |
| Second-pass roll-up rule violations | ${STATS.rollUpFailures.length} | — |

### Disagreements by class

| Class | Meaning | Count |
|---|---|---|
${Object.entries(CLASSES)
  .map(([k, v]) => `| **${k}** | ${v} | ${STATS.byClass[k] || 0} |`)
  .join("\n")}

${STATS.byClass.A ? `**Class A dominates the grade-level disagreements**, which is the worst
case: it means the schema permits the wrong answer rather than the reviewers
disagreeing about facts.` : ""}

## Every disagreement

${dis
  .map(
    (r) => `### ${r.id} — class ${r.classification.class}

| | First pass | Second pass |
|---|---|---|
| Grade | ${r.first.grade} | **${r.second.grade}**${r.gradeSame ? "" : " ⟵ differs"} |
| Confidence | ${r.first.confidence} | **${r.second.confidence}**${r.confSame ? "" : " ⟵ differs"} |
| Components | ${r.first.components.join(", ")} | ${r.second.components.join(", ")}${r.splitSame ? "" : " ⟵ differs"} |
${r.compGradeDiffs.length ? `| Component grades differ on | — | ${r.compGradeDiffs.join(", ")} |\n` : ""}${r.compConfDiffs.length ? `| Component confidence differs on | — | ${r.compConfDiffs.join(", ")} |\n` : ""}
**Why it is class ${r.classification.class}:** ${r.classification.why}

**Reviewer notes:** ${r.reviewerNotes}`,
  )
  .join("\n\n")}

## Subjects where both passes agreed

${RESULTS.filter((r) => r.agreed).map((r) => `- \`${r.id}\` — ${r.second.grade} / ${r.second.confidence}`).join("\n")}

Agreement here is weak evidence, for the reason in the header. It is recorded for
completeness, not as validation.

## What this changes

The Class A findings are defects in the model, not in the assessments:

1. **Components are not tied to assertions.** A reviewer may create a component
   for something the claim *presupposes* (\`ev_hea4\` "existence") or for an
   easier adjacent claim (\`ev_coop_b16_societies\` "legislative"). Both give
   supporting evidence a home and manufacture a D-grade component for something
   nobody disputed. **Fix: the reviewer guide now requires every component to map
   to an assertion the claim actually makes** (§2 of the guide).

2. **Compound claims can still be flattened — upward into NG.** \`ev_promise_4\`
   collapsed an assessable half ("state languages as official languages") into a
   non-assessable whole. The component model was built to stop exactly this and
   did not, because no rule required the split. **Fix: the guide now requires
   splitting before any NG determination** (§4).

The Class C findings are gaps in the guidance, now closed in the guide:
confidence rules for unread page references, for conspicuously absent documents,
and for whether claim type may raise confidence (§5).

The single Class B finding is a genuine difference in reading a document and is
left standing — it is what expert disagreement looks like when the rules work.
`;

  writeFileSync("docs/EVIDENCE_ADVERSARIAL_REVIEW.md", md);
  console.log(
    `wrote docs/EVIDENCE_ADVERSARIAL_REVIEW.md — ${STATS.exactMatches}/${STATS.total} exact, ` +
      `${STATS.total - STATS.exactMatches} disagreements ${JSON.stringify(STATS.byClass)}`,
  );
  if (STATS.rollUpFailures.length) {
    console.error("second-pass roll-up violations:", STATS.rollUpFailures.join(", "));
    process.exit(1);
  }
}
