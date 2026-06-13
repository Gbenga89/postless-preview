import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase:  new URL('https://postless.app'),
  title: {
    default:  'Postless — Build your brand. Without the posting grind.',
    template: '%s | Postless',
  },
  description:
    'Set your brand goal once. Postless plans your content, drafts every post, and only asks for your sign-off before anything goes live.',
  openGraph: {
    siteName:    'Postless',
    type:        'website',
    url:         'https://postless.app',
    title:       'Postless — Build your brand. Without the posting grind.',
    description: 'Set your brand goal once. Postless handles the rest.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@postlessapp',
    title:       'Postless — Build your brand. Without the posting grind.',
    description: 'Set your brand goal once. Postless handles the rest.',
    images:      ['/og.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://postless.app' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-bg text-ink">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TDMCLTT5" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}

        {/* Google Tag Manager — lazyOnload: loads during idle time, zero render-blocking */}
        <Script
          id="gtm"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TDMCLTT5');` }}
        />
      </body>
    </html>
  )
}
