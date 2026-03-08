"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { Heading, Text } from "@/components/ui/typography";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const CTA_IMAGE =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=85&w=1920&auto=format&fit=crop";

export function LandingCta() {
  const { t } = useTranslation();
  const cta = t.home.cta;

  return (
    <section aria-labelledby="cta-heading" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={CTA_IMAGE}
          alt=""
          className="w-full h-full object-cover scale-105"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/80 to-background/95 mix-blend-multiply"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Heading
            id="cta-heading"
            variant="h2"
            className="mb-4 sm:mb-5 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-dynamic"
          >
            {cta.heading}
          </Heading>
          <Text
            variant="lead"
            className="text-white/80 text-lg md:text-xl text-balance mb-10 max-w-2xl mx-auto"
          >
            {cta.body}
          </Text>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-xl h-14 px-10 text-base">
              <Link href="/#incidents">
                {t.home.incidentsSection.viewAll}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
