import { defineType, defineField } from "sanity";
import { divisions } from "../lib/locations";
import { DistrictSelectInput } from "../components/DistrictSelectInput";

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
      type: "localeBlockContent",
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
      name: "division",
      title: "Division",
      type: "string",
      options: {
        list: divisions,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "district",
      title: "District",
      type: "string",
      components: {
        input: DistrictSelectInput,
      },
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: "accused",
      title: "Accused / Suspects / Culprits",
      type: "array",
      description: "Culprits, suspects, or convicted criminals linked to this incident.",
      of: [
        {
          type: "object",
          name: "accusedPerson",
          title: "Accused person",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "localeString",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "role",
              title: "Role / Type",
              type: "string",
              options: {
                list: [
                  { title: "Culprit", value: "culprit" },
                  { title: "Suspect", value: "suspect" },
                  { title: "Convicted / Criminal", value: "convicted" },
                  { title: "Accused", value: "accused" },
                ],
                layout: "radio",
              },
              initialValue: "suspect",
            },
            {
              name: "age",
              title: "Age",
              type: "number",
            },
            {
              name: "description",
              title: "Description",
              type: "localeBlockContent",
            },
            {
              name: "status",
              title: "Legal status",
              type: "string",
              options: {
                list: [
                  { title: "At large", value: "at_large" },
                  { title: "Arrested", value: "arrested" },
                  { title: "Convicted", value: "convicted" },
                  { title: "Acquitted", value: "acquitted" },
                  { title: "Deceased", value: "deceased" },
                  { title: "Other", value: "other" },
                ],
                layout: "dropdown",
              },
            },
            {
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: "name.en" },
            prepare({ title }: { title?: string }) {
              return { title: title || "Accused person" };
            },
          },
        },
      ],
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
