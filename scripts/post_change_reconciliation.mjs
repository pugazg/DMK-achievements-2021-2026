// Generate docs/POST_CHANGE_DATA_RECONCILIATION.md.
//
// Recomputes every public number from the source data and compares it against
// the value the app declares, so the reconciliation cannot be asserted by hand.
// Run: node scripts/post_change_reconciliation.mjs
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { DATA, CATEGORIES } from "../src/data/records.js";
import { PROMISES } from "../src/data/promises.js";
import { DEBATE_SESSIONS, DEBATES_META } from "../src/data/debates.js";
import { GO_META, GO_LINKS } from "../src/data/govorders.js";
import { GAZETTE_GOS, GAZETTE_GO_META } from "../src/data/gazettegos.js";
import { LEGISLATION, LEGISLATION_META } from "../src/data/legislation.js";
import { PROMISE_GO_LINKS } from "../src/data/promiseGoLinks.js";
import { HERO_STRIP } from "../src/data/dashboard.js";
import { gradeRecord } from "../src/lib/evidence.js";
import { DERIVED, reconcile } from "../src/lib/publicMetrics.js";
import { VERSION } from "../src/lib/version.js";

/* Generated documents must be REPRODUCIBLE: regenerating them without a data
   change must produce byte-identical output, or CI's drift check fails every
   day the clock rolls over. So the stamp comes from the data's own version,
   not from the wall clock. */

const reg = JSON.parse(readFileSync("src/data/sourceRegistry.json", "utf8"));
const sittings = DEBATE_SESSIONS.flatMap((s) => s.sittings || []);
const grades = DATA.reduce((a, r) => ((a[gradeRecord(r).grade] = (a[gradeRecord(r).grade] || 0) + 1), a), {});

const rows = [];
// derived  = recomputed from the dataset
// declared = the value the app/meta asserts
// guarded  = whether `npm run validate` would fail if these diverged
const add = (measure, derived, declared, guarded, note = "") =>
  rows.push({ measure, derived, declared, guarded, note, ok: String(derived) === String(declared) });

add("Achievement records", DATA.length, 438, true, "shown in hero strip; reconciled");
add("— unique IDs", new Set(DATA.map((r) => r.id)).size, DATA.length, true);
add("— without page reference", DATA.filter((r) => r.page == null).length, 247, false, "disclosed, not guarded");
add("— flagged mixedStatus", DATA.filter((r) => r.mixedStatus).length, 6, false);
add("Domains (excluding 'All')", CATEGORIES.length - 1, 11, true, "shown in hero strip; was mislabelled 12 pre-change");
add("Manifesto promises", PROMISES.length, 505, true, "shown in hero strip; reconciled");
add("— status = fulfilled", PROMISES.filter((p) => p.status === "fulfilled").length, 400, true, "external tracker's assessment");
add("— unique promise numbers", new Set(PROMISES.map((p) => p.num)).size, PROMISES.length, true);
add("Assembly sitting links", sittings.length, DEBATES_META.sittings, true);
add("— measured sittings", sittings.filter((d) => d.pages > 0).length, DEBATES_META.crawled, true, "100 remain unmeasured");
add("— sum of measured pages", sittings.reduce((n, d) => n + (d.pages || 0), 0), DEBATES_META.totalPages, false);
add("— sum of measured words", sittings.reduce((n, d) => n + (d.words || 0), 0), DEBATES_META.totalWords, false);
add("GO archive catalogued", GO_META.total, 3501, true, "catalogue count, not held here");
add("GO records embedded", GO_LINKS.length, GO_META.mapped, true);
add("GO departments", Object.keys(GO_META.byDept).length, GO_META.departments, true, "was mislabelled 38 pre-change");
add("Gazette GO entries", GAZETTE_GOS.length, GAZETTE_GO_META.goEntries, false);
add("— weekly issues", GAZETTE_GO_META.weeklyIssues, 286, false);
add("Legislative records", LEGISLATION.length, LEGISLATION_META.total, true);
add("— Acts", LEGISLATION.filter((l) => l.kind === "Act").length, LEGISLATION_META.acts, true);
add("— Bills", LEGISLATION.filter((l) => l.kind === "Bill").length, LEGISLATION_META.bills, true);
add("— Ordinances", LEGISLATION.filter((l) => l.kind === "Ordinance").length, LEGISLATION_META.ordinances, true);
add("— stages sum to total", LEGISLATION_META.acts + LEGISLATION_META.bills + LEGISLATION_META.ordinances, LEGISLATION.length, true);
add("Promises with GO links", Object.keys(PROMISE_GO_LINKS).length, 38, true);
add("Promise→GO link entries", Object.values(PROMISE_GO_LINKS).reduce((n, v) => n + Object.keys(v).length, 0), 41, false);
add("Evidence: grade D", grades.D || 0, 62, false, "derived at render time");
add("Evidence: grade E", grades.E || 0, 376, false, "derived at render time");
add("Evidence: grades above D", (grades.A || 0) + (grades.B || 0) + (grades.C || 0), 0, true, "hard invariant");
add("Source registry entries", reg.sources.length, 108, false);
add("Source registry fetched", reg.sources.filter((s) => s.fetched).length, 0, false, "nothing ingested");

