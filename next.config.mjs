import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {

  // Enable image optimization for production
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Strict mode for better React debugging
  reactStrictMode: true,
  // Compress responses
  compress: true,
  // Power performance headers
  poweredByHeader: false,
}

export default nextConfig
