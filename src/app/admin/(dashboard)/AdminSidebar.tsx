'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAdmin } from './actions'

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) return pathname === path
    return pathname?.startsWith(path)
  }

  const activeStyle = { padding: '0.75rem 1rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: '#fff' }
  const inactiveStyle = { padding: '0.75rem 1rem', borderRadius: '4px', color: 'var(--muted-fg)' }

  return (
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
        <Link href="/admin" style={isActive('/admin', true) ? activeStyle : inactiveStyle}>
          Dashboard (Toggle & Status)
        </Link>
        <Link href="/admin/peserta" style={isActive('/admin/peserta') ? activeStyle : inactiveStyle}>
          Participant Management
        </Link>
        <Link href="/admin/soal" style={isActive('/admin/soal') ? activeStyle : inactiveStyle}>
          Question Management
        </Link>
        <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--muted)' }}>
            ADDITIONAL MODULES
          </p>
        </div>
        <Link href="/admin/beranda" style={isActive('/admin/beranda') ? activeStyle : inactiveStyle}>
          Pengaturan Beranda
        </Link>
        <Link href="/admin/dokumen" style={isActive('/admin/dokumen') ? activeStyle : inactiveStyle}>
          Documents & Selection
        </Link>
        <Link href="/admin/arsip" style={isActive('/admin/arsip') ? activeStyle : inactiveStyle}>
          Event Archive
        </Link>
        <Link href="/admin/sarana" style={isActive('/admin/sarana') ? activeStyle : inactiveStyle}>
          Facilities & Infrastructure
        </Link>
        <Link href="/admin/pemenang" style={isActive('/admin/pemenang') ? activeStyle : inactiveStyle}>
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
  )
}
