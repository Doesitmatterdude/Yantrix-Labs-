import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  ARTICLES,
  getArticleBySlug,
  type SectionType,
} from "@/lib/articles";
import { WHATSAPP_LINK } from "@/lib/site-data";

// ─── Static params so Next.js pre-renders all article pages at build time ───
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

// ─── Per-article metadata ────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const siteUrl = rawUrl
    ? rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`
    : "https://www.yantrixlabs.studio";
  const url = `${siteUrl}/notebook/${article.slug}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      url,
      siteName: "Yantrix Labs",
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      creator: "@yantrixlabs",
    },
  };
}

// ─── Section renderer ────────────────────────────────────────────────────────
function renderSection(section: SectionType, index: number) {
  switch (section.type) {
    case "heading":
      if (section.level === 2) {
        return (
          <h2
            key={index}
            className="mt-10 mb-4 font-display text-2xl leading-snug tracking-tight text-foreground sm:text-3xl"
          >
            {section.content}
          </h2>
        );
      }
      return (
        <h3
          key={index}
          className="mt-8 mb-3 font-display text-xl leading-snug tracking-tight text-foreground"
        >
          {section.content}
        </h3>
      );

    case "paragraph":
      return (
        <p
          key={index}
          className="mb-5 text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      );

    case "blockquote":
      return (
        <blockquote
          key={index}
          className="my-8 border-l-2 border-brand pl-6"
        >
          <p 
            className="font-display text-xl italic leading-relaxed tracking-tight text-foreground sm:text-2xl"
            dangerouslySetInnerHTML={{ __html: `&ldquo;${section.content}&rdquo;` }}
          />
        </blockquote>
      );

    case "list":
      return (
        <ul key={index} className="my-5 space-y-3 pl-0">
          {section.items.map((item, j) => (
            <li key={j} className="flex gap-3 text-foreground/80">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
              <span 
                className="text-base leading-relaxed sm:text-lg"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}

// ─── Category color map ───────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  amber: "bg-brand/15 text-brand border-brand/30",
  blue: "bg-brand-cool/15 text-brand-cool border-brand-cool/30",
  teal: "bg-brand-cool/10 text-brand-cool border-brand-cool/25",
};

// ─── Article Page ─────────────────────────────────────────────────────────────
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  // Article index for prev/next navigation
  const articleIndex = ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = articleIndex > 0 ? ARTICLES[articleIndex - 1] : null;
  const nextArticle =
    articleIndex < ARTICLES.length - 1 ? ARTICLES[articleIndex + 1] : null;

  return (
    <main className="relative min-h-screen bg-background">
      {/* ── Navigation row ── */}
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <Link
          href="/notebook"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/50 transition-colors hover:text-foreground"
        >
          ← Notebook
        </Link>
      </div>

      {/* ── Article header ── */}
      <header className="mx-auto max-w-3xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={`rounded-full border font-mono text-[10px] font-normal uppercase tracking-[0.16em] ${
              CATEGORY_COLORS[article.categoryColor]
            }`}
          >
            {article.category}
          </Badge>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
            {article.readTime} read · {article.publishedAt}
          </span>
        </div>

        <h1 className="mt-5 text-balance font-display text-3xl leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {article.subtitle}
        </p>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-border/60" />
      </header>

      {/* ── Article body ── */}
      <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        {article.sections.map((section, i) => renderSection(section, i))}
      </article>

      {/* ── End CTA ── */}
      <section className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
        <div className="rounded-2xl border border-border/60 bg-secondary/30 p-8 sm:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            Free audit
          </p>
          <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
            Ready to talk about your project?
          </h2>
          <p className="mt-3 text-muted-foreground">
            We offer a free 30-minute website and AI audit — no pitch,
            just a useful conversation about where you&apos;re at and what
            would actually move the needle.
          </p>
          <Link
            href="/ai-audit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:scale-[1.03] hover:bg-foreground/90"
          >
            Book the free audit
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* ── Prev / Next navigation ── */}
      {(prevArticle || nextArticle) && (
        <nav className="mx-auto max-w-3xl px-4 pb-28 sm:px-6 sm:pb-24">
          <div className="mt-4 h-px w-full bg-border/40" />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {prevArticle ? (
              <Link
                href={`/notebook/${prevArticle.slug}`}
                className="group flex flex-col gap-1 rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-brand/40"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
                  ← Previous
                </span>
                <span className="font-display text-base tracking-tight text-foreground transition-colors group-hover:text-brand">
                  {prevArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle ? (
              <Link
                href={`/notebook/${nextArticle.slug}`}
                className="group flex flex-col gap-1 rounded-xl border border-border/60 bg-card p-5 text-right transition-all hover:border-brand/40 sm:items-end"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
                  Next →
                </span>
                <span className="font-display text-base tracking-tight text-foreground transition-colors group-hover:text-brand">
                  {nextArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-8">
            <Link
              href="/notebook"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/50 transition-colors hover:text-foreground"
            >
              ← Back to all articles
            </Link>
          </div>
        </nav>
      )}

      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.metaTitle,
            "description": article.metaDescription,
            "url": `https://www.yantrixlabs.studio/notebook/${article.slug}`,
            "datePublished": new Date(article.publishedAt).toISOString(),
            "dateModified": new Date(article.publishedAt).toISOString(),
            "author": {
              "@type": "Person",
              "name": "Divya Bhatia",
              "url": "https://www.yantrixlabs.studio/team/founder-partner"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Yantrix Labs",
              "url": "https://www.yantrixlabs.studio"
            }
          })
        }}
      />
    </main>
  );
}
