import type { Incident, Victim, TimelineEvent } from "@/types";

export type IncidentDetailTranslation = {
  common: {
    incidents: {
      failedToLoad: string;
      gallery: string;
      victims: string;
      age: string;
      verdict: string;
      timeline: string;
      status: { open: string; closed: string; inProgress: string };
    };
  };
};

export interface IncidentDetailContext {
  incident: Incident;
  t: IncidentDetailTranslation;
  language: string;
}

export type { Incident, Victim, TimelineEvent };
