import test from "node:test";
import assert from "node:assert/strict";
import { lookupClaim, analyseClaim, norm, tokenize, hasTamil, tamilShare, TAMIL_INDEXED_RECORDS } from "../src/lib/search.js";
import { DATA } from "../src/data/records.js";

/* The audit found that a Tamil claim returned "none of the claim's meaningful
   terms appear in the 438 records" — false, because the tokeniser discarded
   every Tamil codepoint before matching. These tests pin the fix and, more
   importantly, pin the rule that a coverage limit is never reported as an
   absence of evidence. */

// Scheme names that genuinely exist in `sub` — the only Tamil the corpus holds.
const KANAVU_ILLAM = "கலைஞரின் கனவு இல்லம்";
const NAMMA_OORU = "நம்ம ஊரு நம்ம அரசு";
const SAMATHUVAPURAM = "பெரியார் நினைவு சமத்துவபுரம்";

test("normalisation: NFC, case, punctuation and whitespace", () => {
  assert.equal(norm("  Free   BUS,  travel! "), "free bus travel");
  assert.equal(norm("“Vidiyal” — Payanam"), "vidiyal payanam");
  // NFC: the same Tamil word composed two ways must normalise identically.
  const composed = "கனவு".normalize("NFC");
  const decomposed = "கனவு".normalize("NFD");
  assert.equal(norm(composed), norm(decomposed));
});

test("tokenizer keeps Tamil tokens instead of discarding them", () => {
  const toks = tokenize(KANAVU_ILLAM);
  assert.ok(toks.length >= 3, `expected Tamil tokens, got ${JSON.stringify(toks)}`);
  assert.ok(toks.every((t) => hasTamil(t)));
});

test("tokenizer handles mixed Tamil-English queries", () => {
  const toks = tokenize("கனவு இல்லம் rural housing scheme");
  assert.ok(toks.some(hasTamil), "Tamil tokens missing");
  assert.ok(toks.includes("rural") && toks.includes("housing"), "English tokens missing");
});

test("tamilShare measures script mix", () => {
  assert.equal(tamilShare("free bus"), 0);
  assert.equal(tamilShare(""), 0);
  assert.ok(tamilShare(KANAVU_ILLAM) > 0.9);
  const mixed = tamilShare("கனவு இல்லம் rural housing");
  assert.ok(mixed > 0 && mixed < 1, `expected a mix, got ${mixed}`);
});

test("analyseClaim produces Tamil strong tokens", () => {
  const a = analyseClaim(KANAVU_ILLAM);
  assert.ok(a.strongTokens.length >= 2, `got ${JSON.stringify(a.strongTokens)}`);
  assert.ok(a.strongTokens.some(hasTamil));
});

test("Tamil scheme names surface their records", () => {
  for (const [q, expectId] of [
    [KANAVU_ILLAM, "rur_b2_housing"],
    [NAMMA_OORU, "rur_b6_nammaooru"],
    [SAMATHUVAPURAM, "rur_b6_samathuvapuram"],
  ]) {
    const r = lookupClaim(q);
    assert.equal(r.assessment, "related_records", `${q} -> ${r.assessment}`);
    const ids = r.results.map((x) => x.record.id);
    assert.ok(ids.includes(expectId), `${q}: expected ${expectId}, got ${ids.join(",")}`);
  }
});

test("Tamil achievement search returns records, not a false absence", () => {
  const r = lookupClaim("அனைத்து கிராம அண்ணா மறுமலர்ச்சித் திட்டம்");
  assert.notEqual(r.assessment, "not_found");
  assert.ok(r.results.length > 0);
});

test("mixed Tamil-English query matches on both halves", () => {
  const r = lookupClaim("கனவு இல்லம் rural housing scheme");
  assert.equal(r.assessment, "related_records");
  assert.ok(r.results.some((x) => x.record.id === "rur_b2_housing"));
});

test("CRITICAL: an unmatched Tamil claim is never reported as 'not found'", () => {
  // A real scheme whose Tamil name this corpus does not carry.
  const r = lookupClaim("விடியல் பயணம் இலவச பேருந்து");
  assert.notEqual(r.assessment, "not_found",
    "reporting a coverage limit as an absence of evidence is the failure this fix exists to prevent");
  assert.equal(r.assessment, "language_unsupported");
  assert.ok(r.language.tamilShare > 0.5);
  assert.equal(r.language.tamilIndexedRecords, TAMIL_INDEXED_RECORDS);
  assert.equal(r.language.totalRecords, DATA.length);
});

test("language metadata travels with every result", () => {
  for (const q of ["free bus for women", KANAVU_ILLAM, "the a of and", "moon mission"]) {
    const r = lookupClaim(q);
    assert.ok(r.language, `no language block for "${q}"`);
    assert.equal(typeof r.language.tamilShare, "number");
    assert.equal(r.language.totalRecords, DATA.length);
  }
});

test("English behaviour is unchanged by the Tamil work", () => {
  assert.equal(lookupClaim("the a of and").assessment, "not_found");
  assert.equal(lookupClaim("Free bus travel for women in Tamil Nadu").assessment, "related_records");
  // Fabricated claims must still abstain. Which abstention it is depends on
  // whether any token happens to appear at all, so assert the property that
  // matters: it never reaches related_records.
  for (const q of [
    "Tamil Nadu launched a manned moon mission",
    "Tamil Nadu launched a manned moon mission in 2024",
  ]) {
    assert.notEqual(lookupClaim(q).assessment, "related_records", `fabricated claim surfaced as related: "${q}"`);
  }
});

test("no assessment is ever a verdict, in any language", () => {
  const allowed = new Set(["not_found", "language_unsupported", "insufficient_match", "related_records"]);
  for (const q of [KANAVU_ILLAM, "விடியல் பயணம்", "free bus", "கனவு இல்லம் rural"]) {
    const r = lookupClaim(q);
    assert.ok(allowed.has(r.assessment), `unexpected assessment ${r.assessment}`);
    const keys = Object.keys(r).join(",");
    assert.ok(!/verdict|isTrue|correct|score|confidence/i.test(keys), `verdict-like field in ${keys}`);
  }
});
