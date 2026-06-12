import type { MetadataRoute } from "next"
import { ARTICLES } from "@/lib/articles"
import { TEAM_MEMBERS } from "@/lib/team"

export default function sitemap(): MetadataRoute.Sitemap {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl = rawUrl
    ? rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`
    : "https://www.yantrixlabs.studio";

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/notebook/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const teamRoutes: MetadataRoute.Sitemap = TEAM_MEMBERS.map((member) => ({
    url: `${baseUrl}/team/${member.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/notebook`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team/founder-partner`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team/business-partner`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/notebook/why-most-ai-pilots-never-reach-production`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Dynamically include other articles and team members not explicitly listed in the master plan
    ...articleRoutes.filter(route => route.url !== `${baseUrl}/notebook/why-most-ai-pilots-never-reach-production`),
    ...teamRoutes.filter(route => route.url !== `${baseUrl}/team/founder-partner` && route.url !== `${baseUrl}/team/business-partner`),
  ]
}

