# Yantrix Labs Landing Page — Production Readiness Report

> Generated: May 26, 2026  
> Stack: Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · shadcn/ui

---

## 🔴 Critical Blockers (Must Fix Before Deploy)

### 1. Placeholder Content

| Item               | Location                                                    | Action                                            |
| ------------------ | ----------------------------------------------------------- | ------------------------------------------------- |
| WhatsApp number    | `lib/site-data.ts`                                          | Replace `YOUR_NUMBER_HERE` with actual number     |
| Social links       | `lib/site-data.ts` + `components/sections/social-strip.tsx` | Update to real profile URLs                       |
| Case study metrics | `lib/site-data.ts` → `CASES`                                | Replace "Sample outcome" with real data           |
| Legal pages        | `components/site-footer.tsx`                                | Create `/legal/terms` and `/legal/privacy` pages  |
| metadataBase URL   | `app/layout.tsx`                                            | Change `https://yantrix.labs` to your real domain |

### 2. Build Configuration Issues

| Issue                     | File              | Fix                                                                     |
| ------------------------- | ----------------- | ----------------------------------------------------------------------- |
| TypeScript errors ignored | `next.config.mjs` | Remove `typescript: { ignoreBuildErrors: true }` and fix all TS errors  |
| Images unoptimized        | `next.config.mjs` | Remove `images: { unoptimized: true }` — use Next.js Image optimization |
| No ESLint config          | Root              | Add `.eslintrc.json` or `eslint.config.mjs`                             |

### 3. Missing SEO Essentials

- [ ] `app/sitemap.ts` — dynamic sitemap generation
- [ ] `app/robots.ts` — robots.txt generation
- [ ] Structured data (JSON-LD) for Organization schema
- [ ] Canonical URLs on all pages
- [ ] `favicon.ico` in `/app` directory (browsers still request this)

---

## 🟡 Important Improvements (Pre-Launch)

### 4. Performance — Remove Unused Dependencies

These packages are in `package.json` but **not used anywhere** in the codebase:

```
@react-three/fiber        (~200KB)
@react-three/drei         (~150KB)
three                     (~600KB)
recharts                  (~180KB)
react-day-picker          (~50KB)
react-resizable-panels    (~30KB)
react-hook-form           (~25KB)
@hookform/resolvers       (~10KB)
zod                       (~15KB)
```

**Estimated savings: ~1.2MB+ from bundle** (tree-shaking helps but these still add to install time and potential issues).

Run:

```bash
pnpm remove @react-three/fiber @react-three/drei three @types/three recharts react-day-picker react-resizable-panels react-hook-form @hookform/resolvers zod
```

### 5. Security & Headers

- [ ] Add security headers via `next.config.mjs` (CSP, X-Frame-Options, etc.)
- [ ] Add `X-Content-Type-Options: nosniff`
- [ ] Add `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] Ensure all external links have `rel="noopener noreferrer"`

### 6. Accessibility Gaps

- [ ] Hero section ecosystem visual needs `aria-label` on the interactive container
- [ ] Trust strip marquee should have `aria-hidden="true"` on duplicate set and a static fallback
- [ ] Mobile menu needs focus trap when open
- [ ] Skip-to-content link at top of page
- [ ] Color contrast check on `text-foreground/40` and `text-foreground/50` elements

### 7. Environment Variables

Create `.env.local` (and `.env.production`):

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # if using Google Analytics
```

---

## 🟢 Deployment Checklist

### Platform Options

| Platform             | Pros                                          | Setup                               |
| -------------------- | --------------------------------------------- | ----------------------------------- |
| **Netlify**          | Good free tier, form handling, edge functions | Connect GitHub repo → auto-deploy   |
| **Cloudflare Pages** | Fast edge network, generous free tier         | `@cloudflare/next-on-pages` adapter |
| **AWS Amplify**      | Full AWS ecosystem                            | More config, good for scaling       |
| **Railway**          | Simple deploy, good DX                        | Connect repo → auto-deploy          |

### Pre-Deploy Steps

