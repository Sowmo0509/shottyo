import axios from "axios";
import { Incident, Victim, TimelineEvent } from "@/types";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export type IncidentDetail = Incident & {
  victims: Victim[];
  timeline: TimelineEvent[];
};

export const incidentApi = {
  getAll: async (): Promise<Incident[]> => {
    const { data } = await apiClient.get("/incidents");
    return data;
  },

  getBySlug: async (slug: string): Promise<IncidentDetail> => {
    const { data } = await apiClient.get(`/incidents/${slug}`);
    return data;
  },
};
