import { IncidentList } from "@/components/IncidentList";
import { incidentApi } from "@/lib/api";
import { HomeHeader } from "./HomeHeader";
import { DivisionMap } from "@/components/DivisionMap";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let incidents = null;
  try {
    incidents = await incidentApi.getAll();
  } catch (error) {
    console.error("Failed to fetch incidents:", error);
  }

  return (
    <div className="space-y-4 p-4">
      <HomeHeader incidents={incidents} />
      {/* <DivisionMap incidents={incidents} /> */}
      <section id="incidents" aria-label="Incidents" className="bg-neutral-300 rounded-2xl">
        <IncidentList incidents={incidents} />
      </section>
    </div>
  );
}
