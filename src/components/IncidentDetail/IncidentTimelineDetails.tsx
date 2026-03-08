"use client";

import { format } from "date-fns";
import { motion } from "motion/react";
import { Heading, Text } from "@/components/ui/typography";
import { fadeIn } from "./variants";
import { getLocalized, getDescriptionText } from "./utils";
import type { TimelineEvent } from "./types";

interface IncidentTimelineDetailsProps {
  timeline: TimelineEvent[];
  language: string;
  timelineDetailsLabel: string;
}

export function IncidentTimelineDetails({
  timeline,
  language,
  timelineDetailsLabel,
}: IncidentTimelineDetailsProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="space-y-10 pt-8"
    >
      <motion.div
        variants={fadeIn}
        className="flex items-center gap-4 border-b border-border/40 pb-4 mb-8"
      >
        <Heading as="h2" variant="h3" className="font-serif italic">
          {timelineDetailsLabel}
        </Heading>
      </motion.div>

      <div className="relative pl-1">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute left-2 top-2 bottom-2 w-px bg-border/60"
        />

        <div className="space-y-16">
          {timeline.map((event) => {
            const eventTitle = getLocalized(event.title, language);
            const eventDesc = getDescriptionText(event.description, language);

            return (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex items-start gap-8"
              >
                <div className="absolute left-0 top-1 w-3 h-3 bg-background border-2 border-primary rounded-full -translate-x-1/2 z-10 shrink-0" />
                <div className="w-full min-w-0 pl-10 md:pl-12">
                  <time className="text-sm font-mono text-muted-foreground mb-2 block">
                    {format(new Date(event.date), "MMMM d, yyyy")}
                  </time>
                  <Heading as="h4" variant="h4" className="font-medium mb-3">
                    {eventTitle}
                  </Heading>
                  {eventDesc && (
                    <Text variant="muted" className="leading-relaxed">
                      {eventDesc}
                    </Text>
                  )}
                  <span className="mt-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium uppercase tracking-wider inline-block">
                    {event.eventType}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
