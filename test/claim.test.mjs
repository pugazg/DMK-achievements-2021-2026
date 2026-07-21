import { test } from "node:test";
import assert from "node:assert/strict";
import { lookupClaim, analyseClaim } from "../src/lib/search.js";

// The claim lookup must NEVER assert a claim is true/false. It abstains on
// weak matches, detects negation, and only surfaces "related_records" when
// most meaningful terms match. These are adversarial cases from the audit.

test("abstains on fictional/unrelated claim (moon mission)", () => {
  const r = lookupClaim("new government launched moon mission");
  assert.notEqual(r.assessment, "related_records", "must not treat nonsense as related/verified");
  assert.ok(["not_found", "insufficient_match"].includes(r.assessment));
});

test("abstains on unrelated claim sharing common words (banned all buses)", () => {
  const r = lookupClaim("Tamil Nadu banned all buses");
  assert.ok(["not_found", "insufficient_match"].includes(r.assessment));
});

test("negation is flagged (DMK cancelled breakfast scheme)", () => {
  const r = lookupClaim("DMK cancelled breakfast scheme");
  assert.ok(r.negation.length > 0, "must detect 'cancelled'");
  // even though 'breakfast' matches a record, the tool must not verify/refute
  assert.ok(["insufficient_match", "related_records", "not_found"].includes(r.assessment));
});

test("negation detection: ended/stopped/banned/scrapped", () => {
  for (const w of ["the scheme ended in 2023", "buses were stopped", "it was banned", "the plan was scrapped"]) {
    assert.ok(analyseClaim(w).negation.length > 0, `should flag negation in: ${w}`);
  }
});

test("genuine topical claim surfaces related records (free bus for women)", () => {
  const r = lookupClaim("free bus travel for women");
  assert.equal(r.assessment, "related_records");
  assert.ok(r.results.length > 0);
  assert.ok(r.results[0].matchedTerms.length >= 2, "should explain which terms matched");
});

test("empty / stopword-only query yields not_found", () => {
  assert.equal(lookupClaim("the new government did").assessment, "not_found");
  assert.equal(lookupClaim("").assessment, "not_found");
});

test("result never contains a boolean verdict field", () => {
  const r = lookupClaim("free breakfast scheme in schools");
  assert.equal(r.verdict, undefined);
  assert.equal(r.verified, undefined);
  assert.equal(r.contradicted, undefined);
});

test("weak single-term overlap does not reach related_records", () => {
  // "hospital" alone is one strong token; coverage/threshold should hold it back
  const r = lookupClaim("hospital somewhere unrelated xyz");
  assert.notEqual(r.assessment, "related_records");
});
