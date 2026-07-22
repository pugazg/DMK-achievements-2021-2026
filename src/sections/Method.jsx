import { useT, textSafe } from "../lib/theme.js";
import { THESIS, THEMES_NARRATIVE, TIMELINE } from "../data/dashboard.js";
import { CAT } from "../data/records.js";
import { Section, SectionHead, Reveal } from "../components/layout.jsx";

export default function Method() {
  const t = useT();
  return (
    <Section id="method">
      <SectionHead
        eyebrow={THESIS.kicker}
        title="A record is not a list. It is a method."
        lede={THESIS.line}
      />

      {/* the arc: dignity → ownership → access → innovation */}
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12, marginBottom: 14 }}>
          {THESIS.arc.map((s, i) => (
            <div key={s.stage} style={{ position: "relative", background: t.panel, border: `1px solid ${t.line}`, borderRadius: 14, padding: "18px 16px", boxShadow: t.cardShadow }}>
              <div style={{ fontSize: 11, color: t.mute, fontFamily: "ui-monospace,monospace", letterSpacing: ".1em" }}>0{i + 1}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.gold, marginTop: 6 }}>{s.stage}</div>
              <div style={{ fontSize: 11.5, color: textSafe(t.red, t.name), fontWeight: 600, marginTop: 1 }}>{s.who}</div>
              <p style={{ margin: "9px 0 0", fontSize: 12.5, color: t.textDim, lineHeight: 1.6 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <p style={{ textAlign: "center", fontSize: 15, color: t.faint, fontStyle: "italic", margin: "6px 0 40px" }}>{THESIS.tail}</p>
      </Reveal>

      {/* thematic essays */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14, marginBottom: 46 }}>
        {THEMES_NARRATIVE.map((th) => {
          const accent = (CAT[th.cat] || {}).color || t.gold;
          return (
            <Reveal key={th.title}>
              <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderTop: `3px solid ${accent}`, borderRadius: 14, padding: "20px 20px", height: "100%", boxShadow: t.cardShadow }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: t.text, lineHeight: 1.3 }}>{th.title}</h3>
                <p style={{ margin: "10px 0 14px", fontSize: 13, color: t.textDim, lineHeight: 1.7 }}>{th.body}</p>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: textSafe(accent, t.name), fontFamily: "ui-monospace,monospace" }}>{th.stat}</div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* timeline */}
      <SectionHead eyebrow="Landmarks" title="The term, in dates" />
      <div style={{ position: "relative", marginTop: 6 }}>
        <div aria-hidden style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: `linear-gradient(${t.red}, ${t.gold})`, opacity: 0.5 }} />
        {TIMELINE.map((ev) => {
          const accent = (CAT[ev.cat] || {}).color || t.gold;
          return (
            <Reveal key={ev.title}>
              <div style={{ position: "relative", paddingLeft: 30, marginBottom: 16 }}>
                <span style={{ position: "absolute", left: 0, top: 4, width: 16, height: 16, borderRadius: "50%", background: t.bg, border: `3px solid ${accent}` }} />
                <div style={{ fontSize: 11, color: textSafe(accent, t.name), fontFamily: "ui-monospace,monospace", letterSpacing: ".08em", fontWeight: 700 }}>{ev.date}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginTop: 2 }}>{ev.title}</div>
                <div style={{ fontSize: 12.5, color: t.textDim, marginTop: 2, lineHeight: 1.55 }}>{ev.note}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
