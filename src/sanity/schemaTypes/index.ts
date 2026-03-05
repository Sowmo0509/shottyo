import { type SchemaTypeDefinition } from "sanity";
import { localeString } from "./localeString";
import { localeText } from "./localeText";
import { incident } from "./incident";
import { victim } from "./victim";
import { timelineEvent } from "./timelineEvent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localeString, localeText, incident, victim, timelineEvent],
};
