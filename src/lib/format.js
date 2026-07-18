/* Indian-style number formatting (lakh / crore grouping) */
export function groupIN(n) {
  const neg = n < 0;
  let s = Math.abs(Math.round(n)).toString();
  if (s.length <= 3) return (neg ? "-" : "") + s;
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return (neg ? "-" : "") + rest + "," + last3;
}

/* format a value with optional decimals, keeping IN grouping for whole part */
export function fmt(n, decimals = 0) {
  if (decimals > 0) {
    const factor = Math.pow(10, decimals);
    const r = Math.round(n * factor) / factor;
    const whole = Math.trunc(r);
    const frac = Math.abs(r - whole).toFixed(decimals).slice(2);
    return groupIN(whole) + "." + frac;
  }
  return groupIN(n);
}

/* compact large numbers into readable words where helpful */
export function compact(n) {
  const a = Math.abs(n);
  if (a >= 1e7) return fmt(n / 1e7, 2) + " cr";
  if (a >= 1e5) return fmt(n / 1e5, 2) + " lakh";
  return groupIN(n);
}
