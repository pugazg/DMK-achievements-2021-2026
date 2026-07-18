import { useState, useEffect, useRef, useMemo } from "react";
import { useT } from "../lib/theme.js";
import { DATA, CAT } from "../data/records.js";
import { PROMISES } from "../data/promises.js";
import { searchRecords } from "../lib/search.js";

/* Global search: records + manifesto promises, keyboard driven. */
export default function SearchOverlay({ open, onClose, onPickRecord }) {
  const t = useT();
  const [q, setQ] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) { setQ(""); setTimeout(() => inputRef.current?.focus(), 30); }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const records = useMemo(() => (q.trim() ? searchRecords(q, "all").slice(0, 8) : []), [q]);
  const promises = useMemo(() => {
    if (!q.trim()) return [];
    const toks = q.toLowerCase().split(/\s+/).filter(Boolean);
    return PROMISES.filter((p) => toks.every((tk) => (p.text + " " + p.theme + " " + p.num + " " + (p.note || "")).toLowerCase().includes(tk))).slice(0, 5);
  }, [q]);

  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(4px)", zIndex: 900, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "10vh 16px 16px" }} onClick={onClose}>
      <div style={{ width: "100%", maxWidth: 620 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: t.panel, border: `1px solid ${t.gold}66`, borderRadius: 12, padding: "4px 14px", boxShadow: t.shadow }}>
          <span style={{ fontSize: 17 }}>🔍</span>
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search 438 records and 505 promises…"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: t.text, fontSize: 16, padding: "12px 0" }} />
          <kbd style={{ fontSize: 10.5, color: t.mute, border: `1px solid ${t.line}`, borderRadius: 5, padding: "2px 6px" }}>Esc</kbd>
        </div>

        {q.trim() && (
          <div style={{ marginTop: 10, background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, maxHeight: "58vh", overflowY: "auto", boxShadow: t.shadow }}>
            {records.length === 0 && promises.length === 0 && (
              <div style={{ padding: 18, color: t.faint, fontSize: 14 }}>No match — try other words, a scheme name, or a promise number.</div>
            )}
            {records.length > 0 && (
              <div style={{ padding: "10px 14px 4px", color: t.mute, fontSize: 10, fontFamily: "ui-monospace,monospace", letterSpacing: ".14em" }}>RECORDS</div>
            )}
            {records.map((r) => {
              const c = CAT[r.cat] || { color: t.gold, emoji: "◎" };
              return (
                <button key={r.id} onClick={() => { onPickRecord(r); onClose(); }} style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", borderBottom: `1px solid ${t.line2}`, padding: "11px 14px", cursor: "pointer", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: c.color, fontSize: 14 }}>{c.emoji}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{ color: t.text, fontSize: 14, fontWeight: 600 }}>{r.name}</span>
                    <span style={{ display: "block", color: t.textSoft, fontSize: 11.5, marginTop: 2 }}>{r.stat} · {r.date}</span>
                  </span>
                </button>
              );
            })}
            {promises.length > 0 && (
              <div style={{ padding: "10px 14px 4px", color: t.mute, fontSize: 10, fontFamily: "ui-monospace,monospace", letterSpacing: ".14em" }}>MANIFESTO PROMISES</div>
            )}
            {promises.map((p) => (
              <div key={p.num} style={{ borderBottom: `1px solid ${t.line2}`, padding: "10px 14px", display: "flex", gap: 8 }}>
                <span style={{ color: t.mute, fontSize: 12, fontFamily: "ui-monospace,monospace" }}>#{p.num}</span>
                <span style={{ color: t.textDim, fontSize: 13, lineHeight: 1.45 }}>{p.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
