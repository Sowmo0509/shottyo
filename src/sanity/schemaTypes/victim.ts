import { defineType, defineField } from "sanity";

export const victim = defineType({
  name: "victim",
  title: "Victim",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "age",
      title: "Age",
      type: "number",
    }),
    defineField({
      name: "incident",
      title: "Incident",
      type: "reference",
      to: [{ type: "incident" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Deceased", value: "deceased" },
          { title: "Injured", value: "injured" },
          { title: "Missing", value: "missing" },
          { title: "Safe", value: "safe" },
          { title: "Arrested", value: "arrested" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "status",
      media: "image",
    },
  },
});
