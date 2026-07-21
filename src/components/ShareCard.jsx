import { useState } from "react";
import { useT, textSafe } from "../lib/theme.js";
import { useModalA11y } from "../lib/hooks.js";
import { CAT } from "../data/records.js";
import { SHARE_LINE, hasTamil } from "../lib/search.js";
import RisingSun from "./RisingSun.jsx";

export default function ShareCard({ rec, onClose }) {
  const t = useT();
  const c = CAT[rec.cat] || { color: t.gold };
  const cText = textSafe(c.color, t.name);
  const [copied, setCopied] = useState(false);
  const dialogRef = useModalA11y(true, onClose);
  const text =
`Tamil Nadu Government record, 2021–2026

${rec.name}${rec.sub ? " (" + rec.sub + ")" : ""}

📊 ${rec.stat}
📅 ${rec.date}
${rec.det}

➡️ ${SHARE_LINE[rec.origin] || SHARE_LINE.started}

📄 Source: Tamil Nadu Government published record (2021–26). Government-reported; not independently audited.
#TamilNadu`;

  const copy = () => {
    navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.82)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 18 }} onClick={onClose}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`Shareable card: ${rec.name}`} style={{ maxWidth: 460, width: "100%" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ background: t.name === "dark" ? "#0a0807" : "#fffdf7", border: `2px solid ${c.color}`, borderRadius: 16, overflow: "hidden", boxShadow: t.shadow }}>
          <div style={{ background: c.color, padding: "11px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#fff", fontSize: 11, fontFamily: "ui-monospace,monospace", letterSpacing: ".14em", textTransform: "uppercase" }}>DMK · 2021–2026</span>
            <RisingSun size={22} color="#fff" />
          </div>
          <div style={{ padding: "24px 22px" }}>
            <div style={{ fontSize: 10.5, color: cText, fontFamily: "ui-monospace,monospace", letterSpacing: ".2em", marginBottom: 12 }}>FROM THE STATE RECORD</div>
            <h2 style={{ color: t.text, fontSize: 22, fontWeight: 800, lineHeight: 1.3, margin: 0 }}>{rec.name}</h2>
            {rec.sub && <div lang={hasTamil(rec.sub) ? "ta" : undefined} style={{ color: t.faint, fontSize: 13, marginTop: 4, fontStyle: "italic" }}>{rec.sub}</div>}
            <div style={{ background: `${c.color}1c`, border: `1px solid ${c.color}44`, borderRadius: 10, padding: "15px 18px", margin: "18px 0 14px" }}>
              <div style={{ color: cText, fontSize: 24, fontWeight: 800, lineHeight: 1.15 }}>{rec.stat}</div>
            </div>
            <p style={{ color: t.textDim, fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>{rec.det}</p>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${t.line}`, color: t.textSoft, fontSize: 11.5 }}>📅 {rec.date} · 📄 Government-reported record (not independently audited)</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button onClick={copy} aria-live="polite" style={{ flex: 1, padding: 13, background: copied ? "#16a34a" : c.color, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            {copied ? "✓ Copied to clipboard" : "📋 Copy text (with source line)"}
          </button>
          <button onClick={onClose} style={{ padding: "13px 18px", background: t.panel, color: t.faint, border: `1px solid ${t.line}`, borderRadius: 10, fontSize: 14, cursor: "pointer" }}>Close</button>
        </div>
      </div>
    </div>
  );
}
