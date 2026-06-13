const name = 'postless';
const tagline = 'AI Scheduled Social Media Posts';

export const siteConfig = {
  name,
  tagline,
  title: `${name} | ${tagline}`,
  description: 'Build your brand with AI scheduled social media posts.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://postless.app',
  locale: 'en_US',
};

export const toAbsoluteUrl = (pathOrUrl: string): string => {
  return new URL(pathOrUrl, siteConfig.url).toString();
};
