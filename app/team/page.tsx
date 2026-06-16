import type { Metadata } from "next";
import { TeamClient } from "./team-client";

export const metadata: Metadata = {
  title: "Team · Yantrix Labs",
  description: "Meet the core team behind Yantrix Labs. We are a specialized group of engineers, strategists, and AI system architects building modern digital products.",
  openGraph: {
    title: "Team · Yantrix Labs",
    description: "Meet the core team behind Yantrix Labs. We are a specialized group of engineers, strategists, and AI system architects building modern digital products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team · Yantrix Labs",
    description: "Meet the core team behind Yantrix Labs. We are a specialized group of engineers, strategists, and AI system architects building modern digital products.",
  },
};

export default function TeamPage() {
  return <TeamClient />;
}
