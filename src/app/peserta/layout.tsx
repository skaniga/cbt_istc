import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { logoutParticipant } from './actions'

export default async function PesertaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <header className="navbar navbar--scrolled" role="banner">
        <div className="container">
          <nav className="navbar__inner" aria-label="Navigasi Peserta">
            <Link href="/peserta" className="navbar__logo">
              IPE
              <span>Dashboard Peserta</span>
            </Link>

            <div className="navbar__actions">
              <form action={logoutParticipant}>
                <button type="submit" className="btn btn--secondary" style={{ padding: '0.6rem 1.5rem' }}>
                  Keluar
                </button>
              </form>
            </div>
          </nav>
        </div>
      </header>
      
      <main style={{ paddingTop: '5rem', minHeight: '100vh' }}>
        {children}
      </main>
    </>
  )
}
