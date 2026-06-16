import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://www.yantrixlabs.studio/sitemap.xml',
    host: 'https://www.yantrixlabs.studio',
  }
}
