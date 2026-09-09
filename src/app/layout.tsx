import type { Metadata } from 'next'
import { Cormorant_Garamond, Crimson_Pro, Cinzel } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const crimson = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cinzel',
  display: 'swap',
})

// ─── Konstanta Domain ───────────────────────────────────────────
const SITE_URL = 'https://istcompetition.my'
const SITE_NAME = 'International Science and Technology Competitions'

// ─── Root Metadata ──────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} 2025`,
    template: `%s | ISTC`,
  },
  description:
    'Platform CBT resmi International Science and Technology Competitions 2025. Daftar, ikuti ujian daring di bidang Matematika, IPA, Robotic, dan Technology. Dapatkan sertifikat digital.',
  keywords: [
    'International Science and Technology Competitions',
    'ISTC 2025',
    'lomba sains internasional',
    'lomba teknologi internasional',
    'CBT online',
    'ujian online sains',
    'lomba matematika internasional',
    'lomba robotika',
    'sertifikat digital',
    'istcompetition.my',
  ],

  // ─── Canonical & Alternates (hreflang multi-bahasa) ───────────
  alternates: {
    canonical: SITE_URL,
    languages: {
      'id': `${SITE_URL}/id`,
      'en': `${SITE_URL}/en`,
      'ms': `${SITE_URL}/ms`,
      'x-default': `${SITE_URL}/id`,
    },
  },

  // ─── Open Graph ────────────────────────────────────────────────
  openGraph: {
    title: `${SITE_NAME} 2025`,
    description:
      'Platform CBT resmi ISTC 2025 — Lomba Sains & Teknologi Internasional. Daftar sekarang dan dapatkan sertifikat digital.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'id_ID',
    alternateLocale: ['en_US', 'ms_MY'],
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'International Science and Technology Competitions 2025',
      },
    ],
  },

  // ─── Twitter / X Card ──────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} 2025`,
    description:
      'Platform CBT resmi ISTC 2025 — Lomba Sains & Teknologi Internasional.',
    images: [`${SITE_URL}/og-image.jpg`],
  },

  // ─── Robots — halaman publik boleh diindex ──────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ─── Icons ─────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/icon-48.png',
  },

  // ─── Verification ─────────────────────────────────────────────
  verification: {
    google: 'Z6FF5mD6FyW8ekXHznDpzgilP_5SH4gI21Nfo2LV6II',
  },
}

// ─── JSON-LD Structured Data ────────────────────────────────────
const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'ISTC',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icon-192.png`,
    width: 192,
    height: 192,
  },
  description:
    'Penyelenggara lomba sains dan teknologi internasional yang mengadakan ujian CBT daring di bidang Matematika, IPA, Robotic, dan Technology.',
  sameAs: [
    // Tambahkan social media ISTC di sini jika ada
  ],
}

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: 'Platform CBT resmi International Science and Technology Competitions.',
  inLanguage: ['id', 'en', 'ms'],
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/id?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const jsonLdEvent = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'International Science and Technology Competitions 2025',
  description:
    'Lomba sains dan teknologi internasional dengan ujian CBT daring di bidang Matematika, IPA, Robotic, dan Technology.',
  url: SITE_URL,
  organizer: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  location: {
    '@type': 'VirtualLocation',
    url: SITE_URL,
  },
}

// ─── Layout ─────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${cormorant.variable} ${crimson.variable} ${cinzel.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
