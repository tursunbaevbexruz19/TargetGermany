import HomeClient from './HomeClient'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export const revalidate = 30

export default async function Page({ params }: PageProps) {
  const { locale } = await params

  let heroData = null
  let coursesData = null

  try {
    // Fetch Hero
    const heroResult = await client.fetch(
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

    // Fetch Courses — full projection including image + portable text
    const coursesResult = await client.fetch(
      `*[_type == "course" && language == $locale] | order(sortOrder asc, _createdAt asc) {
        _id,
        title,
        shortDescription,
        fullDescription,
        courseType,
        levels,
        hoursPerWeek,
        durationWeeks,
        schedule,
        price,
        isFeatured,
        iconType,
        tags,
        previewImage
      }`,
      { locale }
    )

    if (coursesResult && coursesResult.length > 0) {
      coursesData = coursesResult.map((course: any) => ({
        _id: course._id,
        title: course.title,
        shortDescription: course.shortDescription,
        fullDescriptionHtml: course.fullDescription
          ? blocksToHtml(course.fullDescription)
          : null,
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
          : null,
      }))
    }
  } catch (err) {
    console.error('Error fetching data from Sanity:', err)
  }

  return <HomeClient heroData={heroData} coursesData={coursesData} />
}

/**
 * Server-side rich text to HTML converter for Sanity portable text blocks.
 * Keeps the bundle lean by avoiding client-side portable-text libraries.
 */
function blocksToHtml(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .map((block: any) => {
      if (block._type !== 'block' || !block.children) return ''
      const text = block.children
        .map((child: any) => {
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
