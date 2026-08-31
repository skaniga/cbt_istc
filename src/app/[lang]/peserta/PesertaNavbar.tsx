'use client'

import Link from 'next/link'
import { logoutParticipant } from './actions'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { usePathname } from 'next/navigation'

export default function PesertaNavbar() {
  const { t, locale, setLocale } = useLanguage()
  const pathname = usePathname()

  // Disable ganti bahasa saat peserta sedang mengerjakan ujian (#1 tester)
  // Ganti bahasa di tengah ujian bisa menyebabkan state reset / soal berubah
  const isExamPage = pathname?.includes('/ujian')

  return (
    <header className="navbar navbar--scrolled" role="banner">
      <div className="container">
        <nav className="navbar__inner" aria-label="Participant Navigation">
          <Link href={`/${locale}/peserta`} className="navbar__logo">
            ISTC
            <span>Participant Dashboard</span>
          </Link>

          <div className="navbar__actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

            {/* Language Switcher — disabled saat ujian berlangsung */}
            <div style={{ position: 'relative' }} title={isExamPage ? 'Bahasa tidak dapat diubah saat ujian berlangsung' : ''}>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as 'en' | 'id' | 'ms')}
                disabled={isExamPage}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: isExamPage ? 'var(--muted-fg)' : 'var(--fg)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  cursor: isExamPage ? 'not-allowed' : 'pointer',
                  opacity: isExamPage ? 0.5 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <option value="en">EN</option>
                <option value="id">ID</option>
                <option value="ms">MS</option>
              </select>
              {/* Tooltip visual kecil saat exam */}
              {isExamPage && (
                <span style={{
                  position: 'absolute', top: '110%', right: 0,
                  background: 'var(--bg-deep)', border: '1px solid var(--border)',
                  borderRadius: '4px', padding: '0.3rem 0.6rem',
                  fontFamily: 'var(--font-display)', fontSize: '0.5rem',
                  letterSpacing: '0.08em', color: 'var(--muted-fg)',
                  whiteSpace: 'nowrap', pointerEvents: 'none',
                  // Hanya muncul saat hover via sibling selector di CSS, pakai JS sebagai fallback
                }}>
                  🔒 Terkunci selama ujian
                </span>
              )}
            </div>

            <form action={logoutParticipant}>
              <button
                type="submit"
                className="btn btn--secondary"
                style={{ padding: '0.6rem 1.5rem' }}
                onClick={isExamPage ? (e) => {
                  if (!confirm('Ujian sedang berlangsung. Yakin ingin logout? Jawaban Anda yang sudah tersimpan tidak akan hilang.')) {
                    e.preventDefault()
                  }
                } : undefined}
              >
                {t('dashboard_logout')}
              </button>
            </form>
          </div>
        </nav>
      </div>
    </header>
  )
}
