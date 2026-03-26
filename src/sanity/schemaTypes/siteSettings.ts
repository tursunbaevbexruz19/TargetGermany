import { defineType, defineField } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Target International School',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      description: 'Upload the school logo. Used in navbar and footer.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'The subtitle shown below the logo (e.g. "Improve your self-value")',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'telegram', title: 'Telegram URL', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Key Statistics (shown on homepage)',
      type: 'object',
      description: 'These numbers are displayed prominently on the website.',
      fields: [
        defineField({ name: 'totalStudents', title: 'Total Students', type: 'number' }),
        defineField({ name: 'successRate', title: 'Success Rate (%)', type: 'number' }),
        defineField({ name: 'yearsExperience', title: 'Years of Experience', type: 'number' }),
        defineField({ name: 'countriesReached', title: 'Countries Reached', type: 'number' }),
      ],
    }),
    defineField({
      name: 'enrollmentOpen',
      title: 'Enrollment Currently Open',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle OFF to show "Enrollment Closed" banner site-wide.',
    }),
    defineField({
      name: 'announcementBanner',
      title: 'Top Banner Text (optional)',
      type: 'string',
      description: 'If set, shows a dismissable banner at the top of the site. e.g. "🎉 New semester starts March 1st!"',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings', subtitle: 'Global configuration' }
    },
  },
})
