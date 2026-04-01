import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './hero'
import { courseType } from './course'
import { testimonialType } from './testimonial'
import { faqType } from './faq'
import { teamMemberType } from './teamMember'
import { announcementType } from './announcement'
import { siteSettingsType } from './siteSettings'
import { programCategoryType } from './programCategory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content
    heroType,
    courseType,
    programCategoryType,
    testimonialType,
    announcementType,
    faqType,

    // People
    teamMemberType,

    // Configuration
    siteSettingsType,
  ],
}
