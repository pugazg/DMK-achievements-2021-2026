import { useT } from "../lib/theme.js";
import { useReveal } from "../lib/hooks.js";
import { fmt } from "../lib/format.js";

/* ============================================================
   INLINE-SVG CHARTS — no chart library, fully offline.
   All animate once when scrolled into view (reduced-motion safe
   via useReveal, which resolves immediately when motion reduced).
   ============================================================ */

/* ------------------------------------------------------------
   TABULAR EQUIVALENTS
   An aria-label is a short text alternative; it cannot carry a
   series. Each chart that plots more than one value pairs its SVG
   with a real <table> inside a native <details> — keyboard-operable
   without extra JS, exposed to assistive tech, and available to
   anyone who wants the numbers rather than the shape.
   ProgressRing is deliberately excluded: it plots a single value,
   and its label carries the whole of it.
   ------------------------------------------------------------ */
function DataTable({ caption, columns, rows }) {
  const t = useT();
  const base = { padding: "4px 8px", fontSize: 11, borderBottom: `1px solid ${t.line2}`, textAlign: "left" };
  const num = { ...base, textAlign: "right", fontFamily: "ui-monospace,monospace", color: t.text };
  return (
    <table style={{ borderCollapse: "collapse", width: "100%", margin: "6px 0 0" }}>
      <caption style={{ captionSide: "top", textAlign: "left", fontSize: 10.5, color: t.mute, paddingBottom: 4 }}>{caption}</caption>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={c} scope="col" style={{ ...(i === 0 ? base : num), color: t.mute, fontWeight: 600 }}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r[0]}>
            <th scope="row" style={{ ...base, color: t.textDim, fontWeight: 500 }}>{r[0]}</th>
            {r.slice(1).map((v, i) => <td key={i} style={num}>{v}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ChartData(props) {
  const t = useT();
  return (
    <details style={{ marginTop: 6 }}>
      <summary style={{ fontSize: 10.5, color: t.textSoft, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: ".06em" }}>
        Data table
      </summary>
      <DataTable {...props} />
    </details>
  );
}

function deltaBadge(a, b, lowerIsBetter, asPoints, decimals = 0) {
  if (a === 0 && b === 0) return null;
  // for rates/percentages a ratio is misleading — show the points change
  if (asPoints) return { text: (b >= a ? "+" : "−") + fmt(Math.abs(b - a), decimals) + " pts", good: lowerIsBetter ? b <= a : b >= a };
  if (a === 0) return { text: "new", good: true };
  if (lowerIsBetter) {
    const cut = Math.round(((a - b) / a) * 100);
    return { text: (cut >= 0 ? "−" : "+") + Math.abs(cut) + "%", good: cut >= 0 };
  }
  const ratio = b / a;
  if (ratio >= 1.9) return { text: "×" + (Math.round(ratio * 10) / 10), good: true };
  const pct = Math.round((ratio - 1) * 100);
  return { text: (pct >= 0 ? "+" : "") + pct + "%", good: pct >= 0 };
}

/* before → after paired bars */
export function CompareBars({ spec, accent }) {
  const t = useT();
  const [ref, shown] = useReveal();
  const { a, b, unit, label, lowerIsBetter, decimals = 0 } = spec;
  const max = Math.max(a.v, b.v, 1);
  const H = 116, W = 300, pad = 26, baseY = H - 22, top = 14;
  const barW = 66, gap = 78;
  const x1 = W / 2 - gap, x2 = W / 2 + gap - barW + 12;
  const h = (v) => (shown ? ((v / max) * (baseY - top)) : 0);
  let badge = deltaBadge(a.v, b.v, lowerIsBetter, spec.deltaAsPoints, decimals);
  if (badge && spec.neutral) badge = { ...badge, neutralTone: true };
  const bars = [
    { x: x1, v: a.v, tt: a.t, color: t.faint, dim: true },
    { x: x2, v: b.v, tt: b.t, color: accent, dim: false },
  ];
  return (
    <div ref={ref} style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <span style={{ fontSize: 12.5, color: t.text, fontWeight: 600 }}>{label}</span>
        {unit && <span style={{ fontSize: 10.5, color: t.mute, fontFamily: "ui-monospace,monospace" }}>{unit}</span>}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label={`${label}${unit ? ` (${unit})` : ""}: ${a.t} ${fmt(a.v, decimals)}, ${b.t} ${fmt(b.v, decimals)}`}>
        <line x1={pad} y1={baseY} x2={W - pad} y2={baseY} stroke={t.line} strokeWidth="1" />
        {bars.map((bar, i) => {
          const bh = h(bar.v);
          return (
            <g key={i}>
              <rect x={bar.x} y={baseY - bh} width={barW} height={bh} rx="4"
                fill={bar.color} opacity={bar.dim ? 0.45 : 1}
                style={{ transition: "height .9s cubic-bezier(.22,1,.36,1), y .9s cubic-bezier(.22,1,.36,1)" }} />
              <text x={bar.x + barW / 2} y={baseY - bh - 6} textAnchor="middle"
                fontSize="12.5" fontWeight="700" fill={bar.dim ? t.faint : accent}
                style={{ opacity: shown ? 1 : 0, transition: "opacity .6s .5s" }}>
                {fmt(bar.v, decimals)}
              </text>
              <text x={bar.x + barW / 2} y={baseY + 14} textAnchor="middle" fontSize="10.5" fill={t.mute}>{bar.tt}</text>
            </g>
          );
        })}
        {badge && (
          <g transform={`translate(${W / 2 - 2}, ${top + 4})`} style={{ opacity: shown ? 1 : 0, transition: "opacity .5s .9s" }}>
            <rect x={-badge.text.length * 4.4 - 8} y={-13} width={badge.text.length * 8.8 + 16} height={22} rx={11}
              fill={t.panel} stroke={(badge.neutralTone ? t.grey : badge.good ? t.green : t.red) + "55"} strokeWidth="1" />
            <text textAnchor="middle" y={3} fontSize="13.5" fontWeight="800"
              fill={badge.neutralTone ? t.grey : badge.good ? t.green : t.red} fontFamily="ui-monospace,monospace">{badge.text}</text>
          </g>
        )}
      </svg>
      {spec.caption && <p style={{ margin: "2px 0 0", fontSize: 11, color: t.textSoft, lineHeight: 1.5 }}>{spec.caption}</p>}
      <ChartData
        caption={label + (unit ? ` (${unit})` : "")}
        columns={["Period", unit || "Value"]}
        rows={[
          [a.t, fmt(a.v, decimals)],
          [b.t, fmt(b.v, decimals)],
          ...(badge ? [["Change", badge.text]] : []),
        ]}
      />
    </div>
  );
}

/* multi-point bar series over a labelled axis */
export function SeriesBars({ spec, accent }) {
  const t = useT();
  const [ref, shown] = useReveal();
  const { points, unit, label, decimals = 2 } = spec;
  const max = Math.max(...points.map((p) => p.v), 1);
  const hasEst = points.some((p) => p.est);
  const H = 130, W = 320, baseY = H - 24, top = 16, pad = 14;
  const slot = (W - pad * 2) / points.length;
  const bw = Math.min(46, slot * 0.62);
  return (
    <div ref={ref} style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <span style={{ fontSize: 12.5, color: t.text, fontWeight: 600 }}>{label}</span>
        {unit && <span style={{ fontSize: 10.5, color: t.mute, fontFamily: "ui-monospace,monospace" }}>{unit}</span>}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={label}>
        <line x1={pad} y1={baseY} x2={W - pad} y2={baseY} stroke={t.line} strokeWidth="1" />
        {points.map((p, i) => {
          const cx = pad + slot * i + slot / 2;
          const bh = shown ? (p.v / max) * (baseY - top) : 0;
          return (
            <g key={i}>
              <rect x={cx - bw / 2} y={baseY - bh} width={bw} height={bh} rx="4"
                fill={accent} opacity={p.est ? 0.4 : 0.95}
                stroke={p.est ? accent : "none"} strokeDasharray={p.est ? "3 3" : undefined}
                style={{ transition: `height .9s cubic-bezier(.22,1,.36,1) ${i * 0.08}s, y .9s cubic-bezier(.22,1,.36,1) ${i * 0.08}s` }} />
              <text x={cx} y={baseY - bh - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}
                style={{ opacity: shown ? 1 : 0, transition: `opacity .5s ${0.5 + i * 0.08}s` }}>{fmt(p.v, decimals)}</text>
              <text x={cx} y={baseY + 14} textAnchor="middle" fontSize="10.5" fill={t.mute}>{p.t}</text>
            </g>
          );
        })}
      </svg>
      {spec.caption && <p style={{ margin: "2px 0 0", fontSize: 11, color: t.textSoft, lineHeight: 1.5 }}>{spec.caption}</p>}
      <ChartData
        caption={label + (unit ? ` (${unit})` : "")}
        /* the dashed bar marking a projection is visual-only — the
           Basis column is its text equivalent, and this project does
           not let a projection read as a measurement */
        columns={hasEst ? ["Period", unit || "Value", "Basis"] : ["Period", unit || "Value"]}
        rows={points.map((p) => (hasEst
          ? [p.t, fmt(p.v, decimals), p.est ? "projected" : "measured"]
          : [p.t, fmt(p.v, decimals)]))}
      />
    </div>
  );
}

/* donut for domain distribution */
export function Donut({ segments, size = 190, thickness = 26, centerLabel, centerSub, label = "Records by domain" }) {
  const t = useT();
  const [ref, shown] = useReveal();
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div ref={ref}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label}>
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={t.line} strokeWidth={thickness} opacity={0.5} />
            {segments.map((s, i) => {
              const frac = s.value / total;
              const len = shown ? frac * c : 0;
              const el = (
                <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.color} strokeWidth={thickness}
                  strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} strokeLinecap="butt"
                  style={{ transition: `stroke-dasharray .9s cubic-bezier(.22,1,.36,1) ${i * 0.05}s` }} />
              );
              offset += shown ? frac * c : 0;
              return el;
            })}
          </g>
          <text x={size / 2} y={size / 2 - 2} textAnchor="middle" fontSize="30" fontWeight="800" fill={t.text}>{centerLabel}</text>
          <text x={size / 2} y={size / 2 + 18} textAnchor="middle" fontSize="10.5" fill={t.mute} fontFamily="ui-monospace,monospace" letterSpacing=".08em">{centerSub}</text>
        </svg>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 14px", flex: 1, minWidth: 180 }}>
          {segments.map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, color: t.textDim }}>
              <span style={{ width: 9, height: 9, borderRadius: 2, background: s.color, flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{s.label}</span>
              <b style={{ color: t.text }}>{s.value}</b>
            </div>
          ))}
        </div>
      </div>
      <ChartData
        caption={`${label} — ${total} in total`}
        columns={["Domain", "Records", "Share"]}
        rows={segments.map((s) => [s.label, s.value, Math.round((s.value / total) * 100) + "%"])}
      />
    </div>
  );
}

/* progress ring for the manifesto */
export function ProgressRing({ value, total, size = 128, thickness = 12, color, label }) {
  const t = useT();
  const [ref, shown] = useReveal();
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const frac = total ? value / total : 0;
  const len = shown ? frac * c : 0;
  return (
    <div ref={ref} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      {/* one value, so the label is the whole text equivalent — the
          percentage is rendered in the ring and must appear here too */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img"
        aria-label={`${label}: ${value} of ${total} (${Math.round(frac * 100)}%)`}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={t.line} strokeWidth={thickness} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round"
            strokeDasharray={`${len} ${c - len}`} style={{ transition: "stroke-dasharray 1.1s cubic-bezier(.22,1,.36,1)" }} />
        </g>
        <text x={size / 2} y={size / 2 - 1} textAnchor="middle" fontSize="26" fontWeight="800" fill={t.text}>{Math.round(frac * 100)}%</text>
        <text x={size / 2} y={size / 2 + 17} textAnchor="middle" fontSize="10.5" fill={t.mute} fontFamily="ui-monospace,monospace">{value}/{total}</text>
      </svg>
      {label && <span style={{ fontSize: 11, color: t.textDim }}>{label}</span>}
    </div>
  );
}
