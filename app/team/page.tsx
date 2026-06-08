import type { Metadata } from "next";
import { TeamClient } from "./team-client";

export const metadata: Metadata = {
  title: "Team · Yantrix Labs",
  description:
    "Meet the 8-person team behind Yantrix Labs — engineers, strategists, and AI systems specialists based in Jaipur, India.",
  openGraph: {
    title: "Team · Yantrix Labs",
    description:
      "Meet the 8-person team behind Yantrix Labs — engineers, strategists, and AI systems specialists based in Jaipur, India.",
    type: "website",
  },
};

export default function TeamPage() {
  return <TeamClient />;
}
