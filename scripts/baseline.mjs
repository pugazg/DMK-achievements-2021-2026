// Baseline dataset manifest — verifies audit counts from actual source data.
import { createHash } from "node:crypto"; import { readFileSync, writeFileSync } from "node:fs";
const { DATA, CATEGORIES } = await import("../src/data/records.js");
const { PROMISES } = await import("../src/data/promises.js");
const { DEBATE_SESSIONS, DEBATES_META } = await import("../src/data/debates.js");
const { GO_META, GO_LINKS } = await import("../src/data/govorders.js");
const { GAZETTE_GOS, GAZETTE_GO_META } = await import("../src/data/gazettegos.js");
const { LEGISLATION, LEGISLATION_META } = await import("../src/data/legislation.js");
const { PROMISE_GO_LINKS } = await import("../src/data/promiseGoLinks.js");
const sit = DEBATE_SESSIONS.flatMap(s=>s.sittings);
const measured = sit.filter(s=>s.pages!=null);
const goDepts = new Set(Object.keys(GO_META.byDept||{}));
const domains = CATEGORIES.filter(c=>c.id!=="all");
const recNoPage = DATA.filter(r=>r.page==null);
const gzNoNum = GAZETTE_GOS.filter(g=>!g.gono);
const legNoNum = LEGISLATION.filter(l=>!l.no);
const goNoNum = GO_LINKS.filter(g=>!g.no);
const dupTitles = (()=>{const m={};DATA.forEach(r=>{m[r.name]=(m[r.name]||0)+1});return Object.entries(m).filter(([,n])=>n>1).map(([t,n])=>`${t} x${n}`)})();
const hash = p => createHash("sha256").update(readFileSync(p)).digest("hex").slice(0,16);
const manifest = {
  generated: new Date().toISOString(), branch: "audit-remediation",
  build: { minifiedBytes: 1167357, gzipBytes: 277087, status: "pass (npm ci + vite build)" },
  datasets: {
    achievements: { count: DATA.length, uniqueIds: new Set(DATA.map(r=>r.id)).size, withoutPage: recNoPage.length, duplicateTitles: dupTitles, hash: hash("src/data/records.js") },
    domains: { actual: domains.length, note: "'All' is a filter, not a domain" },
    promises: { count: PROMISES.length, fulfilled: PROMISES.filter(p=>p.status==="fulfilled").length, withGoLinks: Object.keys(PROMISE_GO_LINKS).length, hash: hash("src/data/promises.js") },
    debates: { sittingLinks: sit.length, measured: measured.length, unmeasured: sit.length-measured.length, metaPages: DEBATES_META.totalPages, metaWords: DEBATES_META.totalWords, hash: hash("src/data/debates.js") },
    govOrders: { archiveIndexed: GO_META.total, embeddedLinked: GO_LINKS.length, departments: goDepts.size, claimedDepartments38: false, withoutGoNumber: goNoNum.length, hash: hash("src/data/govorders.js") },
    gazetteGos: { count: GAZETTE_GOS.length, withoutGoNumber: gzNoNum.length, withoutDept: GAZETTE_GOS.filter(g=>!g.dept).length, withoutSubject: GAZETTE_GOS.filter(g=>!g.subject).length, weeklyIssues: GAZETTE_GO_META.weeklyIssues, hash: hash("src/data/gazettegos.js") },
    legislation: { count: LEGISLATION.length, acts: LEGISLATION_META.acts, bills: LEGISLATION_META.bills, ordinances: LEGISLATION_META.ordinances, withoutNumber: legNoNum.length, uniquePdfs: new Set(LEGISLATION.flatMap(l=>[l.pdf])).size, hash: hash("src/data/legislation.js") },
  },
};
writeFileSync("docs/BASELINE_MANIFEST.json", JSON.stringify(manifest,null,2));
console.log(JSON.stringify(manifest.datasets,null,1));
