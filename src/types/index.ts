export type LocalizedString = {
  en?: string;
  bn?: string;
};

export type LocalizedText = {
  en?: string;
  bn?: string;
};

export type AccusedRole = "culprit" | "suspect" | "convicted" | "accused";
export type AccusedStatus = "at_large" | "arrested" | "convicted" | "acquitted" | "deceased" | "other";

export interface AccusedPerson {
  _key?: string;
  name: LocalizedString;
  role?: AccusedRole;
  age?: number;
  description?: LocalizedText;
  status?: AccusedStatus;
  image?: unknown;
}

export interface Incident {
  _id: string;
  title: LocalizedString;
  slug: { current: string };
  description?: LocalizedText;
  dateOfIncident: string;
  location?: LocalizedString;
  division: string;
  district: string;
  images?: unknown[];
  videoUrls?: string[];
  status: "open" | "closed" | "pending";
  verdict?: LocalizedText;
  accused?: AccusedPerson[];
  victims?: Victim[];
  timeline?: TimelineEvent[];
}

export interface Victim {
  _id: string;
  name: LocalizedString;
  age?: number;
  incident: { _ref: string };
  status: "deceased" | "injured" | "missing" | "safe" | "arrested" | "other";
  description?: LocalizedText;
  image?: unknown;
}

export interface TimelineEvent {
  _id: string;
  incident: { _ref: string };
  title: LocalizedString;
  description?: LocalizedText;
  date: string;
  eventType: "update" | "action" | "verdict" | "other";
}
