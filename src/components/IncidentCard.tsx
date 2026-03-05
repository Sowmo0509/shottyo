"use client";

import { Incident } from "@/types";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { format } from "date-fns";
import { urlFor } from "@/sanity/lib/image";
import { Heading, Text } from "./ui/typography";

interface Props {
  incident: Incident;
}

export function IncidentCard({ incident }: Props) {
  const { language } = useAppStore();

  return (
    <Link href={`/incident/${incident.slug.current}`} className="group rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
      {incident.images && incident.images.length > 0 ? (
        <div className="aspect-video w-full bg-muted overflow-hidden shrink-0">
          {/* Note: I'm not using Next/Image here yet until Sanity Image URL is configured fully */}
          <img src={urlFor(incident.images[0] as Parameters<typeof urlFor>[0]).url()} alt="Incident placeholder" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      ) : (
        <div className="aspect-video w-full bg-muted flex items-center justify-center shrink-0">
          <span className="text-muted-foreground">No image available</span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4 shrink-0">
          <Heading as="h3" variant="h4" className="leading-tight line-clamp-2">
            {language === "bn" && incident.title.bn ? incident.title.bn : incident.title.en}
          </Heading>
        </div>

        <div className="flex flex-wrap gap-2 mb-4 shrink-0">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${incident.status === "open" ? "bg-red-100 text-red-800" : incident.status === "closed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{incident.status.toUpperCase()}</span>

          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">{format(new Date(incident.dateOfIncident), "MMM d, yyyy")}</span>
        </div>

        <Text variant="muted" className="line-clamp-3 mt-0 leading-relaxed mb-auto">
          {language === "bn" && incident.description?.bn ? incident.description.bn : incident.description?.en || "No description available"}
        </Text>
      </div>
    </Link>
  );
}
