"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

interface HeroBackgroundProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export function HeroBackground({ sectionRef }: HeroBackgroundProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
      <Image
        src="/images/dark_bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-right"
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-red-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.75)_100%)]" />
    </motion.div>
  );
}
