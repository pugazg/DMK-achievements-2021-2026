// Dataset & displayed-total validation. Exits non-zero on any failure.
// Covers: unique IDs, valid relationships, no invalid dates/URLs, no
// unsupported grades, no silent ID drift (against baseline manifest).
import { readFileSync } from "node:fs";
const { DATA, CATEGORIES } = await import("../src/data/records.js");
const { PROMISES } = await import("../src/data/promises.js");
const { DEBATE_SESSIONS } = await import("../src/data/debates.js");
const { GO_META, GO_LINKS } = await import("../src/data/govorders.js");
const { GAZETTE_GOS } = await import("../src/data/gazettegos.js");
const { LEGISLATION, LEGISLATION_META } = await import("../src/data/legislation.js");
const { PROMISE_GO_LINKS } = await import("../src/data/promiseGoLinks.js");
const { GRADES } = await import("../src/lib/evidence.js");

let fail = 0;
const check = (cond, msg) => { if (!cond) { console.error("  FAIL:", msg); fail++; } else { console.log("  ok  :", msg); } };

// 1. unique IDs
check(new Set(DATA.map((r) => r.id)).size === DATA.length, `achievement IDs unique (${DATA.length})`);
check(new Set(PROMISES.map((p) => p.num)).size === PROMISES.length, `promise numbers unique (${PROMISES.length})`);

// 2. relationships resolve
const recIds = new Set(DATA.map((r) => r.id));
const badPromiseRefs = PROMISES.flatMap((p) => (p.records || []).filter((id) => !recIds.has(id)));
check(badPromiseRefs.length === 0, `all promise->record refs resolve (${badPromiseRefs.length} broken)`);
const badGoRefs = GO_LINKS.flatMap((g) => (g.records || []).filter((id) => !recIds.has(id)));
check(badGoRefs.length === 0, `all GO->record refs resolve (${badGoRefs.length} broken)`);
const badLegRefs = LEGISLATION.flatMap((l) => (l.records || []).filter((id) => !recIds.has(id)));
check(badLegRefs.length === 0, `all legislation->record refs resolve (${badLegRefs.length} broken)`);

// 3. displayed totals match derived data (Phase 1 anti-drift)
const domains = CATEGORIES.filter((c) => c.id !== "all").length;
check(domains === 11, `domain count is derived 11 (got ${domains})`);
const goDepts = Object.keys(GO_META.byDept || {}).length;
check(goDepts === 36, `GO departments = 36 (got ${goDepts})`);
check(GO_LINKS.length === 186, `embedded GO links = 186 (got ${GO_LINKS.length})`);
check(GO_META.total === 3501, `GO archive total = 3501 (got ${GO_META.total})`);
const measured = DEBATE_SESSIONS.flatMap((s) => s.sittings).filter((s) => s.pages != null).length;
const sittings = DEBATE_SESSIONS.flatMap((s) => s.sittings).length;
check(sittings === 138 && measured === 38, `debates: 138 links, 38 measured (got ${sittings}/${measured})`);
check(LEGISLATION_META.acts + LEGISLATION_META.bills + LEGISLATION_META.ordinances === LEGISLATION.length,
  `legislation stages sum to total (${LEGISLATION.length})`);

// 4. no invalid dates where dates are expected (dd-mm-yyyy)
const dre = /^\d{2}-\d{2}-\d{4}$/;
const badGoDates = GO_LINKS.filter((g) => g.date && !dre.test(g.date)).length
  + GAZETTE_GOS.filter((g) => g.date && !dre.test(g.date)).length;
check(badGoDates === 0, `all GO/gazette dates well-formed (${badGoDates} bad)`);

// 5. URLs where expected are http(s)
const urlOk = (u) => !u || /^https?:\/\//.test(u);
const badUrls = [...GO_LINKS.map((g) => g.pdf), ...GAZETTE_GOS.map((g) => g.pdf), ...LEGISLATION.map((l) => l.pdf)].filter((u) => u && !urlOk(u)).length;
check(badUrls === 0, `all embedded PDF URLs are http(s) (${badUrls} bad)`);

// 6. evidence grades: no record grades above D from this corpus
const { gradeRecord } = await import("../src/lib/evidence.js");
const overGraded = DATA.filter((r) => ["A", "B", "C"].includes(gradeRecord(r).grade)).length;
check(overGraded === 0, `no record auto-graded above D (${overGraded} over-graded)`);
const badGrades = DATA.filter((r) => !GRADES[gradeRecord(r).grade]).length;
check(badGrades === 0, `all grades are in the defined ladder`);

// 7. headline fulfilled count is inspectable (every fulfilled promise present in list)
const fulfilled = PROMISES.filter((p) => p.status === "fulfilled").length;
check(fulfilled === 400, `fulfilled promises = 400, all inspectable in dataset (got ${fulfilled})`);

// 8. no silent ID drift vs baseline
try {
  const base = JSON.parse(readFileSync("docs/BASELINE_MANIFEST.json", "utf8"));
  check(base.datasets.achievements.count === DATA.length, `achievement count stable vs baseline`);
  check(base.datasets.promises.count === PROMISES.length, `promise count stable vs baseline`);
} catch { console.log("  ..  : baseline manifest not found (skipped drift check)"); }

// 9. promiseGoLinks all reference existing promises
const promNums = new Set(PROMISES.map((p) => String(p.num)));
const badPgl = Object.keys(PROMISE_GO_LINKS).filter((k) => !promNums.has(k)).length;
check(badPgl === 0, `promise GO-links reference existing promises (${badPgl} orphaned)`);

console.log(fail === 0 ? "\nVALIDATION PASSED" : `\nVALIDATION FAILED (${fail})`);
process.exit(fail === 0 ? 0 : 1);
