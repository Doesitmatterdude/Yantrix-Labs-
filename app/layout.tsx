import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/custom-cursor";
import { SoundSystem } from "@/components/sound-system";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : `https://${process.env.NEXT_PUBLIC_SITE_URL}`
  : "https://www.yantrixlabs.studio";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Yantrix Labs",
  "url": baseUrl,
  "logo": `${baseUrl}/brand/yantrix-logo.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4th Floor, City Corporate Tower, Malviya Marg, C Scheme, Ashok Nagar",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302001",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.facebook.com/share/1NLMUWjAZF/",
    "https://www.instagram.com/yantrix.labs",
    "https://www.linkedin.com/in/yantrix-labs-6a1547414",
    "https://twitter.com/yantrixlabs"
  ]
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Yantrix Labs — AI systems your business can actually run on",
  description:
    "Yantrix Labs is an AI-native product studio in Jaipur, India. We design and ship modern websites, products, and AI systems that deploy in days, not quarters.",
  metadataBase: new URL(baseUrl),
  keywords: [
    "AI development studio",
    "web development India",
    "AI automation",
    "Jaipur web agency",
    "AI systems",
    "product studio",
    "Next.js development",
  ],
  authors: [{ name: "Yantrix Labs" }],
  creator: "Yantrix Labs",
  openGraph: {
    title: "Yantrix Labs — The website & AI upgrade your brand deserves",
    description:
      "AI-native product studio building websites, products, and AI agents that deploy in days, not quarters.",
    type: "website",
    locale: "en_IN",
    siteName: "Yantrix Labs",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: "Yantrix Labs — AI systems your business can actually run on" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yantrix Labs — AI systems your business can actually run on",
    description:
      "AI-native product studio building websites, products, and AI agents that deploy in days, not quarters.",
    creator: "@yantrixlabs",
    images: ["/brand/og-image.png"],
  },
  icons: {
    icon: [{ url: "/brand/yantrix-logo.png", type: "image/png" }],
    apple: "/brand/yantrix-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a17" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <CustomCursor />
          <SoundSystem />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
