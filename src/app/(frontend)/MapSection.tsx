"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { Heading } from "@/components/ui/typography";
import { motion } from "motion/react";
import { DivisionMap } from "@/components/DivisionMap";
import { Incident } from "@/types";

interface Props {
  incidents: Incident[];
}

export function MapSection({ incidents }: Props) {
  const { language } = useTranslation();

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background border-t border-border/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-8 sm:mb-12 md:mb-16 text-center max-w-3xl mx-auto px-1">
          <span className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-semibold tracking-widest uppercase rounded-full bg-primary/10 text-primary">{language === "bn" ? "ইন্টারেক্টিভ ম্যাপ" : "Interactive Map"}</span>
          <Heading variant="h2" className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-foreground font-dynamic mb-3 sm:mb-4">
            {language === "bn" ? "ভৌগোলিক বিশ্লেষণ" : "Geographic Analysis"}
          </Heading>
          <p className="text-base sm:text-lg text-muted-foreground">{language === "bn" ? "বিভাগ এবং জেলা অনুযায়ী ঘটনার বিস্তার এবং ঘনত্ব এক্সপ্লোর করুন।" : "Explore the distribution and density of incidents across divisions and districts."}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 -mx-1 sm:mx-0">
          <DivisionMap incidents={incidents} />
        </motion.div>
      </div>
    </section>
  );
}
