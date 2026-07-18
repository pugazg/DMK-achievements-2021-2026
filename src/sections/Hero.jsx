import { useT } from "../lib/theme.js";
import { HERO_FIGURES, HERO_STRIP } from "../data/dashboard.js";
import { scrollToId } from "../lib/hooks.js";
import Counter from "../components/Counter.jsx";
import RisingSun from "../components/RisingSun.jsx";
import { Reveal } from "../components/layout.jsx";

export default function Hero() {
  const t = useT();
  return (
    <section id="overview" style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${t.line2}` }}>
      {/* rays backdrop */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `conic-gradient(from 210deg at 50% 120%, transparent 0deg, ${t.red}0e 18deg, transparent 36deg, ${t.gold}0c 54deg, transparent 72deg, ${t.red}0e 90deg, transparent 108deg)`, opacity: 0.9, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(46px,8vw,96px) 18px clamp(30px,4vw,44px)", position: "relative" }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, border: `1px solid ${t.line}`, background: t.panel, borderRadius: 40, padding: "6px 14px 6px 8px", marginBottom: 22 }}>
            <RisingSun size={22} glow />
            <span style={{ fontSize: 11.5, color: t.faint, fontFamily: "ui-monospace,monospace", letterSpacing: ".14em" }}>TAMIL NADU · 2021–2026</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 style={{ margin: 0, fontSize: "clamp(30px,6vw,60px)", fontWeight: 800, color: t.text, lineHeight: 1.05, letterSpacing: "-.03em", maxWidth: 900 }}>
            A five-year record,<br /><span style={{ color: t.gold }}>verified line by line.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p style={{ margin: "20px 0 0", fontSize: "clamp(15px,1.9vw,19px)", color: t.textDim, lineHeight: 1.65, maxWidth: 640 }}>
            An interactive report on what the DMK government did — and who actually started it.
            Every figure comes only from the official Tamil Nadu record. No AI, no internet, nothing invented.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
            <button onClick={() => scrollToId("dashboard")} style={{ padding: "13px 22px", background: t.gold, color: t.name === "dark" ? "#1a1206" : "#fff", border: "none", borderRadius: 10, fontSize: 14.5, fontWeight: 700, cursor: "pointer" }}>See the numbers →</button>
            <button onClick={() => scrollToId("claim")} style={{ padding: "13px 22px", background: "transparent", color: t.text, border: `1px solid ${t.line}`, borderRadius: 10, fontSize: 14.5, fontWeight: 600, cursor: "pointer" }}>Fact-check a claim</button>
          </div>
        </Reveal>

        {/* headline figures */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginTop: "clamp(34px,5vw,52px)" }}>
          {HERO_FIGURES.map((f, i) => (
            <Reveal key={f.label} delay={0.2 + i * 0.08}>
              <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 14, padding: "18px 16px", height: "100%", boxShadow: t.cardShadow }}>
                <div style={{ fontSize: "clamp(24px,3.4vw,34px)", fontWeight: 800, color: t.gold, lineHeight: 1, letterSpacing: "-.02em" }}>
                  <Counter value={f.value} decimals={f.decimals} prefix={f.prefix || ""} suffix={f.suffix || ""} />
                </div>
                <div style={{ color: t.text, fontSize: 13, fontWeight: 600, marginTop: 9, lineHeight: 1.35 }}>{f.label}</div>
                <div style={{ color: t.mute, fontSize: 11, marginTop: 3 }}>{f.note}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* supporting strip */}
        <Reveal delay={0.5}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 26px", marginTop: 22, paddingTop: 18, borderTop: `1px solid ${t.line2}` }}>
            {HERO_STRIP.map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
                <span style={{ fontSize: 19, fontWeight: 800, color: s.accent ? t.red : t.text }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span style={{ fontSize: 11.5, color: t.mute }}>{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
