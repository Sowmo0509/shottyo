"use client";

import { Incident } from "@/types";
import { useAppStore } from "@/store/useAppStore";
import { IncidentCard } from "./IncidentCard";

interface Props {
  incidents: Incident[] | null;
}

export function IncidentList({ incidents }: Props) {
  const { language } = useAppStore();

  if (!incidents || incidents.length === 0) {
    return <div className="text-center py-20">{language === "bn" ? "কোনো ঘটনা পাওয়া যায়নি।" : "No incidents found."}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {incidents.map((incident) => (
        <IncidentCard key={incident._id} incident={incident} />
      ))}
    </div>
  );
}
