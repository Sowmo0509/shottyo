"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import type { Incident } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

function getUniqueDistricts(incidents: Incident[] | null): number {
  if (!incidents?.length) return 0;
  const set = new Set(incidents.map((i) => i.district).filter(Boolean));
  return set.size;
}

function getWithVerdicts(incidents: Incident[] | null): number {
  if (!incidents?.length) return 0;
  return incidents.filter((i) => i.verdict && (i.verdict.en || i.verdict.bn)).length;
}

function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start: number;
    const step = (t: number) => {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(easeProgress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}

type Props = {
  incidents: Incident[] | null;
};

const BENTO_IMAGES = {
  document: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
  track: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop",
};

export function MissionBento({ incidents }: Props) {
  const { t } = useTranslation();
  const mission = t.home.mission;
  const stats = t.home.stats;

  const count = incidents?.length ?? 0;
  const districts = getUniqueDistricts(incidents);
  const verdicts = getWithVerdicts(incidents);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8"
        >
          <div className="max-w-2xl min-w-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 font-dynamic">
              {mission.heading}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              We aggregate reports, track court proceedings, and document outcomes to ensure transparency.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 sm:gap-8">
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tabular-nums tracking-tighter">
                <AnimatedNumber value={count} />
              </span>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1 sm:mt-2">{stats.incidents}</span>
            </div>
            <div className="w-px bg-border h-12 sm:h-16 self-center hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tabular-nums tracking-tighter">
                <AnimatedNumber value={districts} />
              </span>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1 sm:mt-2">{stats.districts}</span>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 auto-rows-[minmax(260px,auto)] md:auto-rows-[320px]">
          {/* Card 1: Document (Large, Span 8) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8"
          >
            <Card className="h-full overflow-hidden border-border/50 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-500 relative group bg-card">
              <div className="absolute inset-0">
                <img
                  src={BENTO_IMAGES.document}
                  alt={mission.document.title}
                  className="w-full h-full object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-1000 ease-out opacity-20 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/20" />
              </div>
              <CardContent className="relative h-full p-6 sm:p-8 md:p-12 flex flex-col justify-end">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  {mission.document.title.charAt(0)}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-dynamic">{mission.document.title}</h3>
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">{mission.document.body}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2: Track (Tall, Span 4, Row Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 md:row-span-2"
          >
            <Card className="h-full overflow-hidden bg-primary text-primary-foreground border-none shadow-lg hover:shadow-2xl transition-all duration-500 relative group">
              <div className="absolute inset-0">
                <img
                  src={BENTO_IMAGES.track}
                  alt={mission.track.title}
                  className="w-full h-full object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-1000 ease-out opacity-20 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/50 to-transparent" />
              </div>
              <CardContent className="relative h-full p-6 sm:p-8 md:p-10 flex flex-col">
                <div className="flex-1">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {mission.track.title.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4 font-dynamic">{mission.track.title}</h3>
                  <p className="text-primary-foreground/90 text-lg leading-relaxed">{mission.track.body}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3: Verdicts Stat (Small, Span 4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <Card className="h-full bg-muted/30 border-border/50 hover:bg-muted/50 transition-colors duration-500">
              <CardContent className="h-full flex flex-col justify-center items-center text-center p-6 sm:p-8">
                <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground tabular-nums tracking-tighter mb-3 sm:mb-4">
                  <AnimatedNumber value={verdicts} />
                </span>
                <span className="text-sm font-bold text-primary uppercase tracking-widest">{stats.verdicts}</span>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 4: Accountability (Small, Span 4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <Card className="h-full border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 group overflow-hidden relative bg-card">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="h-full p-6 sm:p-8 flex flex-col justify-between relative z-10">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground font-bold mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                  {mission.accountability.title.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 font-dynamic">{mission.accountability.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{mission.accountability.body}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}