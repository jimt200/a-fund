import type { Metadata, Viewport } from 'next'
import './globals.css'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'

export const metadata: Metadata = {
  title: {
    default: "A-FUND - Investissez dans l'agriculture africaine",
    template: '%s | A-FUND',
  },
  description: "Plateforme de financement participatif agricole en Afrique de l'Ouest. Investissez dès 10 000 FCFA avec des rendements de 15-28%.",
  keywords: ['investissement', 'agriculture', 'Côte d\'Ivoire', 'crowdfunding', 'coopérative'],
  authors: [{ name: 'HOKMA Labs' }],
  creator: 'HOKMA Labs',
  publisher: 'A-FUND',
  applicationName: 'A-FUND',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'A-FUND',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'A-FUND',
    title: "A-FUND - Investissez dans l'agriculture africaine",
    description: "Plateforme de financement participatif agricole en Côte d'Ivoire",
    locale: 'fr_CI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A-FUND',
    description: "Investissez dans l'agriculture africaine",
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#16a34a' },
    { media: '(prefers-color-scheme: dark)', color: '#15803d' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#16a34a" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
      </head>
      <body>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}