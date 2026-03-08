"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HERO_CRIME_STATS } from "./heroCrimeStats";

interface HeroContentProps {
  slideIndex: number;
}

export function HeroContent({ slideIndex }: HeroContentProps) {
  const { t, language } = useTranslation();
  const headline = t.home.hero.headline;
  const crime = HERO_CRIME_STATS[slideIndex];
  const paragraphs = t.home.hero.paragraphs as Record<string, string> | undefined;
  const paragraph = paragraphs?.[crime.id] ?? t.home.hero.subtitle;

  return (
    <div className="lg:col-span-7 flex flex-col items-start text-left min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 sm:mb-6 md:mb-8"
      >
        <Badge variant="outline" className="bg-white/10 text-white border-white/20 py-1 px-3 sm:py-1.5 sm:px-4 gap-1.5 sm:gap-2 text-xs sm:text-sm">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
          <span className="tracking-widest uppercase">{language === "bn" ? "লাইভ ট্র্যাকিং" : "Live Tracking"}</span>
        </Badge>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight font-dynamic wrap-break-word"
      >
        {headline}
      </motion.h1>

      <motion.p
        key={slideIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-white max-w-xl font-medium leading-relaxed"
      >
        {paragraph}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4"
      >
        <Button asChild size="lg" className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold shadow-xl w-full sm:w-auto">
          <Link href="#incidents">{t.home.incidentsSection.viewAll}</Link>
        </Button>
      </motion.div>
    </div>
  );
}
