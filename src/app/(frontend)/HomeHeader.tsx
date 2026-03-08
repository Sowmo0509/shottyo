"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "motion/react";
import type { Incident } from "@/types";

const HEADLINE_IMAGE = "https://images.unsplash.com/photo-1457732815361-daa98277e9c8?q=85&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0";

const MS_7_DAYS = 7 * 24 * 60 * 60 * 1000;

function getCountLast7Days(incidents: Incident[] | null): number {
  if (!incidents?.length) return 0;
  const cutoff = Date.now() - MS_7_DAYS;
  return incidents.filter((i) => new Date(i.dateOfIncident).getTime() >= cutoff).length;
}

type Props = {
  incidents?: Incident[] | null;
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HomeHeader({ incidents = null }: Props) {
  const { t, language } = useTranslation();
  const count = getCountLast7Days(incidents);
  const headline = count > 0 ? (language === "bn" ? `গত ৭ দিনে ${count}টি রিপোর্ট` : `${count} ${count === 1 ? "case" : "cases"} reported in last 7 days`) : language === "bn" ? "বাংলাদেশ জুড়ে ঘটনা ও রায় ট্র্যাক করুন" : "Track incidents and verdicts across Bangladesh";
  const hero = t.home.hero;

  return (
    <div className="w-full container mx-auto px-4 md:px-6 lg:px-8">
      <Link href="/#incidents" className="group relative flex rounded-2xl overflow-hidden bg-muted h-[70vh] min-h-[420px] max-h-[720px] w-full">
        <motion.div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HEADLINE_IMAGE})` }} initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} whileHover={{ scale: 1.03 }} />
        <div className="absolute inset-0 bg-linear-to-r from-black/92 from-0% via-black/55 via-35% to-transparent to-65%" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_30%_90%,rgba(0,0,0,0.4),transparent)]" aria-hidden />
        <motion.div className="relative z-10 flex flex-col justify-end p-8 md:p-12 text-white max-w-2xl" variants={container} initial="hidden" animate="visible">
          <motion.p variants={item} className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80 mb-2">
            {hero.tagline}
          </motion.p>
          <motion.h2 variants={item} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] font-dynamic tracking-tight">
            {headline}
          </motion.h2>
          <motion.p variants={item} className="mt-5 text-white/90 text-lg md:text-xl font-dynamic max-w-xl">
            {hero.subtitle}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10 w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
          <span className="text-white/90 text-xl">↓</span>
        </div>
      </Link>
    </div>
  );
}
