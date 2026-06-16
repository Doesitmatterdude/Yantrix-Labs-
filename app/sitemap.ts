import type { MetadataRoute } from "next"
import { ARTICLES } from "@/lib/articles"
import { TEAM_MEMBERS } from "@/lib/team"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.yantrixlabs.studio";

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/notebook/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const teamRoutes: MetadataRoute.Sitemap = TEAM_MEMBERS
    // Filter out dummy/internal team members from public sitemap
    .filter(member => !["dev-01", "dev-02", "sales-01"].includes(member.slug))
    .map((member) => ({
      url: `${baseUrl}/team/${member.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ai-audit`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/notebook`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...articleRoutes,
    ...teamRoutes,
  ]
}

