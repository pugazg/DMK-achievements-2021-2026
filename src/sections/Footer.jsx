import { useT } from "../lib/theme.js";
import { REFERENCES } from "../data/dashboard.js";
import { Section, SectionHead } from "../components/layout.jsx";
import { scrollToId } from "../lib/hooks.js";
import RisingSun from "../components/RisingSun.jsx";

export default function Footer() {
  const t = useT();
  return (
    <>
      <Section id="references" style={{ paddingTop: "clamp(40px,6vw,72px)" }}>
        <SectionHead eyebrow="Sources" title="Where every figure comes from" />
        <div style={{ display: "grid", gap: 8 }}>
          {REFERENCES.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 12, background: t.panel, border: `1px solid ${t.line}`, borderRadius: 10, padding: "13px 15px" }}>
              <span style={{ color: t.gold, fontFamily: "ui-monospace,monospace", fontSize: 12, fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div style={{ color: t.text, fontSize: 13.5, fontWeight: 600, lineHeight: 1.4 }}>{r.t}</div>
                <div style={{ color: t.mute, fontSize: 11.5, marginTop: 2 }}>{r.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <footer style={{ maxWidth: 1080, margin: "48px auto 0", padding: "28px 18px 60px" }}>
        <div style={{ background: t.panel2, border: `1px solid ${t.line2}`, borderRadius: 16, padding: "24px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <RisingSun size={28} glow />
            <span style={{ color: t.text, fontWeight: 800, fontSize: 15 }}>The Dravidian Model · 2021–2026</span>
          </div>
          <p style={{ color: t.textSoft, fontSize: 12, lineHeight: 1.75, margin: "0 0 14px", maxWidth: 760 }}>
            Every fact in this report comes only from the Tamil Nadu Government 2021–26 achievement record, the Economic Survey of Tamil Nadu 2025–26 and the DMK 2021 manifesto. There is no AI answering here and no live internet call — the tool cannot invent a fact, and where a source itself gives differing figures, the record notes both. Built to be shared, checked and disputed against its own sources.
          </p>
          <button onClick={() => scrollToId("overview")} style={{ padding: "9px 16px", background: "transparent", border: `1px solid ${t.line}`, color: t.gold, borderRadius: 9, fontSize: 12.5, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: ".06em" }}>↑ Back to top</button>
        </div>
      </footer>
    </>
  );
}
