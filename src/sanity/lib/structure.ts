import type { StructureBuilder } from 'sanity/structure'

/**
 * Custom Studio sidebar structure.
 * Groups content types logically so the CEO can navigate intuitively.
 */
export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content Manager')
    .items([
      // ─── WEBSITE CONTENT ───
      S.listItem()
        .title('🏠 Website Content')
        .child(
          S.list()
            .title('Website Content')
            .items([
              S.listItem()
                .title('Hero Section')
                .schemaType('hero')
                .child(S.documentTypeList('hero').title('Hero Sections')),
              S.listItem()
                .title('Courses')
                .schemaType('course')
                .child(S.documentTypeList('course').title('All Courses')),
              S.listItem()
                .title('Testimonials')
                .schemaType('testimonial')
                .child(S.documentTypeList('testimonial').title('Student Reviews')),
              S.listItem()
                .title('FAQ')
                .schemaType('faq')
                .child(S.documentTypeList('faq').title('Frequently Asked Questions')),
            ])
        ),

      S.divider(),

      // ─── NEWS & UPDATES ───
      S.listItem()
        .title('📢 News & Announcements')
        .schemaType('announcement')
        .child(
          S.documentTypeList('announcement')
            .title('All Announcements')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      S.divider(),

      // ─── PEOPLE ───
      S.listItem()
        .title('👥 Team & Staff')
        .schemaType('teamMember')
        .child(
          S.documentTypeList('teamMember')
            .title('Team Members')
            .defaultOrdering([{ field: 'sortOrder', direction: 'asc' }])
        ),

      S.divider(),

      // ─── SETTINGS (singleton) ───
      S.listItem()
        .title('⚙️ Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Site Settings')
        ),
    ])
