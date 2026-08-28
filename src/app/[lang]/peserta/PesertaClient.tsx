'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { StartExamForm } from './components'
import { Participant, ExamSession } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function PesertaClient({
  participant,
  examSession,
  isAksesTerbuka,
  batasSoal,
  durasiMenit,
  nilaiLulus,
}: {
  participant: Participant
  examSession: ExamSession | null
  isAksesTerbuka: boolean
  batasSoal: string
  durasiMenit: string
  nilaiLulus: string
}) {
  const { t, locale } = useLanguage()
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  // Supabase Realtime — auto-refresh dashboard saat akses ujian dibuka admin (#9 tester)
  // Peserta tidak perlu manual refresh — halaman update otomatis
  useEffect(() => {
    // Hanya aktif jika ujian belum dimulai dan akses belum terbuka
    if (examSession || isAksesTerbuka) return

    // Poll setiap 15 detik — sederhana dan reliable
    // (Supabase Realtime bisa ditambahkan jika ada channel yang sesuai)
    const interval = setInterval(() => {
      router.refresh()
    }, 15000)

    return () => clearInterval(interval)
  }, [examSession, isAksesTerbuka, router])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const examDone = examSession?.status === 'selesai'
  const examInProgress = examSession?.status === 'in_progress'

  return (
    <div className="section" style={{ paddingTop: '3rem' }}>
      <div className="container container--narrow">

        {/* Header selamat datang */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p className="label" style={{ marginBottom: '0.5rem' }}>{t('dashboard_welcome')},</p>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{participant.nama_lengkap}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <p style={{ color: 'var(--muted-fg)', fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                {participant.nomor_peserta} • {participant.no_passport}
              </p>
              {/* #6 — Salin nomor peserta satu klik */}
              <button
                onClick={() => handleCopy(participant.nomor_peserta)}
                title="Salin nomor peserta"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  fontFamily: 'var(--font-display)', fontSize: '0.55rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: copied ? '#27AE60' : 'var(--brass)',
                  background: 'transparent', border: 'none',
                  cursor: 'pointer', transition: 'color 0.2s',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '3px',
                  outline: '1px solid currentColor',
                }}
              >
                {copied ? '✓ Tersalin' : '⎘ Salin'}
              </button>
            </div>
          </div>
        </div>

        {/* #1 — Info Ujian Card */}
        {!examDone && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            {[
              { label: 'Jumlah Soal', value: batasSoal, icon: '📋' },
              { label: 'Durasi Ujian', value: `${durasiMenit} menit`, icon: '⏱' },
              { label: 'Nilai Lulus', value: `≥ ${nilaiLulus}`, icon: '🎯' },
            ].map(info => (
              <div key={info.label} style={{
                background: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '1.25rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
                <span style={{ fontSize: '1.5rem' }}>{info.icon}</span>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.55rem',
                    textTransform: 'uppercase', letterSpacing: '0.15em',
                    color: 'var(--muted-fg)', marginBottom: '0.25rem',
                  }}>{info.label}</p>
                  <p style={{
                    fontFamily: 'var(--font-heading)', fontSize: '1.5rem',
                    lineHeight: 1, color: 'var(--fg)',
                  }}>{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Card Utama — Status Ujian */}
        <div className="card ornate-frame">
          <div className="peserta-card-inner" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>

            <div style={{ flex: 1, minWidth: '280px' }}>
              <p className="label" style={{ marginBottom: '1rem', color: 'var(--brass)' }}>{t('dashboard_cbt_status')}</p>

              {/* Belum mulai */}
              {!examSession && (
                <>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{t('dashboard_not_started')}</h2>
                  <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {t('dashboard_exam_desc').replace('50', batasSoal)}
                  </p>

                  {/* #2 — Status akses ditutup yang lebih informatif */}
                  {/* Notice ujian satu kali + tombol mulai / akses ditutup (#10 tester) */}
                  {isAksesTerbuka ? (
                    <>
                      {/* Warning: ujian hanya bisa dikerjakan satu kali */}
                      <div style={{
                        padding: '0.875rem 1rem',
                        background: '#FFFBF0',
                        border: '1px solid #F0C040',
                        borderRadius: '4px',
                        marginBottom: '1.25rem',
                      }}>
                        <p style={{ fontSize: '0.875rem', color: '#7A5A00', lineHeight: 1.6 }}>
                          ⚠️ <strong>Perhatian:</strong> Ujian hanya dapat dikerjakan <strong>satu kali</strong>.
                          Pastikan Anda berada di tempat yang tenang dengan koneksi internet yang stabil sebelum memulai.
                        </p>
                      </div>
                      <StartExamForm buttonLabel={t('dashboard_exam_start')} />
                    </>
                  ) : (
                    <div style={{
                      padding: '1.25rem 1.5rem',
                      background: 'var(--bg-alt)',
                      border: '1px solid var(--border)',
                      borderLeft: '3px solid var(--brass)',
                      borderRadius: '4px',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-display)', fontSize: '0.6rem',
                        textTransform: 'uppercase', letterSpacing: '0.15em',
                        color: 'var(--brass)', marginBottom: '0.5rem',
                      }}>⏸ Akses Belum Dibuka</p>
                      <p style={{ color: 'var(--muted-fg)', fontSize: '1rem', lineHeight: 1.6 }}>
                        Ujian akan segera dibuka oleh panitia. Pastikan Anda sudah siap sebelum memulai — ujian hanya dapat dikerjakan <strong>satu kali</strong>.
                      </p>
                      <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--muted-fg)' }}>
                        Silakan refresh halaman ini secara berkala untuk mengecek status akses.
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Sedang ujian */}
              {examInProgress && (
                <>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{t('dashboard_in_progress')}</h2>
                  <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {t('dashboard_in_progress_desc')}
                  </p>
                  <StartExamForm buttonLabel={t('dashboard_exam_continue')} />
                </>
              )}

              {/* Ujian selesai */}
              {examDone && (
                <>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{t('dashboard_exam_done')}</h2>
                  <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {t('dashboard_exam_done_desc')}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
                    <div>
                      <p className="label">{t('dashboard_score')}</p>
                      <p style={{
                        fontFamily: 'var(--font-heading)', fontSize: '3.5rem',
                        lineHeight: 1, color: participant.lulus ? 'var(--fg)' : 'var(--crimson)'
                      }}>
                        {participant.skor ?? 0}
                      </p>
                    </div>
                    <div>
                      <p className="label">{t('dashboard_status')}</p>
                      <p style={{
                        fontFamily: 'var(--font-display)', fontSize: '1.25rem',
                        color: participant.lulus ? 'var(--brass)' : 'var(--muted-fg)',
                        letterSpacing: '0.1em', marginTop: '0.5rem'
                      }}>
                        {participant.lulus ? t('dashboard_passed') : t('dashboard_failed')}
                      </p>
                    </div>
                  </div>

                  {/* Nilai lulus info */}
                  <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--muted-fg)' }}>
                    Nilai lulus minimum: <strong>{nilaiLulus}</strong>
                  </p>

                  <div style={{ marginTop: '2.5rem' }}>
                    <Link
                      href={`/${locale}/peserta/sertifikat`}
                      className="btn btn--primary"
                      style={{ minWidth: '12rem', justifyContent: 'center' }}
                    >
                      {t('dashboard_certificate')}
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="peserta-arch-deco" style={{
              width: '180px', height: '240px', background: 'var(--muted)',
              borderRadius: '40% 40% 0 0 / 20% 20% 0 0', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--border-dark)',
              border: '1px solid var(--border)', flexShrink: 0,
            }}>
              <span style={{ fontSize: '4rem', opacity: 0.5 }}>◬</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
