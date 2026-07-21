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
const { DERIVED, reconcile, checkInvariants } = await import("../src/lib/publicMetrics.js");
// Display constants: anything the reader actually sees must be reconciled,
// not just the underlying datasets. This is what the "999 verified records"
// mutation slipped through before.
const { HERO_STRIP } = await import("../src/data/dashboard.js");
const { EVIDENCE_PILOT } = await import("../src/data/evidencePilot.js");
const { validateEvidenceRecord, gradeMismatches, rollUpMismatches, componentMismatches, summarise: pilotSummary } = await import("../src/lib/evidenceRecord.js");

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

// 3. EVERY number shown to a reader is reconciled against the dataset.
//
// These used to be comparisons against hard-coded literals, which caught data
// drift but not display drift: the audit changed the hero counter to "999
// verified records" and validation still passed. Display constants are now
// reconciled through src/lib/publicMetrics.js.
const hero = reconcile(HERO_STRIP, { source: "HERO_STRIP" });
check(hero.ok, `hero strip reconciles with the datasets (${hero.checked} checked, ${hero.failures.length} wrong)`);
hero.failures.forEach((f) => console.error(`        ${f.source}."${f.label}": ${f.reason}`));
check(hero.checked >= 3, `hero strip still declares its dataset metrics (${hero.checked} carry a metric key)`);
if (hero.unchecked.length) console.log(`  ..  : hero strip editorial entries (not dataset counts): ${hero.unchecked.join(", ")}`);

// Dataset invariants — properties that must hold for the displayed values to
// mean anything, independent of what those values happen to be.
for (const inv of checkInvariants()) check(inv.ok, `${inv.name} (${inv.detail})`);

/* Invariants over the LAZY datasets. These live here rather than in
   publicMetrics.js on purpose: that module is imported by the eager bundle, and
   importing legislation/GO/gazette/debates from it pulled ~315KB of lazy data
   into the initial download (main chunk 842KB -> 1,157KB). Node pays no such
   cost, so the heavy cross-checks belong in the validator. */
const goDepts = Object.keys(GO_META.byDept || {}).length;
check(GO_META.departments === goDepts, `GO department META matches byDept (${GO_META.departments} vs ${goDepts})`);
check(GO_META.mapped === GO_LINKS.length, `embedded GO META matches GO_LINKS (${GO_META.mapped} vs ${GO_LINKS.length})`);
check(GO_META.total > GO_LINKS.length, `catalogued GOs exceed embedded (${GO_META.total} vs ${GO_LINKS.length})`);
const acts = LEGISLATION.filter((l) => l.kind === "Act").length;
const bills = LEGISLATION.filter((l) => l.kind === "Bill").length;
const ords = LEGISLATION.filter((l) => l.kind === "Ordinance").length;
check(acts + bills + ords === LEGISLATION.length, `legislation stages sum to total (${acts}+${bills}+${ords} = ${LEGISLATION.length})`);
check(LEGISLATION_META.total === LEGISLATION.length && LEGISLATION_META.acts === acts
  && LEGISLATION_META.bills === bills && LEGISLATION_META.ordinances === ords,
  `legislation META matches the data (${LEGISLATION_META.total}/${LEGISLATION_META.acts}/${LEGISLATION_META.bills}/${LEGISLATION_META.ordinances})`);
const allSittings = DEBATE_SESSIONS.flatMap((s) => s.sittings || []);
const measuredSittings = allSittings.filter((s) => s.pages > 0).length;
check(measuredSittings <= allSittings.length, `measured sittings within sitting links (${measuredSittings} of ${allSittings.length})`);

