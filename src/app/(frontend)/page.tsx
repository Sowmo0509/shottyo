import { IncidentList } from "@/components/IncidentList";
import { incidentApi } from "@/lib/api";
import { EditorialHero } from "./EditorialHero";
import { MissionBento } from "./MissionBento";
import { RecentIncidents } from "./RecentIncidents";
import { LandingCta } from "./LandingCta";
import { Footer } from "./Footer";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let incidents = null;
  try {
    incidents = await incidentApi.getAll();
  } catch (error) {
    console.error("Failed to fetch incidents:", error);
  }

  const allIncidents = incidents || [];
  const featuredIncident = allIncidents[0];
  const recentIncidents = allIncidents.slice(1, 5);
  const remainingIncidents = allIncidents.slice(5);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <EditorialHero featuredIncident={featuredIncident} totalCount={allIncidents.length} />
      
      {recentIncidents.length > 0 && (
        <RecentIncidents incidents={[featuredIncident, ...recentIncidents].filter(Boolean)} />
      )}
      
      <MissionBento incidents={allIncidents} />
      
      <section id="incidents" aria-label="All Incidents" className="bg-muted/30">
        <IncidentList incidents={remainingIncidents.length > 0 ? remainingIncidents : null} />
      </section>
      
      <LandingCta />
      <Footer />
    </div>
  );
}
