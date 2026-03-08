"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

export function InvestigationNoticeSection() {
  const { language } = useTranslation();

  const notice =
    language === "bn"
      ? "এই পৃষ্ঠায় প্রদর্শিত সকল বিষয়বস্তু শট্টিও তদন্ত বিভাগ ও ওয়াচডগ টিমের তদন্তাধীন।"
      : "Everything shown here is under investigation by the Shottyo Investigative Division and Watchdog team.";

  return (
    <section
      aria-label={language === "bn" ? "তদন্ত নোটিশ" : "Investigation notice"}
      className="border-b border-border/50 bg-muted/20"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 text-center md:gap-4"
        >
          <ShieldCheck className="w-5 h-5 text-primary shrink-0" aria-hidden />
          <p className="text-sm md:text-base text-muted-foreground font-medium max-w-3xl">
            {notice}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
