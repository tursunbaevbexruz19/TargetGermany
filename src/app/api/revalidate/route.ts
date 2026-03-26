import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

/**
 * Sanity Webhook → On-Demand Revalidation
 * 
 * When content is published in Sanity Studio, this webhook
 * instantly purges the Next.js cache and rebuilds affected pages.
 * 
 * Setup in Sanity:
 * 1. Go to https://www.sanity.io/manage → Your Project → API → Webhooks
 * 2. Create a new webhook:
 *    - Name: "Revalidate Website"
 *    - URL: https://target-germany.vercel.app/api/revalidate
 *    - Dataset: production
 *    - Trigger on: Create, Update, Delete
 *    - Secret: (set a secret and add it as SANITY_REVALIDATE_SECRET env var)
 */
export async function POST(request: Request) {
  try {
    const secret = request.headers.get('x-sanity-secret')
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

    // If a secret is configured, validate it
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate all locale paths
    const locales = ['en', 'de', 'uz', 'ru', 'es', 'ar', 'zh', 'ko', 'tr']
    for (const locale of locales) {
      revalidatePath(`/${locale}`)
    }
    revalidatePath('/')

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
    })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    )
  }
}
