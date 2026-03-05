import { IncidentDetail } from "@/components/IncidentDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function IncidentPage({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <IncidentDetail slug={resolvedParams.slug} />
    </div>
  );
}
