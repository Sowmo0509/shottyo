"use client";

import { format } from "date-fns";
import { motion } from "motion/react";
import { Calendar, MapPin, Activity } from "lucide-react";
import { fadeIn, staggerContainer } from "./variants";
import { getStatusLabel, getLocalized } from "./utils";
import type { IncidentDetailContext } from "./types";

interface IncidentArticleHeaderProps {
  incident: IncidentDetailContext["incident"];
  t: IncidentDetailContext["t"];
  language: IncidentDetailContext["language"];
}

export function IncidentArticleHeader({
  incident,
  t,
  language,
}: IncidentArticleHeaderProps) {
  const title = getLocalized(incident.title, language);
  const location = getLocalized(incident.location, language);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="pt-12 pb-8 border-b border-border/40 mb-12"
    >
      <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          <Activity className="w-4 h-4" />
          {getStatusLabel(t, incident.status)}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {incident.division} {incident.district && `• ${incident.district}`}
        </span>
      </motion.div>

      <motion.h1
        variants={fadeIn}
        className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-foreground leading-[1.1] mb-8"
      >
        {title}
      </motion.h1>

      <motion.div
        variants={fadeIn}
        className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <time>{format(new Date(incident.dateOfIncident), "MMMM d, yyyy")}</time>
        </div>
        {location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}
      </motion.div>
    </motion.header>
  );
}
