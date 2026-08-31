import type { Metadata } from 'next'

// Halaman login adalah private — jangan diindex Google
export const metadata: Metadata = {
  title: 'Login Peserta',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
