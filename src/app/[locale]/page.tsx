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
  try {
    const data = await client.fetch(
      `*[_type == "hero" && language == $locale][0]`,
      { locale: locale }
    )
    if (data) {
      // Map Sanity fields to HomeClient expected props
      heroData = {
        badge: data.badge,
        badgeText: data.badge,
        title: data.title,
        description: data.description,
        primaryButton: data.ctaText,
      }
    }
  } catch (err) {
    console.error('Error fetching hero data from Sanity:', err)
  }

  return <HomeClient heroData={heroData} />
}
