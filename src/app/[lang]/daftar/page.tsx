'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { registerParticipant } from './actions'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// Format passport yang valid — huruf kapital dan angka, 6-12 karakter
const PASSPORT_REGEX = /^[A-Z0-9]{6,12}$/

export default function DaftarPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [passportError, setPassportError] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<{ nomor_peserta: string, nama: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const { t, locale } = useLanguage()

  // #3 — Validasi format No. Passport secara real-time
  const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase()
    e.target.value = val // uppercase otomatis
    if (val && !PASSPORT_REGEX.test(val)) {
      setPassportError('Format tidak valid. Gunakan huruf kapital dan angka (6–12 karakter).')
    } else {
      setPassportError(null)
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const passport = (formData.get('no_passport') as string || '').toUpperCase().trim()

    // Validasi client-side sebelum hit server
    if (!PASSPORT_REGEX.test(passport)) {
      setPassportError('Format tidak valid. Gunakan huruf kapital dan angka (6–12 karakter).')
      return
    }

    formData.set('no_passport', passport)

    startTransition(async () => {
      try {
        const result = await registerParticipant(formData)
        if (result.error) {
          setError(result.error)
        } else if (result.data) {
          setSuccessData(result.data)
        }
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan sistem')
      }
    })
  }

  // #6 — Salin nomor peserta satu klik
  const handleCopy = () => {
    if (!successData) return
    navigator.clipboard.writeText(successData.nomor_peserta).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <>
      <Navbar />

      <main className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '8rem' }}>
        <div className="container container--narrow">

          <div className="card ornate-frame" style={{ maxWidth: '32rem', margin: '0 auto' }}>

            {successData ? (
              // — Halaman sukses registrasi —
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '4rem', height: '4rem', borderRadius: '50%',
                  background: 'var(--brass)', color: 'var(--on-brass)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem', fontSize: '2rem',
                }}>
                  ✓
                </div>
                <h2 style={{ marginBottom: '1rem' }}>{t('reg_success_title')}</h2>
                <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem' }}>
                  Selamat bergabung, <strong>{successData.nama}</strong>.<br />
                  {t('reg_success_desc')}
                </p>

                {/* #6 — Nomor peserta dengan tombol salin */}
                <div style={{
                  background: 'var(--bg-alt)', border: '1.5px dashed var(--brass)',
                  padding: '1.25rem', borderRadius: '4px', marginBottom: '0.75rem',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.55rem',
                    textTransform: 'uppercase', letterSpacing: '0.2em',
                    color: 'var(--muted-fg)', marginBottom: '0.5rem',
                  }}>Nomor Peserta Anda</p>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.75rem',
                    letterSpacing: '0.1em', color: 'var(--fg)', marginBottom: '1rem',
                  }}>
                    {successData.nomor_peserta}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="btn btn--secondary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.6rem' }}
                  >
                    {copied ? '✓ Tersalin ke Clipboard!' : '⎘ Salin Nomor Peserta'}
                  </button>
                </div>

                {/* Peringatan penting */}
                <div style={{
                  padding: '0.875rem 1rem',
                  background: '#FFFBF0',
                  border: '1px solid #F0C040',
                  borderRadius: '4px',
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                }}>
                  <p style={{ fontSize: '0.85rem', color: '#7A5A00', lineHeight: 1.6 }}>
                    ⚠️ <strong>Simpan nomor ini!</strong> Anda akan membutuhkannya setiap kali login. Nomor ini tidak dapat diganti.
                  </p>
                </div>

                <p style={{ color: 'var(--muted-fg)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  {t('reg_success_note')}
                </p>
                <Link
                  href={`/${locale}/login`}
                  className="btn btn--primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {t('reg_success_login')}
                </Link>
              </div>
            ) : (
              // — Form registrasi —
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <p className="label" style={{ marginBottom: '0.5rem' }}>{t('reg_title')}</p>
                  <h2>{t('reg_subtitle')}</h2>
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
                    <label htmlFor="nama_lengkap" className="label-text">{t('reg_name')}</label>
                    <input
                      type="text"
                      id="nama_lengkap"
                      name="nama_lengkap"
                      className="input"
                      required
                      placeholder={t('reg_name_placeholder')}
                      disabled={isPending}
                    />
                  </div>

                  <div>
                    <label htmlFor="no_passport" className="label-text">{t('reg_passport')}</label>
                    <input
                      type="text"
                      id="no_passport"
                      name="no_passport"
                      className="input"
                      required
                      placeholder={t('reg_passport_placeholder')}
                      disabled={isPending}
                      onChange={handlePassportChange}
                      style={{
                        borderColor: passportError ? 'var(--crimson)' : undefined,
                        boxShadow: passportError ? '0 0 0 3px rgba(139,38,53,0.12)' : undefined,
                      }}
                      maxLength={12}
                    />
                    {/* #3 — Real-time validation feedback */}
                    {passportError ? (
                      <p style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--crimson)' }}>
                        {passportError}
                      </p>
                    ) : (
                      <p style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--muted-fg)' }}>
                        Contoh: A1234567 · Huruf kapital &amp; angka, 6–12 karakter
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary"
                    style={{ marginTop: '1rem', width: '100%' }}
                    disabled={isPending || !!passportError}
                  >
                    {isPending ? t('reg_loading') : t('reg_submit')}
                  </button>

                  <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--muted-fg)' }}>
                    {t('reg_already')}{' '}
                    <Link href={`/${locale}/login`} style={{ color: 'var(--brass)', textDecoration: 'underline' }}>
                      {t('reg_login_here')}
                    </Link>
                  </p>
                </form>
              </>
            )}

          </div>
        </div>
      </main>
    </>
  )
}
