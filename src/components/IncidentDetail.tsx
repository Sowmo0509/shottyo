"use client";

import { Incident } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";
import { format } from "date-fns";
import { urlFor } from "@/sanity/lib/image";
import { Heading, Text } from "./ui/typography";
import { motion, Variants } from "motion/react";
import { Calendar, MapPin, Activity, User } from "lucide-react";

interface Props {
  incident: Incident | null;
}

export function IncidentDetail({ incident }: Props) {
  const { t, language } = useTranslation();

  if (!incident) {
    return <div className="text-center py-20 text-red-500">{t.common.incidents.failedToLoad}</div>;
  }

  const title = language === "bn" && incident.title.bn ? incident.title.bn : incident.title.en;
  const description = language === "bn" && incident.description?.bn ? incident.description.bn : incident.description?.en;
  const location = language === "bn" && incident.location?.bn ? incident.location.bn : incident.location?.en;
  const verdict = language === "bn" && incident.verdict?.bn ? incident.verdict.bn : incident.verdict?.en;

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

  const hasTimeline = incident.timeline && incident.timeline.length > 0;

  let firstChar = "";
  let restDesc = "";
  
  if (description) {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter(language, { granularity: "grapheme" });
      const segments = Array.from(segmenter.segment(description));
      if (segments.length > 0) {
        firstChar = segments[0].segment;
        restDesc = description.slice(firstChar.length);
      }
    } else {
      firstChar = description.charAt(0);
      restDesc = description.slice(1);
    }
  }

  // Animation variants
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Article Header (News Site Style) */}
      <motion.header 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer}
        className="pt-12 pb-8 border-b border-border/40 mb-12"
      >
        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Activity className="w-4 h-4" />
            {getStatusLabel(incident.status)}
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

        <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left Column: Main Content */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Main Description */}
          {description && (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Text className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-serif">
                <span className="float-left text-6xl md:text-7xl font-serif leading-none mr-3 mt-1 text-primary">
                  {firstChar}
                </span>
                {restDesc}
              </Text>
            </motion.div>
          )}

          {/* Media Gallery */}
          {incident.images && incident.images.length > 0 && (
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4 border-b border-border/40 pb-4">
                <Heading as="h2" variant="h3" className="font-serif italic">
                  {t.common.incidents.gallery}
                </Heading>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {incident.images.map((img, i) => (
                  <motion.div 
                    key={i} 
                    variants={fadeIn}
                    className={`relative overflow-hidden group rounded-sm bg-muted ${i === 0 && incident.images!.length % 2 !== 0 ? 'sm:col-span-2 aspect-21/9' : 'aspect-video'}`}
                  >
                    <img 
                      src={urlFor(img as Parameters<typeof urlFor>[0]).url()} 
                      alt={`${t.common.incidents.gallery} ${i + 1}`} 
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Victims List (Clean, News Style) */}
          {incident.victims && incident.victims.length > 0 && (
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4 border-b border-border/40 pb-4">
                <Heading as="h2" variant="h3" className="font-serif italic">
                  {t.common.incidents.victims}
                </Heading>
              </motion.div>
              <div className="divide-y divide-border/30">
                {incident.victims.map((victim) => {
                  const victimName = language === "bn" && victim.name.bn ? victim.name.bn : victim.name.en;
                  const victimDesc = language === "bn" && victim.description?.bn ? victim.description.bn : victim.description?.en;

                  return (
                    <motion.div key={victim._id} variants={fadeIn} className="py-6 first:pt-2 flex flex-col sm:flex-row gap-6">
                      <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center text-secondary-foreground shrink-0 border border-border/50">
                        <User className="w-6 h-6 opacity-50" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                          <Heading as="h3" variant="h4" className="font-medium">
                            {victimName}
                          </Heading>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono uppercase tracking-wider">
                            <span className="px-2 py-0.5 bg-muted rounded-full text-xs">{victim.status}</span>
                            {victim.age && <span>{t.common.incidents.age}: {victim.age}</span>}
                          </div>
                        </div>
                        {victimDesc && (
                          <Text variant="muted" className="leading-relaxed">
                            {victimDesc}
                          </Text>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* Verdict (Blockquote Style) */}
          {verdict && (
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative my-16"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full" />
              <div className="pl-8 py-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-4">
                  {t.common.incidents.verdict}
                </span>
                <p className="text-2xl font-serif italic text-foreground/80 leading-relaxed">
                  &quot;{verdict}&quot;
                </p>
              </div>
            </motion.section>
          )}

          {/* Detailed Timeline */}
          {hasTimeline && (
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-10 pt-8"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4 border-b border-border/40 pb-4 mb-8">
                <Heading as="h2" variant="h3" className="font-serif italic">
                  {t.common.incidents.timeline} {language === "bn" ? "বিস্তারিত" : "Details"}
                </Heading>
              </motion.div>

              <div className="relative">
                {/* Continuous Timeline Line */}
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  className="absolute left-4 md:left-[50%] top-2 bottom-2 w-px bg-border/60 -translate-x-1/2" 
                />

                <div className="space-y-16">
                  {incident.timeline?.map((event, index) => {
                    const eventTitle = language === "bn" && event.title.bn ? event.title.bn : event.title.en;
                    const eventDesc = language === "bn" && event.description?.bn ? event.description.bn : event.description?.en;
                    const isEven = index % 2 === 0;

                    return (
                      <motion.div 
                        key={event._id} 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8`}
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-4 md:left-[50%] top-1 w-3 h-3 bg-background border-2 border-primary rounded-full -translate-x-1/2 z-10" />
                        
                        {/* Spacer for alternating layout */}
                        <div className="hidden md:block md:w-1/2" />

                        {/* Content */}
                        <div className="w-full md:w-1/2 pl-12 md:pl-0">
                          <div className={`flex flex-col ${isEven ? 'md:pr-12 md:items-end md:text-right' : 'md:pl-12 md:items-start'}`}>
                            <time className="text-sm font-mono text-muted-foreground mb-2">
                              {format(new Date(event.date), "MMMM d, yyyy")}
                            </time>
                            <Heading as="h4" variant="h4" className="font-medium mb-3">
                              {eventTitle}
                            </Heading>
                            {eventDesc && (
                              <Text variant="muted" className={`leading-relaxed ${isEven ? 'md:text-right' : ''}`}>
                                {eventDesc}
                              </Text>
                            )}
                            <span className="mt-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium uppercase tracking-wider inline-block">
                              {event.eventType}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.section>
          )}
        </div>

        {/* Right Column: Sticky Timeline Summary */}
        <div className="lg:col-span-4 relative">
          {hasTimeline && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="sticky top-28"
            >
              <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                <Heading as="h3" variant="h4" className="font-serif italic mb-8 flex items-center gap-2">
                  {t.common.incidents.timeline} {language === "bn" ? "সারসংক্ষেপ" : "Summary"}
                </Heading>

                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-linear-to-b before:from-border/80 before:to-transparent">
                  <div className="absolute left-2.5 top-0 bottom-0 w-px bg-border/50" />
                  
                  {incident.timeline?.map((event, index) => {
                    const eventTitle = language === "bn" && event.title.bn ? event.title.bn : event.title.en;
                    
                    return (
                      <motion.div 
                        key={`summary-${event._id}`}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8 group"
                      >
                        <motion.span 
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                          className="absolute left-[7px] top-1.5 w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-background transition-transform group-hover:scale-150" 
                        />
                        <div className="flex flex-col">
                          <time className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                            {format(new Date(event.date), "MMM d, yyyy")}
                          </time>
                          <span className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                            {eventTitle}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
