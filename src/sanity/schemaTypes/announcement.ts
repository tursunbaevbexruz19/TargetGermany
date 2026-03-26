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

export const announcementType = defineType({
  name: 'announcement',
  title: 'Announcements & News',
  type: 'document',
  icon: () => '📢',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      rows: 2,
      description: 'A 1-2 sentence preview shown in listing cards.',
    }),
    defineField({
      name: 'body',
      title: 'Full Article',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '📰 News', value: 'news' },
          { title: '📅 Event', value: 'event' },
          { title: '🎓 Achievement', value: 'achievement' },
          { title: '📋 Update', value: 'update' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'isPinned',
      title: 'Pin to Top',
      type: 'boolean',
      initialValue: false,
      description: 'Pinned announcements always appear first.',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: { list: LANGUAGES },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    { title: 'Published Date', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
})
