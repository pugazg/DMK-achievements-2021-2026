// Non-destructive record edits, logged to docs/migration_records.json:
//  1. Disambiguate the two identically-titled "Rural school infrastructure"
//     records (distinct schemes) — visible name only; IDs unchanged.
//  2. Flag 6 "done" records whose detail text mixes completed + planned/
//     ongoing components with `"mixedStatus":true`. `status` is preserved
//     (audit rule: do not silently rewrite); the UI shows the caveat.
import { readFileSync, writeFileSync } from "node:fs";
const path = "src/data/records.js";
let src = readFileSync(path, "utf8");
const changes = [];

function setField(id, insertAfterKey, snippet, note) {
  // insert a new key right after `"id":"<id>"` occurrence's record — we do a
  // targeted string edit anchored on the unique id token.
  const anchor = `{"id":"${id}",`;
  const idx = src.indexOf(anchor);
  if (idx === -1) { changes.push({ id, applied: false, note: "anchor not found" }); return; }
  if (src.slice(idx, idx + 400).includes(snippet.trim().split(":")[0])) { changes.push({ id, applied: false, note: "already present" }); return; }
  src = src.slice(0, idx + anchor.length) + snippet + src.slice(idx + anchor.length);
  changes.push({ id, applied: true, note });
}

// 1. disambiguate duplicate visible titles (rename display name only)
function rename(id, from, to) {
  const anchor = `{"id":"${id}",`;
  const idx = src.indexOf(anchor);
  if (idx === -1) return;
  const seg = src.slice(idx, idx + 600);
  const nameToken = `"name":"${from}"`;
  if (seg.includes(nameToken)) {
    src = src.slice(0, idx) + src.slice(idx).replace(nameToken, `"name":"${to}"`);
    changes.push({ id, applied: true, note: `disambiguated title: "${from}" -> "${to}"` });
  }
}
rename("rur_b2_schools", "Rural school infrastructure", "Rural school classrooms (CESIDS)");
rename("rur_b6_schools", "Rural school infrastructure", "Rural school classrooms (RD dept)");

// 2. mixedStatus flag for compound-done records
["edu3", "hea4", "inf5", "eco_b2_tidel", "her_b2_temples", "env_b4_thoonmai"].forEach((id) =>
  setField(id, "id", `"mixedStatus":true,`, "detail text mixes completed + planned/ongoing components"));

writeFileSync(path, src);
writeFileSync("docs/migration_records.json", JSON.stringify({ generated: new Date().toISOString(), file: path, changes }, null, 1));
console.log("record migrations:", changes.filter((c) => c.applied).length, "applied");
changes.forEach((c) => console.log(" ", c.applied ? "OK" : "--", c.id, c.note));
