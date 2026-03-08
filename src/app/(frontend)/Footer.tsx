"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "motion/react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <motion.footer
      className="border-t border-border bg-muted/30 py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 max-w-5xl">
        <p className="text-center text-xs sm:text-sm text-muted-foreground font-dynamic tracking-wide">
          {t.home.footer.tagline}
        </p>
      </div>
    </motion.footer>
  );
}
