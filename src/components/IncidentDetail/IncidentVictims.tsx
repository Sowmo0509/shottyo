"use client";

import { motion } from "motion/react";
import { User } from "lucide-react";
import { Heading, Text } from "@/components/ui/typography";
import { fadeIn, staggerContainer } from "./variants";
import { getLocalized } from "./utils";
import type { Victim } from "./types";

interface IncidentVictimsProps {
  victims: Victim[];
  language: string;
  victimsLabel: string;
  ageLabel: string;
}

export function IncidentVictims({
  victims,
  language,
  victimsLabel,
  ageLabel,
}: IncidentVictimsProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="space-y-6"
    >
      <motion.div
        variants={fadeIn}
        className="flex items-center gap-4 border-b border-border/40 pb-4"
      >
        <Heading as="h2" variant="h3" className="font-serif italic">
          {victimsLabel}
        </Heading>
      </motion.div>
      <div className="divide-y divide-border/30">
        {victims.map((victim) => {
          const victimName = getLocalized(victim.name, language);
          const victimDesc = getLocalized(victim.description, language);

          return (
            <motion.div
              key={victim._id}
              variants={fadeIn}
              className="py-6 first:pt-2 flex flex-col sm:flex-row gap-6"
            >
              <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center text-secondary-foreground shrink-0 border border-border/50">
                <User className="w-6 h-6 opacity-50" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                  <Heading as="h3" variant="h4" className="font-medium">
                    {victimName}
                  </Heading>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono uppercase tracking-wider">
                    <span className="px-2 py-0.5 bg-muted rounded-full text-xs">
                      {victim.status}
                    </span>
                    {victim.age != null && (
                      <span>
                        {ageLabel}: {victim.age}
                      </span>
                    )}
                  </div>
                </div>
                {victimDesc && (
                  <Text variant="muted" className="leading-relaxed">
                    {victimDesc}
                  </Text>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
