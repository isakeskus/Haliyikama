"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 2.2,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => Math.round(v).toLocaleString("tr-TR"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, to, duration, value]);

  return (
    <span ref={ref} aria-label={`${prefix}${to.toLocaleString("tr-TR")}${suffix}`}>
      {prefix}
      <motion.span aria-hidden="true">{text}</motion.span>
      {suffix}
    </span>
  );
}
