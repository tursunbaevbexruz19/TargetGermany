import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

/**
 * Standard client — used for normal page rendering.
 * useCdn: true for fast edge-cached responses.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

/**
 * Preview client — used when draft mode is active (Presentation Tool).
 * stega: true → encodes invisible metadata into strings so the
 * Presentation Tool can map text on the page to Sanity document fields.
 * useCdn: false → always fetches fresh data from the Content Lake.
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})
