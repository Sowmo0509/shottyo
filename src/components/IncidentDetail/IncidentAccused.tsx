"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { UserX } from "lucide-react";
import { Heading, Text } from "@/components/ui/typography";
import { fadeIn, staggerContainer } from "./variants";
import { getLocalized, getDescriptionText, getDescriptionBlocksForLanguage } from "./utils";
import { urlFor } from "@/sanity/lib/image";
import type { AccusedPerson } from "./types";
import type { IncidentDetailTranslation } from "./types";

interface IncidentAccusedProps {
  accused: AccusedPerson[];
  language: string;
  accusedLabel: string;
  ageLabel: string;
  roleLabel: string;
  legalStatusLabel: string;
  t: IncidentDetailTranslation;
}

function getRoleLabel(t: IncidentDetailTranslation, role: string | undefined): string {
  if (!role) return "";
  return t.common.incidents.accusedRole?.[role] ?? role;
}

function getStatusLabel(t: IncidentDetailTranslation, status: string | undefined): string {
  if (!status) return "";
  return t.common.incidents.accusedStatus?.[status] ?? status;
}

export function IncidentAccused({ accused, language, accusedLabel, ageLabel, roleLabel, legalStatusLabel, t }: IncidentAccusedProps) {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
      <motion.div variants={fadeIn} className="flex items-center gap-4 border-b border-border/40 pb-4">
        <Heading as="h2" variant="h3" className="font-dynamic italic">
          {accusedLabel}
        </Heading>
      </motion.div>
      <div className="divide-y divide-border/30">
        {accused.map((person, index) => {
          const name = getLocalized(person.name, language);
          const desc = getDescriptionText(person.description, language);
          const descBlocks = getDescriptionBlocksForLanguage(person.description as { en?: unknown; bn?: unknown } | undefined, language);
          const role = getRoleLabel(t, person.role);
          const status = getStatusLabel(t, person.status);

          const rawImage = person.image;
          const imageSource = rawImage != null && (typeof rawImage === "string" || typeof rawImage === "object") ? (rawImage as Parameters<typeof urlFor>[0]) : null;

          let imageUrl: string | null = null;
          if (imageSource) {
            try {
              imageUrl = urlFor(imageSource).width(224).height(224).fit("crop").url();
            } catch {
              imageUrl = null;
            }
          }

          return (
            <motion.div key={person._key ?? index} variants={fadeIn} className="py-6 first:pt-2 flex flex-col sm:flex-row gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-destructive/10 border border-destructive/20 shrink-0 flex items-center justify-center">{imageUrl ? <Image src={imageUrl} alt={name || (language === "bn" ? "অভিযুক্তের ছবি" : "Accused photo")} width={224} height={224} className="w-full h-full object-cover" unoptimized /> : <UserX className="w-10 h-10 sm:w-12 sm:h-12 text-destructive/70" />}</div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                  <Heading as="h3" variant="h3" className="font-bold">
                    {name}
                  </Heading>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground font-mono uppercase tracking-wider">
                    {role && (
                      <span className="px-2 py-0.5 bg-muted rounded-full text-xs">
                        {roleLabel}: {role}
                      </span>
                    )}
                    {status && (
                      <span className="px-2 py-0.5 bg-destructive/10 text-destructive/90 rounded-full text-xs">
                        {legalStatusLabel}: {status}
                      </span>
                    )}
                    {person.age != null && (
                      <span>
                        {ageLabel}: {person.age}
                      </span>
                    )}
                  </div>
                </div>
                {descBlocks && descBlocks.length > 0 ? (
                  <div className="text-xl text-muted-foreground leading-relaxed space-y-2">
                    <PortableText value={descBlocks} />
                  </div>
                ) : (
                  desc && (
                    <Text variant="muted" className="leading-relaxed">
                      {desc}
                    </Text>
                  )
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
