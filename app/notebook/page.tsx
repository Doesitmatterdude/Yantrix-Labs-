import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ARTICLES } from "@/lib/articles";
import { WHATSAPP_LINK } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Notebook — Yantrix Labs",
  description:
    "Honest breakdowns of AI systems, business automation, and modern web — written for operators, not buzzword chasers.",
  openGraph: {
    title: "Notebook — Yantrix Labs",
    description:
      "Honest breakdowns of AI systems, business automation, and modern web — written for operators, not buzzword chasers.",
    type: "website",
  },
};

const CATEGORY_COLORS = {
  amber: "bg-brand/15 text-brand border-brand/30",
  blue: "bg-brand-cool/15 text-brand-cool border-brand-cool/30",
  teal: "bg-brand-cool/10 text-brand-cool border-brand-cool/25",
};

export default function NotebookPage() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Back to site */}
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/50 transition-colors hover:text-foreground"
        >
          ← Yantrix Labs
        </Link>
      </div>

      {/* Header */}
      <header className="mx-auto max-w-3xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
          Notebook
        </p>
        <h1 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          From the{" "}
          <span className="italic text-brand">Yantrix Labs notebook.</span>
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground">
          Honest breakdowns of what worked, what didn&apos;t, and where we
          see the next opportunities. Written for operators, not buzzword
          chasers.
        </p>
        <div className="mt-6 h-px w-full bg-border/60" />
      </header>

      {/* Article list */}
      <section className="mx-auto max-w-3xl px-4 pb-28 sm:px-6 sm:pb-24">
        <ol className="space-y-0">
          {ARTICLES.map((article, i) => (
            <li key={article.slug}>
              <Link
                href={`/notebook/${article.slug}`}
                className="group block py-10 transition-colors"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                  {/* Article number */}
                  <span className="shrink-0 font-mono text-4xl font-light text-foreground/10 transition-colors group-hover:text-brand/30 sm:text-5xl">
                    0{i + 1}
                  </span>

                  {/* Article body */}
                  <div className="flex-1">
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

                    <h2 className="mt-3 font-display text-2xl leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand sm:text-3xl">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-pretty text-muted-foreground">
                      {article.subtitle}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground/50 transition-all group-hover:gap-2 group-hover:text-foreground">
                      Read article
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Divider between articles */}
              {i < ARTICLES.length - 1 && (
                <div className="h-px w-full bg-border/40" />
              )}
            </li>
          ))}
        </ol>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-border/60 bg-secondary/30 p-8 sm:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            Free audit
          </p>
          <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
            Want us to look at your specific situation?
          </h2>
          <p className="mt-3 text-muted-foreground">
            We offer a free 30-minute website and AI audit — no pitch,
            just a useful conversation about where you&apos;re at and what
            would actually move the needle.
          </p>
          <Link
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:scale-[1.03] hover:bg-foreground/90"
          >
            Book the free audit
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
