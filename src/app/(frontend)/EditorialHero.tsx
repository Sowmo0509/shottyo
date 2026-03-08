"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Incident } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HERO_IMAGE = "https://images.unsplash.com/photo-1457732815361-daa98277e9c8?q=85&w=2340&auto=format&fit=crop";

type Props = {
  featuredIncident?: Incident | null;
  totalCount?: number;
};

export function EditorialHero({ featuredIncident, totalCount = 0 }: Props) {
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
    <section ref={ref} className="relative min-h-[90vh] md:min-h-[95vh] w-full flex flex-col justify-center overflow-hidden bg-black">
      {/* Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/80 to-red-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 mt-20 md:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Typographic Left Side */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-8">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20 py-1.5 px-4 gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="tracking-widest uppercase">{language === "bn" ? "লাইভ ট্র্যাকিং" : "Live Tracking"}</span>
              </Badge>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight font-dynamic">
              {headline}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="mt-6 md:mt-8 text-lg md:text-xl text-white/70 max-w-xl font-light leading-relaxed">
              {t.home.hero.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8 h-14 text-base font-semibold shadow-xl">
                <Link href="#incidents">{t.home.incidentsSection.viewAll}</Link>
              </Button>
            </motion.div>
          </div>

          {/* Stats Right Side */}
          <motion.div initial={{ opacity: 0, scale: 0.9, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-5 relative">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">110</div>
                <div className="text-white/70 text-sm leading-relaxed">
                  {language === "bn" ? "গত ৬৭ দিনে ধর্ষণের ঘটনা" : "Rape incidents in the last 67 days"}
                </div>
              </div>
              
              <div className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">7</div>
                <div className="text-white/70 text-sm leading-relaxed">
                  {language === "bn" ? "গত মাসে অগ্নিকাণ্ডের ঘটনা" : "Fire blast incidents in the last month"}
                </div>
              </div>

              <Link href="#incidents" className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm sm:col-span-2 relative overflow-hidden group hover:border-primary/50 transition-colors duration-500 block">
                <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{totalCount}</div>
                    <div className="text-white/70 text-sm leading-relaxed">
                      {language === "bn" ? "মোট নথিভুক্ত ঘটনা" : "Total documented incidents"}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white group-hover:bg-primary transition-colors">
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
