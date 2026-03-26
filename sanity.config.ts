'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schema } from './src/sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { deskStructure } from './src/sanity/lib/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Target Germany CMS',
  schema,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
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
