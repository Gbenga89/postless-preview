import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { buildCollectionJsonLd, buildWebPageJsonLd } from '@/lib/schema';
import { routes } from '@/lib/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog',
  description:
    'Product updates, growth playbooks, and engineering notes from the postless team—one script, live editing, and conversion tooling on your site.',
  pathname: routes.page('blog'),
});

const BlogPage = () => {
  const pageUrl = routes.page('blog');
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      buildWebPageJsonLd({
        name: 'postless Blog',
        description:
          'Articles about live-editable growth tooling, on-site experiments, and shipping conversion features with one script.',
        url: pageUrl,
      }),
      buildCollectionJsonLd({
        name: 'Blog posts',
        url: pageUrl,
        items: [
          { name: 'Live editing for marketing sites', url: `${pageUrl}#live-editing` },
          { name: 'Conversion tooling without redeploys', url: `${pageUrl}#conversion-tools` },
          { name: 'Growth automation patterns', url: `${pageUrl}#growth-automation` },
        ],
      }),
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
        <h1 className="mb-4 text-4xl font-bold text-text-bright">Blog</h1>
        <p className="max-w-2xl text-muted-foreground">
          Placeholder page: this section will list articles from the postless team.
        </p>
      </div>
    </>
  );
};

export default BlogPage;
