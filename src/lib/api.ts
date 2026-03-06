import { client } from "@/sanity/lib/client";
import { Incident, Victim, TimelineEvent } from "@/types";

export type IncidentDetail = Incident & {
  victims: Victim[];
  timeline: TimelineEvent[];
};

export const incidentApi = {
  getAll: async (): Promise<Incident[]> => {
    const query = `*[_type == "incident"] | order(dateOfIncident desc) {
      _id,
      title,
      slug,
      description,
      dateOfIncident,
      location,
      division,
      district,
      images,
      videoUrls,
      status,
      verdict
    }`;
    const incidents = await client.fetch<Incident[]>(query);
    return incidents;
  },

  getBySlug: async (slug: string): Promise<IncidentDetail | null> => {
    const query = `{
      "incident": *[_type == "incident" && slug.current == $slug][0] {
        ...,
        "victims": *[_type == "victim" && incident._ref == ^._id],
        "timeline": *[_type == "timelineEvent" && incident._ref == ^._id] | order(date desc)
      }
    }`;
    const result = await client.fetch(query, { slug });
    return result.incident || null;
  },
};
