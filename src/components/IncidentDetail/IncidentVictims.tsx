"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { User } from "lucide-react";
import { Heading, Text } from "@/components/ui/typography";
import { fadeIn, staggerContainer } from "./variants";
import { getLocalized, getDescriptionText } from "./utils";
import { urlFor } from "@/sanity/lib/image";
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
        <Heading as="h2" variant="h3" className="font-dynamic italic">
          {victimsLabel}
        </Heading>
      </motion.div>
      <div className="divide-y divide-border/30">
        {victims.map((victim) => {
          const victimName = getLocalized(victim.name, language);
          const victimDesc = getDescriptionText(victim.description, language);
          const rawImage = victim.image;
          const imageSource =
            rawImage != null && (typeof rawImage === "string" || typeof rawImage === "object")
              ? (rawImage as Parameters<typeof urlFor>[0])
              : null;

          let imageUrl: string | null = null;
          if (imageSource) {
            try {
              imageUrl = urlFor(imageSource).width(224).height(224).fit("crop").url();
            } catch {
              imageUrl = null;
            }
          }

          return (
            <motion.div
              key={victim._id}
              variants={fadeIn}
              className="py-6 first:pt-2 flex flex-col sm:flex-row gap-6"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-secondary/50 shrink-0 border border-border/50 flex items-center justify-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={victimName || (language === "bn" ? "ক্ষতিগ্রস্তের ছবি" : "Victim photo")}
                    width={224}
                    height={224}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-foreground opacity-50" />
                )}
              </div>
              <div className="flex-1 min-w-0">
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
