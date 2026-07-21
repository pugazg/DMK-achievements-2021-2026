// Generate docs/EVIDENCE_REMEDIATION_QUEUE.md — the evidence-quality gap register.
//
// Classifies every record and promise by what evidence this project actually
// holds for it. DIAGNOSTIC ONLY: it changes no data and fixes nothing.
// Run: node scripts/evidence_queue.mjs
import { writeFileSync } from "node:fs";
import { DATA } from "../src/data/records.js";
import { PROMISES } from "../src/data/promises.js";
import { GO_LINKS } from "../src/data/govorders.js";
import { LEGISLATION } from "../src/data/legislation.js";
import { PROMISE_GO_LINKS } from "../src/data/promiseGoLinks.js";
import { gradeRecord, EVIDENCE_STAGES, SOURCE_AUTHORITIES } from "../src/lib/evidence.js";

const GO = new Set(GO_LINKS.flatMap((g) => g.records || []));
const LAW = new Set(LEGISLATION.flatMap((l) => l.records || []));
const byId = Object.fromEntries(DATA.map((r) => [r.id, r]));
const n = DATA.length;
const pct = (x) => `${x} (${((100 * x) / n).toFixed(1)}%)`;

// The attributes the evidence model says a record should be able to support.
const ATTRS = [
  ["source authority", (r) => false, "no `authority` field on records; `source` is a volume tag"],
  ["source URL", (r) => false, "no URL field on records"],
  ["document title", (r) => false, "no field"],
  ["document date", (r) => !!r.date, "record-level date, not document date"],
  ["page / reference", (r) => r.page != null, ""],
  ["evidence stage", (r) => false, `${EVIDENCE_STAGES.length} stages defined, none assigned`],
  ["verification status", (r) => true, "computed; always \"unverified\""],
  ["rationale", (r) => true, "computed from the grade"],
  ["linked document (GO/Act)", (r) => GO.has(r.id) || LAW.has(r.id), ""],
];

// Buckets, worst first.
const bucket = (r) => {
  const doc = GO.has(r.id) || LAW.has(r.id);
  if (r.mixedStatus) return "B3_mixed_status";
  if (r.status === "done" && !doc) return "B1_completed_without_completion_evidence";
  if (!doc && r.page == null) return "B2_announcement_only_no_page";
  if (!doc) return "B4_announcement_only";
  if (r.page == null) return "B5_document_backed_no_page";
  return "B6_document_backed_with_page";
};
const BUCKET_META = {
  B1_completed_without_completion_evidence: ["Marked complete, no completion evidence", "`status: done` but no Government Order or Act is linked. The claim of completion rests entirely on the government's own summary volume.", "Highest"],
  B2_announcement_only_no_page: ["Announcement only, not spot-checkable", "No linked document AND no page reference. A reader cannot trace this claim to anything.", "High"],
  B3_mixed_status: ["Mixed delivered/planned components", "Detail text mixes delivered with planned or ongoing work. Flagged `mixedStatus: true`; components need splitting before any grade is meaningful.", "High"],
  B4_announcement_only: ["Announcement only, page recorded", "No linked document, but the source page is recorded so it can at least be checked against the volume.", "Medium"],
  B5_document_backed_no_page: ["Document-backed, page missing", "A GO or Act is linked; only the souvenir page reference is missing.", "Low"],
  B6_document_backed_with_page: ["Document-backed and page recorded", "The strongest position in the current dataset. Still grade D at best — sanction, not delivery.", "Lowest"],
};

const buckets = {};
for (const r of DATA) (buckets[bucket(r)] ||= []).push(r);
const order = Object.keys(BUCKET_META);

// Promises
const pBucket = (p) => {
  const recs = (p.records || []).map((id) => byId[id]).filter(Boolean);
  const doc = !!PROMISE_GO_LINKS[String(p.num)] || recs.some((r) => GO.has(r.id) || LAW.has(r.id));
  if (p.status !== "fulfilled") return "P4_not_claimed_fulfilled";
  if (doc) return "P1_fulfilled_document_backed";
  if (recs.length) return "P2_fulfilled_record_only";
  return "P3_fulfilled_nothing_linked";
};
const P_META = {
  P3_fulfilled_nothing_linked: ["Claimed fulfilled, nothing linked in this dataset", "Highest"],
  P2_fulfilled_record_only: ["Claimed fulfilled, only a government-reported record", "High"],
  P1_fulfilled_document_backed: ["Claimed fulfilled, a GO/Act is linked", "Medium"],
  P4_not_claimed_fulfilled: ["Not claimed fulfilled (progress / modified / stalled / not fulfilled)", "n/a"],
};
const pBuckets = {};
for (const p of PROMISES) (pBuckets[pBucket(p)] ||= []).push(p);

