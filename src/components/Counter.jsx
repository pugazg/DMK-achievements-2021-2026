import { useReveal, useCountUp } from "../lib/hooks.js";
import { fmt } from "../lib/format.js";

/* Animated count-up number. Starts when scrolled into view. */
export default function Counter({ value, decimals = 0, prefix = "", suffix = "", duration = 1500, style }) {
  const [ref, shown] = useReveal();
  const n = useCountUp(value, shown, { duration, decimals });
  return (
    <span ref={ref} style={style}>
      {prefix}{fmt(n, decimals)}{suffix}
    </span>
  );
}
