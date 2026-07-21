import { useState, useMemo, useEffect } from "react";
import { useT, textSafe } from "../lib/theme.js";
import { DATA, CAT } from "../data/records.js";
import { PROMISES } from "../data/promises.js";
import { PROMISE_GO_LINKS } from "../data/promiseGoLinks.js";
import { Section, SectionHead, Reveal } from "../components/layout.jsx";
import { ProgressRing } from "../components/charts.jsx";

// Turn "G.O. (Ms) No. 57" mentions in a note into links to the actual GO PDF,
// where that GO resolves to one in our datasets (goMap: { number: {pdf, src} }).
const GO_RE = /G\.?\s*O\.?\s*\(?(?:Ms|D|2D|Rt|P)?\)?\.?\s*No\.?\s*(\d+)/gi;
function linkifyGO(note, goMap, t) {
  if (!goMap) return note;
  const out = []; let last = 0, m, k = 0;
  GO_RE.lastIndex = 0;
  while ((m = GO_RE.exec(note)) !== null) {
    if (last < m.index) out.push(note.slice(last, m.index));
    const link = goMap[m[1]];
    if (link) out.push(<a key={k++} href={link.pdf} target="_blank" rel="noopener noreferrer" title={`Open ${m[0].trim()} · ${link.src}`} style={{ color: t.gold, textDecoration: "underline", textUnderlineOffset: 2 }}>{m[0]}</a>);
    else out.push(m[0]);
    last = m.index + m[0].length;
  }
  if (last < note.length) out.push(note.slice(last));
  return out;
}

// Five-status taxonomy, mirroring the independent Pudhiyavan DMK Manifesto 2021 Tracker.
const PSTATUS = {
  fulfilled:       { label: "Fulfilled",     color: "#22c55e", mark: "✓" },
  modified:        { label: "Modified",      color: "#0891b2", mark: "↺" },
  progress:        { label: "In progress",   color: "#c9a84c", mark: "◐" },
  stalled:         { label: "Stalled",       color: "#8a8aa0", mark: "‖" },
  "not-fulfilled": { label: "Not fulfilled", color: "#c0392b", mark: "✕" },
};
const STATUS_ORDER = ["fulfilled", "modified", "progress", "stalled", "not-fulfilled"];
const RECBYID = Object.fromEntries(DATA.map((r) => [r.id, r]));

function PromiseRow({ p, onPickRecord }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const st = PSTATUS[p.status];
  const hasNote = !!(p.note && p.note.trim());
  const recs = p.records.map((id) => RECBYID[id]).filter(Boolean);
  const goMap = PROMISE_GO_LINKS[p.num];
  return (
    <div style={{ background: t.panel, border: `1px solid ${t.line2}`, borderLeft: `3px solid ${st.color}`, borderRadius: 10, padding: "11px 13px", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <span style={{ color: t.mute, fontSize: 12, fontFamily: "ui-monospace,monospace" }}>#{p.num}</span>
          <span style={{ color: t.text, fontSize: 13.5, lineHeight: 1.5, marginLeft: 7 }}>{p.text}</span>
        </div>
        <div style={{ color: textSafe(st.color, t.name), fontSize: 10, fontFamily: "ui-monospace,monospace", border: `1px solid ${st.color}55`, borderRadius: 5, padding: "2px 6px", whiteSpace: "nowrap" }}>{st.mark} {st.label}</div>
      </div>
      {(recs.length > 0 || hasNote) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 9, alignItems: "center" }}>
          {recs.map((r) => (
            <button key={r.id} onClick={() => onPickRecord(r)} style={{ fontSize: 11, padding: "3px 9px", background: "transparent", border: `1px solid ${(CAT[r.cat] || {}).color || t.gold}55`, color: textSafe((CAT[r.cat] || {}).color || t.gold, t.name), borderRadius: 14, cursor: "pointer" }}>{r.name} →</button>
          ))}
          {hasNote && (
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} style={{ fontSize: 11, padding: "3px 10px", background: open ? `${st.color}18` : "transparent", border: `1px solid ${st.color}44`, color: textSafe(st.color, t.name), borderRadius: 14, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>{open ? "▾ hide" : "ⓘ details"}</button>
          )}
          {goMap && <span title="Government Orders in the details are linked to their PDFs" style={{ fontSize: 10, padding: "3px 8px", color: t.gold, border: `1px solid ${t.gold}44`, borderRadius: 14, fontFamily: "ui-monospace,monospace" }}>📎 G.O. linked</span>}
        </div>
      )}
      {open && hasNote && (
        <p style={{ margin: "10px 0 2px", padding: "10px 12px", background: t.panel2, border: `1px solid ${t.line2}`, borderRadius: 8, color: t.textDim, fontSize: 12.5, lineHeight: 1.65 }}>
          {linkifyGO(p.note, goMap, t)}
        </p>
      )}
    </div>
  );
}

