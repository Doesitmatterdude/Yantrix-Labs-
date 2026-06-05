# Yantrix Labs

Yantrix Labs is a premium product studio website built with Next.js, React, Tailwind CSS, Framer Motion, and Spline-powered 3D visuals.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- Framer Motion
- shadcn/ui primitives
- Spline / Three.js visual layers
- pnpm

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the local development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Start the production server after building |
| `pnpm lint` | Run ESLint |

## Project Structure

```text
app/          Next.js routes, metadata, robots, and sitemap
components/   React components and section-level UI
hooks/        Shared React hooks
lib/          Site data, utilities, and theme helpers
public/       Static brand, icon, and system assets
styles/       Additional style assets
```

## Configuration

Optional public environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SPLINE_SCENE_URL=https://prod.spline.design/example/scene.splinecode
NEXT_PUBLIC_SPLINE_SERVICES_URL=https://prod.spline.design/example/scene.splinecode
```

The site has a built-in fallback for the hero Spline bot and can run locally without these variables.

## Migration Notes

This repository has been sanitized for a neutral GitHub migration. Local deployment metadata, generated logs, and editor-specific service credentials are intentionally excluded from source control.
