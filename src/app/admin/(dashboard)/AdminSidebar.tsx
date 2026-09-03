'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAdmin } from './actions'
import { motion, LayoutGroup } from 'framer-motion'

const MAIN_MODULES = [
  { href: '/admin', label: 'Dashboard (Toggle & Status)', exact: true },
  { href: '/admin/peserta', label: 'Participant Management' },
  { href: '/admin/soal', label: 'Question Management' },
]

const ADDITIONAL_MODULES = [
  { href: '/admin/beranda', label: 'Pengaturan Beranda' },
  { href: '/admin/dokumen', label: 'Documents & Selection' },
  { href: '/admin/arsip', label: 'Event Archive' },
  { href: '/admin/sarana', label: 'Facilities & Infrastructure' },
  { href: '/admin/pemenang', label: 'Awards & Winners' },
]

function SidebarLink({ href, label, exact }: { href: string; label: string; exact?: boolean }) {
  const pathname = usePathname()
  const active = exact ? pathname === href : pathname?.startsWith(href)

  return (
    <Link
      href={href}
      style={{
        padding: '0.75rem 1rem',
        borderRadius: '4px',
        position: 'relative',
        display: 'block',
        color: active ? '#fff' : 'var(--muted-fg)',
        transition: 'color 0.2s ease',
      }}
    >
      {/* Sliding active background — shared layoutId makes it animate between items */}
      {active && (
        <motion.div
          layoutId="admin-active-indicator"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '4px',
            borderLeft: '2px solid var(--brass, #C5A028)',
          }}
        />
      )}
      <span style={{ position: 'relative', zIndex: 1, fontSize: '0.9rem' }}>{label}</span>
    </Link>
  )
}

export default function AdminSidebar() {
  return (
    <aside
      className="admin-sidebar"
      style={{
        width: '260px',
        background: 'var(--fg)',
        color: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.5rem',
        borderRight: '1px solid var(--border)',
      }}
    >
      <div style={{ marginBottom: '3rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            color: 'var(--brass)',
          }}
        >
          ISTC ADMIN
        </p>
      </div>

      {/* LayoutGroup makes layoutId work across all SidebarLink children */}
      <LayoutGroup>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          {MAIN_MODULES.map((item) => (
            <SidebarLink key={item.href} {...item} />
          ))}

          <div style={{ marginTop: '1.25rem', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                color: 'var(--muted)',
              }}
            >
              ADDITIONAL MODULES
            </p>
          </div>

          {ADDITIONAL_MODULES.map((item) => (
            <SidebarLink key={item.href} {...item} />
          ))}
        </nav>
      </LayoutGroup>

      <form action={logoutAdmin} style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'transparent',
            border: '1px solid var(--border-dark)',
            color: 'var(--muted)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          Logout
        </button>
      </form>
    </aside>
  )
}
