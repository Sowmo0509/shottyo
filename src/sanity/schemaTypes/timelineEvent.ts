import { defineType, defineField } from "sanity";

export const timelineEvent = defineType({
  name: "timelineEvent",
  title: "Timeline Event",
  type: "document",
  fields: [
    defineField({
      name: "incident",
      title: "Incident",
      type: "reference",
      to: [{ type: "incident" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Update", value: "update" },
          { title: "Action Taken", value: "action" },
          { title: "Verdict", value: "verdict" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Date, Newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "date",
    },
  },
});
