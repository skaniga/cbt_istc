import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 60

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createClient()
  const rawId = decodeURIComponent(params.id).trim()
  const idUpper = rawId.toUpperCase()
  const slashId = idUpper.replace(/-/g, '/')
  const hyphenId = idUpper.replace(/\//g, '-')

  const { data: participant } = await supabase
    .from('participants')
    .select('nama_lengkap, nomor_peserta')
    .or(`nomor_peserta.ilike.${idUpper},nomor_peserta.ilike.${slashId},nomor_peserta.ilike.${hyphenId}`)
    .maybeSingle()

  if (!participant) {
    return {
      title: 'Verifikasi Sertifikat — Tidak Ditemukan | ISTC 2026',
      description: 'Hasil verifikasi keaslian sertifikat digital resmi International Science and Technology Competitions 2026.',
    }
  }

  return {
    title: `Verifikasi Sertifikat — ${participant.nama_lengkap} (${participant.nomor_peserta}) | ISTC 2026`,
    description: `Sertifikat resmi atas nama ${participant.nama_lengkap} terverifikasi valid dan terdaftar dalam basis data ISTC 2026.`,
  }
}

export default async function CertificateVerifyPage({ params }: Props) {
  const supabase = await createClient()
  const rawId = decodeURIComponent(params.id).trim()
  const idUpper = rawId.toUpperCase()
  const slashId = idUpper.replace(/-/g, '/')
  const hyphenId = idUpper.replace(/\//g, '-')

  const { data: participant } = await supabase
    .from('participants')
    .select('id, nama_lengkap, nomor_peserta, kategori, created_at, lulus, skor')
    .or(`nomor_peserta.ilike.${idUpper},nomor_peserta.ilike.${slashId},nomor_peserta.ilike.${hyphenId}`)
    .maybeSingle()

  const valid = !!participant

  // Cek apakah peserta terdaftar di tabel pemenang
  let winnerData: { peringkat: number; apresiasi: string } | null = null
  if (participant) {
    const { data: winner } = await supabase
      .from('winners')
      .select('peringkat, apresiasi')
      .eq('peserta_id', participant.id)
      .maybeSingle()
    if (winner) winnerData = winner
  }

  // Format tanggal terbit sertifikat
  const eventDate = '10 September 2026'

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 20%, #1c1815 0%, #0d0c0a 100%)',
        color: '#f0ece4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          color: '#1a1a1a',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          padding: '2.75rem 2rem',
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center',
          borderTop: '6px solid #C8941A',
          position: 'relative',
        }}
      >
        <div style={{ marginBottom: '1.25rem' }}>
          <img
            src="/Logo_KOP_gold.png"
            alt="ISTC Official Seal"
            style={{ width: '84px', height: '84px', objectFit: 'contain', margin: '0 auto' }}
          />
        </div>

        {valid ? (
          <>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 1.1rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                background: '#E8F5E9',
                color: '#2E7D32',
                marginBottom: '1rem',
              }}
            >
              ✓ &nbsp;SERTIFIKAT RESMI TERVERIFIKASI
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading, "Playfair Display", serif)',
                fontSize: '1.65rem',
                color: '#1a1a1a',
                marginBottom: '0.35rem',
                lineHeight: 1.2,
              }}
            >
              Valid Official Certificate
            </h1>
            <p style={{ color: '#7A7A7A', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
              Dokumen ini resmi diterbitkan oleh panitia International Science and Technology Competitions (ISTC).
            </p>

            {/* Informasi Peserta & Sertifikat */}
            <div
              style={{
                background: '#FAF8F5',
                borderRadius: '10px',
                padding: '1.25rem 1.25rem',
                textAlign: 'left',
                border: '1px solid #EFEAE1',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid #EFEAE1',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8C7B65', fontWeight: 600 }}>
                  Nama Peserta
                </span>
                <span style={{ fontSize: '0.95rem', color: '#C8941A', fontWeight: 700, textAlign: 'right' }}>
                  {participant!.nama_lengkap}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid #EFEAE1',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8C7B65', fontWeight: 600 }}>
                  Nomor Sertifikat
                </span>
                <span style={{ fontSize: '0.9rem', color: '#2C2C2C', fontWeight: 600, textAlign: 'right', fontFamily: 'monospace' }}>
                  {participant!.nomor_peserta}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid #EFEAE1',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8C7B65', fontWeight: 600 }}>
                  Bidang Kompetisi
                </span>
                <span style={{ fontSize: '0.9rem', color: '#2C2C2C', fontWeight: 600, textAlign: 'right' }}>
                  {participant!.kategori || 'Sains & Teknologi Internasional'}
                </span>
              </div>

              {winnerData && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0',
                    borderBottom: '1px solid #EFEAE1',
                    gap: '1rem',
                    background: 'rgba(200, 148, 26, 0.08)',
                    margin: '0.35rem -0.5rem',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    borderRadius: '6px',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#92400E', fontWeight: 700 }}>
                    Penghargaan
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#B45309', fontWeight: 700, textAlign: 'right' }}>
                    🏆 {winnerData.apresiasi} (Peringkat #{winnerData.peringkat})
                  </span>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid #EFEAE1',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8C7B65', fontWeight: 600 }}>
                  Ajang / Event
                </span>
                <span style={{ fontSize: '0.9rem', color: '#2C2C2C', fontWeight: 600, textAlign: 'right' }}>
                  ISTC 2026 — Kuala Lumpur
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8C7B65', fontWeight: 600 }}>
                  Tanggal Terbit
                </span>
                <span style={{ fontSize: '0.9rem', color: '#2C2C2C', fontWeight: 600, textAlign: 'right' }}>
                  {eventDate}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 1.1rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                background: '#FFEBEE',
                color: '#C62828',
                marginBottom: '1rem',
              }}
            >
              ✗ &nbsp;SERTIFIKAT TIDAK DITEMUKAN
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading, "Playfair Display", serif)',
                fontSize: '1.65rem',
                color: '#1a1a1a',
                marginBottom: '0.5rem',
              }}
            >
              Certificate Not Found
            </h1>
            <p style={{ color: '#7A7A7A', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Tidak ditemukan data sertifikat untuk ID: <br />
              <strong style={{ color: '#C8941A', fontFamily: 'monospace', fontSize: '1rem' }}>{rawId}</strong>
              <br />
              Pastikan nomor sertifikat diketik dengan benar atau hubungi panitia resmi ISTC.
            </p>
          </>
        )}

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <Link
            href="/"
            style={{
              display: 'block',
              padding: '0.65rem 1.25rem',
              background: '#C8941A',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              transition: 'background 0.2s',
            }}
          >
            ← Kembali ke Beranda ISTC
          </Link>
        </div>

        <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#AAA', borderTop: '1px solid #EEE', paddingTop: '1rem' }}>
          International Science and Technology Competition 2026<br />
          <a href="https://istcompetition.my" style={{ color: '#C8941A', textDecoration: 'none', fontWeight: 600 }}>
            istcompetition.my
          </a>
        </p>
      </div>
    </main>
  )
}
