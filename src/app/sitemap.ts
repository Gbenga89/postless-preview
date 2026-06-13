import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { routes } from '@/lib/routes';

export const dynamic = 'force-static';

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();
  const staticRoutes = [
    routes.page('home'),
    routes.page('compare'),
    routes.page('customers'),
    routes.page('guides'),
    routes.page('blog'),
  ];

  const allRoutes = [...staticRoutes];

  return allRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : route.startsWith(routes.page('compare')) ? 0.75 : 0.8,
  }));
};

export default sitemap;
