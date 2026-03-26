import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './hero'
import { courseType } from './course'
import { testimonialType } from './testimonial'
import { faqType } from './faq'
import { teamMemberType } from './teamMember'
import { announcementType } from './announcement'
import { siteSettingsType } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content
    heroType,
    courseType,
    testimonialType,
    announcementType,
    faqType,

    // People
    teamMemberType,

    // Configuration
    siteSettingsType,
  ],
}
