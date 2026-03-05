"use client";

import { Incident } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";
import { format } from "date-fns";
import { urlFor } from "@/sanity/lib/image";
import { Heading, Text } from "./ui/typography";

interface Props {
  incident: Incident | null;
}

export function IncidentDetail({ incident }: Props) {
  const { t, language } = useTranslation();

  if (!incident) {
    return <div className="text-center py-20 text-red-500">{t.common.incidents.failedToLoad}</div>;
  }

  const title = language === "bn" && incident.title.bn ? incident.title.bn : incident.title.en;
  const description = language === "bn" && incident.description?.bn ? incident.description.bn : incident.description?.en;
  const location = language === "bn" && incident.location?.bn ? incident.location.bn : incident.location?.en;
  const verdict = language === "bn" && incident.verdict?.bn ? incident.verdict.bn : incident.verdict?.en;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return t.common.incidents.status.open;
      case "closed":
        return t.common.incidents.status.closed;
      default:
        return t.common.incidents.status.inProgress;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header Section */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold capitalize ${incident.status === "open" ? "bg-red-100 text-red-800" : incident.status === "closed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{getStatusLabel(incident.status)}</span>
          <span className="text-muted-foreground font-medium">{format(new Date(incident.dateOfIncident), "MMMM d, yyyy")}</span>
          {location && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground line-clamp-1">{location}</span>
            </>
          )}
        </div>

        <Heading as="h1" variant="h1" className="tracking-tight tight">
          {title}
        </Heading>

        {description && (
          <Text variant="lead" className="leading-relaxed mt-4">
            {description}
          </Text>
        )}
      </section>

      {/* Media Gallery placeholders */}
      {incident.images && incident.images.length > 0 && (
        <section className="space-y-4">
          <Heading as="h2" variant="h2" className="border-b pb-2">
            {t.common.incidents.gallery}
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {incident.images.map((img, i) => (
              <div key={i} className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                <img src={urlFor(img as Parameters<typeof urlFor>[0]).url()} alt={`${t.common.incidents.gallery} ${i + 1}`} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Victims Section */}
      {incident.victims && incident.victims.length > 0 && (
        <section className="space-y-6">
          <Heading as="h2" variant="h2" className="border-b pb-2">
            {t.common.incidents.victims}
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {incident.victims.map((victim) => {
              const victimName = language === "bn" && victim.name.bn ? victim.name.bn : victim.name.en;
              const victimDesc = language === "bn" && victim.description?.bn ? victim.description.bn : victim.description?.en;

              return (
                <div key={victim._id} className="p-4 border rounded-lg bg-card shadow-sm flex gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full overflow-hidden shrink-0 flex items-center justify-center text-xl font-bold text-muted-foreground uppercase">{victimName?.charAt(0)}</div>
                  <div>
                    <Heading as="h3" variant="large">
                      {victimName}
                    </Heading>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span className="capitalize">{victim.status}</span>
                      {victim.age && (
                        <>
                          <span>•</span>
                          <span>
                            {t.common.incidents.age}: {victim.age}
                          </span>
                        </>
                      )}
                    </div>
                    {victimDesc && (
                      <Text variant="muted" className="mt-2">
                        {victimDesc}
                      </Text>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {incident.timeline && incident.timeline.length > 0 && (
        <section className="space-y-6">
          <Heading as="h2" variant="h2" className="border-b pb-2">
            {t.common.incidents.timeline}
          </Heading>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
            {incident.timeline.map((event, index) => {
              const eventTitle = language === "bn" && event.title.bn ? event.title.bn : event.title.en;
              const eventDesc = language === "bn" && event.description?.bn ? event.description.bn : event.description?.en;

              return (
                <div key={event._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-secondary text-secondary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border shadow-sm p-4 rounded text-card-foreground">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <Heading as="h4" variant="small" className="text-slate-900 dark:text-slate-100">
                        {eventTitle}
                      </Heading>
                      <time className="font-caveat font-medium text-sm text-muted-foreground">{format(new Date(event.date), "MMM d, yyyy")}</time>
                    </div>
                    {eventDesc && <Text variant="muted">{eventDesc}</Text>}
                    <div className="mt-2 text-xs font-semibold capitalize px-2 py-1 bg-muted rounded-md inline-block">{event.eventType}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Verdict Section */}
      {verdict && (
        <section className="space-y-4">
          <Heading as="h2" variant="h2" className="border-b pb-2">
            {t.common.incidents.verdict}
          </Heading>
          <div className="p-6 bg-secondary text-secondary-foreground rounded-lg">
            <Text variant="large" className="leading-relaxed font-normal">
              {verdict}
            </Text>
          </div>
        </section>
      )}
    </div>
  );
}
