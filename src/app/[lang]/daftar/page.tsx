'use client'

import { useState } from 'react'
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

export default function DaftarPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<{ nomor_peserta: string, nama: string, kategori: string } | null>(null)
  const [selectedKategori, setSelectedKategori] = useState<string | null>(null)
  const { t, locale } = useLanguage()

  const lang = locale as 'en' | 'id' | 'ms'

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedKategori) {
      setError(locale === 'en' ? 'Please select your competition field.' : locale === 'ms' ? 'Sila pilih bidang pertandingan anda.' : 'Silakan pilih bidang kompetisi Anda.')
      return
    }
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.set('kategori', selectedKategori)
    
    try {
      const result = await registerParticipant(formData)
      if (result.error) {
        setError(result.error)
      } else if (result.data) {
        setSuccessData(result.data)
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem')
    } finally {
      setLoading(false)
    }
  }

  const catLabel = (cat: typeof CATEGORIES[0]) => cat.label[lang] ?? cat.label.en

  const sectionTitle  = locale === 'en' ? 'Choose Your Field' : locale === 'ms' ? 'Pilih Bidang Anda' : 'Pilih Bidang Kompetisi'
  const sectionSubtitle = locale === 'en' ? 'You can only select one field. This cannot be changed after registration.' : locale === 'ms' ? 'Anda hanya boleh memilih satu bidang. Ini tidak boleh diubah selepas pendaftaran.' : 'Hanya bisa memilih satu bidang. Tidak bisa diubah setelah mendaftar.'

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
                  margin: '0 auto 1.5rem', fontSize: '2rem'
                }}>
                  ✓
                </div>
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
                <div style={{ 
                  background: 'var(--bg-alt)', border: '1px dashed var(--brass)', 
                  padding: '1rem', borderRadius: '4px', marginBottom: '2rem',
                  fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.1em',
                  color: 'var(--fg)'
                }}>
                  {successData.nomor_peserta}
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
                    <input type="text" id="nama_lengkap" name="nama_lengkap" className="input" required placeholder={t('reg_name_placeholder')} />
                  </div>

                  {/* No Passport */}
                  <div>
                    <label htmlFor="no_passport" className="label-text">{t('reg_passport')}</label>
                    <input type="text" id="no_passport" name="no_passport" className="input" required placeholder={t('reg_passport_placeholder')} />
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
                            key={cat.id}
                            type="button"
                            id={`kategori-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
                            onClick={() => setSelectedKategori(cat.id)}
                            style={{
                              padding: '1rem 0.75rem',
                              border: isSelected ? '2px solid var(--brass)' : '1px solid var(--border)',
                              borderRadius: '8px',
                              background: isSelected ? 'rgba(var(--brass-rgb, 180,130,60), 0.08)' : 'var(--bg-alt)',
                              cursor: 'pointer',
                              textAlign: 'center',
                              transition: 'all 0.2s ease',
                              boxShadow: isSelected ? '0 0 0 1px var(--brass)' : 'none',
                            }}
                          >
                            <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{cat.icon}</div>
                            <div style={{
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              color: isSelected ? 'var(--brass)' : 'var(--fg)',
                              fontFamily: 'var(--font-heading)',
                              lineHeight: 1.3,
                            }}>
                              {catLabel(cat)}
                            </div>
                            {isSelected && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--brass)', marginTop: '0.3rem' }}>✓ Selected</div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary"
                    style={{ marginTop: '0.5rem', width: '100%' }}
                    disabled={loading || !selectedKategori}
                  >
                    {loading ? t('reg_loading') : t('reg_submit')}
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
