'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="container">
        <nav className="navbar__inner" aria-label="Navigasi utama">

          {/* Logo */}
          <Link href="/" className="navbar__logo" aria-label="International Photography Exhibition – Beranda">
            IPE
            <span>International Photography Exhibition</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar__nav" role="list">
            <li>
              <Link href="/#tentang" className="navbar__link">Tentang</Link>
            </li>
            <li>
              <Link href="/#alur" className="navbar__link">Alur Lomba</Link>
            </li>
            <li>
              <Link href="/#arsip" className="navbar__link">Arsip</Link>
            </li>
          </ul>

          {/* Actions */}
          <div className="navbar__actions">
            <Link href="/login" className="btn btn--secondary" id="nav-login-btn">
              Login Peserta
            </Link>
            <Link href="/daftar" className="btn btn--primary" id="nav-daftar-btn">
              Daftar
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="navbar__mobile-toggle"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
            style={{
              display: 'none',
              padding: '0.5rem',
              color: 'var(--fg)',
            }}
            id="mobile-menu-toggle"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18"/>
                  <line x1="18" y1="4" x2="4" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="19" y2="7"/>
                  <line x1="3" y1="12" x2="19" y2="12"/>
                  <line x1="3" y1="17" x2="19" y2="17"/>
                </>
              )}
            </svg>
          </button>

        </nav>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(250,250,248,0.98)',
            borderBottom: '1px solid var(--border)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Link href="/#tentang"  className="navbar__link" onClick={() => setMenuOpen(false)}>Tentang</Link>
          <Link href="/#alur"     className="navbar__link" onClick={() => setMenuOpen(false)}>Alur Lomba</Link>
          <Link href="/#arsip"    className="navbar__link" onClick={() => setMenuOpen(false)}>Arsip</Link>
          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <Link href="/login"  className="btn btn--secondary" onClick={() => setMenuOpen(false)} style={{ flex: 1, justifyContent: 'center' }}>Login</Link>
            <Link href="/daftar" className="btn btn--primary"   onClick={() => setMenuOpen(false)} style={{ flex: 1, justifyContent: 'center' }}>Daftar</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .navbar__nav { display: none !important; }
          .navbar__actions { display: none !important; }
          .navbar__mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
