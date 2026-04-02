import { draftMode } from 'next/headers'
import HomeClient from './HomeClient'
import { client, previewClient } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

interface PortableTextSpan {
  text?: string
  marks?: string[]
}

interface PortableTextBlock {
  _type?: string
  style?: string
  children?: PortableTextSpan[]
}

interface FetchedCourse {
  _id: string
  title: string
  menuLabel?: string
  imageAlt?: string
  seoMetaDescription?: string
  menuOrder?: number
  sortOrder?: number
  programCategory?: {
    _id: string
    title: string
    sortOrder?: number
  } | null
  shortDescription: string
  fullDescription?: PortableTextBlock[]
  courseType: string
  levels?: string[]
  hoursPerWeek?: number
  durationWeeks?: number
  schedule?: string
  price?: string
  isFeatured?: boolean
  iconType?: string
  tags?: string[]
  previewImage?: unknown
}

export const revalidate = 30

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  const dm = await draftMode()
  const sanity = dm.isEnabled ? previewClient : client
  const coursesQuery = `
      *[
        _type == "course" &&
        (
          language == $locale ||
          defined(translations[$locale].title) ||
          defined(translations[$locale].shortDescription) ||
          defined(translations[$locale].fullDescription)
        )
      ] | order(sortOrder asc, _createdAt asc) {
        _id,
        "title": coalesce(translations[$locale].title, title),
        "menuLabel": coalesce(translations[$locale].menuLabel, menuLabel, translations[$locale].title, title),
        "imageAlt": coalesce(translations[$locale].imageAlt, previewImage.alt, translations[$locale].title, title),
        "seoMetaDescription": coalesce(translations[$locale].seoMetaDescription, seoMetaDescription),
        "shortDescription": coalesce(translations[$locale].shortDescription, shortDescription),
        "fullDescription": coalesce(translations[$locale].fullDescription, fullDescription),
        courseType,
        menuOrder,
        sortOrder,
        "programCategory": programCategory->{
          _id,
          title,
          sortOrder
        },
        levels,
        hoursPerWeek,
        durationWeeks,
        "schedule": coalesce(translations[$locale].schedule, schedule),
        "price": coalesce(translations[$locale].price, price),
        isFeatured,
        iconType,
        "tags": coalesce(translations[$locale].tags, tags),
        previewImage
      }
    `

  let heroData = null
  let coursesData = null

  try {
    // Fetch Hero
    const heroResult = await sanity.fetch(
      `*[_type == "hero" && language == $locale][0]`,
      { locale }
    )
    if (heroResult) {
      heroData = {
        badge: heroResult.badge,
        badgeText: heroResult.badge,
        title: heroResult.title,
        description: heroResult.description,
        primaryButton: heroResult.ctaText,
      }
    }

    // Fetch Courses (with fallback locale so navbar submenu is always populated)
    let coursesResult: FetchedCourse[] = await sanity.fetch(coursesQuery, { locale })

    if ((!coursesResult || coursesResult.length === 0) && locale !== 'en') {
      coursesResult = await sanity.fetch(coursesQuery, { locale: 'en' })
    }

    if (coursesResult && coursesResult.length > 0) {
      coursesData = coursesResult.map((course: FetchedCourse) => ({
        _id: course._id,
        title: course.title,
        menuLabel: course.menuLabel,
        imageAlt: course.imageAlt,
        seoMetaDescription: course.seoMetaDescription,
        menuOrder: course.menuOrder,
        sortOrder: course.sortOrder,
        programCategory: course.programCategory
          ? {
              _id: course.programCategory._id,
              title: course.programCategory.title,
              sortOrder: course.programCategory.sortOrder ?? 0,
            }
          : null,
        shortDescription: course.shortDescription,
        fullDescriptionHtml: course.fullDescription
          ? blocksToHtml(course.fullDescription)
          : undefined,
        courseType: course.courseType,
        levels: course.levels,
        hoursPerWeek: course.hoursPerWeek,
        durationWeeks: course.durationWeeks,
        schedule: course.schedule,
        price: course.price,
        isFeatured: course.isFeatured || false,
        iconType: course.iconType,
        tags: course.tags,
        imageUrl: course.previewImage
          ? urlFor(course.previewImage).width(800).height(500).format('webp').url()
          : undefined,
      }))
    }
  } catch (err) {
    console.error('Error fetching data from Sanity:', err)
  }

  return <HomeClient heroData={heroData} coursesData={coursesData ?? undefined} />
}

function blocksToHtml(blocks: PortableTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .map((block: PortableTextBlock) => {
      if (block._type !== 'block' || !block.children) return ''
      const text = block.children
        .map((child: PortableTextSpan) => {
          let t = child.text || ''
          if (child.marks?.includes('strong')) t = `<strong>${t}</strong>`
          if (child.marks?.includes('em')) t = `<em>${t}</em>`
          return t
        })
        .join('')
      switch (block.style) {
        case 'h2': return `<h2 class="text-xl font-bold text-white mb-3 mt-5">${text}</h2>`
        case 'h3': return `<h3 class="text-lg font-bold text-white/90 mb-2 mt-4">${text}</h3>`
        case 'h4': return `<h4 class="text-base font-semibold text-white/80 mb-2 mt-3">${text}</h4>`
        case 'blockquote': return `<blockquote class="border-l-2 border-red-500/40 pl-4 italic text-white/50 my-3">${text}</blockquote>`
        default: return `<p class="text-white/50 leading-relaxed mb-2">${text}</p>`
      }
    })
    .join('')
}
