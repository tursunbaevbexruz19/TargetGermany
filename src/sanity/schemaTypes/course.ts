import { defineField, defineType } from "sanity";

const LANGUAGE_OPTIONS = [
  { title: "English", value: "en" },
  { title: "Deutsch", value: "de" },
  { title: "Uzbek", value: "uz" },
  { title: "Russian", value: "ru" },
  { title: "Spanish", value: "es" },
  { title: "Arabic", value: "ar" },
  { title: "Chinese", value: "zh" },
  { title: "Korean", value: "ko" },
  { title: "Turkish", value: "tr" },
];

export const courseType = defineType({
  name: "course",
  title: "Courses",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "seo", title: "SEO" },
    { name: "delivery", title: "Delivery" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Course Title (Base/Fallback)",
      type: "string",
      validation: (rule) => rule.required().min(3).max(120),
      description: "Used as fallback when a locale-specific translation is not filled.",
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL-friendly ID)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      group: "navigation",
    }),
    defineField({
      name: "language",
      title: "Content Language",
      type: "string",
      options: {
        list: LANGUAGE_OPTIONS,
      },
      validation: (rule) => rule.required(),
      description:
        "Step 1: pick the primary/base language. This language is hidden in Multilingual Content to avoid duplicates.",
      group: "content",
    }),
    defineField({
      name: "previewImage",
      title: "Preview Image (thumbnail shown on card)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Image Alt Text (SEO)",
          type: "string",
          validation: (rule) => [
            rule.required().error("Please add alt text for better SEO and accessibility."),
            rule.max(120).warning("Keep alt text concise (usually <= 120 characters)."),
          ],
          description:
            'Important for SEO and accessibility. Example: "Deutsch A1.1 Intensivkurs".',
        }),
      ],
      description:
        "Upload a small preview image for the course card. Recommended: 600x400px. Then fill the Image Alt Text below it.",
      group: "content",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description (Base/Fallback)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
      description: "Base text used when a locale-specific translation is missing.",
      group: "content",
    }),
    defineField({
      name: "seoMetaDescription",
      title: "SEO Meta Description (Base/Fallback)",
      type: "text",
      rows: 3,
      validation: (rule) => [
        rule.max(160).warning("Best practice: keep meta description at or below 160 characters."),
        rule.min(50).warning("Recommended: at least 50 characters for clearer search snippets."),
      ],
      description:
        "Short summary for search engines. Used as fallback if locale-specific SEO meta description is empty.",
      group: "seo",
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description (Base/Fallback)",
      type: "array",
      of: [{ type: "block" }],
      description: "Base rich text used when a locale-specific translation is missing.",
      group: "content",
    }),
    defineField({
      name: "translations",
      title: "Multilingual Content",
      type: "object",
      description:
        "Add localized versions for each site language. The selected Content Language is hidden here (base content already covers it). If a locale is empty, website falls back to base fields.",
      options: { collapsible: true, collapsed: false },
      group: "content",
      fields: LANGUAGE_OPTIONS.map((language) =>
        defineField({
          name: language.value,
          title: language.title,
          type: "object",
          options: { collapsible: true, collapsed: language.value !== "en" },
          hidden: ({ document }) => document?.language === language.value,
          fields: [
            defineField({
              name: "title",
              title: "Course Title",
              type: "string",
              validation: (rule) => rule.min(3).max(120),
            }),
            defineField({
              name: "menuLabel",
              title: "Navbar Menu Label",
              type: "string",
              validation: (rule) => rule.max(120),
              description:
                "Optional short label for Programs submenu. Falls back to Course Title.",
            }),
            defineField({
              name: "shortDescription",
              title: "Short Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.max(200),
            }),
            defineField({
              name: "imageAlt",
              title: "Image Alt Text",
              type: "string",
              validation: (rule) => rule.max(120),
              description:
                "Optional locale-specific image alt text. If empty, base image alt text is used.",
            }),
            defineField({
              name: "seoMetaDescription",
              title: "SEO Meta Description",
              type: "text",
              rows: 3,
              validation: (rule) => [
                rule.max(160).warning("Best practice: keep meta description at or below 160 characters."),
                rule.min(50).warning("Recommended: at least 50 characters for clearer search snippets."),
              ],
              description:
                "Locale-specific search snippet text. If empty, base SEO Meta Description is used.",
            }),
            defineField({
              name: "fullDescription",
              title: "Full Description",
              type: "array",
              of: [{ type: "block" }],
            }),
            defineField({
              name: "schedule",
              title: "Schedule Details",
              type: "string",
              description: "Example: Mon-Fri 09:00-13:00",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
            }),
            defineField({
              name: "tags",
              title: "SEO Tags / Hashtags",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
          ],
        })
      ),
    }),
    defineField({
      name: "courseType",
      title: "Course Format",
      type: "string",
      options: {
        list: [
          { title: "Intensive", value: "intensive" },
          { title: "Evening", value: "evening" },
          { title: "Weekend", value: "weekend" },
          { title: "Online", value: "online" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
      group: "navigation",
    }),
    defineField({
      name: "programCategory",
      title: "Program Category (Navbar Submenu)",
      type: "reference",
      to: [{ type: "programCategory" }],
      validation: (rule) =>
        rule.required().error("Please choose a Program Category for this course."),
      description:
        "Step 2: choose the first-level submenu for this course (created in Program Categories).",
      group: "navigation",
    }),
    defineField({
      name: "menuLabel",
      title: "Navbar Menu Label (Base/Fallback)",
      type: "string",
      validation: (rule) => rule.max(120),
      description:
        "Step 3 (optional): short label shown in submenu. If empty, Course Title is used.",
      group: "navigation",
    }),
    defineField({
      name: "menuOrder",
      title: "Navbar Menu Order",
      type: "number",
      initialValue: 0,
      description:
        "Step 4: controls order inside selected Program Category. Lower numbers appear first.",
      group: "navigation",
    }),
    defineField({
      name: "levels",
      title: "Levels Covered",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "A1 - Beginner", value: "A1" },
          { title: "A2 - Elementary", value: "A2" },
          { title: "B1 - Intermediate", value: "B1" },
          { title: "B2 - Upper Intermediate", value: "B2" },
          { title: "C1 - Advanced", value: "C1" },
          { title: "C2 - Mastery", value: "C2" },
        ],
      },
      description: "Select one or more CEFR levels this course covers.",
      group: "content",
    }),
    defineField({
      name: "hoursPerWeek",
      title: "Hours per Week",
      type: "number",
      validation: (rule) => rule.min(1).max(60),
      group: "delivery",
    }),
    defineField({
      name: "durationWeeks",
      title: "Duration (Weeks)",
      type: "number",
      validation: (rule) => rule.min(1).max(104),
      group: "delivery",
    }),
    defineField({
      name: "schedule",
      title: "Schedule Details",
      type: "string",
      description: 'Example: "Mon-Fri 09:00-13:00" or "Sat & Sun 10:00-14:00"',
      group: "delivery",
    }),
    defineField({
      name: "price",
      title: "Price (optional)",
      type: "string",
      description: 'Example: "EUR 450/month" or "Contact us"',
      group: "delivery",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured / Most Popular",
      type: "boolean",
      initialValue: false,
      description: 'Toggle ON to highlight this course with a "Most Popular" badge.',
      group: "content",
    }),
    defineField({
      name: "iconType",
      title: "Card Icon",
      type: "string",
      options: {
        list: [
          { title: "Trending Up (Intensive)", value: "trending" },
          { title: "Lightning (Super Intensive)", value: "zap" },
          { title: "Clock (Evening)", value: "clock" },
          { title: "Book (General)", value: "book" },
          { title: "Globe (Languages)", value: "globe" },
          { title: "Award (Exam Prep)", value: "award" },
        ],
      },
      group: "content",
    }),
    defineField({
      name: "tags",
      title: "SEO Tags / Hashtags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description:
        'Add SEO-friendly tags like "german-course", "a1-beginner", "intensive".',
      group: "seo",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first. Use 0, 10, 20 for easy reordering.",
      group: "navigation",
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
      subtitle: "courseType",
      media: "previewImage",
      language: "language",
      category: "programCategory.title",
    },
    prepare(selection) {
      const { title, subtitle, media, language, category } = selection;
      return {
        title,
        subtitle: `${(subtitle || "").toUpperCase()} - ${(language || "").toUpperCase()} - ${category || "NO CATEGORY"}`,
        media,
      };
    },
  },
});
