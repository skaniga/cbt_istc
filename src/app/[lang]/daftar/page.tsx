'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { registerParticipant } from './actions'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const CATEGORIES = [
  { id: 'Environmental Technology', icon: '🌱', label: { en: 'Environmental Technology', id: 'Environmental Technology', ms: 'Teknologi Alam Sekitar' } },
  { id: 'Smart Robotics',           icon: '🤖', label: { en: 'Smart Robotics',           id: 'Smart Robotics',           ms: 'Robotik Pintar' } },
  { id: 'Science In Action',        icon: '🔬', label: { en: 'Science In Action',        id: 'Science In Action',        ms: 'Sains dalam Tindakan' } },
  { id: 'Mathematic',               icon: '📐', label: { en: 'Mathematic',               id: 'Matematika',               ms: 'Matematik' } },
]

const PASSPORT_REGEX = /^[A-Z0-9]{6,12}$/

export default function DaftarPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<{ nomor_peserta: string, nama: string, kategori: string } | null>(null)
  const [selectedKategori, setSelectedKategori] = useState<string | null>(null)
  const [passportError, setPassportError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const { t, locale } = useLanguage()

  const lang = locale as 'en' | 'id' | 'ms'

  const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase()
    e.target.value = val
    if (val && !PASSPORT_REGEX.test(val)) {
      setPassportError('Format tidak valid. Gunakan huruf kapital & angka, 6–12 karakter.')
    } else {
      setPassportError(null)
    }
  }

  const handleCopy = () => {
    if (!successData) return
    navigator.clipboard.writeText(successData.nomor_peserta).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedKategori) {
      setError(
        locale === 'en' ? 'Please select your competition field.'
        : locale === 'ms' ? 'Sila pilih bidang pertandingan anda.'
        : 'Silakan pilih bidang kompetisi Anda.'
      )
      return
    }
    if (passportError) return
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.set('kategori', selectedKategori)

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

  const catLabel = (cat: typeof CATEGORIES[0]) => cat.label[lang] ?? cat.label.en
  const sectionTitle    = locale === 'en' ? 'Choose Your Field' : locale === 'ms' ? 'Pilih Bidang Anda' : 'Pilih Bidang Kompetisi'
  const sectionSubtitle = locale === 'en' ? 'You can only select one field. This cannot be changed after registration.'
    : locale === 'ms' ? 'Anda hanya boleh memilih satu bidang. Ini tidak boleh diubah selepas pendaftaran.'
    : 'Hanya bisa memilih satu bidang. Tidak bisa diubah setelah mendaftar.'

  return (
    <>
      <Navbar />

      <main className="section" style={{ minHeight: '100vh', paddingTop: '7rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '44rem', margin: '0 auto' }}>

          <div className="card ornate-frame">

            {successData ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '4rem', height: '4rem', borderRadius: '50%',
                  background: 'var(--brass)', color: 'var(--on-brass)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem', fontSize: '2rem',
                }}>✓</div>

                <h2 style={{ marginBottom: '1rem' }}>{t('reg_success_title')}</h2>
                <p style={{ color: 'var(--muted-fg)', marginBottom: '0.75rem' }}>
                  {locale === 'en' ? 'Welcome,' : locale === 'ms' ? 'Selamat datang,' : 'Selamat bergabung,'} <strong>{successData.nama}</strong>.
                </p>
                <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  {locale === 'en' ? 'Competition Field: ' : locale === 'ms' ? 'Bidang Pertandingan: ' : 'Bidang Kompetisi: '}
                  <strong style={{ color: 'var(--brass)' }}>{successData.kategori}</strong>
                </p>
                <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem' }}>
                  {t('reg_success_desc')}
                </p>

                {/* Nomor peserta + tombol salin */}
                <div style={{
                  background: 'var(--bg-alt)', border: '1.5px dashed var(--brass)',
                  padding: '1.25rem', borderRadius: '4px', marginBottom: '0.75rem',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.65rem',
                    textTransform: 'uppercase', letterSpacing: '0.2em',
                    color: 'var(--muted-fg)', marginBottom: '0.5rem',
                  }}>Nomor Peserta Anda</p>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.75rem',
                    letterSpacing: '0.1em', color: 'var(--fg)', marginBottom: '1rem',
                  }}>{successData.nomor_peserta}</p>
                  <button
                    onClick={handleCopy}
                    className="btn btn--secondary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                  >
                    {copied ? '✓ Tersalin!' : '⎘ Salin Nomor Peserta'}
                  </button>
                </div>

                {/* Peringatan */}
                <div style={{
                  padding: '0.875rem 1rem', background: '#FFFBF0',
                  border: '1px solid #F0C040', borderRadius: '4px',
                  marginBottom: '1.5rem', textAlign: 'left',
                }}>
                  <p style={{ fontSize: '0.85rem', color: '#7A5A00', lineHeight: 1.6 }}>
                    ⚠️ <strong>Simpan nomor ini!</strong> Anda akan membutuhkannya setiap kali login.
                  </p>
                </div>

                <p style={{ color: 'var(--muted-fg)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  {t('reg_success_note')}
                </p>
                <Link href={`/${locale}/login`} className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {t('reg_success_login')}
                </Link>
              </div>
            ) : (
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

                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                  {/* Nama Lengkap */}
                  <div>
                    <label htmlFor="nama_lengkap" className="label-text">{t('reg_name')}</label>
                    <input
                      type="text" id="nama_lengkap" name="nama_lengkap"
                      className="input" required
                      placeholder={t('reg_name_placeholder')}
                      disabled={isPending}
                      autoComplete="name"
                    />
                  </div>

                  {/* No Passport */}
                  <div>
                    <label htmlFor="no_passport" className="label-text">{t('reg_passport')}</label>
                    <input
                      type="text" id="no_passport" name="no_passport"
                      className="input" required
                      placeholder={t('reg_passport_placeholder')}
                      disabled={isPending}
                      onChange={handlePassportChange}
                      autoComplete="off"
                      maxLength={12}
                      style={{
                        borderColor: passportError ? 'var(--crimson)' : undefined,
                        boxShadow: passportError ? '0 0 0 3px rgba(139,38,53,0.12)' : undefined,
                      }}
                    />
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

                  {/* Pilih Bidang */}
                  <div>
                    <p className="label-text" style={{ marginBottom: '0.5rem' }}>{sectionTitle}</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted-fg)', marginBottom: '1rem' }}>{sectionSubtitle}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      {CATEGORIES.map(cat => {
                        const isSelected = selectedKategori === cat.id
                        return (
                          <button
                            key={cat.id} type="button"
                            id={`kategori-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
                            onClick={() => setSelectedKategori(cat.id)}
                            style={{
                              padding: '1rem 0.75rem',
                              border: isSelected ? '2px solid var(--brass)' : '1px solid var(--border)',
                              borderRadius: '8px',
                              background: isSelected ? 'rgba(180,130,60,0.08)' : 'var(--bg-alt)',
                              cursor: 'pointer', textAlign: 'center',
                              transition: 'all 0.2s ease',
                              boxShadow: isSelected ? '0 0 0 1px var(--brass)' : 'none',
                            }}
                          >
                            <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{cat.icon}</div>
                            <div style={{
                              fontSize: '0.82rem', fontWeight: 600,
                              color: isSelected ? 'var(--brass)' : 'var(--fg)',
                              fontFamily: 'var(--font-heading)', lineHeight: 1.3,
                            }}>{catLabel(cat)}</div>
                            {isSelected && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--brass)', marginTop: '0.3rem' }}>✓ Selected</div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <button
                    type="submit" className="btn btn--primary"
                    style={{ marginTop: '0.5rem', width: '100%' }}
                    disabled={isPending || !selectedKategori || !!passportError}
                  >
                    {isPending ? t('reg_loading') : t('reg_submit')}
                  </button>

                  <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--muted-fg)' }}>
                    {t('reg_already')} <Link href={`/${locale}/login`} style={{ color: 'var(--brass)', textDecoration: 'underline' }}>{t('reg_login_here')}</Link>
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
