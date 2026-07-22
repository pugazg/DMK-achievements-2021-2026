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
          <span style={{ color: t.mute, fontSize: 11.5, fontFamily: "ui-monospace,monospace" }}>{s.count} sittings{s.pages ? ` · ${s.pages.toLocaleString("en-IN")} pp` : ""}</span>
          <span style={{ color: t.faint, fontSize: 12, display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
        </span>
      </button>
      {open && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, marginLeft: 2 }}>
          {s.sittings.map((d) => (
            <a key={d.iso} href={d.url} target="_blank" rel="noopener noreferrer"
              title={`${d.date}${d.pages ? ` · ${d.pages} pages` : ""}${d.words ? ` · ~${d.words.toLocaleString("en-IN")} words` : ""} — opens the official record`}
              style={{ fontSize: 12, padding: "6px 11px", background: t.panel, border: `1px solid ${t.line}`, color: t.textDim, borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap" }}>
              {d.date}{d.pages ? <span style={{ color: t.mute }}> · {d.pages}pp</span> : null} <span style={{ color: t.gold }}>↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const fmtWords = (w) => (w >= 1e6 ? (w / 1e6).toFixed(w >= 1e7 ? 0 : 1) + "M" : w >= 1e3 ? Math.round(w / 1e3) + "K" : "" + w);

export default function Debates() {
  const t = useT();
  const M = DEBATES_META;
  const allSit = DEBATE_SESSIONS.flatMap((s) => s.sittings);
  const measured = allSit.filter((s) => s.pages != null).length;
  const stats = [
    { n: M.sittings, l: "sitting links indexed" },
    { n: measured, l: `transcripts downloaded & measured (of ${M.sittings})` },
    { n: M.totalPages ? M.totalPages.toLocaleString("en-IN") : "—", l: `pages measured — ${measured} sittings only` },
    { n: M.totalWords ? fmtWords(M.totalWords) : "—", l: `words extracted — ${measured} sittings only` },
  ];
  return (
    <Section id="debates">
      <SectionHead
        eyebrow="The primary record"
        title="Every word, on the record"
        lede="Beyond the government's own achievement record, the fullest primary source is the House itself. All 138 sitting days of the 16th Assembly (11 May 2021 – 15 Oct 2025, the archive's current extent) are linked to the official Assembly digital library. Page and word measurements exist only for the sittings whose transcripts have been downloaded and text-extracted so far — coverage is shown below, and measurement of the remainder is a resumable queue."
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
        Source: Tamil Nadu Legislative Assembly Digital Library (tnlasdigital.tn.gov.in) · 16th Assembly, 2021–2026. Page/word figures are measured directly from downloaded transcripts and cover only the measured sittings (crawl of 18–19 Jul 2026; remainder queued). Links open each sitting's official record page.
      </p>
    </Section>
  );
}
