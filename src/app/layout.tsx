import type { Metadata } from 'next'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'International Science and Technology Competitions 2025',
    template: '%s | International Science and Technology Competitions',
  },
  description:
    'Platform CBT resmi International Science and Technology Competitions 2025. Daftar, ikuti ujian daring, dan dapatkan sertifikat digital Anda.',
  keywords: [
    'International Science and Technology Competitions',
    'ISTC 2025',
    'lomba fotografi',
    'CBT fotografi',
    'ujian fotografi online',
  ],
  openGraph: {
    title: 'International Science and Technology Competitions 2025',
    description:
      'Platform CBT resmi International Science and Technology Competitions 2025.',
    type: 'website',
    locale: 'id_ID',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Fonts — loaded once here, @import in CSS removed */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=Cinzel:wght@400;500;600&display=swap"
          rel="stylesheet"
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

