import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { logoutAdmin } from './actions'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { cookies } = await import('next/headers')
  const hasBypassCookie = cookies().get('ipe_admin_session')?.value === 'true'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user && !hasBypassCookie) {
    redirect('/admin/login')
  }

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-alt)' }}>
      
      {/* Sidebar Admin */}
      <aside className="admin-sidebar" style={{ 
        width: '260px', background: 'var(--fg)', color: 'var(--bg)',
        display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem',
        borderRight: '1px solid var(--border)'
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--brass)' }}>
            IPE ADMIN
          </p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <Link href="/admin" style={{ padding: '0.75rem 1rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
            Dashboard (Toggle & Status)
          </Link>
          <Link href="/admin/peserta" style={{ padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--muted-fg)' }}>
            Participant Management
          </Link>
          <Link href="/admin/soal" style={{ padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--muted-fg)' }}>
            Question Management
          </Link>
          <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--muted)' }}>
              ADDITIONAL MODULES
            </p>
          </div>
          <Link href="/admin/dokumen" style={{ padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--muted-fg)' }}>
            Documents & Selection
          </Link>
          <Link href="/admin/arsip" style={{ padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--muted-fg)' }}>
            Event Archive
          </Link>
          <Link href="/admin/sarana" style={{ padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--muted-fg)' }}>
            Facilities & Infrastructure
          </Link>
          <Link href="/admin/pemenang" style={{ padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--muted-fg)' }}>
            Awards & Winners
          </Link>
        </nav>

        <form action={logoutAdmin} style={{ marginTop: 'auto' }}>
          <button type="submit" style={{ 
            width: '100%', padding: '0.75rem', background: 'transparent', 
            border: '1px solid var(--border-dark)', color: 'var(--muted)', borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Logout
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="admin-main" style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto' }}>
        {children}
      </main>

    </div>
  )
}
