import { useT, textSafe } from "../lib/theme.js";
import { CAT } from "../data/records.js";
import { ORIGIN, hasTamil } from "../lib/search.js";
import { gradeRecord, GRADES } from "../lib/evidence.js";

export default function RecordCard({ rec, onCard }) {
  const t = useT();
  const c = CAT[rec.cat] || { color: t.gold, en: rec.cat, emoji: "◎" };
  const o = rec.origin && ORIGIN[rec.origin];
  const ev = gradeRecord(rec);
  const g = GRADES[ev.grade];
  // AA-safe text variants of the identity hues — see textSafe() in lib/theme.js.
  const cText = textSafe(c.color, t.name);
  const oText = o && textSafe(o.color, t.name);
  const gText = textSafe(g.color, t.name);
  return (
    <div style={{
      background: t.panel, border: `1px solid ${t.line}`, borderLeft: `3px solid ${c.color}`,
      borderRadius: 12, padding: "15px 17px", marginBottom: 11, boxShadow: t.cardShadow,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10.5, color: cText, fontFamily: "ui-monospace,monospace", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
            {c.emoji} {c.en} · {rec.date}
          </div>
          {o && (
            <div style={{ display: "inline-block", fontSize: 11.5, color: oText, border: `1px solid ${o.color}55`, borderRadius: 5, padding: "2px 7px", marginBottom: 7, marginRight: 6, fontFamily: "ui-monospace,monospace", letterSpacing: ".03em" }}>
              {o.mark} {o.label}
            </div>
          )}
          {/* The rationale is the only place the grade is explained, so the chip is
              focusable and carries it as an accessible name — a title tooltip alone
              is invisible to keyboard and screen-reader users. */}
          <span tabIndex={0} title={ev.rationale + " (Auto-graded; pending manual review.)"}
            aria-label={`Evidence grade ${g.label}. ${ev.rationale} Auto-graded; pending manual review.`}
            style={{ display: "inline-block", fontSize: 11.5, color: gText, border: `1px solid ${gText}55`, borderRadius: 5, padding: "2px 7px", marginBottom: 7, fontFamily: "ui-monospace,monospace", letterSpacing: ".03em", cursor: "help" }}>
            {g.label}
          </span>
          <div style={{ color: t.text, fontSize: 16, fontWeight: 700, lineHeight: 1.35 }}>{rec.name}</div>
          {rec.sub && <div lang={hasTamil(rec.sub) ? "ta" : undefined} style={{ color: t.faint, fontSize: 12.5, marginTop: 2, fontStyle: "italic" }}>{rec.sub}</div>}
        </div>
        <div style={{ textAlign: "right", color: cText, fontWeight: 800, fontSize: 15.5, whiteSpace: "normal", maxWidth: 150, lineHeight: 1.25 }}>{rec.stat}</div>
      </div>
      <p style={{ color: t.textDim, fontSize: 13, lineHeight: 1.7, margin: "11px 0 0" }}>{rec.det}</p>
      {rec.mixedStatus && (
        <div style={{ marginTop: 9, fontSize: 11, color: t.amber, background: `${t.amber}12`, border: `1px solid ${t.amber}44`, borderRadius: 7, padding: "6px 9px", lineHeight: 1.5 }}>
          ⚠ Mixed status — this record combines completed, ongoing and planned components. Read the detail; the overall label is not a full-completion claim.
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 11, flexWrap: "wrap" }}>
        <button onClick={() => onCard(rec)} style={{
          padding: "6px 13px", background: "transparent", border: `1px solid ${t.gold}55`, color: t.gold,
          borderRadius: 7, fontSize: 11.5, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: ".06em",
        }}>→ Make shareable card</button>
        {rec.districts && rec.districts.length > 0 && (
          <span style={{ padding: "6px 10px", fontSize: 10.5, color: t.mute, border: `1px dashed ${t.line}`, borderRadius: 7 }}>
            📍 {rec.districts.slice(0, 3).join(", ")}{rec.districts.length > 3 ? ` +${rec.districts.length - 3}` : ""}
          </span>
        )}
      </div>
    </div>
  );
}
