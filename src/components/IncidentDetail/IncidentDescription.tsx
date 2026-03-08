"use client";

import { motion } from "motion/react";
import { PortableText } from "@portabletext/react";
import { Text } from "@/components/ui/typography";
import { fadeIn } from "./variants";
import { getFirstGrapheme } from "./utils";
import type { PortableTextBlock } from "@/lib/portableText";

interface IncidentDescriptionProps {
  /** Legacy string or rich block content from Sanity */
  description: string | PortableTextBlock[];
  language: string;
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-xl md:text-2xl leading-relaxed text-foreground/90 font-dynamic last:mb-0">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary/50 pl-6 my-4 italic text-foreground/80">
        {children}
      </blockquote>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold mt-8 mb-2">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>
    ),
  },
};

export function IncidentDescription({
  description,
  language,
}: IncidentDescriptionProps) {
  const isBlocks = Array.isArray(description) && description.length > 0 && typeof description[0] === "object";

  if (isBlocks) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="incident-description-drop-cap prose prose-lg max-w-none text-foreground/90 [&_p]:font-dynamic [&_p]:text-xl [&_p]:md:text-2xl [&_p]:leading-relaxed"
      >
        <PortableText value={description as PortableTextBlock[]} components={portableTextComponents} />
      </motion.div>
    );
  }

  const text = typeof description === "string" ? description : "";
  const { firstChar, rest } = getFirstGrapheme(text, language);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <Text className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-dynamic">
        <span className="float-left text-6xl md:text-7xl font-dynamic leading-none mr-3 mt-1 text-primary">
          {firstChar}
        </span>
        {rest}
      </Text>
    </motion.div>
  );
}