const list = (arr, f, max = 25) =>
  arr.slice(0, max).map(f).join("\n") + (arr.length > max ? `\n- …and ${arr.length - max} more` : "");

const md = `# Evidence Remediation Queue

**Generated:** ${new Date().toISOString().slice(0, 10)} by \`scripts/evidence_queue.mjs\`.
**Diagnostic only — nothing here has been fixed, and this script changes no data.**

Classifies all ${n} achievement records and ${PROMISES.length} manifesto promises by
**the evidence this project actually holds**, independent of how the government or
the external tracker describes them.

---

## 1. Attribute support

The evidence model (\`docs/EVIDENCE_MODEL.md\`) names the attributes a record should
be able to carry. This is how many can carry each one today.

| Attribute | Records supporting it | Note |
|---|---|---|
${ATTRS.map(([label, fn, note]) => `| ${label} | ${pct(DATA.filter(fn).length)} | ${note} |`).join("\n")}

**The structured evidence store does not exist.** \`EVIDENCE_STAGES\`
(${EVIDENCE_STAGES.length} values) and \`SOURCE_AUTHORITIES\` (${SOURCE_AUTHORITIES.length} values)
are defined and exported but **never assigned to any record**. Grade, rationale
and verification status are computed at render time from the GO/Act link — they
are not stored, cannot be overridden by a human assessment, and carry no
per-document provenance.

## 2. Records by evidence position

| Bucket | Records | Priority |
|---|---|---|
${order.map((k) => `| ${BUCKET_META[k][0]} | ${pct((buckets[k] || []).length)} | ${BUCKET_META[k][2]} |`).join("\n")}

${order
  .filter((k) => (buckets[k] || []).length && k !== "B6_document_backed_with_page")
  .map(
    (k) => `### ${BUCKET_META[k][0]} — ${(buckets[k] || []).length} records
**Priority: ${BUCKET_META[k][2]}.** ${BUCKET_META[k][1]}

${list(buckets[k] || [], (r) => `- \`${r.id}\` (${r.cat}) — ${r.name} — *${r.stat}*`)}`,
  )
  .join("\n\n")}

## 3. Promises by evidence position

| Bucket | Promises | Priority |
|---|---|---|
${Object.keys(P_META).map((k) => `| ${P_META[k][0]} | ${(pBuckets[k] || []).length} | ${P_META[k][1]} |`).join("\n")}

### Claimed fulfilled with nothing linked — ${(pBuckets.P3_fulfilled_nothing_linked || []).length} promises

These are counted in the public "400 fulfilled" headline while this dataset holds
**no record and no document** for them. They are the single largest evidence gap
in the project.

${list(pBuckets.P3_fulfilled_nothing_linked || [], (p) => `- **#${p.num}** (${p.theme}) — ${p.text}`, 40)}

## 4. What must not be inferred from this document

- A record in the lowest-priority bucket is **not verified**. The best position in
  this dataset is grade D — a sanction exists — which says nothing about delivery.
- These buckets measure **paper trail held by this project**, not truth. A record
  with no evidence here may be perfectly accurate; a document-backed record may
  still overstate its outcome.
- Closing this queue requires reading primary documents, not adjusting thresholds.

## 5. Suggested order of work

1. **${(buckets.B1_completed_without_completion_evidence || []).length} records marked complete without completion evidence** — the largest
   correctness risk, because "done" is the strongest claim the interface makes.
2. **${(pBuckets.P3_fulfilled_nothing_linked || []).length} promises counted as fulfilled with nothing linked** — the largest
   headline risk, because they inflate the most-quoted number in the project.
3. **${(buckets.B3_mixed_status || []).length} mixed-status records** — split the components before grading.
4. **${(buckets.B2_announcement_only_no_page || []).length} records with neither a document nor a page** — restore page provenance
   (see \`docs/remediation_queue.json\`).
5. Build the structured evidence store so stage, authority and per-document
   provenance can be recorded at all.
`;

writeFileSync("docs/EVIDENCE_REMEDIATION_QUEUE.md", md);
console.log("wrote docs/EVIDENCE_REMEDIATION_QUEUE.md");
for (const k of order) console.log(" ", k.padEnd(45), (buckets[k] || []).length);
for (const k of Object.keys(P_META)) console.log(" ", k.padEnd(45), (pBuckets[k] || []).length);
