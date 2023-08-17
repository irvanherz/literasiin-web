import slugify from 'slugify'

export function slugifyContentId (content: any, title = 'title') {
  return `${content?.id}-${slugify(content?.[title] || '', { lower: true })}`
}

export function contentIdFromSlug (slug: string) {
  return +slug.split('-')[0]
}
