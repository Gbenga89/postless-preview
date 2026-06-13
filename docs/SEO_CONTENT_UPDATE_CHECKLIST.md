# SEO Content Update Checklist

Use this checklist every time you add or update pages (homepage sections, use-case pages, guides,
blog posts, comparisons).

**postless positioning (use consistently in copy):** postless is a live-editable growth engine for
websites: businesses deploy, manage, and automate conversion tools with a single script—install once,
activate growth features, edit everything live on the site.

## 1) Page-level metadata (required)

- Add page metadata in the route file (`page.tsx`) using `buildPageMetadata` from `src/lib/seo.ts`.
- Set a unique `title` (target keyword near the start).
- Set a unique `description` (clear intent + CTR-friendly copy).
- Set a canonical URL in `alternates.canonical`.
- Set robots directives (index/follow defaults unless page should stay out of search).

## 2) Crawl and indexing controls

- Confirm the new route should be indexable.
- If yes, include it in `src/app/sitemap.ts`.
- If no, either:
  - set page-level robots to `noindex`, or
  - keep it out of sitemap and disallow if appropriate.
- Keep `src/app/robots.ts` up to date for blocked sections:
  - `/admin`
  - `/api`
  - `/preview`

## 3) URL and content quality

- Build paths through `routes.page(...)` in `src/lib/routes.ts` (avoid hardcoded route strings).
- For client navigation between internal pages, use Next.js `Link` instead of plain
  `<a href="/...">`.
- For in-page navigation on the homepage, prefer anchor sections (`href="#features"`) with stable
  IDs.
- Use clean readable URLs:
  - `/blog/nextjs-seo-guide` (good)
  - avoid query-string-only URLs as primary pages.
- Ensure one clear `h1` per page.
- Use semantic heading order: `h1 -> h2 -> h3`.
- Add internal links to related pages with descriptive anchor text.

## 4) Structured data (JSON-LD)

- Add relevant schema in server components:
  - `Article` for blog posts
  - `FAQPage` for FAQ-heavy pages
  - `CollectionPage` + `ItemList` for listing pages (e.g. `/blog`)
  - `BreadcrumbList` for deep pages
  - `Organization`/`WebSite` at site level
- Use helpers from `src/lib/schema.ts`:
  - `buildOrganizationJsonLd()`
  - `buildWebSiteJsonLd()`
  - `buildWebPageJsonLd(page)`
  - `buildArticleJsonLd(post)`
  - `buildFaqJsonLd(items)`
  - `buildBreadcrumbJsonLd(items)`
  - `buildCollectionJsonLd(listPage)`
- Keep schema aligned with visible content.
- Validate with Google Rich Results Test before release.

### Example: comparison detail page JSON-LD graph

```ts
import {
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
  buildCollectionJsonLd,
  buildFaqJsonLd,
} from '@/lib/schema';

const pageUrl = '/compare/strapi-vs-postless';

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    buildWebPageJsonLd({
      name: 'Strapi vs postless',
      description: 'Detailed comparison of setup, editing experience, and workflows.',
      url: pageUrl,
    }),
    buildBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Compare', url: '/compare' },
      { name: 'Strapi vs postless', url: pageUrl },
    ]),
    buildCollectionJsonLd({
      name: 'Comparison matrix',
      url: pageUrl,
      items: [
        { name: 'Setup complexity', url: `${pageUrl}#setup` },
        { name: 'API experience', url: `${pageUrl}#api` },
        { name: 'Pricing model', url: `${pageUrl}#pricing` },
      ],
    }),
    buildFaqJsonLd([
      {
        question: 'Can I switch from Strapi to postless?',
        answer:
          'Yes. Most teams start by replacing popups/forms/chat first, then consolidate analytics and workflows.',
      },
    ]),
  ],
};
```

## 5) Social and sharing metadata

- Add Open Graph and Twitter metadata per page when possible.
- Prefer a specific OG image per major page (1200x630).
- Avoid broken image URLs in metadata.

## 6) Performance and UX guardrails

- Keep pages mobile-friendly.
- Avoid large client-only roots; keep route files server-rendered where possible.
- Minimize layout shifts and heavy scripts.
- Use optimized images and explicit dimensions.

## 7) Cloudflare Pages deploy flow

Current deployment model:

1. Push to Git
2. Cloudflare Pages build runs `npm run build`
3. Next.js generates static output in `out/`
4. Cloudflare deploys globally

When CMS content is introduced:

- Fetch content at build time for SSG pages.
- Trigger rebuilds using a Cloudflare Deploy Hook after content publish.

## 8) Pre-launch checks for every release

- Metadata unique on all new pages
- Canonicals correct
- Sitemap includes only indexable pages
- Robots rules still valid
- Structured data validates
- No broken internal links
