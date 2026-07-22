import { createContext, useContext } from "react";

/* ============================================================
   DESIGN SYSTEM — offline, self-contained, no web fonts.
   The "ledger" aesthetic: deep sepia-black, temple gold,
   rising-sun red. A light "manuscript" theme mirrors it.
   ============================================================ */

// brand constants (theme-independent)
export const GOLD = "#c9a84c";
export const RED = "#c0392b";

// category colours are defined in data/records.js (CATEGORIES);
// these are the shared UI tokens per theme.
const DARK = {
  name: "dark",
  bg: "#0a0807",
  bgGrad: "radial-gradient(1200px 620px at 50% -8%, #17110a 0%, #0a0807 60%)",
  panel: "#141008",
  panel2: "#0d0a05",
  panelHi: "#191207",
  line: "#241c0c",
  line2: "#1c1710",
  text: "#f3ecd9",
  textDim: "rgba(243,236,217,.80)",
  textSoft: "rgba(243,236,217,.66)",
  faint: "#b3a37e",
  mute: "#9a8a63",
  // ghost (input placeholders) and wisp (small meta labels) are both used as
  // TEXT, so they must clear WCAG AA 4.5:1 — see docs/ACCESSIBILITY_REPORT.md.
  ghost: "#8d7f5e",
  wisp: "#8a7c5e",
  gold: GOLD,
  goldSoft: "#e6cf8a",
  red: RED,
  green: "#22c55e",
  amber: "#d97706",
  grey: "#8a8aa0",
  shadow: "0 18px 50px -24px rgba(0,0,0,.85)",
  cardShadow: "0 1px 0 rgba(255,255,255,.02), 0 12px 30px -22px rgba(0,0,0,.8)",
};

const LIGHT = {
  name: "light",
  bg: "#f5efe1",
  bgGrad: "radial-gradient(1200px 620px at 50% -8%, #fffaf0 0%, #f2e9d4 60%)",
  panel: "#fffdf7",
  panel2: "#f7f1e2",
  panelHi: "#fbf6ea",
  line: "#e4d8bd",
  line2: "#ece2ca",
  text: "#241a08",
  textDim: "rgba(36,26,8,.78)",
  textSoft: "rgba(36,26,8,.66)",
  faint: "#5c5033",
  mute: "#6a5d3d",
  // See the dark palette: both are text colours and must clear AA.
  ghost: "#66593d",
  wisp: "#6f6244",
  // Light theme uses RED as its primary accent (dark keeps gold).
  // #b0261a on the cream/white surfaces clears WCAG AA for text.
  gold: "#b0261a",
  goldSoft: "#8c1a11",
  red: "#a5301f",
  green: "#158a3e",
  amber: "#b26a08",
  grey: "#6b6b82",
  shadow: "0 18px 50px -28px rgba(80,60,20,.4)",
  cardShadow: "0 1px 0 rgba(255,255,255,.6), 0 10px 26px -22px rgba(90,70,25,.35)",
};

export const THEMES = { dark: DARK, light: LIGHT };

export const ThemeCtx = createContext(DARK);
export const useT = () => useContext(ThemeCtx);

// translucent tint helper for category colours (hex + alpha suffix)
export const tint = (hex, aa) => `${hex}${aa}`;

/* ============================================================
   textSafe() — WCAG-AA text variant of an identity colour.

   Categories, evidence grades, origin markers and manifesto
   statuses all carry an identity hue. Those hues are fine as
   borders, fills and chart series, but most of them fail WCAG
   AA 4.5:1 as TEXT in one theme or the other: a mid-blue that
   reads on cream is unreadable on near-black, and vice versa.

   Rather than maintain a hand-picked light/dark variant of every
   hue, this walks the colour's own lightness (hue and saturation
   fixed, so the identity survives) until it clears 4.5:1 against
   the worst-case background of the active theme. Results are
   memoised — there are only a couple of dozen distinct hues.

   Measured ratios: docs/ACCESSIBILITY_REPORT.md.
   ============================================================ */

// Target slightly above the 4.5 threshold so sub-pixel rounding in the browser
// can't drop a colour under it.
const AA_TEXT = 4.6;
/* Worst-case surface per theme — the one that leaves the LEAST contrast.
   Light text is worst on the theme's lightest surface (panelHi #191207), and
   dark text is worst on its darkest surface (bg #f5efe1). Clearing the worst
   case clears every panel, card and page background in that theme. */
const WORST_BG = { dark: [0x19, 0x12, 0x07], light: [0xf5, 0xef, 0xe1] };
// Lightness moves away from the background: brighter on dark, darker on light.
const DIRECTION = { dark: +1, light: -1 };

const toRgb = (hex) => {
  const h = String(hex).replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
};
const toHex = (rgb) =>
  "#" + rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");

const channel = (c) => (c / 255 <= 0.03928 ? c / 255 / 12.92 : Math.pow((c / 255 + 0.055) / 1.055, 2.4));
const luminance = (rgb) => 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);

export function contrast(a, b) {
  const la = luminance(Array.isArray(a) ? a : toRgb(a));
  const lb = luminance(Array.isArray(b) ? b : toRgb(b));
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn;
  const s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
}

function hslToRgb([h, s, l]) {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
}

const cache = new Map();

export function textSafe(color, themeName = "dark") {
  if (!color || typeof color !== "string" || color[0] !== "#") return color;
  const key = `${themeName}:${color}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const bg = WORST_BG[themeName] || WORST_BG.dark;
  const dir = DIRECTION[themeName] ?? 1;
  let out = color;

  if (contrast(toRgb(color), bg) < AA_TEXT) {
    const [h, s, l0] = rgbToHsl(toRgb(color));
    for (let step = 1; step <= 100; step++) {
      const l = Math.max(0, Math.min(1, l0 + (dir * step) / 100));
      const rgb = hslToRgb([h, s, l]);
      if (contrast(rgb, bg) >= AA_TEXT) { out = toHex(rgb); break; }
      // Ran out of headroom in this direction (pure white / pure black):
      // fall back to the theme's body text colour rather than an unreadable hue.
      if (l === 0 || l === 1) { out = themeName === "light" ? LIGHT.text : DARK.text; break; }
    }
  }
  cache.set(key, out);
  return out;
}

/* Foreground for text sitting ON a filled swatch (buttons, chips, the skip link).
   textSafe() assumes the page background; this is the inverse case, where the
   background is the brand colour and the text has to work against it. Picks
   whichever of the theme's ink/paper contrasts more. */
export function onColor(background) {
  const bg = typeof background === "string" ? toRgb(background) : background;
  return contrast(bg, toRgb(DARK.bg)) >= contrast(bg, toRgb(DARK.text)) ? DARK.bg : DARK.text;
}
