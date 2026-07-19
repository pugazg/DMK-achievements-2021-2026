import { useState, useMemo } from "react";
import { useT } from "../lib/theme.js";
import { DATA, CAT } from "../data/records.js";
import { LEGISLATION, LEGISLATION_META } from "../data/legislation.js";
import { Section, SectionHead, Reveal } from "../components/layout.jsx";

const RECBYID = Object.fromEntries(DATA.map((r) => [r.id, r]));
const KIND = {
  Act:       { label: "Act",       color: "#22c55e" },
  Bill:      { label: "Bill",      color: "#c9a84c" },
  Ordinance: { label: "Ordinance", color: "#0891b2" },
};

function LawRow({ a, onPickRecord }) {
  const t = useT();
  const k = KIND[a.kind] || KIND.Act;
  const c = CAT[a.cat] || { color: t.gold, en: a.cat, emoji: "◎" };
  const recs = (a.records || []).map((id) => RECBYID[id]).filter(Boolean);
  return (
    <div style={{ background: t.panel, border: `1px solid ${t.line2}`, borderLeft: `3px solid ${c.color}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, color: k.color, border: `1px solid ${k.color}55`, borderRadius: 5, padding: "1px 6px", marginRight: 8, fontFamily: "ui-monospace,monospace", verticalAlign: "middle" }}>
            {k.label}{a.no ? ` ${a.no}` : ""} · {a.year}
          </span>
          <span style={{ color: t.text, fontSize: 13.5, lineHeight: 1.5 }}>{a.title}</span>
          {a.extra > 0 && <span style={{ color: t.mute, fontSize: 11, fontStyle: "italic" }}> +{a.extra} more in this gazette</span>}
        </div>
        <span style={{ fontSize: 10.5, color: c.color, fontFamily: "ui-monospace,monospace", whiteSpace: "nowrap" }}>{c.emoji} {c.en}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 9, alignItems: "center" }}>
        {a.pdf && (
          <a href={a.pdf} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, padding: "3px 10px", background: "transparent", border: `1px solid ${t.gold}55`, color: t.gold, borderRadius: 14, textDecoration: "none", fontFamily: "ui-monospace,monospace" }}>
            Gazette PDF ↗
          </a>
        )}
        {a.date && <span style={{ fontSize: 10.5, color: t.mute, fontFamily: "ui-monospace,monospace" }}>{a.date}</span>}
        {recs.length > 0 && <span style={{ fontSize: 10, color: t.wisp, fontFamily: "ui-monospace,monospace", letterSpacing: ".06em", marginLeft: 4 }}>RELATED:</span>}
        {recs.map((r) => (
          <button key={r.id} onClick={() => onPickRecord(r)} style={{ fontSize: 11, padding: "3px 9px", background: "transparent", border: `1px solid ${(CAT[r.cat] || {}).color || t.gold}55`, color: (CAT[r.cat] || {}).color || t.gold, borderRadius: 14, cursor: "pointer" }}>{r.name} →</button>
        ))}
      </div>
    </div>
  );
}

function YearBlock({ year, items, defaultOpen, onPickRecord }) {
  const t = useT();
  const [open, setOpen] = useState(defaultOpen);
  const acts = items.filter((a) => a.kind === "Act").length;
  return (
    <div style={{ marginBottom: 10 }}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: t.panel, border: `1px solid ${open ? t.gold + "55" : t.line}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer", textAlign: "left" }}>
        <span style={{ color: t.gold, fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: ".06em", fontWeight: 700 }}>{year}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: t.mute, fontSize: 11.5, fontFamily: "ui-monospace,monospace" }}>{items.length} items · {acts} acts</span>
          <span style={{ color: t.faint, fontSize: 12, display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
        </span>
      </button>
      {open && (
        <div style={{ marginTop: 8, marginLeft: 2 }}>
          {items.map((a, i) => <LawRow key={`${a.kind}-${a.no}-${a.year}-${i}`} a={a} onPickRecord={onPickRecord} />)}
        </div>
      )}
    </div>
  );
}

const KINDS = ["All", "Act", "Bill", "Ordinance"];

export default function Legislation({ onPickRecord }) {
  const t = useT();
  const M = LEGISLATION_META;
  const [kind, setKind] = useState("All");

  const list = useMemo(() => (kind === "All" ? LEGISLATION : LEGISLATION.filter((a) => a.kind === kind)), [kind]);
  const years = useMemo(() => {
    const by = {};
    list.forEach((a) => { (by[a.year] = by[a.year] || []).push(a); });
    return Object.keys(by).map(Number).sort((x, y) => y - x).map((y) => [y, by[y]]);
  }, [list]);

  const stats = [
    { n: M.acts, l: "Acts passed into law" },
    { n: M.bills, l: "Bills introduced" },
    { n: M.total, l: "gazetted 2021–2026" },
  ];

  return (
    <Section id="legislation">
      <SectionHead
        eyebrow="Law into effect"
        title="What the House actually enacted"
        lede="A record only becomes durable when it becomes law. These are the Acts, Bills and Ordinances of the 2021–2026 term, taken from the Tamil Nadu Government Gazette — each linked to its official gazette PDF and, where the subject matches, to the achievement it enabled."
      />

      <Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
          {stats.map((x) => (
            <div key={x.l} style={{ flex: 1, minWidth: 150, background: t.panel, border: `1px solid ${t.line}`, borderRadius: 14, padding: "16px 18px", boxShadow: t.cardShadow }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: t.gold, lineHeight: 1 }}>{x.n}</div>
              <div style={{ color: t.textDim, fontSize: 12.5, marginTop: 7 }}>{x.l}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {KINDS.map((k) => (
          <button key={k} onClick={() => setKind(k)} style={{ padding: "6px 12px", fontSize: 11.5, cursor: "pointer", borderRadius: 20, background: kind === k ? t.gold + "22" : t.panel, border: `1px solid ${kind === k ? t.gold + "88" : t.line}`, color: kind === k ? t.gold : t.mute }}>
            {k === "All" ? `All ${M.total}` : `${k}s ${k === "Act" ? M.acts : k === "Bill" ? M.bills : M.ordinances}`}
          </button>
        ))}
      </div>

      {years.map(([year, items], i) => (
        <YearBlock key={year} year={year} items={items} defaultOpen={i === 0} onPickRecord={onPickRecord} />
      ))}

      <p style={{ marginTop: 16, color: t.mute, fontSize: 11.5, lineHeight: 1.6 }}>
        Source: Tamil Nadu Government Gazette (Extraordinary), Part IV — Dept. of Stationery & Printing (stationeryprinting.tn.gov.in). Titles are quoted from the gazette; “related” links are topical matches to this tool's records.
      </p>
    </Section>
  );
}
