"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import type { Incident } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { convertToBengaliDigits } from "@/lib/utils";

function AnimatedCounter({ value, duration = 2, language = "en" }: { value: number; duration?: number; language?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number;
    const step = (t: number) => {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(easeProgress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  const formattedDisplay = language === "bn" ? convertToBengaliDigits(display) : display;

  return <span ref={ref}>{formattedDisplay}</span>;
}

type Props = {
  featuredIncident?: Incident | null;
  totalCount?: number;
};

export function EditorialHero({ totalCount = 0 }: Props) {
  const { t, language } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headline = language === "bn" ? "সত্য প্রকাশ। ন্যায়বিচার প্রতিষ্ঠা।" : "Uncovering Truth. Demanding Justice.";

  return (
    <section ref={ref} className="relative min-h-dvh md:min-h-[95vh] w-full flex flex-col justify-center overflow-hidden bg-black">
      {/* Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <img
          src="/images/dark_bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-right"
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-red-500/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.75)_100%)]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-16 md:mt-0 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          {/* Typographic Left Side */}
          <div className="lg:col-span-7 flex flex-col items-start text-left min-w-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-4 sm:mb-6 md:mb-8">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20 py-1 px-3 sm:py-1.5 sm:px-4 gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                <span className="tracking-widest uppercase">{language === "bn" ? "লাইভ ট্র্যাকিং" : "Live Tracking"}</span>
              </Badge>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.08] tracking-tight font-dynamic wrap-break-word">
              {headline}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-white/70 max-w-xl font-light leading-relaxed">
              {t.home.hero.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <Button asChild size="lg" className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold shadow-xl w-full sm:w-auto">
                <Link href="#incidents">{t.home.incidentsSection.viewAll}</Link>
              </Button>
            </motion.div>
          </div>

          {/* Stats Right Side */}
          <motion.div initial={{ opacity: 0, scale: 0.9, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-5 relative min-w-0">
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 h-full">
              {/* Rape cases filed: 2025 vs 2024 — meaningful bar comparison */}
              <div className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 backdrop-blur-sm flex flex-col shadow-2xl min-w-0 sm:col-span-2">
                <div className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
                  {language === "bn" ? "ধর্ষণ মামলা দায়ের (বাংলাদেশ)" : "Rape cases filed (Bangladesh)"}
                </div>
                <div className="space-y-4 flex-1">
                  {/* 2025 bar */}
                  <div>
                    <div className="flex justify-between items-baseline gap-2 mb-1.5">
                      <span className="text-white/60 text-xs font-medium">{language === "bn" ? convertToBengaliDigits("2025") : "2025"}</span>
                      <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                        <AnimatedCounter value={7068} duration={2} language={language} />
                      </span>
                    </div>
                    <div className="relative h-3 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 h-full bg-red-500 rounded-full"
                      />
                    </div>
                  </div>
                  {/* 2024 bar */}
                  <div>
                    <div className="flex justify-between items-baseline gap-2 mb-1.5">
                      <span className="text-white/60 text-xs font-medium">{language === "bn" ? convertToBengaliDigits("2024") : "2024"}</span>
                      <span className="text-xl sm:text-2xl font-black text-white/90 tabular-nums tracking-tight">
                        <AnimatedCounter value={2024} duration={2} language={language} />
                      </span>
                    </div>
                    <div className="relative h-3 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "28.65%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 h-full bg-white/40 rounded-full"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-white/50 text-[10px] sm:text-xs mt-3 font-medium">
                  {language === "bn" ? "২০২৪ থেকে ২০২৫ পর্যন্ত প্রায় ২.৫ গুণ বৃদ্ধি" : "~2.5× increase from 2024 to 2025"}
                </p>
              </div>

              {/* Cases not solved — attention-grabbing */}
              <div className="rounded-2xl sm:rounded-3xl bg-red-950/40 border border-red-500/30 p-4 sm:p-6 backdrop-blur-sm flex flex-col shadow-2xl min-w-0 sm:col-span-2">
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
                      <AnimatedCounter value={5847} duration={2} language={language} />
                    </span>
                    <span className="text-white/50 text-[10px] block mt-0.5">
                      {language === "bn" ? "বিচারবহির্ভূত" : "awaiting justice"}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/60 text-[10px] sm:text-xs font-medium block mb-0.5">{language === "bn" ? convertToBengaliDigits("2024") : "2024"}</span>
                    <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                      <AnimatedCounter value={1618} duration={2} language={language} />
                    </span>
                    <span className="text-white/50 text-[10px] block mt-0.5">
                      {language === "bn" ? "বিচারবহির্ভূত" : "awaiting justice"}
                    </span>
                  </div>
                </div>
                <p className="text-amber-200/80 text-[10px] sm:text-xs font-semibold mt-3 pt-3 border-t border-red-500/20">
                  {language === "bn" ? "অধিকাংশ মামলার রায় হয়নি — আমরা নজর রাখছি।" : "Most cases still without verdict — we're tracking."}
                </p>
              </div>

              {/* Year-on-year change — single clear stat */}
              <div className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 backdrop-blur-sm flex flex-col justify-center items-center text-center shadow-2xl min-w-0">
                <span className="text-white/70 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                  {language === "bn" ? "বছর-ওভার-বছর বৃদ্ধি" : "Year-on-year increase"}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-red-400 tabular-nums">
                  <AnimatedCounter value={249} duration={1.5} language={language} />%
                </span>
                <span className="text-white/60 text-xs mt-1">{language === "bn" ? `${convertToBengaliDigits("2024")} → ${convertToBengaliDigits("2025")}` : "2024 → 2025"}</span>
              </div>

              {/* Total documented on our platform */}
              <Link href="#incidents" className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 backdrop-blur-sm relative overflow-hidden group hover:border-primary/50 transition-colors duration-500 flex flex-col justify-center shadow-2xl min-w-0">
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
                {/* Status breakdown: meaningful platform stats */}
                <div className="relative z-10 mt-4 pt-4 border-t border-white/10 flex justify-between text-[10px] sm:text-xs text-white/60">
                  <span>{language === "bn" ? "তদন্তাধীন" : "Investigating"} {language === "bn" ? convertToBengaliDigits("76") : "76"}%</span>
                  <span>{language === "bn" ? "মীমাংসিত" : "Resolved"} {language === "bn" ? convertToBengaliDigits("24") : "24"}%</span>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
