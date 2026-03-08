"use client";

import { motion } from "motion/react";
import { Text } from "@/components/ui/typography";
import { fadeIn } from "./variants";
import { getFirstGrapheme } from "./utils";

interface IncidentDescriptionProps {
  description: string;
  language: string;
}

export function IncidentDescription({
  description,
  language,
}: IncidentDescriptionProps) {
  const { firstChar, rest } = getFirstGrapheme(description, language);

  return (
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
        {rest}
      </Text>
    </motion.div>
  );
}