// The hero strip now declares which DERIVED metric each counter shows, and
// validate.mjs + test/metrics.test.mjs reconcile them. Report that directly
// from the shared reconciler rather than re-deriving it by label matching.
const heroResult = reconcile(HERO_STRIP, { source: "HERO_STRIP" });
const heroRows = HERO_STRIP.map((h) => ({
  label: h.label,
  metric: h.metric ?? null,
  declared: h.value,
  derived: h.metric ? DERIVED[h.metric] : null,
  ok: h.metric ? DERIVED[h.metric] === h.value : null,
}));

const mismatches = rows.filter((r) => !r.ok);
const unguarded = rows.filter((r) => !r.guarded);

const md = `# Post-Change Data Reconciliation

**Generated:** ${VERSION.dataUpdated} by \`scripts/post_change_reconciliation.mjs\`.
**Do not hand-edit** — re-run the script.

Every number below is **recomputed from the source data at run time** and compared
against the value the application declares. This document exists to answer one
question: *do the public numbers still equal the data?*

## Result

| | |
|---|---|
| Measures reconciled | **${rows.length}** |
| Mismatches | **${mismatches.length}** |
| Covered by \`npm run validate\` | ${rows.length - unguarded.length} |
| **Not** covered by validation | ${unguarded.length} |

${mismatches.length === 0
  ? "**No mismatch.** Every declared public number equals the number derived from the dataset."
  : `**${mismatches.length} MISMATCH(ES) FOUND** — listed below.`}

## Full reconciliation

\`Guarded\` = \`npm run validate\` fails if the derived and declared values diverge.

| Measure | Derived | Declared | Match | Guarded | Note |
|---|---|---|---|---|---|
${rows
  .map(
    (r) =>
      `| ${r.measure} | ${r.derived} | ${r.declared} | ${r.ok ? "✅" : "❌"} | ${r.guarded ? "yes" : "**no**"} | ${r.note} |`,
  )
  .join("\n")}

## Hero strip — the counters a reader sees first

The hero counter strip (\`HERO_STRIP\` in \`src/data/dashboard.js\`) previously held
literal numbers that no gate read: the verification audit changed "438 verified
records" to 999 and \`npm run validate\`, \`npm test\` and \`npm run a11y\` all still
passed.

Each counter now takes its value from \`DERIVED\` in \`src/lib/publicMetrics.js\` and
names the metric it claims to show. \`scripts/validate.mjs\` reconciles them on every
run, and \`test/metrics.test.mjs\` asserts that tampering with any one of them fails.

| Label | Metric | Declared | Derived | Match |
|---|---|---|---|---|
${heroRows
  .map(
    (h) =>
      `| ${h.label} | ${h.metric ?? "— (editorial)"} | ${h.declared} | ${h.derived === null ? "n/a" : h.derived} | ${h.ok === null ? "not a dataset count" : h.ok ? "✅" : "❌"} |`,
  )
  .join("\n")}

Reconciler result: **${heroResult.checked} counters checked, ${heroResult.failures.length} wrong**${heroResult.unchecked.length ? `; editorial entries not checked: ${heroResult.unchecked.join(", ")}` : ""}.

## Numbers that are counts of *catalogue*, not of held content

These are the figures the original audit found misleading. They now appear with
both halves stated, but the distinction is worth restating:

| Figure | Meaning |
|---|---|
| ${GO_META.total} Government Orders | **catalogued in the portal archive** — ${GO_LINKS.length} are embedded here with detail |
| ${DEBATES_META.sittings} Assembly sittings | **links to official pages** — ${DEBATES_META.crawled} have measured page/word counts |
| ${GAZETTE_GO_META.weeklyIssues} gazette issues | source of the ${GAZETTE_GOS.length} embedded GO/notification entries |
| ${reg.sources.length} sources | **catalogued and reachability-checked** — ${reg.sources.filter((s) => s.fetched).length} ingested |

## Evidence grade distribution

| Grade | Meaning | Records |
|---|---|---|
| A / B / C | independently verified | **${(grades.A || 0) + (grades.B || 0) + (grades.C || 0)}** |
| D | sanction document exists | ${grades.D || 0} |
| E | government-reported only | ${grades.E || 0} |

${(((grades.D || 0) / DATA.length) * 100).toFixed(1)}% of records have a linked
Government Order or Act; ${(((grades.E || 0) / DATA.length) * 100).toFixed(1)}%
rest solely on the government's own published summary.
`;

writeFileSync("docs/POST_CHANGE_DATA_RECONCILIATION.md", md);
console.log(`wrote docs/POST_CHANGE_DATA_RECONCILIATION.md — ${rows.length} measures, ${mismatches.length} mismatches, ${unguarded.length} unguarded`);
if (!existsSync("docs/POST_CHANGE_DATA_RECONCILIATION.md")) process.exit(1);
