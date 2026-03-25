import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './hero'
import { courseType } from './course'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType, courseType],
}
