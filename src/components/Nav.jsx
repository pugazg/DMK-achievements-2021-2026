import { useState } from "react";
import { useT } from "../lib/theme.js";
import { useScrollSpy, useScrollProgress, scrollToId } from "../lib/hooks.js";
import RisingSun from "./RisingSun.jsx";

export const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "dashboard", label: "Dashboard" },
  { id: "method", label: "The Method" },
  { id: "explore", label: "Explore" },
  { id: "claim", label: "Claim lookup" },
  { id: "manifesto", label: "Manifesto" },
  { id: "legislation", label: "Laws" },
  { id: "govorders", label: "Orders" },
  { id: "debates", label: "Debates" },
  { id: "about", label: "About" },
  { id: "evidence-pilot", label: "Evidence pilot" },
  { id: "transparency", label: "Transparency" },
];

export default function Nav({ onSearch, theme, onToggleTheme }) {
  const t = useT();
  const active = useScrollSpy(SECTIONS.map((s) => s.id));
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);

  const btn = {
    background: "transparent", border: "none", cursor: "pointer", color: t.faint,
    fontSize: 12.5, padding: "6px 10px", borderRadius: 7, fontWeight: 600,
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 200, background: t.name === "dark" ? "rgba(10,8,7,.88)" : "rgba(245,239,225,.9)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${t.line2}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "10px 18px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => scrollToId("overview")} style={{ display: "flex", alignItems: "center", gap: 9, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
          <RisingSun size={26} glow />
          <span style={{ color: t.text, fontWeight: 800, fontSize: 14.5, letterSpacing: "-.01em", whiteSpace: "nowrap" }}>The Dravidian Model</span>
        </button>

        <nav style={{ display: "flex", gap: 2, marginLeft: 8, flex: 1, overflowX: "auto" }} className="nav-desk">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => scrollToId(s.id)} style={{
              ...btn, whiteSpace: "nowrap",
              color: active === s.id ? t.gold : t.faint,
              background: active === s.id ? `${t.gold}18` : "transparent",
            }}>{s.label}</button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
          <button onClick={onSearch} aria-label="Search" title="Search records & promises" style={{ ...btn, fontSize: 15, padding: "6px 9px" }}>🔍</button>
          <button onClick={onToggleTheme} aria-label="Toggle theme" title="Light / dark" style={{ ...btn, fontSize: 15, padding: "6px 9px" }}>{theme === "dark" ? "☀️" : "🌙"}</button>
          <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open} aria-controls="nav-mobile-menu" style={{ ...btn, fontSize: 17, padding: "4px 8px", display: "none" }}>☰</button>
        </div>
      </div>

      {/* reading-progress */}
      <div style={{ height: 2, background: "transparent" }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: `linear-gradient(90deg, ${t.red}, ${t.gold})`, transition: "width .1s linear" }} />
      </div>

      {/* mobile dropdown */}
      {open && (
        <div id="nav-mobile-menu" className="nav-mobile" style={{ borderTop: `1px solid ${t.line2}`, padding: "6px 14px 12px", display: "flex", flexWrap: "wrap", gap: 6, background: t.panel2 }}>
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => { scrollToId(s.id); setOpen(false); }} style={{
              ...btn, background: active === s.id ? `${t.gold}18` : t.panel, border: `1px solid ${t.line}`,
              color: active === s.id ? t.gold : t.faint,
            }}>{s.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}
