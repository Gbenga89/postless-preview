import { MetadataRoute } from 'next'
import { getAllPosts } from '../lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const base  = 'https://postless.app'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url:             `${base}/blog/${p.slug}`,
    lastModified:    new Date(p.date),
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  return [...staticRoutes, ...postRoutes]
}
