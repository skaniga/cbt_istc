'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAdmin } from './actions'
import { motion, LayoutGroup } from 'framer-motion'

const MAIN_MODULES = [
  { href: '/admin', label: 'Dashboard (Toggle & Status)', exact: true },
  { href: '/admin/peserta', label: 'Participant Management' },
  { href: '/admin/soal', label: 'Question Management' },
]

const SANDBOX_MODULES = [
  { href: '/admin/preview/ujian', label: '🎯 Uji Coba CBT (Sandbox)' },
  { href: '/admin/preview/sertifikat', label: '🎓 Preview Sertifikat' },
]

const ADDITIONAL_MODULES = [
  { href: '/admin/beranda', label: 'Pengaturan Beranda' },
  { href: '/admin/dokumen', label: 'Documents & Selection' },
  { href: '/admin/arsip', label: 'Event Archive' },
  { href: '/admin/sarana', label: 'Facilities & Infrastructure' },
  { href: '/admin/pemenang', label: 'Awards & Winners' },
]

function SidebarLink({
  href,
  label,
  exact,
  onClick,
}: {
  href: string
  label: string
  exact?: boolean
  onClick?: () => void
}) {
  const pathname = usePathname()
  const active = exact ? pathname === href : pathname?.startsWith(href)

  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        padding: '0.75rem 1rem',
        borderRadius: '6px',
        position: 'relative',
        display: 'block',
        color: active ? '#fff' : 'var(--muted-fg)',
        transition: 'color 0.2s ease',
        fontWeight: active ? 600 : 400,
      }}
    >
      {/* Sliding active background */}
      {active && (
        <motion.div
          layoutId="admin-active-indicator"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '6px',
            borderLeft: '3px solid var(--brass, #C5A028)',
          }}
        />
      )}
      <span style={{ position: 'relative', zIndex: 1, fontSize: '0.9rem' }}>{label}</span>
    </Link>
  )
}

export default function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Auto-tutup sidebar saat rute berpindah
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Cegah scroll pada body saat drawer terbuka di mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile Top Header */}
      <header className="admin-mobile-header" role="banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              borderRadius: '6px',
              width: '38px',
              height: '38px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            {isOpen ? '✕' : '☰'}
          </button>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                letterSpacing: '0.12em',
                color: 'var(--brass)',
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              ISTC ADMIN
            </span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>
              Panel Pengelola
            </span>
          </div>
        </div>

        <form action={logoutAdmin} style={{ margin: 0 }}>
          <button
            type="submit"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              borderRadius: '6px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </form>
      </header>

      {/* Backdrop overlay saat drawer mobile aktif */}
      {isOpen && (
        <div
          className="admin-mobile-overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Desktop Sticky / Mobile Drawer) */}
      <aside
        className={`admin-sidebar ${isOpen ? 'admin-sidebar--open' : ''}`}
        aria-label="Admin Navigation"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                color: 'var(--brass)',
                fontWeight: 700,
                margin: 0,
              }}
            >
              ISTC ADMIN
            </p>
            {userEmail && (
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: '0.25rem',
                  maxWidth: '180px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {userEmail}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="admin-sidebar-close"
            aria-label="Tutup navigasi"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1.25rem',
              cursor: 'pointer',
              padding: '0.25rem',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <LayoutGroup>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
            {MAIN_MODULES.map((item) => (
              <SidebarLink key={item.href} {...item} onClick={() => setIsOpen(false)} />
            ))}

            <div style={{ marginTop: '1.25rem', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                TESTING & PREVIEW
              </p>
            </div>

            {SANDBOX_MODULES.map((item) => (
              <SidebarLink key={item.href} {...item} onClick={() => setIsOpen(false)} />
            ))}

            <div style={{ marginTop: '1.25rem', marginBottom: '0.5rem', paddingLeft: '1rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                ADDITIONAL MODULES
              </p>
            </div>

            {ADDITIONAL_MODULES.map((item) => (
              <SidebarLink key={item.href} {...item} onClick={() => setIsOpen(false)} />
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
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            Logout
          </button>
        </form>
      </aside>
    </>
  )
}
