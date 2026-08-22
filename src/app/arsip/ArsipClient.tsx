'use client'

import Navbar from '@/components/Navbar'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function ArsipClient({
  events,
  winnersByYear
}: {
  events: any[]
  winnersByYear: Record<number, any[]>
}) {
  const { t } = useLanguage()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />
      
      <main style={{ padding: '6rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--brass)' }}>{t('archive_page_title')}</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            {t('archive_page_subtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {events && events.map(event => (
            <section key={event.id} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                  {event.tahun}
                  <span style={{ fontSize: '1.25rem', color: 'var(--brass)', fontWeight: 400 }}>{event.tema}</span>
                </h2>
                <p style={{ color: 'var(--muted)', maxWidth: '800px', marginTop: '0.5rem' }}>{event.deskripsi}</p>
              </div>

              {/* Juara */}
              {winnersByYear[event.tahun] && winnersByYear[event.tahun].length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {winnersByYear[event.tahun].map(winner => (
                    <div key={winner.id} style={{ 
                      background: 'var(--bg-alt)', 
                      padding: '2rem', 
                      borderRadius: '8px',
                      borderTop: winner.peringkat === 1 ? '4px solid #FFD700' : 
                                winner.peringkat === 2 ? '4px solid #C0C0C0' : 
                                '4px solid #CD7F32'
                    }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        {winner.peringkat === 1 ? '🥇' : winner.peringkat === 2 ? '🥈' : '🥉'}
                      </div>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--brass)' }}>{winner.nama_pemenang}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1rem' }}>{winner.apresiasi}</p>
                      
                      {winner.foto_karya_url && (
                        <div style={{ marginTop: '1rem', height: '150px', backgroundImage: `url(${winner.foto_karya_url})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '4px' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
