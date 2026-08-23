'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Locale } from '@/lib/i18n/translations'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, locale, setLocale } = useLanguage()

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
          <Link href={`/${locale}`} className="navbar__logo" aria-label="International Photography Exhibition – Beranda" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/logo.webp" alt="IPE Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>IPE</span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-fg)' }}>International Photography Exhibition</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar__nav" role="list">
            <li>
              <Link href={`/${locale}#tentang`} className="navbar__link">{t('nav_about')}</Link>
            </li>
            <li>
              <Link href={`/${locale}#alur`} className="navbar__link">{t('nav_flow')}</Link>
            </li>
            <li>
              <Link href={`/${locale}#arsip`} className="navbar__link">{t('nav_archive')}</Link>
            </li>
          </ul>

          {/* Actions */}
          <div className="navbar__actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            
            <select 
              value={locale} 
              onChange={(e) => setLocale(e.target.value as Locale)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              <option value="en">EN</option>
              <option value="id">ID</option>
              <option value="ms">MS</option>
            </select>

            <Link href={`/${locale}/login`} className="btn btn--secondary" id="nav-login-btn">
              {t('nav_login')}
            </Link>
            <Link href={`/${locale}/daftar`} className="btn btn--primary" id="nav-daftar-btn">
              {t('nav_register')}
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
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <select 
              value={locale} 
              onChange={(e) => {
                setLocale(e.target.value as Locale)
                setMenuOpen(false)
              }}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                padding: '0.5rem',
                borderRadius: '4px',
                fontFamily: 'var(--font-body)',
              }}
            >
              <option value="en">English</option>
              <option value="id">Indonesia</option>
              <option value="ms">Melayu</option>
            </select>
          </div>
          <Link href={`/${locale}#tentang`}  className="navbar__link" onClick={() => setMenuOpen(false)}>{t('nav_about')}</Link>
          <Link href={`/${locale}#alur`}     className="navbar__link" onClick={() => setMenuOpen(false)}>{t('nav_flow')}</Link>
          <Link href={`/${locale}#arsip`}    className="navbar__link" onClick={() => setMenuOpen(false)}>{t('nav_archive')}</Link>
          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <Link href={`/${locale}/login`}  className="btn btn--secondary" onClick={() => setMenuOpen(false)} style={{ flex: 1, justifyContent: 'center' }}>{t('nav_login')}</Link>
            <Link href={`/${locale}/daftar`} className="btn btn--primary"   onClick={() => setMenuOpen(false)} style={{ flex: 1, justifyContent: 'center' }}>{t('nav_register')}</Link>
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
