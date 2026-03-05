import { defineType, defineField } from "sanity";

export const incident = defineType({
  name: "incident",
  title: "Incident",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "dateOfIncident",
      title: "Date of Incident",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localeString",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "videoUrls",
      title: "Video URLs",
      type: "array",
      of: [{ type: "url" }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Closed", value: "closed" },
          { title: "Pending", value: "pending" },
        ],
        layout: "radio",
      },
      initialValue: "open",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "verdict",
      title: "Verdict",
      type: "localeText",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "dateOfIncident",
      media: "images.0",
    },
  },
});
