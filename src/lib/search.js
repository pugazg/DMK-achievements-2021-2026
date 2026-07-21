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

/* ---------------- claim lookup (NOT a verdict engine) ----------------
   This retrieves records that MAY relate to a claim and explains why.
   It never verifies or contradicts a claim: keyword overlap is not
   verification. It abstains when the match is weak, and it flags
   negated claims ("cancelled", "banned", "stopped"…) because record
   presence cannot confirm or deny a negative.
   See docs/CLAIM_SEARCH_LIMITATIONS.md.                              */

const STOPWORDS = new Set(
  ("the a an of for and or to in on by with is are was were has have had did does do it its this that these those from as at be been " +
   "new old govt government tamil nadu tn state scheme schemes people crore lakh rupees rs year years present current previous " +
   "launched launch started start mission project programme plan initiative announced announce introduced introduce " +
   "made make gave give given built build set up done all every some more first").split(" ")
);

const NEGATION_WORDS = [
  "cancelled", "canceled", "cancel", "stopped", "stop", "banned", "ban", "ended", "end",
  "scrapped", "scrap", "closed", "shut", "withdrew", "withdrawn", "discontinued",
  "abolished", "removed", "never", "not", "no longer", "failed", "denied", "rejected",
];

export function analyseClaim(query) {
  const q = norm(query);
  const rawTokens = q.split(/[^a-z0-9₹.%]+/).filter(Boolean);
  // strong tokens: meaningful words, not stopwords, length >= 4 (or numbers)
  const strongTokens = [...new Set(rawTokens.filter((t) => !STOPWORDS.has(t) && (t.length >= 4 || /^\d/.test(t))))];
  const negation = NEGATION_WORDS.filter((w) => new RegExp(`\\b${w.replace(/ /g, "\\s+")}\\b`).test(q));
  const numbers = rawTokens.filter((t) => /^\d/.test(t));
  return { strongTokens, negation, numbers };
}

/* Returns { assessment, negation, results } — assessment is one of:
   "not_found"            no meaningful terms matched the record
   "insufficient_match"   weak/partial overlap only; no conclusion possible
   "related_records"      strong topical overlap; still NOT verification   */
export function lookupClaim(query) {
  const { strongTokens, negation } = analyseClaim(query);
  if (strongTokens.length === 0) {
    return { assessment: "not_found", negation, strongTokens, results: [] };
  }
  const scored = DATA.map((r) => {
    const hay = norm(r.name + " " + r.sub + " " + r.stat + " " + r.kw + " " + r.det);
    const matched = strongTokens.filter((t) => hay.includes(t));
    return { r, matched, coverage: matched.length / strongTokens.length };
  })
    .filter((x) => x.matched.length > 0)
    .sort((a, b) => b.coverage - a.coverage || b.matched.length - a.matched.length);

  const top = scored[0];
  const results = scored.slice(0, 5).map((x) => ({ record: x.r, matchedTerms: x.matched, coverage: x.coverage }));

  if (!top) return { assessment: "not_found", negation, strongTokens, results: [] };
  // require most of the claim's meaningful terms to appear, at least 2 of them,
  // and at least one DISTINCTIVE term (>=6 chars) or three matched terms —
  // this rejects claims that only overlap on short generic words.
  const distinctive = top.matched.some((m) => m.length >= 6);
  const strongEnough = top.coverage >= 0.6 && top.matched.length >= 2 && (distinctive || top.matched.length >= 3);
  return {
    assessment: strongEnough ? "related_records" : "insufficient_match",
    negation, strongTokens, results,
  };
}

/* origin metadata — "who began it", the credibility axis */
export const ORIGIN = {
  started:   { label: "Started by DMK",      color: "#22c55e", mark: "✓" },
  expanded:  { label: "Expanded by DMK",     color: "#d97706", mark: "↗" },
  continued: { label: "Continued under DMK", color: "#8a8aa0", mark: "→" },
};

export const SHARE_LINE = {
  started:   "Recorded as started during the 2021–2026 DMK government (per the state record).",
  expanded:  "Recorded as expanded during the 2021–2026 DMK government (per the state record).",
  continued: "Recorded as continued during the 2021–2026 DMK government (per the state record).",
};
