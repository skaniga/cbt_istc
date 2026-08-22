import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

export const revalidate = 0

export default async function AdminArsipPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: events } = await supabase
    .from('annual_events')
    .select('*')
    .order('tahun', { ascending: false })

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Arsip Penyelenggaraan</h1>
        <p style={{ color: 'var(--muted-fg)' }}>Rekapitulasi data IPE dari tahun ke tahun.</p>
      </div>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {events && events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {event.flyer_url && (
                <div style={{ 
                  height: '160px', 
                  backgroundImage: `url(${event.flyer_url})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  borderBottom: '1px solid var(--border-color)'
                }} />
              )}
              
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Edisi {event.tahun}</h2>
                  <span style={{ 
                    background: event.status === 'arsip' ? 'var(--bg-alt)' : '#e6f4ea', 
                    color: event.status === 'arsip' ? 'var(--muted-fg)' : '#1e8e3e',
                    padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' 
                  }}>
                    {event.status.toUpperCase()}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '1.1rem', color: 'var(--brass)', marginBottom: '1rem' }}>{event.tema}</h3>
                
                <p style={{ color: 'var(--muted-fg)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {event.deskripsi}
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', textTransform: 'uppercase' }}>Peserta</div>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{event.jumlah_peserta}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', textTransform: 'uppercase' }}>Pelaksanaan</div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{event.tanggal_mulai ? new Date(event.tanggal_mulai).getFullYear() : '-'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {event.lpj_url && (
                    <a href={event.lpj_url} target="_blank" rel="noopener noreferrer" className="btn btn--secondary" style={{ flexGrow: 1, textAlign: 'center', fontSize: '0.8rem', padding: '0.5rem' }}>
                      Unduh LPJ
                    </a>
                  )}
                  {event.berita_acara_url && (
                    <a href={event.berita_acara_url} target="_blank" rel="noopener noreferrer" className="btn btn--secondary" style={{ flexGrow: 1, textAlign: 'center', fontSize: '0.8rem', padding: '0.5rem' }}>
                      Berita Acara
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
           <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
             <p style={{ color: 'var(--muted-fg)' }}>Belum ada data arsip penyelenggaraan.</p>
           </div>
        )}
      </div>
    </div>
  )
}