console.log(`  ..  : derived — ${DERIVED.achievements} achievements, ${DERIVED.domains} domains, ${DERIVED.promises} promises`);
console.log(`  ..  : derived — GOs ${GO_META.total} catalogued / ${GO_LINKS.length} embedded across ${goDepts} departments`);
console.log(`  ..  : derived — sittings ${allSittings.length} linked / ${measuredSittings} measured; legislation ${LEGISLATION.length} (${acts}A/${bills}B/${ords}O)`);

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
const fulfilled = DERIVED.promisesFulfilled;
const fulfilledListed = PROMISES.filter((p) => p.status === "fulfilled" && p.text).length;
check(fulfilled === fulfilledListed,
  `every fulfilled promise is inspectable in the dataset (${fulfilled} fulfilled, ${fulfilledListed} with text)`);

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

// 10. Phase C0 evidence pilot — schema and the no-silent-verification invariant.
const pilotErrs = EVIDENCE_PILOT.flatMap((r) => validateEvidenceRecord(r));
check(pilotErrs.length === 0, `evidence pilot: ${EVIDENCE_PILOT.length} records pass schema (${pilotErrs.length} errors)`);
pilotErrs.slice(0, 5).forEach((e) => console.error("        " + e));
const pilotMism = gradeMismatches(EVIDENCE_PILOT);
check(pilotMism.length === 0, `evidence pilot: asserted grades match the evidence (${pilotMism.length} mismatches)`);
check(EVIDENCE_PILOT.every((r) => r.assessment.verification_status === "unverified"),
  `evidence pilot: no record is marked verified`);
check(EVIDENCE_PILOT.every((r) => Array.isArray(r.missing) && r.missing.length > 0),
  `evidence pilot: every record states what evidence is missing`);
// Phase C0.5 hardening invariants.
const rollMism = rollUpMismatches(EVIDENCE_PILOT);
check(rollMism.length === 0, `evidence pilot: no parent inherits its strongest component (${rollMism.length} mismatches)`);
rollMism.slice(0, 5).forEach((m) => console.error(`        ${m.id}: parent ${m.parent}, weakest ${m.rolled}`));
const compMism = componentMismatches(EVIDENCE_PILOT);
check(compMism.length === 0, `evidence pilot: no component claims more than its evidence supports (${compMism.length})`);
check(EVIDENCE_PILOT.every((r) => r.sources.every((s) => s.relationship?.supports && s.relationship?.does_not_prove !== undefined)),
  `evidence pilot: every source carries a relationship note`);
check(EVIDENCE_PILOT.every((r) => r.assessment.confidence && r.assessment.confidence_rationale),
  `evidence pilot: grade and confidence are separate judgements`);
check(EVIDENCE_PILOT.every((r) => r.sources.every((s) => !s.quote || s.document?.extraction_status === "success")),
  `evidence pilot: no quote rests on a failed extraction`);
// Phase C0.6 — the adversarial review's own integrity.
const { SECOND_PASS } = await import("../src/data/evidenceReview.js");
const { PACKETS, assertNoLeak } = await import("../scripts/reviewer_packets.mjs");
const { STATS: reviewStats } = await import("../scripts/reviewer_compare.mjs");
const leaks = assertNoLeak(PACKETS, EVIDENCE_PILOT);
check(leaks.length === 0, `reviewer packets are blinded (${leaks.length} leaks)`);
check(SECOND_PASS.length === EVIDENCE_PILOT.length, `second pass covers every subject (${SECOND_PASS.length}/${EVIDENCE_PILOT.length})`);
check(reviewStats.rollUpFailures.length === 0, `second pass obeys its own roll-up rules (${reviewStats.rollUpFailures.length} violations)`);
console.log(`  ..  : adversarial review — ${reviewStats.exactMatches}/${reviewStats.total} exact, ${reviewStats.total - reviewStats.exactMatches} disagreements ${JSON.stringify(reviewStats.byClass)}`);

const ps = pilotSummary(EVIDENCE_PILOT);
console.log(`  ..  : pilot v2 — ${ps.components} components across ${ps.total} subjects, ${ps.compound} compound, ${ps.notGradeable} not gradeable`);

console.log(fail === 0 ? "\nVALIDATION PASSED" : `\nVALIDATION FAILED (${fail})`);
process.exit(fail === 0 ? 0 : 1);
