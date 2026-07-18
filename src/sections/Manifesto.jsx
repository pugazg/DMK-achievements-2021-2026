import { useState, useMemo } from "react";
import { useT } from "../lib/theme.js";
import { DATA, CAT } from "../data/records.js";
import { PROMISES } from "../data/promises.js";
import { Section, SectionHead, Reveal } from "../components/layout.jsx";
import { ProgressRing } from "../components/charts.jsx";

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
  return (
    <div style={{ background: t.panel, border: `1px solid ${t.line2}`, borderLeft: `3px solid ${st.color}`, borderRadius: 10, padding: "11px 13px", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <span style={{ color: t.mute, fontSize: 12, fontFamily: "ui-monospace,monospace" }}>#{p.num}</span>
          <span style={{ color: t.text, fontSize: 13.5, lineHeight: 1.5, marginLeft: 7 }}>{p.text}</span>
        </div>
        <div style={{ color: st.color, fontSize: 10, fontFamily: "ui-monospace,monospace", border: `1px solid ${st.color}55`, borderRadius: 5, padding: "2px 6px", whiteSpace: "nowrap" }}>{st.mark} {st.label}</div>
      </div>
      {(recs.length > 0 || hasNote) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 9, alignItems: "center" }}>
          {recs.map((r) => (
            <button key={r.id} onClick={() => onPickRecord(r)} style={{ fontSize: 11, padding: "3px 9px", background: "transparent", border: `1px solid ${(CAT[r.cat] || {}).color || t.gold}55`, color: (CAT[r.cat] || {}).color || t.gold, borderRadius: 14, cursor: "pointer" }}>{r.name} →</button>
          ))}
          {hasNote && (
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} style={{ fontSize: 11, padding: "3px 10px", background: open ? `${st.color}18` : "transparent", border: `1px solid ${st.color}44`, color: st.color, borderRadius: 14, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>{open ? "▾ hide" : "ⓘ details"}</button>
          )}
        </div>
      )}
      {open && hasNote && (
        <p style={{ margin: "10px 0 2px", padding: "10px 12px", background: t.panel2, border: `1px solid ${t.line2}`, borderRadius: 8, color: t.textDim, fontSize: 12.5, lineHeight: 1.65 }}>
          {p.note}
          <span style={{ display: "block", marginTop: 8, color: t.mute, fontSize: 10.5, fontFamily: "ui-monospace,monospace", letterSpacing: ".04em" }}>SOURCE · Pudhiyavan DMK Manifesto 2021 Tracker</span>
        </p>
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

  const FILTERS = [
    { id: "all", label: `All ${total}`, color: t.gold },
    ...STATUS_ORDER.map((k) => ({ id: k, label: `${PSTATUS[k].label} ${counts[k]}`, color: PSTATUS[k].color })),
  ];

  return (
    <Section id="manifesto" style={{ paddingBottom: 40 }}>
      <SectionHead
        eyebrow="Promises, tracked honestly"
        title="The 2021 manifesto, kept to account"
        lede="All 505 promises from the DMK's 2021 election manifesto, with each promise's status mirrored from the independent Pudhiyavan DMK Manifesto 2021 Tracker. Where this tool holds a matching verified record, it is linked beneath the promise."
      />

      <Reveal>
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", background: t.panel, border: `1px solid ${t.line}`, borderRadius: 16, padding: "22px 24px", marginBottom: 18, boxShadow: t.cardShadow }}>
          <ProgressRing value={fulfilled} total={total} color={PSTATUS.fulfilled.color} label="fulfilled" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1, minWidth: 220 }}>
            {STATUS_ORDER.map((k) => (
              <div key={k} style={{ flex: 1, minWidth: 82, textAlign: "center", background: `${PSTATUS[k].color}14`, border: `1px solid ${PSTATUS[k].color}44`, borderRadius: 10, padding: "12px 6px" }}>
                <div style={{ color: PSTATUS[k].color, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{counts[k]}</div>
                <div style={{ color: PSTATUS[k].color, fontSize: 10, fontFamily: "ui-monospace,monospace", letterSpacing: ".03em", marginTop: 6 }}>{PSTATUS[k].label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* controls */}
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter promises — a word or a number…"
        style={{ width: "100%", padding: "12px 15px", background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, color: t.text, fontSize: 14.5, outline: "none", marginBottom: 12 }} />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {FILTERS.map((f) => (
          <button key={f.id} onClick={() => setStatus(f.id)} style={{ padding: "6px 12px", fontSize: 11.5, cursor: "pointer", borderRadius: 20, background: status === f.id ? f.color + "22" : t.panel, border: `1px solid ${status === f.id ? f.color + "88" : t.line}`, color: status === f.id ? f.color : t.mute }}>{f.label}</button>
        ))}
      </div>

      <div style={{ color: t.wisp, fontSize: 10.5, fontFamily: "ui-monospace,monospace", letterSpacing: ".14em", marginBottom: 12 }}>{list.length} PROMISE{list.length === 1 ? "" : "S"}{query ? ` · "${query}"` : ""}</div>

      {order.length === 0 && <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, padding: 18, color: t.faint, fontSize: 14 }}>No promise matches — try other words or a promise number.</div>}

      {order.map((theme) => (
        <div key={theme} style={{ marginBottom: 18 }}>
          <div style={{ color: t.gold, fontSize: 11.5, fontFamily: "ui-monospace,monospace", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8, paddingBottom: 5, borderBottom: `1px solid ${t.line}` }}>{theme} · {byTheme[theme].length}</div>
          {byTheme[theme].map((p) => <PromiseRow key={p.num} p={p} onPickRecord={onPickRecord} />)}
        </div>
      ))}
    </Section>
  );
}