function MethodologyNote({ t }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} style={{ fontSize: 11.5, padding: "6px 12px", background: "transparent", border: `1px dashed ${t.line}`, color: t.faint, borderRadius: 10, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>
        {open ? "▾" : "▸"} How these statuses were assessed
      </button>
      {open && (
        <div style={{ marginTop: 8, padding: "12px 14px", background: t.panel2, border: `1px solid ${t.line2}`, borderRadius: 10, color: t.textDim, fontSize: 12.5, lineHeight: 1.7 }}>
          The five statuses (Fulfilled / Modified / In progress / Stalled / Not fulfilled) and the per-promise
          detail notes mirror the independent <b style={{ color: t.text }}>Pudhiyavan DMK Manifesto 2021 Tracker</b>,
          as published on 18 July 2026, matched to this dataset by promise number. They are that tracker's
          assessments — <b style={{ color: t.text }}>this project has not independently verified each status</b> against
          primary documents, and the headline fulfilled count inherits the tracker's methodology. Promise texts are
          condensed English summaries, not the manifesto's original wording. Every promise behind the headline
          numbers is inspectable below. Full methodology and limitations: docs/MANIFESTO_ASSESSMENT_METHODOLOGY.md
          in the repository.
        </div>
      )}
    </div>
  );
}

