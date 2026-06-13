# Postless — Landing Page + Blog

Next.js 16 · Tailwind CSS · Resend · Vercel

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill in your keys in .env.local
npm run dev
```

## Environment variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from your Resend account |
| `RESEND_AUDIENCE_ID` | Audience ID from your Resend account |
| `WAITLIST_UPSTREAM_URL` | Optional — proxy submissions to an external backend (e.g. `https://api.postless.app/api/waitlist`) |
| `NEXT_PUBLIC_WAITLIST_API_URL` | Optional — override the client-side waitlist endpoint entirely |

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — run the production server
- `npm run lint` — lint checks
- `npm run format` — format code with Prettier
- `npm run format:check` — check formatting without writing

## Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Add env vars in Vercel dashboard:
   - `RESEND_API_KEY`
   - `RESEND_AUDIENCE_ID`
4. Add custom domain `postless.app` in Vercel → Domains
5. Update DNS at your registrar: add CNAME `@` → `cname.vercel-dns.com`

Also supports Cloudflare via `@opennextjs/cloudflare` or any Node.js hosting.

## Project structure

```
app/
  page.tsx              ← Landing page
  layout.tsx            ← Root layout + fonts + metadata + GTM
  globals.css           ← Tailwind + base styles
  sitemap.ts            ← Auto-generated sitemap.xml
  robots.ts             ← robots.txt
  api/waitlist/route.ts ← POST /api/waitlist → Resend
  blog/
    page.tsx            ← /blog index
    [slug]/page.tsx     ← /blog/:slug post page

components/
  Nav.tsx               ← Sticky nav
  Footer.tsx            ← Footer
  WaitlistForm.tsx      ← Email capture (client component)
  FaqItem.tsx           ← FAQ accordion (client component)

content/blog/
  *.mdx                 ← Blog posts (add new files here)

lib/
  blog.ts               ← MDX/frontmatter utilities

docs/
  SEO_CONTENT_UPDATE_CHECKLIST.md  ← Checklist for adding new pages
```

## Waitlist

Signups hit `POST /api/waitlist` which:
1. Adds the email as a contact in your Resend audience
2. Sends a confirmation email from `hello@postless.app`

## Adding a blog post

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your post title"
description: "One-sentence description for SEO"
date: "2026-06-15"
author: "Postless Team"
tag: "how-to"           # how-to | comparison | strategy | case-study
tags: ["how-to", "linkedin"]
readingTime: "5 min read"
---

Your content here...
```

The post appears automatically at `/blog/your-filename` and is added to the sitemap. See `docs/SEO_CONTENT_UPDATE_CHECKLIST.md` for the full SEO checklist when adding new pages.

## Analytics

Google Tag Manager (GTM-TDMCLTT5) is loaded in `app/layout.tsx` using `next/script` with `strategy="afterInteractive"` — non-blocking, loads only after the page is interactive.

## Performance notes

- GTM loaded via `next/script` with `strategy="afterInteractive"` — zero render-blocking impact
- Geist font loaded via `next/font` (self-hosted, no Google Fonts request)
- Edge runtime on `/api/waitlist` for lowest latency
- Static generation for all blog posts (`generateStaticParams`)
- `next/image` for any images added later
