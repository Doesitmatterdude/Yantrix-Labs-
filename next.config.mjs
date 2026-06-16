import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {

  // Enable image optimization for production
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'yantrixlabs.studio' }],
        destination: 'https://www.yantrixlabs.studio/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'yantrixlabs.com' }],
        destination: 'https://www.yantrixlabs.studio/:path*',
        permanent: true,
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/ai-audit',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow' },
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
    ]
  },
  // Strict mode for better React debugging
  reactStrictMode: true,
  // Compress responses
  compress: true,
  // Power performance headers
  poweredByHeader: false,
}

export default nextConfig
