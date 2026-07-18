import { useState, useMemo } from "react";
import { useT } from "../lib/theme.js";
import { DATA, CAT } from "../data/records.js";
import { PROMISES } from "../data/promises.js";
import { Section, SectionHead, Reveal } from "../components/layout.jsx";
import { ProgressRing } from "../components/charts.jsx";

const PSTATUS = {
  kept:       { label: "Kept",             color: "#22c55e", mark: "✓" },
  progress:   { label: "In progress",      color: "#c9a84c", mark: "◐" },
  unverified: { label: "Not yet verified", color: "#8a8aa0", mark: "·" },
  "not-done": { label: "Not done",         color: "#c0392b", mark: "✕" },
};
const RECBYID = Object.fromEntries(DATA.map((r) => [r.id, r]));

export default function Manifesto({ onPickRecord }) {
  const t = useT();
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = { kept: 0, progress: 0, unverified: 0, "not-done": 0 };
    PROMISES.forEach((p) => { c[p.status] = (c[p.status] || 0) + 1; });
    return c;
  }, []);
  const total = PROMISES.length;
  const done = counts.kept + counts.progress;

  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const list = PROMISES.filter((p) => {
    if (status !== "all" && p.status !== status) return false;
    if (!tokens.length) return true;
    const hay = (p.text + " " + p.num + " " + p.theme).toLowerCase();
    return tokens.every((tk) => hay.includes(tk));
  });

  const order = [], byTheme = {};
  list.forEach((p) => { if (!byTheme[p.theme]) { byTheme[p.theme] = []; order.push(p.theme); } byTheme[p.theme].push(p); });

  const FILTERS = [
    { id: "all", label: `All ${total}`, color: t.gold },
    { id: "kept", label: `Kept ${counts.kept}`, color: PSTATUS.kept.color },
    { id: "progress", label: `In progress ${counts.progress}`, color: PSTATUS.progress.color },
    { id: "unverified", label: `Not yet verified ${counts.unverified}`, color: PSTATUS.unverified.color },
  ];
  if (counts["not-done"]) FILTERS.push({ id: "not-done", label: `Not done ${counts["not-done"]}`, color: PSTATUS["not-done"].color });

  return (
    <Section id="manifesto" style={{ paddingBottom: 40 }}>
      <SectionHead
        eyebrow="Promises, tracked honestly"
        title="The 2021 manifesto, kept to account"
        lede="All 505 promises from the DMK's 2021 election manifesto. Kept and in-progress promises are each linked to a verified record. 'Not yet verified' means the achievement isn't in this tool yet — often a central-government matter or a later document batch — not that the promise was broken."
      />

      <Reveal>
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", background: t.panel, border: `1px solid ${t.line}`, borderRadius: 16, padding: "22px 24px", marginBottom: 18, boxShadow: t.cardShadow }}>
          <ProgressRing value={done} total={total} color={t.gold} label="linked to a record" />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", flex: 1, minWidth: 220 }}>
            {[["kept", counts.kept], ["progress", counts.progress], ["unverified", counts.unverified]].map(([k, n]) => (
              <div key={k} style={{ flex: 1, minWidth: 90, textAlign: "center", background: `${PSTATUS[k].color}14`, border: `1px solid ${PSTATUS[k].color}44`, borderRadius: 10, padding: "12px 8px" }}>
                <div style={{ color: PSTATUS[k].color, fontSize: 24, fontWeight: 800, lineHeight: 1 }}>{n}</div>
                <div style={{ color: PSTATUS[k].color, fontSize: 10.5, fontFamily: "ui-monospace,monospace", letterSpacing: ".05em", marginTop: 6 }}>{PSTATUS[k].label}</div>
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
          {byTheme[theme].map((p) => {
            const st = PSTATUS[p.status];
            return (
              <div key={p.num} style={{ background: t.panel, border: `1px solid ${t.line2}`, borderLeft: `3px solid ${st.color}`, borderRadius: 10, padding: "11px 13px", marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: t.mute, fontSize: 12, fontFamily: "ui-monospace,monospace" }}>#{p.num}</span>
                    <span style={{ color: t.text, fontSize: 13.5, lineHeight: 1.5, marginLeft: 7 }}>{p.text}</span>
                  </div>
                  <div style={{ color: st.color, fontSize: 10, fontFamily: "ui-monospace,monospace", border: `1px solid ${st.color}55`, borderRadius: 5, padding: "2px 6px", whiteSpace: "nowrap" }}>{st.mark} {st.label}</div>
                </div>
                {p.records.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 9 }}>
                    {p.records.map((id) => RECBYID[id] && (
                      <button key={id} onClick={() => onPickRecord(RECBYID[id])} style={{ fontSize: 11, padding: "3px 9px", background: "transparent", border: `1px solid ${(CAT[RECBYID[id].cat] || {}).color || t.gold}55`, color: (CAT[RECBYID[id].cat] || {}).color || t.gold, borderRadius: 14, cursor: "pointer" }}>{RECBYID[id].name} →</button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </Section>
  );
}
