export const heroType = {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'The small text above the main headline (e.g. TARGET GERMANY SCHOOL)',
    },
    {
      name: 'title',
      title: 'Main Headline',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'ctaText',
      title: 'Primary CTA Button Text',
      type: 'string',
    },
    {
      name: 'videoUrl',
      title: 'Background Video URL',
      type: 'url',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Russian', value: 'ru' },
          { title: 'German', value: 'de' },
          { title: 'Uzbek (Latin)', value: 'uz-latn' },
          { title: 'Uzbek (Cyrillic)', value: 'uz-cyrl' },
        ],
      },
    },
  ],
}
