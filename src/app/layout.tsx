import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import '@/index.css';
import Providers from '@/app/providers';
import { siteConfig } from '@/lib/site';
import { routes } from '@/lib/routes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/lib/schema';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: routes.page('home'),
    siteName: siteConfig.name,
    title: `${siteConfig.name}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary',
    title: `${siteConfig.name}`,
    description: siteConfig.description,
  },
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const siteSchemas = {
    '@context': 'https://schema.org',
    '@graph': [buildOrganizationJsonLd(), buildWebSiteJsonLd()],
  };

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteSchemas).replace(/</g, '\\u003c'),
          }}
        />
        <Providers>
          <div id="top">
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
