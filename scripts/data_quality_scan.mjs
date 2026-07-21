// Phase 7 — scan all datasets for encoding corruption, malformed values,
// duplicates, invalid dates. Writes docs/data_quality_report.json.
// Detection only — corrections are applied separately and logged.
import { writeFileSync } from "node:fs";
const { DATA } = await import("../src/data/records.js");
const { PROMISES } = await import("../src/data/promises.js");
const { GO_LINKS } = await import("../src/data/govorders.js");
const { GAZETTE_GOS } = await import("../src/data/gazettegos.js");
const { LEGISLATION } = await import("../src/data/legislation.js");

const issues = [];
const add = (file, id, field, value, proposed, confidence, reason) =>
  issues.push({ file, id, field, original: String(value).slice(0, 160), proposed: proposed && String(proposed).slice(0, 160), confidence, status: "detected", reason });

const RUPEE = "₹";
const MOJI = [
  [/â‚¹/g, RUPEE, "high", "UTF-8 rupee sign read as Windows-1252 (mojibake)"],
  [new RegExp("\\?(\\d[\\d,.]*\\s*(crore|lakh|cr\\b|L\\b))", "gi"), RUPEE + "$1", "high", "rupee sign lost in transcoding ('?' before amount)"],
  [/â€“/g, "–", "high", "en-dash mojibake"],
  [/â€”/g, "—", "high", "em-dash mojibake"],
  [/â€™|â€˜/g, "'", "high", "quote mojibake"],
];

function scanText(file, id, field, v) {
  if (typeof v !== "string" || !v) return;
  for (const [re, rep, conf, reason] of MOJI) { re.lastIndex = 0; if (re.test(v)) add(file, id, field, v, v.replace(re, rep), conf, reason); }
  if (/\s\s+/.test(v)) add(file, id, field, v, v.replace(/\s\s+/g, " "), "high", "duplicate whitespace");
  if (/Honble/.test(v)) add(file, id, field, v, null, "low", "OCR defect 'Honble' in quoted source text - flag only, wording preserved");
  if (/Fmation|Accded|Augmentaion/.test(v)) add(file, id, field, v, null, "low", "OCR/typo in quoted source text - flag only, wording preserved");
}
DATA.forEach((r) => { scanText("records.js", r.id, "det", r.det); scanText("records.js", r.id, "name", r.name); scanText("records.js", r.id, "stat", r.stat); });
PROMISES.forEach((p) => { scanText("promises.js", "#" + p.num, "note", p.note); scanText("promises.js", "#" + p.num, "text", p.text); });
GO_LINKS.forEach((g, i) => scanText("govorders.js", g.no || "row" + i, "abstract", g.abstract));
GAZETTE_GOS.forEach((g, i) => scanText("gazettegos.js", g.gono || "row" + i, "subject", g.subject));
LEGISLATION.forEach((l) => scanText("legislation.js", `${l.kind}-${l.no}-${l.year}`, "title", l.title));

// duplicate visible titles in records
const names = {}; DATA.forEach((r) => { (names[r.name] = names[r.name] || []).push(r.id); });
Object.entries(names).filter(([, ids]) => ids.length > 1).forEach(([n, ids]) => add("records.js", ids.join("+"), "name", n, null, "high", "duplicate visible title"));

// invalid dates
const dre = /^\d{2}-\d{2}-\d{4}$/;
GAZETTE_GOS.forEach((g, i) => { if (g.date && !dre.test(g.date)) add("gazettegos.js", g.gono || "row" + i, "date", g.date, null, "high", "non dd-mm-yyyy date"); });
GO_LINKS.forEach((g, i) => { if (g.date && !dre.test(g.date)) add("govorders.js", g.no || "row" + i, "date", g.date, null, "high", "non dd-mm-yyyy date"); });

// compound "done" records: marked done but detail text mentions pending work
const pend = /(more planned|under way|underway|being built|is being added|being set up|10 more|1 lakh more|10 planned)/i;
const compound = DATA.filter((r) => r.status === "done" && pend.test(r.det)).map((r) => r.id);
compound.forEach((id) => add("records.js", id, "status", "done", "ongoing", "review", "marked done but detail mentions planned/ongoing components - assess components separately"));

writeFileSync("docs/data_quality_report.json", JSON.stringify({ generated: new Date().toISOString(), totalIssues: issues.length, compoundDoneRecords: compound, issues }, null, 1));
console.log("issues:", issues.length, "| compound done:", compound.length, compound.join(","));
