import { RED } from "../lib/theme.js";

/* The DMK rising sun — drawn, not imaged, so it stays crisp offline. */
export default function RisingSun({ size = 30, color = RED, glow = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden style={glow ? { filter: `drop-shadow(0 0 6px ${color}66)` } : undefined}>
      <circle cx="30" cy="38" r="11" fill={color} />
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (Math.PI * i) / 8;
        const x1 = 30 - Math.cos(a) * 16, y1 = 38 - Math.sin(a) * 16;
        const x2 = 30 - Math.cos(a) * 25, y2 = 38 - Math.sin(a) * 25;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.4" strokeLinecap="round" />;
      })}
    </svg>
  );
}
