// Emit docs/remediation_queue.json — the records that cannot be spot-checked by
// a reader because they carry no page reference back to their source volume.
//
// This is the largest outstanding provenance gap (see docs/EVIDENCE_MODEL.md).
// The queue is ordered so the highest-leverage records come first: a record that
// already has a GO or Act behind it can be resolved from the document, whereas a
// bare souvenir claim needs the printed volume re-checked page by page.
import { writeFileSync } from "node:fs";
import { DATA } from "../src/data/records.js";
import { GO_LINKS } from "../src/data/govorders.js";
import { LEGISLATION } from "../src/data/legislation.js";
import { gradeRecord } from "../src/lib/evidence.js";

const GO_BACKED = new Set(GO_LINKS.flatMap((g) => g.records || []));
const LAW_BACKED = new Set(LEGISLATION.flatMap((l) => l.records || []));

const pageless = DATA.filter((r) => r.page == null);

const item = (r) => {
  const backed = GO_BACKED.has(r.id) || LAW_BACKED.has(r.id);
  return {
    id: r.id,
    category: r.cat,
    name: r.name,
    stat: r.stat,
    date: r.date,
    source_volume: r.source,
    grade: gradeRecord(r).grade,
    has_document_link: backed,
    mixed_status: r.mixedStatus === true,
    // Highest leverage first.
    priority: backed ? 1 : r.mixedStatus === true ? 2 : 3,
    action: backed
      ? "Resolve from the linked Government Order / Act: record the document's own reference, then locate the matching page in the source volume."
      : r.mixedStatus === true
        ? "Mixed delivered/planned components. Re-check the source volume page and split the components before assigning a page reference."
        : "Locate the claim in the 2021-26 souvenir or minister-by-minister volume and record the page number.",
  };
};

const queue = pageless
  .map(item)
  .sort((a, b) => a.priority - b.priority || a.category.localeCompare(b.category) || a.id.localeCompare(b.id));

const byCategory = queue.reduce((a, q) => ((a[q.category] = (a[q.category] || 0) + 1), a), {});
const byPriority = queue.reduce((a, q) => ((a[q.priority] = (a[q.priority] || 0) + 1), a), {});

writeFileSync(
  "docs/remediation_queue.json",
  JSON.stringify(
    {
      generated: new Date().toISOString().slice(0, 10),
      purpose:
        "Achievement records with no page reference to their source volume. Until a page is recorded, a reader cannot spot-check the claim.",
      total_records: DATA.length,
      records_without_page: queue.length,
      records_with_page: DATA.length - queue.length,
      by_priority: {
        "1_document_backed": byPriority[1] || 0,
        "2_mixed_status": byPriority[2] || 0,
        "3_souvenir_only": byPriority[3] || 0,
      },
      by_category: byCategory,
      queue,
    },
    null,
    1,
  ) + "\n",
);

console.log(`wrote docs/remediation_queue.json — ${queue.length} of ${DATA.length} records lack a page reference`);
console.log("by priority:", byPriority);
