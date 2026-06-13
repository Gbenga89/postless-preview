export type PageRouteKey =
  | 'home'
  | 'customers'
  | 'guides'
  | 'blog'
  | 'compare'
  | 'resources'
  | 'contact'
  | 'pricing'
  | 'docs';
export type ApiRouteKey = 'root' | 'resources' | 'waitlist';

const pageBaseRoutes: Record<PageRouteKey, string> = {
  home: '/',
  customers: '/customers',
  guides: '/guides',
  blog: '/blog',
  compare: '/compare',
  resources: '/resources',
  contact: '/contact',
  pricing: '/pricing',
  docs: '/docs',
};

const apiBaseRoutes: Record<ApiRouteKey, string> = {
  root: '/api',
  resources: '/api/resources',
  waitlist: '/api/waitlist',
};

export const toSlug = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export const routes = {
  page: (route: PageRouteKey, slug?: string): string => {
    const baseRoute = pageBaseRoutes[route];
    if (route === 'home' || !slug) {
      return baseRoute;
    }

    return `${baseRoute}/${toSlug(slug)}`;
  },
  api: (route: ApiRouteKey = 'root', slug?: string): string => {
    const baseRoute = apiBaseRoutes[route];
    if (!slug) {
      return baseRoute;
    }

    return `${baseRoute}/${toSlug(slug)}`;
  },
};
