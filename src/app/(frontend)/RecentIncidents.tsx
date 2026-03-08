"use client";

import { Incident } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";
import { IncidentCard } from "@/components/IncidentCard";
import { motion } from "motion/react";
import { useAppStore } from "@/store/useAppStore";

interface Props {
  incidents: Incident[];
}

export function RecentIncidents({ incidents }: Props) {
  const { t } = useTranslation();
  const { language } = useAppStore();

  if (!incidents || incidents.length === 0) return null;

  const featured = incidents[0];
  const rest = incidents.slice(1, 4);

  return (
    <section className="py-24 md:py-32 border-b border-border/50 bg-card">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex items-end justify-between"
        >
          <div>
            <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {language === "bn" ? "সাম্প্রতিক আপডেট" : "Recent Updates"}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-dynamic">
              {t.home.incidentsSection.heading}
            </h2>
          </div>
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-24">
          {/* Top Featured Post */}
          <IncidentCard incident={featured} index={0} featured={true} />

          {/* Next 3 Posts */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pt-8 border-t border-border/50">
              {rest.map((incident, i) => (
                <IncidentCard key={incident._id} incident={incident} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}