"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { Heading, Text } from "@/components/ui/typography";
import { motion } from "motion/react";

const PILLARS = [
  {
    key: "document" as const,
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Documents and records",
  },
  {
    key: "track" as const,
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Map and tracking",
  },
  {
    key: "accountability" as const,
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Scales of justice",
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export function LandingMission() {
  const { t } = useTranslation();
  const mission = t.home.mission;

  return (
    <section aria-labelledby="mission-heading" className="py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Our approach
          </p>
          <Heading id="mission-heading" variant="h2" className="text-balance text-3xl md:text-4xl lg:text-5xl">
            {mission.heading}
          </Heading>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {PILLARS.map(({ key, image, imageAlt }) => {
            const item = mission[key];
            return (
              <motion.article
                key={key}
                variants={card}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:border-foreground/10 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary font-semibold text-lg mb-5 transition-transform duration-300 group-hover:scale-110">
                    {item.title.charAt(0)}
                  </div>
                  <Heading as="h3" variant="h4" className="mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </Heading>
                  <Text variant="muted" className="leading-relaxed flex-1">
                    {item.body}
                  </Text>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
