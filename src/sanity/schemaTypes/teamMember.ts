import { defineType, defineField } from 'sanity'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'role',
      title: 'Position / Title',
      type: 'string',
      description: 'e.g. "Head of German Department", "Student Advisor"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Leadership', value: 'leadership' },
          { title: 'Teaching', value: 'teaching' },
          { title: 'Admissions', value: 'admissions' },
          { title: 'Student Support', value: 'support' },
          { title: 'Administration', value: 'admin' },
        ],
      },
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'email',
      title: 'Email (optional)',
      type: 'string',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first. CEO=0, Directors=10, Staff=20',
    }),
  ],
  orderings: [
    { title: 'Order', name: 'sortAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
