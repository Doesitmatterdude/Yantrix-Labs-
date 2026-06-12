import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
          'OAI-SearchBot',
          'Slurp',
          'DuckDuckBot',
          'facebot',
          'Twitterbot',
          'anthropic-ai',
          'Claude-Web',
          'Applebot',
          'Googlebot-Image',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://www.yantrixlabs.studio/sitemap.xml',
  }
}
