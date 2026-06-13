import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbJsonLd, buildCollectionJsonLd, buildWebPageJsonLd } from '@/lib/schema';
import { routes } from '@/lib/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Comparisons & alternatives',
  description:
    'Articles on tools and alternatives — clear writeups with tables and FAQs where they help.',
  pathname: routes.page('compare'),
});

const ComparePage = () => {
  const pageUrl = routes.page('compare');
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      buildWebPageJsonLd({
        name: 'Comparisons and alternatives',
        description: 'Index of comparison and alternatives articles.',
        url: pageUrl,
      }),
      buildBreadcrumbJsonLd([
        { name: 'Home', url: routes.page('home') },
        { name: 'Compare', url: pageUrl },
      ]),
      /* buildCollectionJsonLd({
        name: 'Comparison articles',
        description: 'List of comparison and alternatives articles on the site.',
        url: pageUrl,
        items: comparisons.map((comparison) => ({
          name: comparison.title,
          url: routes.page('compare', comparison.slug),
        })),
      }), */
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph).replace(/</g, '\\u003c'),
        }}
      />
      <div className="min-h-[60vh]">
        <h1 className="mb-4 text-4xl font-bold text-text-bright">Comparisons & Alternatives</h1>
        <p className="max-w-2xl text-muted-foreground">
          Placeholder page: this section will list comparisons and alternatives for postless.
        </p>
      </div>
    </>
  );
};

export default ComparePage;
