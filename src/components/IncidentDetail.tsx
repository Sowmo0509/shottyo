"use client";

import { useQuery } from "@tanstack/react-query";
import { incidentApi } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { format } from "date-fns";

interface Props {
  slug: string;
}

export function IncidentDetail({ slug }: Props) {
  const { language } = useAppStore();

  const {
    data: incident,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["incident", slug],
    queryFn: () => incidentApi.getBySlug(slug),
  });

  if (isLoading) return <div className="text-center py-20 text-muted-foreground">Loading...</div>;

  if (error || !incident) {
    return <div className="text-center py-20 text-red-500">Failed to load incident details.</div>;
  }

  const title = language === "bn" && incident.title.bn ? incident.title.bn : incident.title.en;
  const description = language === "bn" && incident.description?.bn ? incident.description.bn : incident.description?.en;
  const location = language === "bn" && incident.location?.bn ? incident.location.bn : incident.location?.en;
  const verdict = language === "bn" && incident.verdict?.bn ? incident.verdict.bn : incident.verdict?.en;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header Section */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold capitalize ${incident.status === "open" ? "bg-red-100 text-red-800" : incident.status === "closed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{incident.status}</span>
          <span className="text-muted-foreground font-medium">{format(new Date(incident.dateOfIncident), "MMMM d, yyyy")}</span>
          {location && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground line-clamp-1">{location}</span>
            </>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight tight">{title}</h1>

        {description && <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{description}</p>}
      </section>

      {/* Media Gallery placeholders */}
      {incident.images && incident.images.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">{language === "bn" ? "গ্যালারি" : "Gallery"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {incident.images.map((img, i) => (
              <div key={i} className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                <img src={"/placeholder-image.jpg"} alt="Gallery image" className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Victims Section */}
      {incident.victims && incident.victims.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2">{language === "bn" ? "ক্ষতিগ্রস্তরা" : "Victims"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {incident.victims.map((victim) => {
              const victimName = language === "bn" && victim.name.bn ? victim.name.bn : victim.name.en;
              const victimDesc = language === "bn" && victim.description?.bn ? victim.description.bn : victim.description?.en;

              return (
                <div key={victim._id} className="p-4 border rounded-lg bg-card shadow-sm flex gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full overflow-hidden shrink-0 flex items-center justify-center text-xl font-bold text-muted-foreground uppercase">{victimName?.charAt(0)}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{victimName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="capitalize">{victim.status}</span>
                      {victim.age && (
                        <>
                          <span>•</span>
                          <span>{language === "bn" ? `বয়স: ${victim.age}` : `Age: ${victim.age}`}</span>
                        </>
                      )}
                    </div>
                    {victimDesc && <p className="text-sm mt-2 text-muted-foreground">{victimDesc}</p>}
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
          <h2 className="text-2xl font-bold border-b pb-2">{language === "bn" ? "ঘটনাক্রম" : "Timeline"}</h2>
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
                      <div className="font-bold text-slate-900 dark:text-slate-100">{eventTitle}</div>
                      <time className="font-caveat font-medium text-sm text-muted-foreground">{format(new Date(event.date), "MMM d, yyyy")}</time>
                    </div>
                    {eventDesc && <div className="text-sm text-muted-foreground">{eventDesc}</div>}
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
          <h2 className="text-2xl font-bold border-b pb-2">{language === "bn" ? "রায় / সমাপ্তি" : "Verdict"}</h2>
          <div className="p-6 bg-secondary text-secondary-foreground rounded-lg">
            <p className="text-lg leading-relaxed">{verdict}</p>
          </div>
        </section>
      )}
    </div>
  );
}
