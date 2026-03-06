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
    <div className="container mx-auto px-4 md:px-8 py-16">
      <HomeHeader />

      <DivisionMap incidents={incidents} />

      <IncidentList incidents={incidents} />
    </div>
  );
}
