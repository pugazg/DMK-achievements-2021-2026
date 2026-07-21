import { useState, useMemo } from "react";
import { useT } from "../lib/theme.js";
import { DATA, CATEGORIES, CAT } from "../data/records.js";
import { searchRecords } from "../lib/search.js";
import { Section, SectionHead } from "../components/layout.jsx";
import RecordCard from "../components/RecordCard.jsx";

const QUICK = ["free bus", "breakfast", "Keeladi", "startup", "doorstep medicine", "housing", "laptop", "pension", "reservation"];

export default function Explore({ onCard }) {
  const t = useT();
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(12);

  const results = useMemo(() => searchRecords(query, cat), [query, cat]);
  const shown = results.slice(0, limit);

  const counts = useMemo(() => {
    const c = {};
    DATA.forEach((r) => { c[r.cat] = (c[r.cat] || 0) + 1; });
    return c;
  }, []);

  return (
    <Section id="explore">
      <SectionHead
        eyebrow="The evidence"
        title="Explore every record"
        lede={`${DATA.length} records across ${CATEGORIES.length - 1} domains, quoted from the government\u2019s published 2021\u20132026 record. Filter by area, search a topic or scheme, and turn any record into a shareable card.`}
      />

      {/* category chips */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => { setCat(c.id); setLimit(12); }} style={{
            padding: "5px 12px", fontSize: 12, cursor: "pointer", borderRadius: 20,
            background: cat === c.id ? c.color + "22" : t.panel,
            border: `1px solid ${cat === c.id ? c.color + "77" : t.line}`,
            color: cat === c.id ? c.color : t.faint,
          }}>{c.emoji} {c.en}{c.id !== "all" && counts[c.id] ? ` ${counts[c.id]}` : ""}</button>
        ))}
      </div>

      {/* search */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <input value={query} onChange={(e) => { setQuery(e.target.value); setLimit(12); }}
          placeholder="Search a scheme, topic or number…"
          style={{ width: "100%", padding: "14px 16px", background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, color: t.text, fontSize: 15, outline: "none" }} />
      </div>

      {!query && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {QUICK.map((q) => (
            <button key={q} onClick={() => { setQuery(q); setLimit(12); }} style={{ padding: "5px 11px", fontSize: 12, background: t.panel, border: `1px solid ${t.line}`, color: t.mute, borderRadius: 20, cursor: "pointer" }}>{q}</button>
          ))}
        </div>
      )}

      <div style={{ color: t.wisp, fontSize: 10.5, fontFamily: "ui-monospace,monospace", letterSpacing: ".14em", marginBottom: 12 }}>
        {results.length} RECORD{results.length === 1 ? "" : "S"}{query ? ` · "${query}"` : cat !== "all" ? ` · ${CAT[cat].en}` : ""}
      </div>

      {shown.length ? shown.map((r) => <RecordCard key={r.id} rec={r} onCard={onCard} />)
        : <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, padding: 18, color: t.faint, fontSize: 14 }}>No match — try other words.</div>}

      {results.length > limit && (
        <button onClick={() => setLimit((l) => l + 16)} style={{ width: "100%", padding: 13, marginTop: 6, background: "transparent", border: `1px dashed ${t.line}`, color: t.gold, borderRadius: 12, fontSize: 13, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: ".06em" }}>
          Show {Math.min(16, results.length - limit)} more · {results.length - limit} remaining
        </button>
      )}
    </Section>
  );
}
