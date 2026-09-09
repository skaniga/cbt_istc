import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import SertifikatClient from '@/app/[lang]/peserta/sertifikat/SertifikatClient'

export const revalidate = 0

export default async function AdminSertifikatPreviewPage({
  searchParams,
}: {
  searchParams?: { id?: string; nomor?: string }
}) {
  const supabase = await createClient()

  // Ambil metadata config
  const { data: configRows } = await supabase.from('system_config').select('kunci, nilai')
  const config: Record<string, string> = {}
  configRows?.forEach((row) => {
    config[row.kunci] = row.nilai
  })

  // Tentukan peserta yang di-preview
  let participantQuery = supabase.from('participants').select('*')

  if (searchParams?.id) {
    participantQuery = participantQuery.eq('id', searchParams.id)
  } else if (searchParams?.nomor) {
    participantQuery = participantQuery.eq('nomor_peserta', searchParams.nomor)
  } else {
    // Default: ambil peserta dengan skor tertinggi (contoh terbaik)
    participantQuery = participantQuery
      .order('skor', { ascending: false })
      .limit(1)
  }

  const { data: sampleParticipants } = await participantQuery.limit(1)
  const participant = sampleParticipants?.[0] ?? null

  if (!participant) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Data Peserta Tidak Ditemukan</h2>
        <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem' }}>
          Tidak ada data peserta untuk ditampilkan sertifikatnya.
        </p>
        <Link href="/admin/peserta" className="btn btn--primary">
          ← Kembali ke Kelola Peserta
        </Link>
      </div>
    )
  }

  // Ambil data pemenang jika ada
  const { data: winnerData } = await supabase
    .from('winners')
    .select('peringkat, apresiasi')
    .eq('peserta_id', participant.id)
    .maybeSingle()

  return (
    <div style={{ background: 'var(--bg-alt)', minHeight: '100vh' }}>
      {/* Banner Admin Preview */}
      <div
        style={{
          background: 'linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)',
          color: '#fff',
          padding: '0.65rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem',
          position: 'sticky',
          top: 0,
          zIndex: 9999,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🎓</span>
          <span>
            <strong>PREVIEW SERTIFIKAT (ADMIN):</strong> Memeriksa layout grafis, render font, QR Code,
            dan PDF untuk peserta <strong>{participant.nama_lengkap}</strong> ({participant.nomor_peserta}).
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/admin/peserta"
            style={{
              background: '#fff',
              color: '#1E3A8A',
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            ← Data Peserta
          </Link>
          <Link
            href="/admin"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '0.8rem',
            }}
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Konten Sertifikat */}
      <div className="section">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="label" style={{ marginBottom: '0.5rem' }}>Official Document Preview</p>
            <h1 style={{ fontSize: '2.5rem' }}>Participant Certificate</h1>
            {winnerData && (
              <p style={{ color: 'var(--brass)', fontWeight: 600, marginTop: '0.5rem' }}>
                🏆 {winnerData.apresiasi} — Peringkat #{winnerData.peringkat}
              </p>
            )}
          </div>

          <SertifikatClient
            participant={participant}
            winnerData={winnerData}
            namaLomba={config['nama_lomba'] || 'International Science and Technology Competitions'}
            tahun={config['tahun_aktif'] || '2026'}
            namaKetua={config['nama_ketua']}
            jabatanKetua={config['jabatan_ketua']}
          />
        </div>
      </div>
    </div>
  )
}