1. [ ] Fix all TypeScript errors (remove `ignoreBuildErrors`)
2. [ ] Run `pnpm build` locally — ensure zero errors
3. [ ] Run `pnpm lint` — fix all warnings
4. [ ] Set up real domain and update `metadataBase`
5. [ ] Configure DNS (A record or CNAME to hosting provider)
6. [ ] Enable HTTPS (automatic on Netlify/Cloudflare)
7. [ ] Set environment variables on hosting platform
8. [ ] Test Open Graph tags with [opengraph.xyz](https://opengraph.xyz)
9. [ ] Test mobile responsiveness on real devices
10. [ ] Run Lighthouse audit — target 90+ on all metrics
11. [ ] Submit sitemap to Google Search Console
12. [ ] Set up uptime monitoring (UptimeRobot, Better Uptime, etc.)

### Post-Deploy

- [ ] Verify analytics is collecting data
- [ ] Set up error monitoring (Sentry recommended)
- [ ] Configure Web Vitals monitoring
- [ ] Test all WhatsApp/social links work
- [ ] Verify OG image renders correctly on social shares

---

## 💎 Premium Upgrade Suggestions

### Tier 1 — Quick Wins (1-2 days)

1. **Custom OG Image** — Design a branded 1200×630 image for social sharing. Use `app/opengraph-image.tsx` for dynamic generation.

2. **Smooth Page Load Sequence** — Add a brief branded loading screen (0.5s) with the YX logo animating in, then reveal content. Creates a polished first impression.

### Tier 2 — Medium Effort (3-5 days)

6. **Interactive Case Studies** — Replace static cards with expandable case study pages (`/cases/[slug]`) with before/after visuals, timeline, and real metrics.

7. **Blog/Notebook CMS** — Integrate MDX or a headless CMS (Sanity, Contentlayer) for the Notebook section. Real content builds SEO authority.

8. **Contact Form with Scheduling** — Add a Calendly/Cal.com embed or custom form with email notifications instead of only WhatsApp.

9. **Testimonial Carousel** — Add client testimonials with photos, company logos, and star ratings. Social proof is the #1 conversion driver.

10. **Micro-interactions on Services Cards** — On hover, show a brief animated preview of what the service delivers (like the SystemsSection previews but for all cards).

11. **Sound Design** — Subtle UI sounds on key interactions (CTA click, section reveal) with a mute toggle. Differentiator for premium feel.

### Tier 3 — High Impact (1-2 weeks)

12. **3D Hero Element** — You already have three.js installed. Replace the 2D ecosystem visual with a subtle 3D rotating node graph using React Three Fiber. Low-poly, performant, memorable.

13. **AI-Powered Chat Widget** — Build a small chat widget that uses your own AI systems to answer visitor questions. Demonstrates your product while generating leads.

14. **Multi-language Support** — Add Hindi + English toggle using Next.js i18n. Shows professionalism for Indian market.

15. **Performance Dashboard** — Public-facing page showing your site's real-time Lighthouse scores, uptime, and response times. Builds trust with technical buyers.

16. **Dark/Light Mode Transition** — Instead of instant toggle, add a circular reveal animation from the toggle button position. Memorable detail.

17. **Pricing Calculator** — Interactive tool where visitors select services and get a ballpark estimate. Reduces friction to first contact.

---

## 📁 Recommended File Additions

```
app/
├── sitemap.ts              ← Dynamic sitemap
├── robots.ts               ← Robots.txt
├── opengraph-image.tsx     ← Dynamic OG image
├── favicon.ico             ← Browser fallback
├── legal/
│   ├── terms/page.tsx      ← Terms & Conditions
│   └── privacy/page.tsx    ← Privacy Policy
├── cases/
│   └── [slug]/page.tsx     ← Individual case studies
└── notebook/
    └── [slug]/page.tsx     ← Blog posts

.env.local                  ← Environment variables
.env.production             ← Production env vars
.eslintrc.json              ← ESLint configuration
middleware.ts               ← Security headers, redirects
```

---

## 🔧 Recommended VS Code Extensions

- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **ESLint** — code quality
- **Prettier** — formatting
- **Error Lens** — inline error display
- **Pretty TypeScript Errors** — readable TS errors
- **Auto Rename Tag** — JSX tag renaming
- **GitLens** — git blame and history

---

## Summary

The site is **visually polished** with excellent design language, animations, and component architecture. The main gaps are:

1. **Placeholder content** that needs real data
2. **Build config** that hides errors instead of fixing them
3. **SEO infrastructure** (sitemap, robots, structured data)
4. **~1.2MB of unused dependencies** bloating the project
5. **No deployment pipeline** configured

Estimated time to production-ready: **2-3 focused days** for critical fixes, **1 week** including the important improvements.
