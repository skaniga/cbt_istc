'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { loginParticipant } from './actions'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await loginParticipant(formData)
      if (result?.error) {
        setError(result.error)
        setLoading(false)
      }
      // Jika berhasil, action akan me-redirect ke /peserta
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem')
      setLoading(false)
    }
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
                <input type="text" id="nomor_peserta" name="nomor_peserta" className="input" required placeholder={t('login_number_placeholder')} />
              </div>

              <div>
                <label htmlFor="password" className="label-text">{t('login_password')}</label>
                <input type="password" id="password" name="password" className="input" required placeholder={t('login_password_placeholder')} />
              </div>

              <button type="submit" className="btn btn--primary" style={{ marginTop: '1.5rem', width: '100%' }} disabled={loading}>
                {loading ? t('login_loading') : t('login_submit')}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--muted-fg)' }}>
                {t('login_no_account')} <Link href="/daftar" style={{ color: 'var(--brass)', textDecoration: 'underline' }}>{t('login_register_here')}</Link>
              </div>
              <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--muted-fg)' }}>
                Atau login sebagai <Link href="/admin/login" style={{ textDecoration: 'underline' }}>Admin</Link>
              </div>

            </form>

          </div>
        </div>
      </main>
    </>
  )
}
