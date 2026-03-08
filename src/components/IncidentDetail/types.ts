import type { Incident, Victim, TimelineEvent, AccusedPerson } from "@/types";

export type IncidentDetailTranslation = {
  common: {
    incidents: {
      failedToLoad: string;
      gallery: string;
      victims: string;
      accused: string;
      age: string;
      verdict: string;
      timeline: string;
      role: string;
      legalStatus: string;
      status: { open: string; closed: string; inProgress: string };
      accusedRole: Record<string, string>;
      accusedStatus: Record<string, string>;
    };
  };
};

export interface IncidentDetailContext {
  incident: Incident;
  t: IncidentDetailTranslation;
  language: string;
}

export type { Incident, Victim, TimelineEvent, AccusedPerson };
