import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { buildCollectionJsonLd, buildWebPageJsonLd } from '@/lib/schema';
import { routes } from '@/lib/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Guides',
  description:
    'Practical guides for installing postless, live editing conversion tools, and running growth experiments on your website.',
  pathname: routes.page('guides'),
});

const GuidesPage = () => {
  const pageUrl = routes.page('guides');
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      buildWebPageJsonLd({
        name: 'postless Guides',
        description:
          'Educational guides that help teams install the script, configure growth features, and edit live on site.',
        url: pageUrl,
      }),
      buildCollectionJsonLd({
        name: 'postless guides',
        url: pageUrl,
        items: [
          { name: 'Install the postless script', url: `${pageUrl}#install` },
          { name: 'Live edit chat, forms, and popups', url: `${pageUrl}#live-edit` },
          { name: 'Growth automation basics', url: `${pageUrl}#automation` },
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
        <h1 className="mb-4 text-4xl font-bold text-text-bright">Guides</h1>
        <p className="max-w-2xl text-muted-foreground">
          Placeholder page: this section will contain evergreen implementation guides and tutorials.
        </p>
      </div>
    </>
  );
};

export default GuidesPage;
