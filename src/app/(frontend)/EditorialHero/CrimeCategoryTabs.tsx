"use client";

import { cn } from "@/lib/utils";
import { HERO_CRIME_STATS, getCrimeTabLabel } from "./heroCrimeStats";

interface CrimeCategoryTabsProps {
  slideIndex: number;
  onSelect: (index: number) => void;
  language: string;
}

export function CrimeCategoryTabs({ slideIndex, onSelect, language }: CrimeCategoryTabsProps) {
  return (
    <div
      className="flex gap-1.5 mb-3 sm:mb-4 overflow-x-auto pb-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]"
      role="tablist"
      aria-label={language === "bn" ? "অপরাধের ধরন" : "Crime category"}
    >
      {HERO_CRIME_STATS.map((c, i) => (
        <button
          key={c.id}
          type="button"
          role="tab"
          aria-selected={slideIndex === i}
          onClick={() => onSelect(i)}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap",
            slideIndex === i ? "bg-white text-black" : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
          )}
        >
          {getCrimeTabLabel(c.id, language)}
        </button>
      ))}
    </div>
  );
}
