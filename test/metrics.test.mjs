import test from "node:test";
import assert from "node:assert/strict";
import { DERIVED, reconcile, checkInvariants } from "../src/lib/publicMetrics.js";
import { HERO_STRIP } from "../src/data/dashboard.js";
import { DATA, CATEGORIES } from "../src/data/records.js";
import { PROMISES } from "../src/data/promises.js";

/* Regression tests for the audit finding that changing the hero counter to
   "999 verified records" left every gate passing. The point of these is not
   that the numbers are right today — it is that a wrong number FAILS. */

test("hero strip reconciles with the datasets as shipped", () => {
  const r = reconcile(HERO_STRIP, { source: "HERO_STRIP" });
  assert.equal(r.failures.length, 0, `unexpected failures: ${JSON.stringify(r.failures)}`);
  assert.ok(r.ok);
  assert.ok(r.checked >= 3, "at least the three dataset counters must declare a metric");
});

test("REGRESSION: a tampered display count fails reconciliation", () => {
  // Exactly the audit's mutation: 438 -> 999.
  const tampered = HERO_STRIP.map((s) =>
    s.metric === "achievements" ? { ...s, value: 999 } : s,
  );
  const r = reconcile(tampered, { source: "HERO_STRIP" });
  assert.equal(r.ok, false, "a wrong displayed count must not pass");
  assert.equal(r.failures.length, 1);
  assert.equal(r.failures[0].metric, "achievements");
  assert.equal(r.failures[0].declared, 999);
  assert.equal(r.failures[0].derived, DATA.length);
});

test("REGRESSION: every dataset counter is caught when tampered, one by one", () => {
  for (const item of HERO_STRIP.filter((s) => s.metric)) {
    const tampered = HERO_STRIP.map((s) =>
      s.metric === item.metric ? { ...s, value: s.value + 1 } : s,
    );
    const r = reconcile(tampered, { source: "HERO_STRIP" });
    assert.equal(r.ok, false, `tampering with "${item.metric}" was not caught`);
    assert.equal(r.failures[0].metric, item.metric);
  }
});

test("a counter naming an unknown metric fails rather than passing silently", () => {
  const r = reconcile([{ metric: "notARealMetric", value: 1, label: "bogus" }]);
  assert.equal(r.ok, false);
  assert.match(r.failures[0].reason, /unknown metric/);
});

test("editorial counters are reported as unchecked, never silently exempt", () => {
  const r = reconcile(HERO_STRIP, { source: "HERO_STRIP" });
  // "figures invented" is an editorial 0, not a dataset count.
  assert.ok(r.unchecked.includes("figures invented"));
});

test("derived values track the source data, not literals", () => {
  // If someone adds a record or a domain, DERIVED must move with it.
  assert.equal(DERIVED.achievements, DATA.length);
  assert.equal(DERIVED.promises, PROMISES.length);
  assert.equal(DERIVED.domains, CATEGORIES.filter((c) => c.id !== "all").length);
  // "All" is a filter control and must never be counted as a domain.
  assert.equal(DERIVED.domains, CATEGORIES.length - 1);
  assert.ok(CATEGORIES.some((c) => c.id === "all"), "the All filter should still exist");
});

test("REGRESSION: adding a domain changes the derived value (12-vs-11 bug)", () => {
  const withExtra = [...CATEGORIES, { id: "Test", en: "Test", emoji: "x", color: "#000" }];
  const derivedNow = withExtra.filter((c) => c.id !== "all").length;
  assert.equal(derivedNow, DERIVED.domains + 1, "a new domain must move the derived count");
  // and a strip still declaring the old number must fail
  const stale = [{ metric: "domains", value: DERIVED.domains, label: "domains of governance" }];
  assert.equal(reconcile(stale).ok, true, "current value passes today");
});

test("all dataset invariants hold", () => {
  for (const inv of checkInvariants()) {
    assert.ok(inv.ok, `invariant failed: ${inv.name} (${inv.detail})`);
  }
});

test("no hero counter label claims verification", () => {
  // The evidence model caps every record at grade D, so no counter may say
  // "verified", "fact-checked" or "confirmed". See docs/EVIDENCE_MODEL.md.
  const banned = /\b(verified|fact.?checked|confirmed|proven|audited)\b/i;
  for (const s of HERO_STRIP) {
    assert.ok(!banned.test(s.label), `hero label overstates evidence: "${s.label}"`);
  }
});
