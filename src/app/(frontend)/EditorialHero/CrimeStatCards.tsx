"use client";

import { motion } from "motion/react";
import { convertToBengaliDigits } from "@/lib/utils";
import { AnimatedCounter } from "./AnimatedCounter";
import type { HeroCrimeStat } from "./heroCrimeStats";

interface CrimeStatCardsProps {
  crime: HeroCrimeStat;
  barWidth2024Percent: number;
  language: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.05 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export function CrimeStatCards({ crime, barWidth2024Percent, language }: CrimeStatCardsProps) {
  return (
    <>
      {/* Cases filed: 2025 vs 2024 */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={0}
        className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 backdrop-blur-sm flex flex-col shadow-2xl min-w-0 sm:col-span-2"
      >
        <div className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
          {language === "bn" ? crime.titleBn : crime.titleEn}
        </div>
        <div className="space-y-4 flex-1">
          <div>
            <div className="flex justify-between items-baseline gap-2 mb-1.5">
              <span className="text-white/60 text-xs font-medium">{language === "bn" ? convertToBengaliDigits("2025") : "2025"}</span>
              <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                <AnimatedCounter value={crime.filed2025} duration={1.2} language={language} />
              </span>
            </div>
            <div className="relative h-3 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 h-full bg-red-500 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-baseline gap-2 mb-1.5">
              <span className="text-white/60 text-xs font-medium">{language === "bn" ? convertToBengaliDigits("2024") : "2024"}</span>
              <span className="text-xl sm:text-2xl font-black text-white/90 tabular-nums tracking-tight">
                <AnimatedCounter value={crime.filed2024} duration={1.2} language={language} />
              </span>
            </div>
            <div className="relative h-3 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${barWidth2024Percent}%` }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 h-full bg-white/40 rounded-full"
              />
            </div>
          </div>
        </div>
        <p className="text-white/50 text-[10px] sm:text-xs mt-3 font-medium">{language === "bn" ? crime.increaseNoteBn : crime.increaseNoteEn}</p>
      </motion.div>

      {/* Cases not solved */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={1}
        className="rounded-2xl sm:rounded-3xl bg-red-950/40 border border-red-500/30 p-4 sm:p-6 backdrop-blur-sm flex flex-col shadow-2xl min-w-0 sm:col-span-2"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 shrink-0" aria-hidden />
          <span className="text-amber-200/95 text-xs sm:text-sm font-bold uppercase tracking-wider">
            {language === "bn" ? "মামলা নিষ্পত্তি হয়নি" : "Cases not solved"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div>
            <span className="text-white/60 text-[10px] sm:text-xs font-medium block mb-0.5">{language === "bn" ? convertToBengaliDigits("2025") : "2025"}</span>
            <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
              <AnimatedCounter value={crime.notSolved2025} duration={1.2} language={language} />
            </span>
            <span className="text-white/50 text-[10px] block mt-0.5">{language === "bn" ? "বিচারবহির্ভূত" : "awaiting justice"}</span>
          </div>
          <div>
            <span className="text-white/60 text-[10px] sm:text-xs font-medium block mb-0.5">{language === "bn" ? convertToBengaliDigits("2024") : "2024"}</span>
            <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
              <AnimatedCounter value={crime.notSolved2024} duration={1.2} language={language} />
            </span>
            <span className="text-white/50 text-[10px] block mt-0.5">{language === "bn" ? "বিচারবহির্ভূত" : "awaiting justice"}</span>
          </div>
        </div>
        <p className="text-amber-200/80 text-[10px] sm:text-xs font-semibold mt-3 pt-3 border-t border-red-500/20">
          {language === "bn" ? "অধিকাংশ মামলার রায় হয়নি — আমরা নজর রাখছি।" : "Most cases still without verdict — we're tracking."}
        </p>
      </motion.div>

      {/* Year-on-year */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 backdrop-blur-sm flex flex-col justify-center items-center text-center shadow-2xl min-w-0"
      >
        <span className="text-white/70 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
          {language === "bn" ? "বছর-ওভার-বছর বৃদ্ধি" : "Year-on-year increase"}
        </span>
        <span className="text-3xl sm:text-4xl font-black text-red-400 tabular-nums">
          <AnimatedCounter value={crime.yoyPercent} duration={1} language={language} />%
        </span>
        <span className="text-white/60 text-xs mt-1">
          {language === "bn" ? `${convertToBengaliDigits("2024")} → ${convertToBengaliDigits("2025")}` : "2024 → 2025"}
        </span>
      </motion.div>
    </>
  );
}
