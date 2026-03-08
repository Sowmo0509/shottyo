"use client";

import { motion } from "motion/react";
import { urlFor } from "@/sanity/lib/image";
import { Heading } from "@/components/ui/typography";
import { fadeIn, staggerContainer } from "./variants";
import type { Incident } from "./types";

interface IncidentGalleryProps {
  images: NonNullable<Incident["images"]>;
  galleryLabel: string;
}

export function IncidentGallery({ images, galleryLabel }: IncidentGalleryProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="space-y-6"
    >
      <motion.div
        variants={fadeIn}
        className="flex items-center gap-4 border-b border-border/40 pb-4"
      >
        <Heading as="h2" variant="h3" className="font-serif italic">
          {galleryLabel}
        </Heading>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            variants={fadeIn}
            className={`relative overflow-hidden group rounded-sm bg-muted ${
              i === 0 && images.length % 2 !== 0
                ? "sm:col-span-2 aspect-21/9"
                : "aspect-video"
            }`}
          >
            <img
              src={urlFor(img as Parameters<typeof urlFor>[0]).url()}
              alt={`${galleryLabel} ${i + 1}`}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
