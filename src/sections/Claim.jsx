import { useState, useMemo } from "react";
import { useT } from "../lib/theme.js";
import { searchRecords, SHARE_LINE, claimVerdict } from "../lib/search.js";
import { Section, SectionHead } from "../components/layout.jsx";
import RecordCard from "../components/RecordCard.jsx";

const CLAIMS = [
  "New govt started free bus for women",
  "New govt started free breakfast",
  "₹1000 is given by the new government",
  "New govt built the Keeladi museum",
  "New govt opened Kalaignar hospital",
];

export default function Claim({ onCard }) {
  const t = useT();
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => (submitted ? searchRecords(query, "all") : []), [query, submitted]);
  const top = results[0];

  return (
    <Section id="claim">
      <SectionHead
        eyebrow="Fact-check"
        title="Did the DMK start it — or someone else?"
        lede="Paste a claim you've seen forwarded. The tool matches it to the verified record and tells you who actually began the scheme. It can only answer from the record — so it can't invent a fact."
        color={t.red}
      />

      <div style={{ position: "relative", marginBottom: 12 }}>
        <input value={query}
          onChange={(e) => { setQuery(e.target.value); setSubmitted(false); }}
          onKeyDown={(e) => { if (e.key === "Enter") setSubmitted(true); }}
          placeholder="Type a claim… e.g. 'new govt started free bus'"
          style={{ width: "100%", padding: "14px 54px 14px 16px", background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, color: t.text, fontSize: 15, outline: "none" }} />
        <button onClick={() => setSubmitted(true)} aria-label="Check" style={{ position: "absolute", right: 9, top: 8, width: 36, height: 36, borderRadius: 9, background: query.trim() ? t.red : t.line, border: "none", color: "#fff", fontSize: 16, cursor: query.trim() ? "pointer" : "default" }}>→</button>
      </div>

      {!submitted && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {CLAIMS.map((q) => (
            <button key={q} onClick={() => { setQuery(q); setSubmitted(true); }} style={{ padding: "6px 12px", fontSize: 12, background: t.panel, border: `1px solid ${t.red}33`, color: t.faint, borderRadius: 20, cursor: "pointer" }}>⚡ {q}</button>
          ))}
        </div>
      )}

      {submitted && (top ? (
        <div style={{ marginTop: 14 }}>
          <div style={{ background: `${t.green}14`, border: `1px solid ${t.green}55`, borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}>
            <div style={{ color: t.green, fontSize: 13, fontWeight: 800, marginBottom: 6 }}>✅ {claimVerdict(top.origin)}</div>
            <div style={{ color: t.textDim, fontSize: 14, lineHeight: 1.7 }}>
              <b style={{ color: t.text }}>{top.name}</b> — {(SHARE_LINE[top.origin] || SHARE_LINE.started).replace(/\.$/, "")} ({top.date}). The verified record contradicts any claim that another government is responsible.
            </div>
          </div>
          <RecordCard rec={top} onCard={onCard} />
          {results.length > 1 && <div style={{ color: t.mute, fontSize: 11, fontFamily: "ui-monospace,monospace", margin: "6px 0 10px", letterSpacing: ".1em" }}>RELATED RECORDS</div>}
          {results.slice(1, 4).map((r) => <RecordCard key={r.id} rec={r} onCard={onCard} />)}
        </div>
      ) : (
        <div style={{ marginTop: 14, background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, padding: 18, color: t.faint, fontSize: 14, lineHeight: 1.7 }}>
          No matching record found — try different keywords.
        </div>
      ))}
    </Section>
  );
}
