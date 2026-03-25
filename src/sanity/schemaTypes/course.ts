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
      name: 'levels',
      title: 'Levels (e.g. A1, A2, B1, B2)',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Duration & Times (e.g. 8 Weeks, Mon-Fri 09:00)',
      type: 'string',
    },
    {
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Calculator (Math)', value: 'math' },
          { title: 'Flask (Science)', value: 'science' },
          { title: 'Globe (Humanities/Languages)', value: 'globe' },
          { title: 'Book (Test Prep)', value: 'book' },
        ],
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
