import { defineType, defineField } from 'sanity'

const LANGUAGES = [
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

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'name',
      title: 'Student Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Student Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'A portrait photo. Recommended: 200×200px square.',
    }),
    defineField({
      name: 'role',
      title: 'Role / Program',
      type: 'string',
      description: 'e.g. "B2 Graduate, 2024" or "Studienkolleg Student"',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(20).max(500),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5 stars)',
      type: 'number',
      validation: (rule) => rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: { list: LANGUAGES },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
