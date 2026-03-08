"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { convertToBengaliDigits } from "@/lib/utils";
import { AnimatedCounter } from "./AnimatedCounter";

interface DocumentedPlatformCardProps {
  totalCount: number;
}

export function DocumentedPlatformCard({ totalCount }: DocumentedPlatformCardProps) {
  const { language } = useTranslation();

  return (
    <Link
      href="#incidents"
      className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 backdrop-blur-sm relative overflow-hidden group hover:border-primary/50 transition-colors duration-500 flex flex-col justify-center shadow-2xl min-w-0"
    >
      <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tighter">
            <AnimatedCounter value={totalCount} duration={2.5} language={language} />
          </div>
          <div className="text-white/80 text-xs sm:text-sm font-bold uppercase tracking-wider mt-0.5">
            {language === "bn" ? "নথিভুক্ত ঘটনা (এই প্ল্যাটফর্ম)" : "Documented on this platform"}
          </div>
        </div>
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white group-hover:bg-primary transition-colors shrink-0">
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
      <div className="relative z-10 mt-4 pt-4 border-t border-white/10 flex justify-between text-[10px] sm:text-xs text-white/60">
        <span>{language === "bn" ? "তদন্তাধীন" : "Investigating"} {language === "bn" ? convertToBengaliDigits("76") : "76"}%</span>
        <span>{language === "bn" ? "মীমাংসিত" : "Resolved"} {language === "bn" ? convertToBengaliDigits("24") : "24"}%</span>
      </div>
    </Link>
  );
}
