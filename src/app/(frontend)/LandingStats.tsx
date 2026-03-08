"use client";

import { useRef, useEffect, useState } from "react";
import { Heading } from "@/components/ui/typography";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, useInView } from "motion/react";
import type { Incident } from "@/types";

function getUniqueDistricts(incidents: Incident[] | null): number {
  if (!incidents?.length) return 0;
  const set = new Set(incidents.map((i) => i.district).filter(Boolean));
  return set.size;
}

function getWithVerdicts(incidents: Incident[] | null): number {
  if (!incidents?.length) return 0;
  return incidents.filter((i) => i.verdict && (i.verdict.en || i.verdict.bn)).length;
}

function AnimatedNumber({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start: number;
    const step = (t: number) => {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}

type Props = {
  incidents: Incident[] | null;
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function LandingStats({ incidents }: Props) {
  const { t } = useTranslation();
  const stats = t.home.stats;
  const count = incidents?.length ?? 0;
  const districts = getUniqueDistricts(incidents);
  const verdicts = getWithVerdicts(incidents);

  const items = [
    { value: count, label: stats.incidents },
    { value: districts, label: stats.districts },
    { value: verdicts, label: stats.verdicts },
  ];

  return (
    <motion.section
      aria-label="Statistics"
      className="py-14 md:py-20 bg-muted/40 border-y border-border"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-14"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {items.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={item}
              className="text-center"
            >
              <Heading
                as="p"
                variant="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums text-primary"
              >
                <AnimatedNumber value={value} />
              </Heading>
              <p className="mt-3 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
