import { defineType, defineField } from "sanity";

const supportedLanguages = [
  { id: "en", title: "English", isDefault: true },
  { id: "bn", title: "Bangla" },
];

export const localeText = defineType({
  title: "Localized Text",
  name: "localeText",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: "text",
      fieldset: lang.isDefault ? undefined : "translations",
    }),
  ),
});
