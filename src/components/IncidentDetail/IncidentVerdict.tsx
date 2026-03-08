"use client";

import { motion } from "motion/react";
import { fadeIn } from "./variants";

interface IncidentVerdictProps {
  verdict: string;
  verdictLabel: string;
}

export function IncidentVerdict({
  verdict,
  verdictLabel,
}: IncidentVerdictProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="relative my-16"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full" />
      <div className="pl-8 py-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-4">
          {verdictLabel}
        </span>
        <p className="text-2xl font-dynamic italic text-foreground/80 leading-relaxed">
          &quot;{verdict}&quot;
        </p>
      </div>
    </motion.section>
  );
}
