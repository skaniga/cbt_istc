import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import CbtClient from '@/app/[lang]/peserta/ujian/CbtClient'

export const revalidate = 0

export default async function AdminCbtPreviewPage({
  searchParams,
}: {
  searchParams?: { kategori?: string }
}) {
  const supabase = await createClient()

  const requestedKategori = searchParams?.kategori || 'Environmental Technology'

  const VALID_CATEGORIES = [
    'Environmental Technology',
    'Smart Robotics',
    'Science In Action',
    'Mathematic',
  ]

  const kategori = VALID_CATEGORIES.includes(requestedKategori)
    ? requestedKategori
    : 'Environmental Technology'

  // Ambil durasi dari config
  const { data: configDurasi } = await supabase
    .from('system_config')
    .select('nilai')
    .eq('kunci', 'durasi_menit')
    .maybeSingle()

  const durasiMenit = parseInt(configDurasi?.nilai || '90')
  const endTime = new Date(Date.now() + durasiMenit * 60 * 1000)

  // Ambil soal aktif sesuai kategori
  const { data: allQuestions } = await supabase
    .from('questions')
    .select(
      'id, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, pertanyaan_en, pilihan_a_en, pilihan_b_en, pilihan_c_en, pilihan_d_en, pertanyaan_ms, pilihan_a_ms, pilihan_b_ms, pilihan_c_ms, pilihan_d_ms, kategori, nomor_soal'
    )
    .eq('aktif', true)
    .eq('kategori', kategori)
    .order('nomor_soal', { ascending: true })

  const questions = allQuestions ?? []

  return (
    <div style={{ position: 'relative' }}>
      {/* Banner Mode Simulasi Admin */}
      <div
        style={{
          background: 'linear-gradient(90deg, #92400E 0%, #D97706 100%)',
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
          <span style={{ fontSize: '1.1rem' }}>🛡️</span>
          <span>
            <strong>MODE SIMULASI ADMIN:</strong> Akses peserta umum tetap{' '}
            <strong>TERTUTUP</strong>. Jawaban simulasi tidak akan disimpan ke database.
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.75rem',
              background: 'rgba(0,0,0,0.25)',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
            }}
          >
            Bidang: {kategori}
          </span>

          {/* Tombol ganti bidang */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {[
              { label: '🌱 Env', k: 'Environmental Technology' },
              { label: '🤖 Robot', k: 'Smart Robotics' },
              { label: '🔬 Science', k: 'Science In Action' },
              { label: '📐 Math', k: 'Mathematic' },
            ].map(({ label, k }) => (
              <Link
                key={k}
                href={`/admin/preview/ujian?kategori=${encodeURIComponent(k)}`}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  background: kategori === k ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)',
                  color: kategori === k ? '#92400E' : '#fff',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: kategori === k ? 700 : 400,
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          <Link
            href="/admin"
            style={{
              background: '#fff',
              color: '#92400E',
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            ← Keluar ke Admin
          </Link>
        </div>
      </div>

      {questions.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '6rem 2rem',
            color: 'var(--muted-fg)',
          }}
        >
          <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</p>
          <h2 style={{ marginBottom: '0.5rem' }}>Tidak ada soal aktif</h2>
          <p style={{ marginBottom: '2rem' }}>
            Belum ada soal aktif untuk bidang <strong>{kategori}</strong>.
          </p>
          <Link href="/admin/soal" className="btn btn--primary">
            → Kelola Bank Soal
          </Link>
        </div>
      ) : (
        <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 5rem)' }}>
          <CbtClient
            examSessionId="admin-preview-session"
            questions={questions}
            initialAnswers={{}}
            endTimeStr={endTime.toISOString()}
            serverTimeStr={new Date().toISOString()}
            kategori={kategori}
            isAdminPreview={true}
          />
        </div>
      )}
    </div>
  )
}