export default function Manifesto({ onPickRecord }) {
  const t = useT();
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = Object.fromEntries(STATUS_ORDER.map((k) => [k, 0]));
    PROMISES.forEach((p) => { c[p.status] = (c[p.status] || 0) + 1; });
    return c;
  }, []);
  const total = PROMISES.length;
  const fulfilled = counts.fulfilled;

  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const list = PROMISES.filter((p) => {
    if (status !== "all" && p.status !== status) return false;
    if (!tokens.length) return true;
    const hay = (p.text + " " + p.num + " " + p.theme + " " + (p.note || "")).toLowerCase();
    return tokens.every((tk) => hay.includes(tk));
  });

  const order = [], byTheme = {};
  list.forEach((p) => { if (!byTheme[p.theme]) { byTheme[p.theme] = []; order.push(p.theme); } byTheme[p.theme].push(p); });

  // collapsible theme groups. Default collapsed; auto-open while filtering/searching.
  const [openThemes, setOpenThemes] = useState({});
  const autoOpen = tokens.length > 0 || status !== "all";
  useEffect(() => { setOpenThemes({}); }, [query, status]);
  const isThemeOpen = (theme) => (theme in openThemes ? openThemes[theme] : autoOpen);
  const setAll = (v) => setOpenThemes(Object.fromEntries(order.map((th) => [th, v])));

  const FILTERS = [
    { id: "all", label: `All ${total}`, color: t.gold },
    ...STATUS_ORDER.map((k) => ({ id: k, label: `${PSTATUS[k].label} ${counts[k]}`, color: PSTATUS[k].color })),
  ];

  return (
    <Section id="manifesto" style={{ paddingBottom: 40 }}>
      <SectionHead
        eyebrow="Promises, tracked honestly"
        title="The 2021 manifesto, kept to account"
        lede="All 505 promises from the DMK's 2021 election manifesto, tracked promise by promise. Statuses are external assessments (see 'How these statuses were assessed' below), not this project's own verification. Where this tool holds a matching record, it is linked beneath the promise."
      />

      <Reveal>
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", background: t.panel, border: `1px solid ${t.line}`, borderRadius: 16, padding: "22px 24px", marginBottom: 18, boxShadow: t.cardShadow }}>
          <ProgressRing value={fulfilled} total={total} color={PSTATUS.fulfilled.color} label="fulfilled" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1, minWidth: 220 }}>
            {STATUS_ORDER.map((k) => (
              <div key={k} style={{ flex: 1, minWidth: 82, textAlign: "center", background: `${PSTATUS[k].color}14`, border: `1px solid ${PSTATUS[k].color}44`, borderRadius: 10, padding: "12px 6px" }}>
                <div style={{ color: textSafe(PSTATUS[k].color, t.name), fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{counts[k]}</div>
                <div style={{ color: textSafe(PSTATUS[k].color, t.name), fontSize: 10, fontFamily: "ui-monospace,monospace", letterSpacing: ".03em", marginTop: 6 }}>{PSTATUS[k].label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* methodology disclosure — Phase 5 of the audit remediation */}
      <MethodologyNote t={t} />

      {/* controls */}
      <input value={query} onChange={(e) => setQuery(e.target.value)}
        aria-label="Filter the 2021 manifesto promises by word or promise number"
        placeholder="Filter promises — a word or a number…"
        style={{ width: "100%", padding: "12px 15px", background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, color: t.text, fontSize: 14.5, outline: "none", marginBottom: 12 }} />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {FILTERS.map((f) => (
          <button key={f.id} onClick={() => setStatus(f.id)} style={{ padding: "6px 12px", fontSize: 11.5, cursor: "pointer", borderRadius: 20, background: status === f.id ? f.color + "22" : t.panel, border: `1px solid ${status === f.id ? f.color + "88" : t.line}`, color: status === f.id ? textSafe(f.color, t.name) : t.mute }}>{f.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
        <span style={{ color: t.wisp, fontSize: 10.5, fontFamily: "ui-monospace,monospace", letterSpacing: ".14em" }}>{list.length} PROMISE{list.length === 1 ? "" : "S"}{query ? ` · "${query}"` : ""} · {order.length} THEME{order.length === 1 ? "" : "S"}</span>
        {order.length > 0 && (
          <span style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setAll(true)} style={{ padding: "4px 10px", fontSize: 11, background: "transparent", border: `1px solid ${t.line}`, color: t.mute, borderRadius: 14, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>expand all</button>
            <button onClick={() => setAll(false)} style={{ padding: "4px 10px", fontSize: 11, background: "transparent", border: `1px solid ${t.line}`, color: t.mute, borderRadius: 14, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>collapse all</button>
          </span>
        )}
      </div>

      {order.length === 0 && <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, padding: 18, color: t.faint, fontSize: 14 }}>No promise matches — try other words or a promise number.</div>}

      {order.map((theme) => {
        const opened = isThemeOpen(theme);
        return (
          <div key={theme} style={{ marginBottom: 10 }}>
            <button onClick={() => setOpenThemes((s) => ({ ...s, [theme]: !opened }))} aria-expanded={opened} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: t.panel, border: `1px solid ${opened ? t.gold + "55" : t.line}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ color: t.gold, fontSize: 11.5, fontFamily: "ui-monospace,monospace", letterSpacing: ".1em", textTransform: "uppercase" }}>{theme}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: t.mute, fontSize: 11.5, fontFamily: "ui-monospace,monospace" }}>{byTheme[theme].length}</span>
                <span style={{ color: t.faint, fontSize: 12, display: "inline-block", transform: opened ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
              </span>
            </button>
            {opened && (
              <div style={{ marginTop: 8, marginLeft: 2 }}>
                {byTheme[theme].map((p) => <PromiseRow key={p.num} p={p} onPickRecord={onPickRecord} />)}
              </div>
            )}
          </div>
        );
      })}
    </Section>
  );
}
