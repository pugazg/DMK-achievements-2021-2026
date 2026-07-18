import { useState } from "react";
import { useT } from "../lib/theme.js";
import { DEBATES_META, DEBATE_SESSIONS } from "../data/debates.js";
import { Section, SectionHead, Reveal } from "../components/layout.jsx";

function SessionBlock({ s, defaultOpen }) {
  const t = useT();
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 10 }}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: t.panel, border: `1px solid ${open ? t.gold + "55" : t.line}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer", textAlign: "left" }}>
        <span>
          <span style={{ color: t.gold, fontSize: 12, fontFamily: "ui-monospace,monospace", letterSpacing: ".08em", fontWeight: 700 }}>SESSION {s.session}</span>
          <span style={{ color: t.faint, fontSize: 12, marginLeft: 10 }}>{s.span} · {s.from} → {s.to}</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: t.mute, fontSize: 11.5, fontFamily: "ui-monospace,monospace" }}>{s.count} sittings</span>
          <span style={{ color: t.faint, fontSize: 12, display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
        </span>
      </button>
      {open && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, marginLeft: 2 }}>
          {s.sittings.map((d) => (
            <a key={d.iso} href={d.url} target="_blank" rel="noopener noreferrer" title={`Open the official debate record for ${d.date}`}
              style={{ fontSize: 12, padding: "6px 11px", background: t.panel, border: `1px solid ${t.line}`, color: t.textDim, borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap" }}>
              {d.date} <span style={{ color: t.gold }}>↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Debates() {
  const t = useT();
  const stats = [
    { n: DEBATES_META.sittings, l: "sitting days on record" },
    { n: DEBATES_META.sessions, l: "assembly sessions" },
    { n: "2021–25", l: "May 2021 → Oct 2025" },
  ];
  return (
    <Section id="debates">
      <SectionHead
        eyebrow="The primary record"
        title="Every word, on the record"
        lede="Beyond the government's own achievement record, the fullest primary source is the House itself. These are the verbatim debate transcripts of the 16th Tamil Nadu Legislative Assembly — 138 sitting days from May 2021 to October 2025 — indexed here and linked to the official Assembly digital library, where each day's proceedings can be read in full."
      />

      <Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
          {stats.map((x) => (
            <div key={x.l} style={{ flex: 1, minWidth: 150, background: t.panel, border: `1px solid ${t.line}`, borderRadius: 14, padding: "16px 18px", boxShadow: t.cardShadow }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: t.gold, lineHeight: 1 }}>{x.n}</div>
              <div style={{ color: t.textDim, fontSize: 12.5, marginTop: 7 }}>{x.l}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div style={{ marginBottom: 16 }}>
        <a href={DEBATES_META.search} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "10px 16px", background: "transparent", border: `1px solid ${t.gold}66`, color: t.gold, borderRadius: 10, fontSize: 13, textDecoration: "none", fontWeight: 600 }}>
          Browse the full archive on TNLA Digital Library ↗
        </a>
      </div>

      {DEBATE_SESSIONS.map((s, i) => <SessionBlock key={s.session} s={s} defaultOpen={i === DEBATE_SESSIONS.length - 1} />)}

      <p style={{ marginTop: 16, color: t.mute, fontSize: 11.5, lineHeight: 1.6 }}>
        Source: Tamil Nadu Legislative Assembly Digital Library (tnlasdigital.tn.gov.in) · 16th Assembly, 2021–2026. Links open each sitting's official record page.
      </p>
    </Section>
  );
}
