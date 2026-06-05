import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions — Yantrix Labs",
  description: "Terms and conditions for using Yantrix Labs services.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>

      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
        Terms &amp; Conditions
      </h1>
      <p className="mt-4 text-muted-foreground">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-IN", {
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <h2>1. Services</h2>
        <p>
          Yantrix Labs provides web development, AI system development, and
          digital automation services. All engagements are governed by
          individual project agreements in addition to these general terms.
        </p>

        <h2>2. Intellectual Property</h2>
        <p>
          Upon full payment, clients receive ownership of all custom code and
          deliverables created specifically for their project. Yantrix Labs
          retains rights to reusable frameworks, tools, and methodologies
          developed independently.
        </p>

        <h2>3. Payment Terms</h2>
        <p>
          Payment schedules are defined in individual project proposals.
          Standard terms require a deposit before work begins, with
          milestone-based payments thereafter.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          Yantrix Labs liability is limited to the total fees paid for the
          specific service giving rise to the claim. We are not liable for
          indirect, incidental, or consequential damages.
        </p>

        <h2>5. Governing Law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes shall be
          subject to the exclusive jurisdiction of courts in Jaipur, Rajasthan.
        </p>

        <h2>6. Contact</h2>
        <p>
          For questions about these terms, contact us at{" "}
          <a href="mailto:hello@yantrixlabs.studio">hello@yantrixlabs.studio</a>
          .
        </p>
      </div>
    </main>
  );
}
