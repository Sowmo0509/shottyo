"use client";

import { useRef } from "react";
import type { Incident } from "@/types";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroStatsSlider } from "./HeroStatsSlider";

export type EditorialHeroProps = {
  featuredIncident?: Incident | null;
  totalCount?: number;
};

export function EditorialHero({ totalCount = 0 }: EditorialHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh md:min-h-[95vh] w-full flex flex-col justify-center overflow-hidden bg-black"
    >
      <HeroBackground sectionRef={sectionRef} />

      <div className="relative z-10 container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-16 md:mt-0 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          <HeroContent />
          <HeroStatsSlider totalCount={totalCount} />
        </div>
      </div>
    </section>
  );
}
