"use client";

import { Incident } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { format } from "date-fns";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "motion/react";
import { convertToBengaliDigits } from "@/lib/utils";

interface Props {
  incident: Incident;
  index?: number;
  featured?: boolean;
}

export function IncidentCard({ incident, index = 0, featured = false }: Props) {
  const { t, language } = useTranslation();

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

  const title = language === "bn" && incident.title.bn ? incident.title.bn : incident.title.en;
  const description =
    language === "bn" && incident.description?.bn
      ? incident.description.bn
      : incident.description?.en || t.common.incidents.noDescription;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group flex flex-col h-full ${featured ? "md:flex-row gap-8 md:gap-12" : "gap-5"}`}
    >
      <Link
        href={`/incident/${incident.slug.current}`}
        className={`block relative overflow-hidden rounded-2xl bg-muted shrink-0 ${
          featured ? "w-full md:w-1/2 aspect-video md:aspect-[4/3]" : "w-full aspect-[4/3]"
        }`}
      >
        {incident.images && incident.images.length > 0 ? (
          <img
            src={urlFor(incident.images[0] as any).url()}
            alt={language === "bn" ? "ঘটনার ছবি" : "Incident image"}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              {t.common.incidents.noImage}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className={`flex flex-col flex-1 ${featured ? "justify-center" : ""}`}>
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-1 text-xs font-bold tracking-widest uppercase rounded-full ${
              incident.status === "open"
                ? "bg-red-500/10 text-red-600 dark:text-red-400"
                : incident.status === "closed"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            }`}
          >
            {getStatusLabel(incident.status)}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {language === "bn"
              ? convertToBengaliDigits(format(new Date(incident.dateOfIncident), "MMM d, yyyy"))
              : format(new Date(incident.dateOfIncident), "MMM d, yyyy")}
          </span>
        </div>

        <Link href={`/incident/${incident.slug.current}`} className="block group-hover:opacity-80 transition-opacity">
          <h3
            className={`font-bold text-foreground leading-tight tracking-tight mb-4 font-dynamic ${
              featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl line-clamp-2"
            }`}
          >
            {title}
          </h3>
        </Link>

        <p className={`text-muted-foreground leading-relaxed ${featured ? "text-lg line-clamp-4" : "text-base line-clamp-3"}`}>
          {description}
        </p>
        
        {featured && (
          <div className="mt-8">
            <Link
              href={`/incident/${incident.slug.current}`}
              className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors"
            >
              {language === "bn" ? "বিস্তারিত পড়ুন" : "Read Full Report"}
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}