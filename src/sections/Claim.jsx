import { useState, useMemo } from "react";
import { useT } from "../lib/theme.js";
import { lookupClaim } from "../lib/search.js";
import { Section, SectionHead } from "../components/layout.jsx";
import RecordCard from "../components/RecordCard.jsx";

const EXAMPLES = [
  "free bus for women",
  "free breakfast scheme",
  "₹1000 for women heads of family",
  "Keeladi museum",
  "Kalaignar hospital",
];

/* Claim lookup: retrieves records that MAY relate to a claim and explains
   why they matched. It is NOT a fact-checker: it never declares a claim
   true or false, abstains on weak matches, and flags negative claims.
   Limitations: docs/CLAIM_SEARCH_LIMITATIONS.md                          */
export default function Claim({ onCard }) {
  const t = useT();
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const res = useMemo(() => (submitted && query.trim() ? lookupClaim(query) : null), [query, submitted]);

  return (
    <Section id="claim">
      <SectionHead
        eyebrow="Claim lookup"
        title="Search the record behind a claim"
        lede="Paste a claim you've seen shared. This tool retrieves records from the state's published 2021–2026 record that may relate to it — and shows exactly which words matched. It does not verify or refute claims: a keyword match is not verification, and absence from this dataset is not disproof."
        color={t.red}
      />

      <div style={{ position: "relative", marginBottom: 12 }}>
        <input value={query} aria-label="Claim text to look up in the record"
          onChange={(e) => { setQuery(e.target.value); setSubmitted(false); }}
          onKeyDown={(e) => { if (e.key === "Enter") setSubmitted(true); }}
          placeholder="Type a claim… e.g. 'free bus scheme for women'"
          style={{ width: "100%", padding: "14px 54px 14px 16px", background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, color: t.text, fontSize: 15, outline: "none" }} />
        <button onClick={() => setSubmitted(true)} aria-label="Look up related records" style={{ position: "absolute", right: 9, top: 8, width: 36, height: 36, borderRadius: 9, background: query.trim() ? t.red : t.line, border: "none", color: "#fff", fontSize: 16, cursor: query.trim() ? "pointer" : "default" }}>→</button>
      </div>

      {!submitted && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {EXAMPLES.map((q) => (
            <button key={q} onClick={() => { setQuery(q); setSubmitted(true); }} style={{ padding: "6px 12px", fontSize: 12, background: t.panel, border: `1px solid ${t.red}33`, color: t.faint, borderRadius: 20, cursor: "pointer" }}>{q}</button>
          ))}
        </div>
      )}

      {res && (
        <div style={{ marginTop: 14 }} aria-live="polite">
          {/* negation warning — always shown when the claim is negative */}
          {res.negation.length > 0 && (
            <div style={{ background: `${t.amber}14`, border: `1px solid ${t.amber}66`, borderRadius: 12, padding: "13px 16px", marginBottom: 12 }}>
              <div style={{ color: t.amber, fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>⚠ Negative claim detected (“{res.negation[0]}”)</div>
              <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>
                This tool cannot confirm or deny that something was cancelled, stopped or banned — it only holds the state's published record of what exists. Records below are shown for context only.
              </p>
            </div>
          )}

          {res.assessment === "not_found" && (
            <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, padding: 18, color: t.faint, fontSize: 14, lineHeight: 1.7 }}>
              <b style={{ color: t.text }}>No match in this dataset.</b> None of the claim's meaningful terms appear in the 438 records. That is not evidence the claim is false — only that this dataset holds nothing related.
            </div>
          )}

          {res.assessment === "insufficient_match" && (
            <>
              <div style={{ background: t.panel, border: `1px solid ${t.grey}55`, borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
                <div style={{ color: t.grey, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>◌ Insufficient match — no conclusion possible</div>
                <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>
                  Only {res.results[0]?.matchedTerms.length || 0} of the claim's {res.strongTokens.length} meaningful terms appear in any record. The partial matches below are shown for transparency; they neither support nor contradict the claim.
                </p>
              </div>
              {res.results.slice(0, 2).map((x) => <MatchCard key={x.record.id} x={x} t={t} onCard={onCard} />)}
            </>
          )}

          {res.assessment === "related_records" && (
            <>
              <div style={{ background: `${t.green}0e`, border: `1px solid ${t.green}44`, borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
                <div style={{ color: t.green, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Related records found</div>
                <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>
                  The records below share {res.results[0].matchedTerms.length} of the claim's {res.strongTokens.length} meaningful terms. Read the record and its source before drawing any conclusion — a topical match is not verification of the claim's specifics (numbers, dates, or who did what).
                </p>
              </div>
              {res.results.slice(0, 4).map((x) => <MatchCard key={x.record.id} x={x} t={t} onCard={onCard} />)}
            </>
          )}
        </div>
      )}
    </Section>
  );
}

function MatchCard({ x, t, onCard }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, margin: "0 0 4px 2px", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: t.mute, fontFamily: "ui-monospace,monospace", letterSpacing: ".08em" }}>MATCHED:</span>
        {x.matchedTerms.map((m) => (
          <span key={m} style={{ fontSize: 10.5, padding: "1px 7px", background: `${t.gold}18`, border: `1px solid ${t.gold}44`, color: t.gold, borderRadius: 10, fontFamily: "ui-monospace,monospace" }}>{m}</span>
        ))}
        <span style={{ fontSize: 10, color: t.wisp, fontFamily: "ui-monospace,monospace" }}>({Math.round(x.coverage * 100)}% of claim terms)</span>
      </div>
      <RecordCard rec={x.record} onCard={onCard} />
    </div>
  );
}
