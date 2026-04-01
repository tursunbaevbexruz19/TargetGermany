import { defineField, defineType } from "sanity";

export const programCategoryType = defineType({
  name: "programCategory",
  title: "Program Categories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
      description:
        "First-level submenu label under Programs/Angebote, for example: German Courses.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first in the Programs submenu.",
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      sortOrder: "sortOrder",
    },
    prepare({ title, sortOrder }) {
      return {
        title,
        subtitle: `Order: ${sortOrder ?? 0}`,
      };
    },
  },
});
