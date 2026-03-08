"use client";

import { format } from "date-fns";
import { motion } from "motion/react";
import { Heading } from "@/components/ui/typography";
import { getLocalized } from "./utils";
import type { TimelineEvent } from "./types";

interface IncidentTimelineSummaryProps {
  timeline: TimelineEvent[];
  language: string;
  summaryLabel: string;
}

export function IncidentTimelineSummary({
  timeline,
  language,
  summaryLabel,
}: IncidentTimelineSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="sticky top-28"
    >
      <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
        <Heading
          as="h3"
          variant="h4"
          className="font-dynamic italic mb-8 flex items-center gap-2"
        >
          {summaryLabel}
        </Heading>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-linear-to-b before:from-border/80 before:to-transparent">
          <div className="absolute left-2.5 top-0 bottom-0 w-px bg-border/50" />

          {timeline.map((event, index) => {
            const eventTitle = getLocalized(event.title, language);

            return (
              <motion.div
                key={`summary-${event._id}`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 group"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className="absolute left-[7px] top-1.5 w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-background transition-transform group-hover:scale-150"
                />
                <div className="flex flex-col">
                  <time className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                    {format(new Date(event.date), "MMM d, yyyy")}
                  </time>
                  <span className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                    {eventTitle}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
