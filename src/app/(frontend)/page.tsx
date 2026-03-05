import { IncidentList } from "@/components/IncidentList";
import { Heading, Text } from "@/components/ui/typography";
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
    <div className="container mx-auto px-4 md:px-8 py-16">
      <div className="mb-10 text-center space-y-4">
        <Heading as="h1" variant="h1">
          Justice Tracker
        </Heading>
        <Text variant="lead" className="max-w-2xl mx-auto">
          Public-facing documentation of incidents, victims, timelines, and case status in Bangladesh.
        </Text>
      </div>

      <IncidentList incidents={incidents} />
    </div>
  );
}
