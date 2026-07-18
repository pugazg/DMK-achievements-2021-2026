import { useState, useEffect, useRef, useCallback } from "react";

/* prefers-reduced-motion — respected across all animation */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    if (typeof matchMedia === "undefined") return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

/* reveal on scroll — returns [ref, shown] */
export function useReveal(opts = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { setShown(true); return; }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setShown(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: opts.threshold ?? 0.15, rootMargin: opts.rootMargin ?? "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, opts.threshold, opts.rootMargin]);
  return [ref, shown];
}

/* count-up when `active` turns true. Handles decimals & easing. */
export function useCountUp(target, active, { duration = 1400, decimals = 0 } = {}) {
  const [val, setVal] = useState(0);
  const reduced = useReducedMotion();
  const raf = useRef(0);
  useEffect(() => {
    if (!active) return;
    if (reduced) { setVal(target); return; }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(target * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, active, reduced, duration]);
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

/* scroll-spy — returns id of the section nearest the top */
export function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join("|"), offset]);
  return active;
}

/* reading-progress 0..1 */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return p;
}

/* persisted state (localStorage, gracefully degrades) */
export function usePersisted(key, initial) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s == null ? initial : JSON.parse(s); }
    catch { return initial; }
  });
  const set = useCallback((next) => {
    setV((prev) => {
      const val = typeof next === "function" ? next(prev) : next;
      try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
      return val;
    });
  }, [key]);
  return [v, set];
}

/* smooth scroll to an element id, accounting for the sticky nav */
export function scrollToId(id, navH = 64) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top: y, behavior: matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
