import { DATA } from "../data/records.js";

/* ---------------- deterministic search engine ----------------
   Purely local. Ranks by token hits, weighting name/scheme/stat
   above the free-text detail. No fuzzy magic, no network — the
   result set is always explainable from the record itself.       */

export const norm = (s) => (s || "").toLowerCase();

export function scoreRecord(rec, tokens) {
  const strong = norm(rec.name + " " + rec.sub + " " + rec.stat);
  const weak = norm(rec.kw + " " + rec.det);
  let score = 0;
  for (const t of tokens) {
    if (!t) continue;
    if (strong.includes(t)) score += 3;
    else if (weak.includes(t)) score += 1;
  }
  return score;
}

export function searchRecords(query, cat) {
  const tokens = norm(query).split(/\s+/).filter(Boolean);
  const pool = cat && cat !== "all" ? DATA.filter((r) => r.cat === cat) : DATA;
  if (tokens.length === 0) return pool;
  return pool
    .map((r) => ({ r, s: scoreRecord(r, tokens) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.r);
}

/* origin metadata — "who began it", the credibility axis */
export const ORIGIN = {
  started:   { label: "Started by DMK",      color: "#22c55e", mark: "✓" },
  expanded:  { label: "Expanded by DMK",     color: "#d97706", mark: "↗" },
  continued: { label: "Continued under DMK", color: "#8a8aa0", mark: "→" },
};

export const SHARE_LINE = {
  started:   "Started and implemented by the DMK government — not the present one.",
  expanded:  "Significantly expanded and funded by the DMK government.",
  continued: "Continued and strengthened under the DMK government.",
};

export const claimVerdict = (o) =>
  o === "expanded"  ? "In the record — the DMK government significantly expanded this."
: o === "continued" ? "In the record — this was continued and strengthened under the DMK government."
:                     "In the record — this was started by the DMK government.";
