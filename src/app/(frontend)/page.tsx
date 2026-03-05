import { IncidentList } from "@/components/IncidentList";
import { incidentApi } from "@/lib/api";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let incidents = null;
  try {
    incidents = await incidentApi.getAll();
  } catch (error) {
    console.error("Failed to fetch incidents:", error);
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <div className="mb-10 text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Justice Tracker</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Public-facing documentation of incidents, victims, timelines, and case status in Bangladesh.</p>
      </div>

      <IncidentList incidents={incidents} />
    </div>
  );
}
