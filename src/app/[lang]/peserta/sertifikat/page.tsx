import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import SertifikatClient from './SertifikatClient'
import Link from 'next/link'

export const revalidate = 0

interface Props {
  searchParams?: {
    id?: string
    nomor?: string
    simulasi?: string
  }
}

export default async function SertifikatPage({ searchParams }: Props) {
  const session = await getSession()
  const supabase = await createClient()

  // Cek apakah Admin yang mengakses (untuk preview sertifikat)
  // getSession() membaca cookie langsung — reliable tanpa network roundtrip
  const { data: { session: supabaseSession } } = await supabase.auth.getSession()
  const adminUser = supabaseSession?.user ?? null

  if (!session && !adminUser) {
    redirect('/login')
  }

  // Ambil metadata dari config
  const { data: configRows } = await supabase
    .from('system_config')
    .select('kunci, nilai')

  const config: Record<string, string> = {}
  configRows?.forEach((row) => {
    config[row.kunci] = row.nilai
  })

  // ── 1. MODE PREVIEW ADMIN ──────────────────────────────────────────
  if (adminUser && (!session || searchParams?.simulasi === 'admin')) {
    let participantQuery = supabase.from('participants').select('*')

    if (searchParams?.id) {
      participantQuery = participantQuery.eq('id', searchParams.id)
    } else if (searchParams?.nomor) {
      participantQuery = participantQuery.eq('nomor_peserta', searchParams.nomor)
    } else {
      // Ambil juara pertama atau peserta teratas sebagai sample
      participantQuery = participantQuery.order('skor', { ascending: false }).limit(1)
    }

    const { data: sampleParticipants } = await participantQuery
    const participant = sampleParticipants && sampleParticipants.length > 0 ? sampleParticipants[0] : null

    if (!participant) {
      return (
        <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <h2>Data Peserta Tidak Ditemukan</h2>
          <p style={{ color: 'var(--muted-fg)', margin: '1rem 0' }}>
            Tidak ada data peserta untuk di-generate sertifikatnya.
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
        {/* Banner Admin Sandbox Mode */}
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
              <strong>PREVIEW SERTIFIKAT (ADMIN):</strong> Memeriksa layout grafis, render font, QR code, dan unduh PDF untuk peserta <strong>{participant.nama_lengkap}</strong> ({participant.nomor_peserta}).
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
              ← Keluar ke Data Peserta
            </Link>
          </div>
        </div>

        <div className="section" style={{ minHeight: 'calc(100vh - 5rem)' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p className="label" style={{ marginBottom: '0.5rem' }}>Official Document Preview</p>
              <h1 style={{ fontSize: '2.5rem' }}>Participant Certificate</h1>
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

  // ── 2. AKSES PESERTA ASLI ─────────────────────────────────────────
  // Cek apakah hasil & sertifikat sudah dirilis oleh admin
  const isRilisHasil = config['rilis_hasil'] === 'true'
  if (!isRilisHasil) {
    redirect('/peserta')
  }

  // Ambil data peserta login
  const { data: participant } = await supabase
    .from('participants')
    .select('*')
    .eq('id', session.pesertaId)
    .single()

  if (!participant) redirect('/login')

  // Pastikan sudah selesai ujian
  const { data: examSession } = await supabase
    .from('exam_sessions')
    .select('status')
    .eq('peserta_id', participant.id)
    .maybeSingle()

  if (examSession?.status !== 'selesai') {
    redirect('/peserta')
  }

  // Cek apakah peserta adalah pemenang
  const { data: winnerData } = await supabase
    .from('winners')
    .select('peringkat, apresiasi')
    .eq('peserta_id', participant.id)
    .maybeSingle()

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 5rem)', background: 'var(--bg-alt)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="label" style={{ marginBottom: '0.5rem' }}>Official Document</p>
          <h1 style={{ fontSize: '2.5rem' }}>Participant Certificate</h1>
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
  )
}
