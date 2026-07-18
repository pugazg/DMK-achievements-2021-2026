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
  textDim: "rgba(243,236,217,.74)",
  textSoft: "rgba(243,236,217,.55)",
  faint: "#9c8e6e",
  mute: "#7a6c4c",
  ghost: "#5b5036",
  wisp: "#3f381f",
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
  textSoft: "rgba(36,26,8,.58)",
  faint: "#6d5f3f",
  mute: "#7c6d49",
  ghost: "#9a8a63",
  wisp: "#b6a884",
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
