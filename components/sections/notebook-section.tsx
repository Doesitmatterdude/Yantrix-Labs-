"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Sparkles, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { POSTS } from "@/lib/site-data";
import { SectionEyebrow } from "./services-section";

const ICONS = [Sparkles, FileText, Globe];
const GRADIENTS = {
  amber: "from-[var(--brand)]/25 via-[var(--brand)]/10 to-transparent",
  blue: "from-[var(--brand-cool)]/25 via-[var(--brand-cool)]/10 to-transparent",
  teal: "from-[var(--brand-cool)]/20 via-[var(--brand)]/8 to-transparent",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function NotebookSection() {
  return (
    <section
      id="notebook"
      className="relative scroll-mt-24 border-t border-border/60 bg-secondary/30 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <SectionEyebrow>Notebook</SectionEyebrow>
            <h2 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              From the{" "}
              <span className="text-brand">
                Yantrix Labs <span className="italic">notebook.</span>
              </span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 text-muted-foreground lg:pb-2 lg:text-right"
          >
            Honest breakdowns of what worked, what didn&apos;t, and where we see
            the next opportunities for leverage. Written for builders, not
            buzzword chasers.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {POSTS.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            const gradient =
              GRADIENTS[p.color as keyof typeof GRADIENTS] || GRADIENTS.amber;

            return (
              <motion.article
                key={p.title}
                variants={item}
                whileHover={{ y: -4 }}
              >
                <Link href={`/notebook/${p.slug}`} className="block h-full">
                  <Card className="group flex h-full flex-col overflow-hidden border-border/60 bg-card transition-all hover:border-brand/40 hover:shadow-[0_16px_40px_-20px_var(--brand)]">
                    {/* Gradient header */}
                    <div
                      className={`relative h-32 bg-gradient-to-br ${gradient} transition-all group-hover:brightness-110`}
                    >
                      <div className="absolute inset-0 grid-bg opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-between p-5">
                        <Badge
                          variant="outline"
                          className="rounded-full border-foreground/20 bg-background/50 font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-foreground/80 backdrop-blur"
                        >
                          {p.chip}
                        </Badge>
                        <Icon
                          className="size-10 text-foreground/20"
                          strokeWidth={1}
                        />
                      </div>
                      {/* Large abstract number */}
                      <div className="absolute bottom-2 right-4 font-display text-5xl font-bold text-foreground/[0.06]">
                        0{i + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <h3 className="font-display text-xl leading-snug tracking-tight line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {p.excerpt}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                          {p.readTime} read
                        </span>
                        <span className="flex items-center gap-1 text-sm text-foreground/60 transition-colors group-hover:text-foreground">
                          Read article
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <Button
            asChild
            variant="ghost"
            className="-ml-3 rounded-full transition-all hover:scale-[1.03]"
          >
            <Link href="/notebook">
              Explore all articles <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
