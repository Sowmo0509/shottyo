import { IncidentList } from "@/components/IncidentList";
import { incidentApi } from "@/lib/api";
import { EditorialHero } from "./EditorialHero";
import { MissionBento } from "./MissionBento";
import { RecentIncidents } from "./RecentIncidents";
import { ProcessSection } from "./ProcessSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { FaqSection } from "./FaqSection";
import { LandingCta } from "./LandingCta";
import { Footer } from "./Footer";
import { MapSection } from "./MapSection";
import { InvestigationNoticeSection } from "./InvestigationNoticeSection";
import { generateDummyIncidents } from "@/lib/dummyData";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let incidents = null;
  try {
    incidents = await incidentApi.getAll();
  } catch (error) {
    console.error("Failed to fetch incidents:", error);
  }

  // Fallback to rich dummy data if empty for demonstration
  let allIncidents = incidents || [];
  if (allIncidents.length === 0) {
    allIncidents = generateDummyIncidents(12);
  }

  const featuredIncident = allIncidents[0];
  const recentIncidents = allIncidents.slice(1, 5);
  // When we have ≤5 incidents, remainingIncidents would be empty; show full list so the section is never empty when we have data
  const listIncidents = allIncidents.length > 5 ? allIncidents.slice(5) : allIncidents;

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <div className="p-2">
        <EditorialHero featuredIncident={featuredIncident} totalCount={allIncidents.length} />
      </div>
      <InvestigationNoticeSection />
      {recentIncidents.length > 0 && <RecentIncidents incidents={[featuredIncident, ...recentIncidents].filter(Boolean)} />}

      <MapSection incidents={allIncidents} />

      <MissionBento incidents={allIncidents} />

      <ProcessSection />

      <TestimonialsSection />

      <section id="incidents" aria-label="All Incidents" className="bg-muted/10 border-y border-border/50 overflow-x-hidden">
        <IncidentList incidents={listIncidents.length > 0 ? listIncidents : null} />
      </section>

      <FaqSection />

      <LandingCta />
      <Footer />
    </div>
  );
}
