import { useMemo } from "react";
import { useT } from "../lib/theme.js";
import { DATA, CATEGORIES, CAT } from "../data/records.js";
import { CHART_GROUPS } from "../data/dashboard.js";
import { Section, SectionHead, Reveal } from "../components/layout.jsx";
import { CompareBars, SeriesBars, Donut } from "../components/charts.jsx";

export default function Dashboard() {
  const t = useT();

  const donut = useMemo(() => {
    const counts = {};
    DATA.forEach((r) => { counts[r.cat] = (counts[r.cat] || 0) + 1; });
    return CATEGORIES.filter((c) => c.id !== "all" && counts[c.id])
      .map((c) => ({ label: c.en, value: counts[c.id], color: c.color }))
      .sort((a, b) => b.value - a.value);
  }, []);

  return (
    <Section id="dashboard">
      <SectionHead
        eyebrow="The numbers"
        title="What five years moved"
        lede="The figures below are drawn from the Economic Survey of Tamil Nadu 2025–26 and the government's own achievement record. Charts animate as you scroll; nothing here is estimated except where marked."
      />

      {/* distribution donut */}
      <Reveal>
        <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 16, padding: "22px 22px", marginBottom: 20, boxShadow: t.cardShadow }}>
          <div style={{ fontSize: 12, color: t.mute, fontFamily: "ui-monospace,monospace", letterSpacing: ".12em", marginBottom: 14, textTransform: "uppercase" }}>The record, by domain</div>
          <Donut segments={donut} centerLabel={DATA.length} centerSub="RECORDS" />
        </div>
      </Reveal>

      {/* chart groups */}
      <div style={{ display: "grid", gap: 20 }}>
        {CHART_GROUPS.map((g) => {
          const accent = (CAT[g.cat] || {}).color || t.gold;
          return (
            <Reveal key={g.id}>
              <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderLeft: `3px solid ${accent}`, borderRadius: 16, padding: "22px 22px 20px", boxShadow: t.cardShadow }}>
                <div style={{ fontSize: 10.5, color: accent, fontFamily: "ui-monospace,monospace", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 7 }}>{(CAT[g.cat] || {}).emoji} {g.cat}</div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.text, letterSpacing: "-.01em" }}>{g.title}</h3>
                <p style={{ margin: "8px 0 20px", fontSize: 13.5, color: t.textDim, lineHeight: 1.65, maxWidth: 680 }}>{g.lede}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "24px 30px" }}>
                  {g.charts.map((ch, i) =>
                    ch.kind === "series"
                      ? <SeriesBars key={i} spec={ch} accent={accent} />
                      : <CompareBars key={i} spec={ch} accent={accent} />
                  )}
                </div>
                <div style={{ marginTop: 18, paddingTop: 12, borderTop: `1px solid ${t.line2}`, fontSize: 10.5, color: t.mute, fontFamily: "ui-monospace,monospace" }}>SOURCE · {g.source}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
