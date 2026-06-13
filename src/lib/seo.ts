import type { Metadata } from 'next';
import { siteConfig, toAbsoluteUrl } from '@/lib/site';

type BuildPageMetadataInput = {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  noIndex?: boolean;
};

const normalizePathname = (pathname: string): string => {
  if (!pathname) return '/';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
};

export const buildPageMetadata = ({
  title,
  description,
  pathname,
  image,
  noIndex = false,
}: BuildPageMetadataInput): Metadata => {
  const normalizedPath = normalizePathname(pathname);
  const imageUrl = image ? toAbsoluteUrl(image) : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: normalizedPath,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      type: 'website',
      url: normalizedPath,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
};
