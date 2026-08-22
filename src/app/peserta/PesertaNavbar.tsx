'use client'

import Link from 'next/link'
import { logoutParticipant } from './actions'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function PesertaNavbar() {
  const { t, locale, setLocale } = useLanguage()

  return (
    <header className="navbar navbar--scrolled" role="banner">
      <div className="container">
        <nav className="navbar__inner" aria-label="Participant Navigation">
          <Link href="/peserta" className="navbar__logo">
            IPE
            <span>Participant Dashboard</span>
          </Link>

          <div className="navbar__actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Language Switcher */}
            <select 
              value={locale} 
              onChange={(e) => setLocale(e.target.value as 'en' | 'id' | 'ms')}
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

            <form action={logoutParticipant}>
              <button type="submit" className="btn btn--secondary" style={{ padding: '0.6rem 1.5rem' }}>
                {t('dashboard_logout')}
              </button>
            </form>
          </div>
        </nav>
      </div>
    </header>
  )
}
