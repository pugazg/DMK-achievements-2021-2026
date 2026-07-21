import { DATA } from "../data/records.js";

/* ---------------- deterministic search engine ----------------
   Purely local. Ranks by token hits, weighting name/scheme/stat
   above the free-text detail. No fuzzy magic, no network — the
   result set is always explainable from the record itself.       */

/* ---------------- text normalisation ----------------
   Tamil is written with combining marks, so the same word can arrive in
   several byte sequences depending on the keyboard or source. Without NFC
   normalisation two visually identical strings simply fail to match.

   The audit found that the previous tokeniser split on [^a-z0-9], which
   discards every Tamil codepoint — a Tamil query produced zero tokens and
   the tool then reported "none of the claim's terms appear in the 438
   records", which was false. Tamil is normalised and tokenised here.

   Tamil has no letter case; toLowerCase() is a no-op on it and is kept
   for the Latin half of a mixed query. */

// Tamil block U+0B80–U+0BFF, plus the Latin set the corpus is written in.
const TAMIL_RANGE = "஀-௿";
const TAMIL_CHAR = new RegExp(`[${TAMIL_RANGE}]`);
const TOKEN_CHARS = new RegExp(`[^a-z0-9${TAMIL_RANGE}₹.%]+`);

export const norm = (s) =>
  (s || "")
    .normalize("NFC")
    .toLowerCase()
    // strip punctuation and quotation marks that would otherwise fuse to a token
    .replace(/[‘’“”'"`,;:!?()[\]{}<>|\\/_*—–-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const hasTamil = (s) => TAMIL_CHAR.test((s || "").normalize("NFC"));

/* Split normalised text into tokens, keeping Tamil and Latin runs separate. */
export const tokenize = (s) => norm(s).split(TOKEN_CHARS).filter(Boolean);

/* How much of a query is Tamil script, 0–1. Used to decide whether a failure
   to match is a coverage problem (English-indexed corpus) or a real absence. */
export function tamilShare(query) {
  const chars = (query || "").normalize("NFC").replace(/\s+/g, "");
  if (!chars.length) return 0;
  let ta = 0;
  for (const ch of chars) if (TAMIL_CHAR.test(ch)) ta++;
  return ta / chars.length;
}

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
  const rawTokens = tokenize(query);
  /* Strong tokens: meaningful words, excluding stopwords.
     Latin needs >= 4 chars to be discriminating in a corpus where every
     record is a government scheme. Tamil is agglutinative and written
     without spaces between some particles, so a meaningful Tamil token is
     routinely 3 codepoints — holding it to 4 would silently drop real
     scheme words. */
  const strongTokens = [
    ...new Set(
      rawTokens.filter((t) => {
        if (STOPWORDS.has(t)) return false;
        if (/^\d/.test(t)) return true;
        return hasTamil(t) ? t.length >= 3 : t.length >= 4;
      }),
    ),
  ];
  const negation = NEGATION_WORDS.filter((w) => new RegExp(`\\b${w.replace(/ /g, "\\s+")}\\b`).test(q));
  const numbers = rawTokens.filter((t) => /^\d/.test(t));
  return { strongTokens, negation, numbers, tamilShare: tamilShare(query) };
}

/* How many records carry any Tamil script at all. The corpus is written in
   English with Tamil proper nouns in `sub`, so Tamil-language coverage is
   structurally partial — the UI must say so rather than imply absence. */
export const TAMIL_INDEXED_RECORDS = DATA.filter((r) => hasTamil(r.sub)).length;

/* Returns { assessment, negation, strongTokens, language, results }.

   assessment is one of:
     "not_found"             no meaningful term matched ANY record
     "language_unsupported"  the query is mainly Tamil and this corpus is
                             indexed in English — absence of a match says
                             nothing about the claim
     "insufficient_match"    partial overlap only; no conclusion possible
     "related_records"       strong topical overlap; still NOT verification

   "language_unsupported" exists because the previous behaviour was to tell a
   Tamil user "none of the claim's meaningful terms appear in the 438 records",
   which was false: the terms were discarded by the tokeniser before matching
   ever happened. Reporting a coverage limit as an absence of evidence is the
   single most misleading thing this tool could do. */
export function lookupClaim(query) {
  const { strongTokens, negation, tamilShare: taShare } = analyseClaim(query);
  const language = {
    tamilShare: taShare,
    // Mostly-Tamil queries can only match the minority of records that carry a
    // Tamil scheme name; the rest of the corpus is English-only.
    mainlyTamil: taShare >= 0.5,
    tamilIndexedRecords: TAMIL_INDEXED_RECORDS,
    totalRecords: DATA.length,
  };
  const base = { negation, strongTokens, language, results: [] };

  if (strongTokens.length === 0) {
    // A Tamil query that yields no tokens is a tokenisation/coverage problem,
    // never evidence that the claim is unsupported.
    return { ...base, assessment: language.mainlyTamil ? "language_unsupported" : "not_found" };
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

  if (!top) {
    return { ...base, assessment: language.mainlyTamil ? "language_unsupported" : "not_found" };
  }
  // Require most of the claim's meaningful terms to appear, at least 2 of them,
  // and at least one DISTINCTIVE term (>=6 chars) or three matched terms —
  // this rejects claims that only overlap on short generic words.
  // Tamil tokens are dense: a 4-codepoint Tamil word carries about as much
  // information as a 6-character English one, so it counts as distinctive.
  const distinctive = top.matched.some((m) => (hasTamil(m) ? m.length >= 4 : m.length >= 6));
  const strongEnough = top.coverage >= 0.6 && top.matched.length >= 2 && (distinctive || top.matched.length >= 3);
  if (strongEnough) return { ...base, assessment: "related_records", results };
  /* Partial overlap. Records WERE found, so this is not a language failure —
     it is ordinary insufficient evidence, and the UI says exactly that. The
     `language` block still travels with the result so a mixed-script query can
     carry the coverage caveat alongside its matches. */
  return { ...base, assessment: "insufficient_match", results };
}

/* origin metadata — "who began it", the credibility axis */
export const ORIGIN = {
  started:   { label: "Started by DMK",      color: "#22c55e", mark: "✓" },
  expanded:  { label: "Expanded by DMK",     color: "#d97706", mark: "↗" },
  continued: { label: "Continued under DMK", color: "#8a8aa0", mark: "→" },
};

/* `color` is the identity hue; wrap it in textSafe() when rendering it as text.
   The mark (✓ ↗ →) carries the same distinction non-chromatically. */

export const SHARE_LINE = {
  started:   "Recorded as started during the 2021–2026 DMK government (per the state record).",
  expanded:  "Recorded as expanded during the 2021–2026 DMK government (per the state record).",
  continued: "Recorded as continued during the 2021–2026 DMK government (per the state record).",
};
