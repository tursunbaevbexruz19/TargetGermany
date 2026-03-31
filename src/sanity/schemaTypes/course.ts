import { defineField, defineType } from 'sanity'

const LANGUAGE_OPTIONS = [
  { title: 'English', value: 'en' },
  { title: 'Deutsch', value: 'de' },
  { title: 'Uzbek', value: 'uz' },
  { title: 'Russian', value: 'ru' },
  { title: 'Spanish', value: 'es' },
  { title: 'Arabic', value: 'ar' },
  { title: 'Chinese', value: 'zh' },
  { title: 'Korean', value: 'ko' },
  { title: 'Turkish', value: 'tr' },
]

export const courseType = defineType({
  name: 'course',
  title: 'Courses',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title (Base/Fallback)',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(120),
      description: 'Used as fallback when a locale-specific translation is not filled.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL-friendly ID)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image (thumbnail shown on card)',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a small preview image for the course card. Recommended: 600×400px.',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (Base/Fallback)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
      description: 'Base text used when a locale-specific translation is missing.',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description (Base/Fallback)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Base rich text used when a locale-specific translation is missing.',
    }),
    defineField({
      name: 'translations',
      title: 'Multilingual Content',
      type: 'object',
      description:
        'Add localized versions here for each site language. If a language is empty, the website falls back to legacy fields above.',
      options: { collapsible: true, collapsed: false },
      fields: LANGUAGE_OPTIONS.map((language) =>
        defineField({
          name: language.value,
          title: language.title,
          type: 'object',
          options: { collapsible: true, collapsed: language.value !== 'en' },
          fields: [
            defineField({
              name: 'title',
              title: 'Course Title',
              type: 'string',
              validation: (rule) => rule.min(3).max(120),
            }),
            defineField({
              name: 'shortDescription',
              title: 'Short Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.max(200),
            }),
            defineField({
              name: 'fullDescription',
              title: 'Full Description',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({
              name: 'schedule',
              title: 'Schedule Details',
              type: 'string',
              description: 'Example: Mon-Fri 09:00-13:00',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
            }),
            defineField({
              name: 'tags',
              title: 'SEO Tags / Hashtags',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            }),
          ],
        })
      ),
    }),
    defineField({
      name: 'courseType',
      title: 'Course Format',
      type: 'string',
      options: {
        list: [
          { title: 'Intensive', value: 'intensive' },
          { title: 'Evening', value: 'evening' },
          { title: 'Weekend', value: 'weekend' },
          { title: 'Online', value: 'online' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'levels',
      title: 'Levels Covered',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'A1 – Beginner', value: 'A1' },
          { title: 'A2 – Elementary', value: 'A2' },
          { title: 'B1 – Intermediate', value: 'B1' },
          { title: 'B2 – Upper Intermediate', value: 'B2' },
          { title: 'C1 – Advanced', value: 'C1' },
          { title: 'C2 – Mastery', value: 'C2' },
        ],
      },
      description: 'Select one or more CEFR levels this course covers.',
    }),
    defineField({
      name: 'hoursPerWeek',
      title: 'Hours per Week',
      type: 'number',
      validation: (rule) => rule.min(1).max(60),
    }),
    defineField({
      name: 'durationWeeks',
      title: 'Duration (Weeks)',
      type: 'number',
      validation: (rule) => rule.min(1).max(104),
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule Details',
      type: 'string',
      description: 'e.g. "Mon–Fri 09:00–13:00" or "Sat & Sun 10:00–14:00"',
    }),
    defineField({
      name: 'price',
      title: 'Price (optional)',
      type: 'string',
      description: 'e.g. "€450/month" or "Contact us"',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured / Most Popular',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle ON to highlight this course with a "Most Popular" badge.',
    }),
    defineField({
      name: 'iconType',
      title: 'Card Icon',
      type: 'string',
      options: {
        list: [
          { title: '📈 Trending Up (Intensive)', value: 'trending' },
          { title: '⚡ Lightning (Super Intensive)', value: 'zap' },
          { title: '🕐 Clock (Evening)', value: 'clock' },
          { title: '📖 Book (General)', value: 'book' },
          { title: '🌐 Globe (Languages)', value: 'globe' },
          { title: '🏆 Award (Exam Prep)', value: 'award' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'SEO Tags / Hashtags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Add SEO-friendly tags like "german-course", "a1-beginner", "intensive". These are shown as hashtags on the card.',
    }),
    defineField({
      name: 'language',
      title: 'Content Language',
      type: 'string',
      options: {
        list: LANGUAGE_OPTIONS,
      },
      validation: (rule) => rule.required(),
      description: 'Primary/base language for legacy workflow and translation fallback.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first. Use 0, 10, 20 for easy reordering.',
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'courseType',
      media: 'previewImage',
      language: 'language',
    },
    prepare(selection) {
      const { title, subtitle, media, language } = selection
      return {
        title: title,
        subtitle: `${(subtitle || '').toUpperCase()} · ${(language || '').toUpperCase()}`,
        media: media,
      }
    },
  },
})
