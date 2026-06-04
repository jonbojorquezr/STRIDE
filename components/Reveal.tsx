"use client";
import React from "react";

/* Anima los elementos .reveal cuando entran al viewport.
   Llamar una vez en el componente raíz de cada página. */
export function useReveal() {
  React.useEffect(() => {
    const reveal = (el: Element) => el.classList.add("in");
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(reveal);
      return;
    }
    const vh = window.innerHeight || 800;
    document.querySelectorAll(".reveal:not(.in)").forEach((e) => {
      const r = e.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) reveal(e);
    });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            reveal(en.target);
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((e) => io.observe(e));
    const safety = setTimeout(
      () => document.querySelectorAll(".reveal:not(.in)").forEach(reveal),
      1800
    );
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  });
}

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  dur = 1400,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  dur?: number;
  decimals?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting && !started) {
          started = true;
          if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setV(to);
            return;
          }
          const t0 = performance.now();
          const tick = (tt: number) => {
            const p = Math.min(1, (tt - t0) / dur);
            setV(to * (1 - Math.pow(1 - p, 3)));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, dur]);
  return (
    <span ref={ref}>
      {prefix}
      {decimals ? v.toFixed(decimals) : Math.round(v)}
      {suffix}
    </span>
  );
}
