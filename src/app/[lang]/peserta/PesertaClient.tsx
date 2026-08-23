'use client'

import Link from 'next/link'
import { StartExamForm } from './components'
import { Participant, ExamSession } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function PesertaClient({
  participant,
  examSession,
  isAksesTerbuka,
  batasSoal
}: {
  participant: Participant
  examSession: ExamSession | null
  isAksesTerbuka: boolean
  batasSoal: string
}) {
  const { t, locale } = useLanguage()

  return (
    <div className="section" style={{ paddingTop: '3rem' }}>
      <div className="container container--narrow">
        
        <div style={{ marginBottom: '3rem' }}>
          <p className="label" style={{ marginBottom: '0.5rem' }}>{t('dashboard_welcome')},</p>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{participant.nama_lengkap}</h1>
          <p style={{ color: 'var(--muted-fg)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
            {participant.nomor_peserta} • No Passport: {participant.no_passport}
          </p>
        </div>

        <div className="card ornate-frame">
          <div className="peserta-card-inner" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            
            <div style={{ flex: 1, minWidth: '280px' }}>
              <p className="label" style={{ marginBottom: '1rem', color: 'var(--brass)' }}>{t('dashboard_cbt_status')}</p>
              
              {!examSession && (
                <>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{t('dashboard_not_started')}</h2>
                  <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {t('dashboard_exam_desc').replace('50', batasSoal)}
                  </p>
                  {isAksesTerbuka ? (
                    <StartExamForm buttonLabel={t('dashboard_exam_start')} />
                  ) : (
                    <div style={{ 
                      display: 'inline-block', padding: '0.75rem 1.25rem', 
                      background: 'var(--muted)', borderRadius: '4px',
                      color: 'var(--muted-fg)', fontSize: '0.9rem', fontWeight: 500
                    }}>
                      {t('dashboard_access_closed')}
                    </div>
                  )}
                </>
              )}

              {examSession?.status === 'in_progress' && (
                <>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{t('dashboard_in_progress')}</h2>
                  <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {t('dashboard_in_progress_desc')}
                  </p>
                  <StartExamForm buttonLabel={t('dashboard_exam_continue')} />
                </>
              )}

              {examSession?.status === 'selesai' && (
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
                  
                  <div style={{ marginTop: '2.5rem' }}>
                    <Link href={`/${locale}/peserta/sertifikat`} className="btn btn--primary" style={{ minWidth: '12rem', justifyContent: 'center' }}>
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
              border: '1px solid var(--border)'
            }}>
               <span style={{ fontSize: '4rem', opacity: 0.5 }}>◬</span>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  )
}
