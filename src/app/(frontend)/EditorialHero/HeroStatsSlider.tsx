"use client";

import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "@/hooks/useTranslation";
import { HERO_CRIME_STATS } from "./heroCrimeStats";
import { CrimeCategoryTabs } from "./CrimeCategoryTabs";
import { CrimeStatCards } from "./CrimeStatCards";
import { DocumentedPlatformCard } from "./DocumentedPlatformCard";

interface HeroStatsSliderProps {
  totalCount: number;
  slideIndex: number;
  onSlideChange: (index: number) => void;
}

export function HeroStatsSlider({ totalCount, slideIndex, onSlideChange }: HeroStatsSliderProps) {
  const { language } = useTranslation();

  const crime = HERO_CRIME_STATS[slideIndex];
  const barWidth2024Percent = Math.min(100, Math.round((crime.filed2024 / crime.filed2025) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-5 relative min-w-0"
    >
      <CrimeCategoryTabs slideIndex={slideIndex} onSelect={onSlideChange} language={language} />

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 h-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="contents"
          >
            <CrimeStatCards crime={crime} barWidth2024Percent={barWidth2024Percent} language={language} />
          </motion.div>
        </AnimatePresence>

        <DocumentedPlatformCard totalCount={totalCount} />
      </div>
    </motion.div>
  );
}
