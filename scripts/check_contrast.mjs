// Static WCAG AA contrast check over every colour the UI renders as text.
//
// This guards the fix made in Phase 9: identity hues (categories, evidence
// grades, origin markers, legislation kinds, manifesto statuses) must be passed
// through textSafe() before being used as text, because the raw hues fail AA in
// one theme or the other. Run: npm run a11y
//
// It checks the palette tokens directly, and checks that textSafe() actually
// repairs every identity hue in both themes. It cannot prove a component
// remembered to call textSafe() — that is what the in-browser audit recorded in
// docs/ACCESSIBILITY_REPORT.md is for.
import { THEMES, textSafe, contrast } from "../src/lib/theme.js";
import { CATEGORIES } from "../src/data/records.js";
import { GRADES } from "../src/lib/evidence.js";
import { ORIGIN } from "../src/lib/search.js";

const AA = 4.5;
const AA_LARGE = 3.0;

// Worst-case surface per theme — the one leaving the least contrast.
const WORST = { dark: "#191207", light: "#f5efe1" };

let failures = 0;
const check = (label, color, bg, need = AA) => {
  const ratio = contrast(color, bg);
  const ok = ratio >= need;
  if (!ok) failures++;
  console.log(
    `  ${ok ? "ok  " : "FAIL"}: ${label.padEnd(42)} ${String(color).padEnd(9)} ${ratio.toFixed(2)}:1 (need ${need})`,
  );
};

for (const themeName of ["dark", "light"]) {
  const t = THEMES[themeName];
  const bg = WORST[themeName];
  console.log(`\n${themeName} theme — worst-case surface ${bg}`);

  // Palette tokens used directly as text.
  for (const token of ["text", "textDim", "textSoft", "faint", "mute", "ghost", "wisp"]) {
    check(`palette.${token}`, t[token].startsWith("rgba") ? flatten(t[token], t.bg) : t[token], bg);
  }

  // Identity hues, as they are actually rendered — via textSafe().
  for (const c of CATEGORIES) check(`category ${c.en} (via textSafe)`, textSafe(c.color, themeName), bg);
  for (const [k, g] of Object.entries(GRADES)) check(`grade ${k} (via textSafe)`, textSafe(g.color, themeName), bg);
  for (const [k, o] of Object.entries(ORIGIN)) check(`origin ${k} (via textSafe)`, textSafe(o.color, themeName), bg);
  for (const token of ["gold", "red", "green", "amber", "grey"]) {
    check(`accent ${token} (via textSafe)`, textSafe(t[token], themeName), bg);
  }
}

// rgba(r,g,b,a) over a known backdrop -> solid hex, so it can be measured.
function flatten(rgba, over) {
  const [r, g, b, a] = rgba.match(/[\d.]+/g).map(Number);
  const base = over.replace("#", "").match(/../g).map((h) => parseInt(h, 16));
  const mix = [r, g, b].map((c, i) => Math.round(c * a + base[i] * (1 - a)));
  return "#" + mix.map((v) => v.toString(16).padStart(2, "0")).join("");
}

console.log(
  failures === 0
    ? "\nCONTRAST CHECK PASSED — every text colour clears WCAG AA in both themes."
    : `\nCONTRAST CHECK FAILED — ${failures} colour(s) below threshold.`,
);
process.exit(failures === 0 ? 0 : 1);
