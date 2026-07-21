import { useT, textSafe } from "../lib/theme.js";
import { useReveal } from "../lib/hooks.js";

export function Section({ id, children, style }) {
  return (
    <section id={id} style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(48px,7vw,90px) 18px 0", scrollMarginTop: 70, ...style }}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, color }) {
  const t = useT();
  return (
    <div style={{ fontSize: 11, color: textSafe(color || t.gold, t.name), fontFamily: "ui-monospace,monospace", letterSpacing: ".22em", textTransform: "uppercase", marginBottom: 12 }}>
      {children}
    </div>
  );
}

export function SectionHead({ eyebrow, title, lede, color }) {
  const t = useT();
  return (
    <div style={{ marginBottom: 28, maxWidth: 720 }}>
      {eyebrow && <Eyebrow color={color}>{eyebrow}</Eyebrow>}
      <h2 style={{ margin: 0, fontSize: "clamp(24px,3.4vw,34px)", fontWeight: 800, color: t.text, lineHeight: 1.15, letterSpacing: "-.02em" }}>{title}</h2>
      {lede && <p style={{ margin: "12px 0 0", fontSize: "clamp(14px,1.6vw,16px)", color: t.textDim, lineHeight: 1.7 }}>{lede}</p>}
    </div>
  );
}

/* fade+rise wrapper for scroll reveals */
export function Reveal({ children, delay = 0, style }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "none" : "translateY(16px)",
      transition: `opacity .7s ${delay}s cubic-bezier(.22,1,.36,1), transform .7s ${delay}s cubic-bezier(.22,1,.36,1)`,
      ...style,
    }}>{children}</div>
  );
}
