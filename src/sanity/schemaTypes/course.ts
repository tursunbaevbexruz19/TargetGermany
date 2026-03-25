export const courseType = {
  name: 'course',
  title: 'Courses',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Course Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Course Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Course Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
