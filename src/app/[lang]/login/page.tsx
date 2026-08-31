'use client'

import { useState, useTransition, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { loginParticipant } from './actions'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const { t, locale } = useLanguage()
  const router = useRouter()

  // Prefetch halaman peserta saat login page dimuat
  // agar redirect terasa instan setelah login berhasil
  useEffect(() => {
    router.prefetch(`/${locale}/peserta`)
  }, [router, locale])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.append('locale', locale)

    startTransition(async () => {
      try {
        const result = await loginParticipant(formData)
        if (result?.error) {
          setError(result.error)
        }
        // Jika berhasil, action akan me-redirect ke /peserta
        // Router sudah prefetch halaman tersebut sehingga transisi lebih cepat
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan sistem')
      }
    })
  }

  return (
    <>
      <Navbar />
      
      <main className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '8rem' }}>
        <div className="container container--narrow">
          
          <div className="card ornate-frame" style={{ maxWidth: '28rem', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p className="label" style={{ marginBottom: '0.5rem' }}>{t('login_title')}</p>
              <h2>{t('login_subtitle')}</h2>
            </div>

            {error && (
              <div style={{ 
                padding: '1rem', background: '#FFF3F3', border: '1px solid #FFCDCD', 
                color: '#D8000C', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div>
                <label htmlFor="nomor_peserta" className="label-text">{t('login_number')}</label>
                <input
                  type="text"
                  id="nomor_peserta"
                  name="nomor_peserta"
                  className="input"
                  required
                  placeholder={t('login_number_placeholder')}
                  disabled={isPending}
                />
              </div>

              <div>
                <label htmlFor="password" className="label-text">{t('login_password')}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input"
                  required
                  placeholder={t('login_password_placeholder')}
                  disabled={isPending}
                />
              </div>

              <button
                type="submit"
                className="btn btn--primary"
                style={{ marginTop: '1.5rem', width: '100%' }}
                disabled={isPending}
              >
                {isPending ? t('login_loading') : t('login_submit')}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--muted-fg)' }}>
                {t('login_no_account')} <Link href={`/${locale}/daftar`} style={{ color: 'var(--brass)', textDecoration: 'underline' }}>{t('login_register_here')}</Link>
              </div>
              <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--muted-fg)' }}>
                {locale === 'en' ? 'Or login as' : locale === 'ms' ? 'Atau log masuk sebagai' : 'Atau login sebagai'} <a href="/admin/login" style={{ textDecoration: 'underline', color: 'var(--muted-fg)' }}>Admin</a>
              </div>

            </form>

          </div>
        </div>
      </main>
    </>
  )
}
