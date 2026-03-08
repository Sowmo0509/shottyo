"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Incident } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { format } from "date-fns";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1457732815361-daa98277e9c8?q=85&w=2340&auto=format&fit=crop";

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

  const headline =
    language === "bn"
      ? "সত্য প্রকাশ। ন্যায়বিচার প্রতিষ্ঠা।"
      : "Uncovering Truth. Demanding Justice.";

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return t.common.incidents.status.open;
      case "closed":
        return t.common.incidents.status.closed;
      default:
        return t.common.incidents.status.inProgress;
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] md:min-h-[95vh] w-full flex flex-col justify-center overflow-hidden bg-black"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 mt-20 md:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Typographic Left Side */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium tracking-widest uppercase">
                {language === "bn" ? "লাইভ ট্র্যাকিং" : "Live Tracking"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight font-dynamic"
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 md:mt-8 text-lg md:text-xl text-white/70 max-w-xl font-light leading-relaxed"
            >
              {t.home.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="#incidents"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black shadow-lg transition-all hover:bg-white/90 hover:scale-105 active:scale-95"
              >
                {t.home.incidentsSection.viewAll}
              </Link>
            </motion.div>
          </div>

          {/* Featured Incident Right Side */}
          {featuredIncident && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -inset-1 rounded-3xl bg-linear-to-tr from-white/20 via-transparent to-white/5 blur-xl opacity-50" />
              <Link
                href={`/incident/${featuredIncident.slug.current}`}
                className="group relative block rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 p-2 overflow-hidden hover:border-white/30 transition-colors duration-500 shadow-2xl"
              >
                <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="aspect-4/5 md:aspect-square relative rounded-2xl overflow-hidden bg-white/5">
                  {featuredIncident.images && featuredIncident.images.length > 0 ? (
                    <img
                      src={urlFor(featuredIncident.images[0] as any).width(800).url()}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <span className="text-white/40">{t.common.incidents.noImage}</span>
                    </div>
                  )}
                  
                  {/* Inner Content Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 md:p-8 flex flex-col justify-end">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-white/20">
                        {language === "bn" ? "সর্বশেষ" : "Latest"}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-medium text-white/90 border border-white/10">
                        {format(new Date(featuredIncident.dateOfIncident), "MMM d, yyyy")}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2 group-hover:text-white/90 transition-colors line-clamp-3">
                      {language === "bn" && featuredIncident.title.bn
                        ? featuredIncident.title.bn
                        : featuredIncident.title.en}
                    </h3>
                    
                    <div className="mt-4 flex items-center text-white/70 text-sm font-medium group-hover:text-white transition-colors">
                      {language === "bn" ? "বিস্তারিত পড়ুন" : "Read Full Report"}
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
