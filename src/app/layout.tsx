import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'International Photography Exhibition 2025',
    template: '%s | International Photography Exhibition',
  },
  description:
    'Platform CBT resmi International Photography Exhibition 2025. Daftar, ikuti ujian daring, dan dapatkan sertifikat digital Anda.',
  keywords: [
    'International Photography Exhibition',
    'IPE 2025',
    'lomba fotografi',
    'CBT fotografi',
    'ujian fotografi online',
  ],
  openGraph: {
    title: 'International Photography Exhibition 2025',
    description:
      'Platform CBT resmi International Photography Exhibition 2025.',
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
      </head>
      <body>{children}</body>
    </html>
  )
}
