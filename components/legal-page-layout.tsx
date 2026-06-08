import Link from "next/link";
import { ChevronLeft, Scale } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LegalSection {
  id: string;
  title: string;
  number: string;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  effectiveDate: string;
  sections: LegalSection[];
  children: React.ReactNode;
  badge?: string;
}

// ─── Table of Contents ────────────────────────────────────────────────────────

function TableOfContents({ sections }: { sections: LegalSection[] }) {
  return (
    <nav aria-label="Page sections" className="sticky top-10 hidden xl:block">
      <div className="mb-5 flex items-center gap-2">
        <Scale className="size-3 text-brand/60" aria-hidden="true" />
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
          On this page
        </p>
      </div>
      <ul className="space-y-px border-l border-border/50">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="group flex items-baseline gap-3 border-l-2 border-transparent py-1.5 pl-4 text-[13px] text-muted-foreground/70 transition-all duration-150 hover:border-brand/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background -ml-px"
            >
              <span className="w-4 shrink-0 font-mono text-[9px] text-muted-foreground/40 transition-colors group-hover:text-brand/70">
                {s.number}
              </span>
              <span className="leading-snug">{s.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Legal Section Wrapper ────────────────────────────────────────────────────

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-10 border-b border-border/40 pb-12 pt-12 first:pt-0 last:border-b-0"
    >
      {/* Section header */}
      <div className="mb-7 flex items-start gap-4">
        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-secondary/40">
          <span className="font-mono text-[9px] font-medium text-muted-foreground">
            {number}
          </span>
        </div>
        <h2
          id={`${id}-heading`}
          className="font-display text-2xl leading-tight tracking-tight text-foreground sm:text-[1.65rem]"
        >
          {title}
        </h2>
      </div>

      {/* Section body */}
      <div className="pl-[calc(1.75rem+1rem)] space-y-5 text-[15px] leading-[1.75] text-foreground/80 sm:text-[15.5px]">
        {children}
      </div>
    </section>
  );
}

// ─── Highlight Note Card ──────────────────────────────────────────────────────

export function LegalNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 flex gap-3 rounded-r-xl border border-border/50 border-l-brand/60 bg-brand/[0.04] py-4 pr-5 dark:bg-brand/[0.06]" style={{ borderLeftWidth: "3px" }}>
      <div className="pt-0.5 shrink-0">
        <div className="size-1.5 rounded-full bg-brand/70 mt-1.5" />
      </div>
      <div className="text-[14px] leading-relaxed text-foreground/80">
        {children}
      </div>
    </div>
  );
}

// ─── Styled list for legal items ──────────────────────────────────────────────

export function LegalList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-2.5">
      {children}
    </ul>
  );
}

export function LegalListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-brand/50" />
      <span>{children}</span>
    </li>
  );
}

// ─── Main Layout ─────────────────────────────────────────────────────────────

export function LegalPageLayout({
  title,
  subtitle,
  effectiveDate,
  sections,
  children,
  badge,
}: LegalPageLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">

      {/* Background grid — same as rest of site */}
      <div className="pointer-events-none fixed inset-0 -z-10 grid-bg opacity-[0.025]" />

      {/* Ambient top glow — same pattern as hero/team pages */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[400px] opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, var(--brand-glow-soft), transparent)",
        }}
      />

      {/* ── Hero Header ─────────────────────────────────────────────────────── */}
      <header className="relative border-b border-border/60 pb-14 pt-24 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          {/* Breadcrumb */}
          <Link
            href="/"
            aria-label="Back to Yantrix Labs homepage"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background/60 px-4 py-1.5 text-[13px] font-medium text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:border-border hover:bg-secondary/50 hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="size-3.5" aria-hidden="true" />
            Yantrix Labs
          </Link>

          {/* Title block */}
          <div className="mt-10">
            {badge && (
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-brand">
                {badge}
              </p>
            )}
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          </div>

          {/* Meta chips strip */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border/40 pt-8">
            <MetaChip label="Effective" value={effectiveDate} />
            <MetaChip label="Jurisdiction" value="Jaipur, Rajasthan" />
            <MetaChip label="Governing law" value="Laws of India" />
            <a
              href="mailto:hello@yantrixlabs.studio"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-3.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
            >
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50 mr-1">
                Contact
              </span>
              hello@yantrixlabs.studio
            </a>
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16 xl:grid-cols-[300px_1fr] xl:gap-24">

          {/* Sidebar */}
          <aside className="lg:block">
            <TableOfContents sections={sections} />
          </aside>

          {/* Article */}
          <article className="min-w-0 max-w-[68ch]">
            {children}
          </article>
        </div>
      </main>

      {/* ── Footer callout ──────────────────────────────────────────────────── */}
      <footer className="border-t border-border/50 bg-secondary/10 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border/50 bg-card p-8 text-center sm:p-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand">
              Questions about these terms?
            </p>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              We are a small studio, not a legal department. If anything here is unclear
              or you have questions about our practices, write to us directly — we will reply plainly.
            </p>
            <a
              href="mailto:hello@yantrixlabs.studio"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-5 py-2 font-mono text-[13px] text-foreground transition-all hover:border-brand/50 hover:bg-card hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              hello@yantrixlabs.studio
            </a>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 border-t border-border/40 pt-8">
              <Link href="/legal/terms" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
                Terms &amp; Conditions
              </Link>
              <span className="text-border/50 select-none">·</span>
              <Link href="/legal/privacy" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
              <span className="text-border/50 select-none">·</span>
              <Link href="/" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
                Yantrix Labs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Small helper ─────────────────────────────────────────────────────────────

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card px-3.5 py-1">
      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50">
        {label}
      </span>
      <span className="font-mono text-[11px] text-foreground/80">{value}</span>
    </div>
  );
}
