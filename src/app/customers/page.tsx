import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { buildCollectionJsonLd, buildWebPageJsonLd } from '@/lib/schema';
import { routes } from '@/lib/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Customer Stories',
  description:
    'See how teams use postless to ship live-editable conversion tools—one script, faster experiments, and growth automation on their sites.',
  pathname: routes.page('customers'),
});

const CustomersPage = () => {
  const pageUrl = routes.page('customers');
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      buildWebPageJsonLd({
        name: 'postless Customer Stories',
        description:
          'Real examples of teams using postless to deploy chat, forms, popups, and live on-site editing.',
        url: pageUrl,
      }),
      buildCollectionJsonLd({
        name: 'Customer stories',
        url: pageUrl,
        items: [
          { name: 'Startup migration story', url: `${pageUrl}#startup-migration` },
          { name: 'Agency delivery workflow', url: `${pageUrl}#agency-workflow` },
          { name: 'SaaS docs scale-up', url: `${pageUrl}#saas-docs` },
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
        <h1 className="mb-4 text-4xl font-bold text-text-bright">Customer Stories</h1>
        <p className="max-w-2xl text-muted-foreground">
          Placeholder page: this section will list case studies and outcomes from teams using postless.
        </p>
      </div>
    </>
  );
};

export default CustomersPage;
