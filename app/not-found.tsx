import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Page Not Found — Yantrix Labs",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <main className="relative overflow-x-clip">
      <SiteHeader />
      <section className="flex min-h-[70svh] flex-col items-center justify-center px-4 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground/50">
          404 — Page not found
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">
          Nothing here.
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, was removed, or
          the URL is wrong. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:scale-[1.03] hover:bg-foreground/90"
        >
          Back to homepage
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
