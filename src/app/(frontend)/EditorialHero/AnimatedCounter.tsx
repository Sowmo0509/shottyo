"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";
import { convertToBengaliDigits } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  language?: string;
}

export function AnimatedCounter({ value, duration = 2, language = "en" }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number;
    const step = (t: number) => {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(easeProgress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  const formattedDisplay = language === "bn" ? convertToBengaliDigits(display) : display;

  return <span ref={ref}>{formattedDisplay}</span>;
}
