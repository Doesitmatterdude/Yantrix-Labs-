import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Yantrix Labs",
  description:
    "How Yantrix Labs collects, uses, and protects your information.",
};

export default function PrivacyPage() {
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
        Privacy Policy
      </h1>
      <p className="mt-4 text-muted-foreground">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-IN", {
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly (name, email, project
          details via WhatsApp or contact forms) and automatically (analytics
          data including page views, device type, and geography).
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To respond to inquiries and provide services</li>
          <li>To improve our website and user experience</li>
          <li>To send project updates and relevant communications</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share data with
          service providers (hosting, analytics) who assist in operating our
          website, bound by confidentiality agreements.
        </p>

        <h2>4. Analytics</h2>
        <p>
          We use privacy-focused analytics to understand website usage. This
          service collects anonymized data and does not use cookies for
          tracking. No personally identifiable information is stored by our
          analytics provider.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your information. Our website is served over HTTPS and we
          follow industry security best practices.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal
          data at any time by contacting us.
        </p>

        <h2>7. Contact</h2>
        <p>
          For privacy-related inquiries, contact us at{" "}
          <a href="mailto:hello@yantrixlabs.studio">hello@yantrixlabs.studio</a>
          .
        </p>
      </div>
    </main>
  );
}
