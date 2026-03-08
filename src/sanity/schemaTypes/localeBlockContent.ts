import { defineType, defineField } from "sanity";

/**
 * Localized rich text (portable text) for Description fields.
 * Use in Studio for bold, lists, links, etc.
 */
export const localeBlockContent = defineType({
  title: "Localized Rich Text",
  name: "localeBlockContent",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  fields: [
    defineField({
      title: "English",
      name: "en",
      type: "array",
      of: [{ type: "block" }],
      fieldset: undefined,
    }),
    defineField({
      title: "Bangla",
      name: "bn",
      type: "array",
      of: [{ type: "block" }],
      fieldset: "translations",
    }),
  ],
});
