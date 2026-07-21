import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { VERSION, versionLine } from "../src/lib/version.js";
import {
  PUBLISHER, PURPOSE, AFFILIATION, FUNDING, GRADE_LADDER,
  VERSION_ROWS, LICENCE_ROWS, REPO_URL, ISSUES_URL, CORRECTION_FIELDS,
} from "../src/data/transparency.js";
import { GRADES } from "../src/lib/evidence.js";

/* The transparency page is the one place a wrong statement does the most
   damage: it is where a reader decides whether to trust anything else. These
   tests pin the disclosures that must not silently disappear or drift out of
   agreement with the documentation. */

const read = (p) => readFileSync(p, "utf8");

test("every required disclosure section has content", () => {
  for (const [name, val] of [
    ["PUBLISHER", PUBLISHER], ["FUNDING", FUNDING], ["GRADE_LADDER", GRADE_LADDER],
    ["VERSION_ROWS", VERSION_ROWS], ["LICENCE_ROWS", LICENCE_ROWS],
    ["CORRECTION_FIELDS", CORRECTION_FIELDS], ["AFFILIATION.rows", AFFILIATION.rows],
    ["PURPOSE.is", PURPOSE.is], ["PURPOSE.isNot", PURPOSE.isNot],
  ]) {
    assert.ok(Array.isArray(val) && val.length > 0, `${name} is empty`);
  }
});

test("no unresolved placeholder survives into the published page", () => {
  const blob = JSON.stringify({ PUBLISHER, PURPOSE, AFFILIATION, FUNDING, VERSION_ROWS, LICENCE_ROWS });
  assert.ok(!/NOT YET DECIDED|TBD|TODO|FIXME|XXX|placeholder/i.test(blob),
    "an unresolved placeholder is visible on the transparency page");
});

test("affiliation is stated explicitly, not by omission", () => {
  // "No affiliation" must be said, because silence reads as concealment.
  assert.match(AFFILIATION.headline, /no political affiliation/i);
  const keys = AFFILIATION.rows.map(([k]) => k.toLowerCase()).join(" ");
  for (const required of ["dmk", "party", "government body", "campaign"]) {
    assert.ok(keys.includes(required), `affiliation disclosure omits "${required}"`);
  }
  // And the perspective caveats must survive — a bare "none" is not a disclosure.
  assert.ok(AFFILIATION.perspective.length >= 2);
  assert.match(JSON.stringify(AFFILIATION.perspective), /one-sided|editorial/i);
});

test("funding disclosure covers every money route", () => {
  const keys = FUNDING.map(([k]) => k.toLowerCase()).join(" ");
  for (const required of ["government", "party", "advertisement", "sponsorship", "donation"]) {
    assert.ok(keys.includes(required), `funding disclosure omits "${required}"`);
  }
});

test("the page states what the project is NOT", () => {
  const isNot = PURPOSE.isNot.join(" ").toLowerCase();
  assert.ok(isNot.includes("not an official government publication"));
  assert.ok(/not a fact-check/.test(isNot));
  assert.ok(/no record here is verified|not an independent certification/.test(isNot));
  assert.ok(/ownership/.test(isNot), "must disclaim ownership of government documents");
});

test("grade ladder matches the evidence model exactly", () => {
  const ladder = GRADE_LADDER.map(([g]) => g);
  assert.deepEqual(ladder, Object.keys(GRADES), "transparency ladder drifted from GRADES");
  assert.equal(ladder.length, 6);
});

test("licence disclosure never claims government documents", () => {
  const gov = LICENCE_ROWS.find(([scope]) => /government/i.test(scope));
  assert.ok(gov, "no row covering government documents");
  assert.match(gov[1] + " " + gov[2], /not licensed|no ownership/i);
  const scopes = LICENCE_ROWS.map(([s]) => s.toLowerCase()).join(" ");
  assert.ok(scopes.includes("software") && scopes.includes("data"));
});

test("version information is present and self-consistent", () => {
  assert.match(VERSION.data, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(VERSION.dataUpdated, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(VERSION.methodology, /^\d+\.\d+$/);
  assert.match(VERSION.release, /^\d+\.\d+\.\d+$/);
  // The record cut-off cannot be after the last edit to the data.
  assert.ok(VERSION.data <= VERSION.dataUpdated, "data cut-off is later than the last update");
  const line = versionLine();
  assert.ok(line.includes(VERSION.data) && line.includes(VERSION.methodology) && line.includes(VERSION.release));
  // Every version must be surfaced to the reader.
  const shown = VERSION_ROWS.map(([, v]) => String(v)).join(" ");
  for (const v of [VERSION.data, VERSION.release, VERSION.status]) {
    assert.ok(shown.includes(v), `version "${v}" is not shown on the page`);
  }
});

test("release version matches package.json", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(VERSION.release, pkg.version, "src/lib/version.js drifted from package.json");
  assert.equal(pkg.license, "MIT");
});

test("links point at the real repository over https", () => {
  for (const url of [REPO_URL, ISSUES_URL]) {
    assert.match(url, /^https:\/\/github\.com\/pugazg\/DMK-achievements-2021-2026/);
  }
  assert.ok(ISSUES_URL.endsWith("/issues"));
});

test("the supporting documents exist and are not placeholders", () => {
  for (const p of [
    "docs/PUBLISHER_TRANSPARENCY.md",
    "docs/METHODOLOGY.md",
    "docs/CORRECTIONS.md",
    "LICENSE",
    "LICENSE-DATA",
  ]) {
    assert.ok(existsSync(p), `${p} is missing`);
    const body = read(p);
    assert.ok(body.length > 400, `${p} looks like a stub`);
    assert.ok(!/NOT YET DECIDED/.test(body), `${p} still contains an unresolved placeholder`);
  }
});

test("methodology doc states the Government Order limitation", () => {
  const m = read("docs/METHODOLOGY.md");
  assert.match(m, /Government Order proves administrative action/i);
  for (const term of ["completion", "beneficiary delivery", "outcome"]) {
    assert.ok(m.toLowerCase().includes(term), `METHODOLOGY.md omits "${term}"`);
  }
  assert.match(m, new RegExp(`Methodology version ${VERSION.methodology.replace(".", "\\.")}`, "i"));
});

test("correction process documents a review status flow", () => {
  const c = read("docs/CORRECTIONS.md");
  for (const status of ["received", "investigating", "confirmed", "applied", "declined"]) {
    assert.ok(c.includes(status), `CORRECTIONS.md omits status "${status}"`);
  }
  const fields = CORRECTION_FIELDS.map(([k]) => k.toLowerCase()).join(" ");
  for (const f of ["issue type", "record id", "source reference", "explanation", "review status"]) {
    assert.ok(fields.includes(f), `correction fields omit "${f}"`);
  }
});

test("no transparency copy claims verification", () => {
  const blob = JSON.stringify({ PUBLISHER, PURPOSE, AFFILIATION, FUNDING, VERSION_ROWS, LICENCE_ROWS });
  // "verified" may appear only inside the grade ladder definitions (A/B/C names)
  // and in explicit denials such as "no record here is verified".
  const claims = blob.match(/[^"]*verified[^"]*/gi) || [];
  for (const c of claims) {
    assert.ok(/no record|not an independent|never/i.test(c), `unqualified verification claim: "${c}"`);
  }
});
