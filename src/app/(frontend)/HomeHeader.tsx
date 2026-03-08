"use client";

import Link from "next/link";
import type { Incident } from "@/types";

const HEADLINE_IMAGE = "https://images.unsplash.com/photo-1457732815361-daa98277e9c8?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const MS_7_DAYS = 7 * 24 * 60 * 60 * 1000;

function getCountLast7Days(incidents: Incident[] | null): number {
  if (!incidents?.length) return 0;
  const cutoff = Date.now() - MS_7_DAYS;
  return incidents.filter((i) => new Date(i.dateOfIncident).getTime() >= cutoff).length;
}

type Props = {
  incidents?: Incident[] | null;
};

export function HomeHeader({ incidents = null }: Props) {
  const count = getCountLast7Days(incidents);
  const headline = count > 0 ? `${count} ${count === 1 ? "case" : "cases"} reported in last 7 days` : "Track incidents and verdicts across Bangladesh";

  return (
    <div className="w-full">
      <Link href="/#incidents" className="group relative flex rounded-2xl overflow-hidden bg-muted h-[80vh] w-full">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${HEADLINE_IMAGE})` }} />
        {/* Left-to-right dark gradient for text visibility */}
        <div className="absolute inset-0 bg-linear-to-r from-black/90 from-0% via-black/50 via-40% to-transparent to-70%" aria-hidden />
        <div className="relative z-10 flex flex-col justify-end p-8 md:p-12 text-white max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-2">Justice Tracker</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{headline}</h2>
          <p className="mt-4 text-white/90 text-lg">Documenting incidents and court outcomes across all 64 districts.</p>
        </div>
      </Link>
    </div>
  );
}
