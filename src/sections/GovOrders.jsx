import { useState, useMemo } from "react";
import { useT } from "../lib/theme.js";
import { DATA, CAT } from "../data/records.js";
import { GO_META, GO_LINKS } from "../data/govorders.js";
import { GAZETTE_GO_META, GAZETTE_GOS } from "../data/gazettegos.js";
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

function GazetteCard({ g, onPickRecord }) {
  const t = useT();
  const recs = (g.records || []).map((id) => RECBYID[id]).filter(Boolean);
  const goLabel = g.gono ? `G.O.(${g.gotype}) No. ${g.gono}` : null;
  return (
    <div style={{ background: t.panel, border: `1px solid ${t.line2}`, borderLeft: `3px solid ${g.inPortal ? t.green : t.line}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ minWidth: 0 }}>
          <span style={{ fontSize: 10, color: t.grey, border: `1px solid ${t.line}`, borderRadius: 5, padding: "1px 6px", fontFamily: "ui-monospace,monospace", marginRight: 8 }}>{g.part}</span>
          {goLabel && <span style={{ color: t.text, fontSize: 12.5, fontWeight: 700, fontFamily: "ui-monospace,monospace" }}>{goLabel}</span>}
          {g.date && <span style={{ color: t.mute, fontSize: 11, fontFamily: "ui-monospace,monospace", marginLeft: 8 }}>{g.date}</span>}
        </div>
        {g.inPortal && <span style={{ fontSize: 9.5, color: t.green, border: `1px solid ${t.green}55`, borderRadius: 5, padding: "1px 6px", fontFamily: "ui-monospace,monospace", whiteSpace: "nowrap" }}>✓ in portal</span>}
      </div>
      <p style={{ color: t.textDim, fontSize: 12, lineHeight: 1.55, margin: "8px 0 0" }}>{g.subject}</p>
      {g.dept && <div style={{ fontSize: 10.5, color: t.mute, marginTop: 6 }}>{g.dept}</div>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 9, alignItems: "center" }}>
        <a href={g.pdf} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, padding: "3px 10px", background: "transparent", border: `1px solid ${t.gold}55`, color: t.gold, borderRadius: 14, textDecoration: "none", fontFamily: "ui-monospace,monospace" }}>Gazette PDF ↗</a>
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

function GazetteView({ onPickRecord }) {
  const t = useT();
  const M = GAZETTE_GO_META;
  const [gf, setGf] = useState("all");
  const [limit, setLimit] = useState(14);
  const list = useMemo(() => {
    if (gf === "go") return GAZETTE_GOS.filter((g) => g.part.startsWith("Part II-2"));
    if (gf === "portal") return GAZETTE_GOS.filter((g) => g.inPortal);
    if (gf === "law") return GAZETTE_GOS.filter((g) => g.laws && g.laws.length);
    return GAZETTE_GOS;
  }, [gf]);
  const shown = list.slice(0, limit);
  const stats = [
    { n: M.goEntries, l: "GO / notification entries" },
    { n: M.withGoNumber, l: "carry a G.O. number" },
    { n: M.crossReferenced, l: "cross-referenced to portal" },
    { n: M.weeklyIssues, l: "weekly issues indexed" },
  ];
  const GF = [
    { id: "all", label: "All", n: GAZETTE_GOS.length },
    { id: "go", label: "Part II-2 (G.O.)", n: (M.byPart || {})["Part II-2 (G.O.)"] || 0 },
    { id: "portal", label: "Cross-referenced", n: M.crossReferenced },
    { id: "law", label: "Act-linked", n: M.toLaws },
  ];
  return (
    <>
      <Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
          {stats.map((x) => (
            <div key={x.l} style={{ flex: 1, minWidth: 140, background: t.panel, border: `1px solid ${t.line}`, borderRadius: 14, padding: "16px 18px", boxShadow: t.cardShadow }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: t.gold, lineHeight: 1 }}>{x.n}</div>
              <div style={{ color: t.textDim, fontSize: 12, marginTop: 7 }}>{x.l}</div>
            </div>
          ))}
        </div>
      </Reveal>
      <p style={{ color: t.textDim, fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>
        Beyond the portal, government orders and notifications are also published in the <b style={{ color: t.text }}>Gazette</b> — Parts I, II and III of the Extraordinary Gazette. This indexes all {M.goEntries} such entries (2021–2026); {M.crossReferenced} carry a G.O. number that matches a portal GO. A further {M.weeklyParts?.toLocaleString?.("en-IN") || M.weeklyParts} part-files across {M.weeklyIssues} weekly issues are catalogued in the source archive.
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {GF.map((f) => (
          <button key={f.id} onClick={() => { setGf(f.id); setLimit(14); }} style={{ padding: "6px 12px", fontSize: 11.5, cursor: "pointer", borderRadius: 20, background: gf === f.id ? t.gold + "22" : t.panel, border: `1px solid ${gf === f.id ? t.gold + "88" : t.line}`, color: gf === f.id ? t.gold : t.mute }}>{f.label} {f.n}</button>
        ))}
      </div>
      {shown.map((g, i) => <GazetteCard key={g.pdf + i} g={g} onPickRecord={onPickRecord} />)}
      {list.length > limit && (
        <button onClick={() => setLimit((l) => l + 20)} style={{ width: "100%", padding: 13, marginTop: 4, background: "transparent", border: `1px dashed ${t.line}`, color: t.gold, borderRadius: 12, fontSize: 13, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: ".06em" }}>Show more · {list.length - limit} remaining</button>
      )}
      <p style={{ marginTop: 16, color: t.mute, fontSize: 11.5, lineHeight: 1.6 }}>
        Source: Tamil Nadu Government Gazette (Extraordinary), Parts I/II/III — Dept. of Stationery & Printing. Subjects are quoted from the gazette. See docs/GAZETTE_SOURCES.md for the full methodology and coverage.
      </p>
    </>
  );
}

export default function GovOrders({ onPickRecord }) {
  const t = useT();
  const M = GO_META;
  const [source, setSource] = useState("portal");
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
  const deptCount = Object.keys(M.byDept || {}).length;
  const stats = [
    { n: fmtK(M.total), l: "GOs catalogued in the archive listing" },
    { n: GO_LINKS.length, l: "GOs embedded & linked in this app" },
    { n: deptCount, l: "departments" },
    { n: M.budget, l: "budget-announcement orders" },
  ];

  return (
    <Section id="govorders">
      <SectionHead
        eyebrow="The machinery of delivery"
        title="From announcement to order"
        lede={`A promise becomes real through a Government Order. This layer catalogues the archive\u2019s GO listings across ${Object.keys(GO_META.byDept || {}).length} departments, and embeds the subset that names a scheme, implements an Act, or carries out a budget announcement. Two sources are shown \u2014 the department portal and the Government Gazette \u2014 each linking to its official PDF.`}
      />

      {/* source toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["portal", `Portal GOs · ${fmtK(GO_META.total)}`], ["gazette", `Gazette GOs · ${GAZETTE_GO_META.goEntries}`]].map(([id, label]) => (
          <button key={id} onClick={() => setSource(id)} style={{ padding: "9px 15px", fontSize: 13, fontWeight: 600, cursor: "pointer", borderRadius: 10, background: source === id ? t.gold + "22" : t.panel, border: `1px solid ${source === id ? t.gold + "88" : t.line}`, color: source === id ? t.gold : t.faint }}>{label}</button>
        ))}
      </div>

      {source === "gazette" && <GazetteView onPickRecord={onPickRecord} />}

      {source === "portal" && (<>
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
      </>)}
    </Section>
  );
}
