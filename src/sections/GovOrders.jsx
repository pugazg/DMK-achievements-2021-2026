import { useState, useMemo } from "react";
import { useT } from "../lib/theme.js";
import { DATA, CAT } from "../data/records.js";
import { GO_META, GO_LINKS } from "../data/govorders.js";
import { Section, SectionHead, Reveal } from "../components/layout.jsx";

const RECBYID = Object.fromEntries(DATA.map((r) => [r.id, r]));
const fmtK = (n) => (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "K" : "" + n);

const FILTERS = [
  { id: "all", label: "All" },
  { id: "budget", label: "Budget announcements" },
  { id: "scheme", label: "Scheme-linked" },
  { id: "law", label: "Act-linked" },
];

function GoCard({ g, onPickRecord }) {
  const t = useT();
  const c = CAT[g.cat] || { color: t.gold, en: g.cat, emoji: "◎" };
  const recs = (g.records || []).map((id) => RECBYID[id]).filter(Boolean);
  return (
    <div style={{ background: t.panel, border: `1px solid ${t.line2}`, borderLeft: `3px solid ${c.color}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ minWidth: 0 }}>
          {g.no && <span style={{ color: t.text, fontSize: 12.5, fontWeight: 700, fontFamily: "ui-monospace,monospace" }}>{g.no}</span>}
          {g.date && <span style={{ color: t.mute, fontSize: 11, fontFamily: "ui-monospace,monospace", marginLeft: 8 }}>{g.date}</span>}
          {g.budget && <span style={{ marginLeft: 8, fontSize: 10, color: t.red, border: `1px solid ${t.red}55`, borderRadius: 5, padding: "1px 6px", fontFamily: "ui-monospace,monospace" }}>◆ Budget announcement</span>}
        </div>
        <span style={{ fontSize: 10.5, color: c.color, fontFamily: "ui-monospace,monospace", whiteSpace: "nowrap" }}>{c.emoji} {c.en}</span>
      </div>
      <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.6, margin: "8px 0 0" }}>{g.abstract}</p>
      <div style={{ fontSize: 10.5, color: t.mute, marginTop: 6 }}>{g.dept}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 9, alignItems: "center" }}>
        <a href={g.pdf} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, padding: "3px 10px", background: "transparent", border: `1px solid ${t.gold}55`, color: t.gold, borderRadius: 14, textDecoration: "none", fontFamily: "ui-monospace,monospace" }}>G.O. PDF ↗</a>
        {recs.map((r) => (
          <button key={r.id} onClick={() => onPickRecord(r)} style={{ fontSize: 11, padding: "3px 9px", background: "transparent", border: `1px solid ${(CAT[r.cat] || {}).color || t.gold}55`, color: (CAT[r.cat] || {}).color || t.gold, borderRadius: 14, cursor: "pointer" }}>{r.name} →</button>
        ))}
        {(g.laws || []).map((l, i) => (
          <span key={i} style={{ fontSize: 10.5, padding: "3px 9px", border: `1px solid ${t.line}`, color: t.faint, borderRadius: 14 }}>⚖ {l.kind} {l.no ? `${l.no}/` : ""}{l.year}</span>
        ))}
      </div>
    </div>
  );
}

export default function GovOrders({ onPickRecord }) {
  const t = useT();
  const M = GO_META;
  const [filter, setFilter] = useState("all");
  const [limit, setLimit] = useState(14);

  const list = useMemo(() => {
    if (filter === "budget") return GO_LINKS.filter((g) => g.budget);
    if (filter === "scheme") return GO_LINKS.filter((g) => g.records && g.records.length);
    if (filter === "law") return GO_LINKS.filter((g) => g.laws && g.laws.length);
    return GO_LINKS;
  }, [filter]);
  const shown = list.slice(0, limit);

  const topDepts = Object.entries(M.byDept || {}).slice(0, 8);
  const stats = [
    { n: fmtK(M.total), l: "Government Orders indexed" },
    { n: M.departments, l: "departments" },
    { n: M.budget, l: "budget-announcement orders" },
    { n: "2021–26", l: M.from + " → " + M.to },
  ];

  return (
    <Section id="govorders">
      <SectionHead
        eyebrow="The machinery of delivery"
        title="From announcement to order"
        lede="A promise becomes real through a Government Order. This layer indexes GOs across all 38 departments — and surfaces the ones that name a scheme, implement an Act, or carry out an announcement made on the floor of the Assembly during the budget. Each links to its official G.O. PDF."
      />

      <Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
          {stats.map((x) => (
            <div key={x.l} style={{ flex: 1, minWidth: 140, background: t.panel, border: `1px solid ${t.line}`, borderRadius: 14, padding: "16px 18px", boxShadow: t.cardShadow }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: t.gold, lineHeight: 1 }}>{x.n}</div>
              <div style={{ color: t.textDim, fontSize: 12, marginTop: 7 }}>{x.l}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* department scale */}
      <Reveal>
        <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 14, padding: "16px 18px", marginBottom: 16 }}>
          <div style={{ fontSize: 10.5, color: t.mute, fontFamily: "ui-monospace,monospace", letterSpacing: ".12em", marginBottom: 10, textTransform: "uppercase" }}>Most active departments (indexed GOs)</div>
          {topDepts.map(([d, n]) => {
            const max = topDepts[0][1];
            return (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ flex: 1, fontSize: 11.5, color: t.textDim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.replace(" Department", "")}</span>
                <span style={{ width: `${Math.max(6, (n / max) * 46)}%`, height: 8, background: `linear-gradient(90deg, ${t.red}, ${t.gold})`, borderRadius: 4 }} />
                <span style={{ width: 34, textAlign: "right", fontSize: 11, color: t.faint, fontFamily: "ui-monospace,monospace" }}>{n}</span>
              </div>
            );
          })}
        </div>
      </Reveal>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {FILTERS.map((f) => {
          const n = f.id === "all" ? GO_LINKS.length : f.id === "budget" ? M.budget : f.id === "scheme" ? M.toRecords : M.toLaws;
          return (
            <button key={f.id} onClick={() => { setFilter(f.id); setLimit(14); }} style={{ padding: "6px 12px", fontSize: 11.5, cursor: "pointer", borderRadius: 20, background: filter === f.id ? t.gold + "22" : t.panel, border: `1px solid ${filter === f.id ? t.gold + "88" : t.line}`, color: filter === f.id ? t.gold : t.mute }}>{f.label} {n}</button>
          );
        })}
      </div>

      {shown.map((g, i) => <GoCard key={g.pdf + i} g={g} onPickRecord={onPickRecord} />)}

      {list.length > limit && (
        <button onClick={() => setLimit((l) => l + 20)} style={{ width: "100%", padding: 13, marginTop: 4, background: "transparent", border: `1px dashed ${t.line}`, color: t.gold, borderRadius: 12, fontSize: 13, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: ".06em" }}>
          Show more · {list.length - limit} remaining
        </button>
      )}

      <p style={{ marginTop: 16, color: t.mute, fontSize: 11.5, lineHeight: 1.6 }}>
        Source: Government Orders, Government of Tamil Nadu (tn.gov.in) — {M.total.toLocaleString("en-IN")} GOs indexed across {M.departments} departments. Abstracts are quoted; scheme/Act links are topical matches. Browse the full department-wise archive at the source.
      </p>
    </Section>
  );
}
