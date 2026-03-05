import { IncidentDetail } from "@/components/IncidentDetail";
import { incidentApi } from "@/lib/api";
import { notFound } from "next/navigation";

export const revalidate = 60; // Revalidate every 60 seconds

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function IncidentPage({ params }: PageProps) {
  const resolvedParams = await params;
  let incident = null;

  try {
    incident = await incidentApi.getBySlug(resolvedParams.slug);
  } catch (error) {
    console.error(`Failed to fetch incident ${resolvedParams.slug}:`, error);
  }

  if (!incident) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <IncidentDetail incident={incident} />
    </div>
  );
}
