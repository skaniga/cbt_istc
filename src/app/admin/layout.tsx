import type { Metadata } from 'next'

// Semua halaman admin adalah private — jangan diindex Google
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Admin — ISTC',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
