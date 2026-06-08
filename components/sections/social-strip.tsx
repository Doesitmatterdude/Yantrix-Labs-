"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";
import { SectionEyebrow } from "./services-section";
import { SOCIAL_LINKS } from "@/lib/site-data";

// Custom X logo to replace the old Twitter bird
const XLogo = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const SOCIALS = [
  {
    icon: Facebook,
    name: "Facebook",
    handle: "Yantrix Labs",
    desc: "Launch updates, studio announcements, and client-facing highlights.",
    href: SOCIAL_LINKS.facebook,
    hoverBg: "group-hover:bg-blue-600/10",
    hoverBorder: "group-hover:border-blue-600/30",
    hoverIcon: "group-hover:text-blue-600",
  },
  {
    icon: Instagram,
    name: "Instagram",
    handle: "@yantrix.labs",
    desc: "Behind-the-scenes builds, UI experiments, and small wins from the studio.",
    href: SOCIAL_LINKS.instagram,
    hoverBg: "group-hover:bg-pink-500/10",
    hoverBorder: "group-hover:border-pink-500/30",
    hoverIcon: "group-hover:text-pink-500",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    handle: "Yantrix Labs",
    desc: "Deeper case breakdowns, hiring updates, and industry thoughts.",
    href: SOCIAL_LINKS.linkedin,
    hoverBg: "group-hover:bg-blue-500/10",
    hoverBorder: "group-hover:border-blue-500/30",
    hoverIcon: "group-hover:text-blue-500",
  },
  {
    icon: XLogo,
    name: "X",
    handle: "@yantrixlabs",
    desc: "Fast notes on AI systems, product thinking, and what we are shipping.",
    href: SOCIAL_LINKS.twitter,
    // Graphite / Faded Black treatment for X
    hoverBg: "dark:group-hover:bg-zinc-800/30 group-hover:bg-zinc-900/5",
    hoverBorder: "dark:group-hover:border-zinc-700/60 group-hover:border-zinc-900/20",
    hoverIcon: "group-hover:border-black group-hover:text-black dark:group-hover:border-white dark:group-hover:text-white",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SocialStrip() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-2xl"
        >
          <SectionEyebrow>Connect</SectionEyebrow>
          <h2 className="mt-3 text-balance font-display text-3xl leading-[1.1] tracking-tight sm:text-4xl">
            Connect with Yantrix Labs.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
        >
          {SOCIALS.map((s) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              variants={item}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 ${s.hoverBorder} ${s.hoverBg}`}
            >
              <div
                className={`grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-background/50 text-foreground/70 transition-colors ${s.hoverBorder} ${s.hoverIcon}`}
              >
                <s.icon className="size-4" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-base">{s.name}</span>
                  <ArrowUpRight className="size-3.5 text-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>
                <div className="font-mono text-[11px] text-foreground/50">
                  {s.handle}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
