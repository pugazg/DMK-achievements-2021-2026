// Apply ONLY high-confidence currency-encoding fixes to promises.js.
// Every change is recorded to docs/migration_currency.json. Original
// promise wording is otherwise preserved; only the corrupted rupee glyph
// is restored (?NNN crore -> ₹NNN crore ; â‚¹ -> ₹).
import { readFileSync, writeFileSync } from "node:fs";
const path = "src/data/promises.js";
let src = readFileSync(path, "utf8");
const changes = [];
const before = src;

// â‚¹ mojibake -> ₹
src = src.replace(/â‚¹/g, "₹");
// "?<digits> crore/lakh" and "?<digits>L" -> "₹<digits> ..."  (only when a number follows)
src = src.replace(/\?(\d[\d,.]*)(\s*(?:crore|lakh|cr\b|L\b))/g, "₹$1$2");

if (src !== before) {
  // record which promise notes changed
  const { PROMISES } = await import("../src/data/promises.js");
  for (const p of PROMISES) {
    const n = p.note || "";
    if (/â‚¹/.test(n) || /\?\d[\d,.]*\s*(crore|lakh|cr\b|L\b)/.test(n)) {
      changes.push({ id: "#" + p.num, field: "note", type: "currency-encoding", note: "restored corrupted rupee glyph" });
    }
  }
  writeFileSync(path, src);
}
writeFileSync("docs/migration_currency.json", JSON.stringify({ generated: new Date().toISOString(), file: path, changeCount: changes.length, changes }, null, 1));
console.log("currency fixes applied to promise notes:", changes.length);
