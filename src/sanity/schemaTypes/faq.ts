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

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: () => '❓',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Admissions', value: 'admissions' },
          { title: 'Courses & Levels', value: 'courses' },
          { title: 'Visa & Documents', value: 'visa' },
          { title: 'Fees & Payment', value: 'fees' },
          { title: 'Campus & Life', value: 'campus' },
          { title: 'Exams', value: 'exams' },
          { title: 'General', value: 'general' },
        ],
      },
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
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
    { title: 'Sort Order', name: 'sortAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
})
