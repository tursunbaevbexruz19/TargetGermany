import HomeClient from './HomeClient'
import { client } from '@/sanity/lib/client'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params

  // Fetch Hero data from Sanity
  let heroData = null
  let coursesData = null

  try {
    const heroResult = await client.fetch(
      `*[_type == "hero" && language == $locale][0]`,
      { locale: locale }
    )
    if (heroResult) {
      // Map Sanity fields to HomeClient expected props
      heroData = {
        badge: heroResult.badge,
        badgeText: heroResult.badge,
        title: heroResult.title,
        description: heroResult.description,
        primaryButton: heroResult.ctaText,
      }
    }

    // Fetch courses aligned with language
    const coursesResult = await client.fetch(
      `*[_type == "course" && language == $locale] | order(_createdAt asc)`,
      { locale: locale }
    )
    if (coursesResult && coursesResult.length > 0) {
      coursesData = coursesResult
    }
  } catch (err) {
    console.error('Error fetching data from Sanity:', err)
  }

  return <HomeClient heroData={heroData} coursesData={coursesData} />
}
