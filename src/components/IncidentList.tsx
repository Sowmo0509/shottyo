"use client";

import { Incident } from "@/types";
import { useAppStore } from "@/store/useAppStore";
import { useTranslation } from "@/hooks/useTranslation";
import { IncidentCard } from "./IncidentCard";
import { motion } from "motion/react";

interface Props {
  incidents: Incident[] | null;
}

export function IncidentList({ incidents }: Props) {
  const { language } = useAppStore();
  const { t } = useTranslation();

  if (!incidents || incidents.length === 0) {
    return (
      <motion.div
        className="text-center py-32 text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-lg font-medium">{language === "bn" ? "কোনো ঘটনা পাওয়া যায়নি।" : "No incidents found."}</p>
      </motion.div>
    );
  }

  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-dynamic">
            {language === "bn" ? "সকল ঘটনা" : "All Incidents"}
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl">
            {language === "bn"
              ? "আমাদের ডাটাবেসে সংরক্ষিত সব ঘটনার তালিকা নিচে দেওয়া হলো।"
              : "Browse through our complete database of documented incidents."}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {incidents.map((incident, index) => (
            <IncidentCard key={incident._id} incident={incident} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}