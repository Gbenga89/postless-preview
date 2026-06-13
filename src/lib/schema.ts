import { siteConfig, toAbsoluteUrl } from '@/lib/site';

type BlogPostSchemaInput = {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  image?: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type CollectionListPageInput = {
  name: string;
  url: string;
  description?: string;
  items: Array<{
    name: string;
    url: string;
  }>;
};

type WebPageSchemaInput = {
  name: string;
  description: string;
  url: string;
};

type BreadcrumbItem = {
  name: string;
  url: string;
};

// Use on shared layout to describe your brand/entity at site level.
export const buildOrganizationJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
};

// Use on shared layout when you also want a top-level WebSite entity.
export const buildWebSiteJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
};

// Use on detail pages (e.g. /compare/[slug], landing pages, docs pages) to describe that specific page.
export const buildWebPageJsonLd = (page: WebPageSchemaInput) => {
  const pageUrl = toAbsoluteUrl(page.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.name,
    description: page.description,
    url: pageUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
};

// Use on single content pages such as /blog/[slug], guides, or docs articles.
export const buildArticleJsonLd = (post: BlogPostSchemaInput) => {
  const articleUrl = toAbsoluteUrl(post.url);
  const imageUrl = post.image ? toAbsoluteUrl(post.image) : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.headline,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: post.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
};

// Use on FAQ-focused pages or substantial FAQ sections with full visible Q&A.
export const buildFaqJsonLd = (items: FaqItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};

// Use when the page shows a visible breadcrumb trail and route hierarchy matters for navigation.
export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.url),
    })),
  };
};

// Use on listing/archive pages such as /blog, /compare, or template index pages.
export const buildCollectionJsonLd = (listPage: CollectionListPageInput) => {
  const pageUrl = toAbsoluteUrl(listPage.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: listPage.name,
    description: listPage.description,
    url: pageUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: listPage.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: toAbsoluteUrl(item.url),
      })),
    },
  };
};
