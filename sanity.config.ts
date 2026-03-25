'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './src/sanity/env'

import { presentationTool } from 'sanity/presentation'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: typeof location === 'undefined' ? 'http://localhost:3000' : location.origin,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
})
