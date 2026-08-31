import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import CbtClient from './CbtClient'
import ExamErrorBoundary from './ExamErrorBoundary'

export const revalidate = 0

export default async function UjianPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const supabase = await createClient()

  // 1. Ambil data peserta (termasuk kategori)
  const { data: participant } = await supabase
    .from('participants')
    .select('id, kategori')
    .eq('id', session.pesertaId)
    .single()

  if (!participant?.kategori) {
    redirect('/peserta') // Peserta belum punya kategori
  }

  const kategoriPeserta = participant.kategori

  // 2. Cek sesi ujian aktif
  const { data: examSession } = await supabase
    .from('exam_sessions')
    .select('id, status, mulai_at, total_soal')
    .eq('peserta_id', session.pesertaId)
    .maybeSingle()

  if (!examSession || examSession.status === 'selesai') {
    redirect('/peserta') // Kembali ke dashboard jika tidak ada sesi aktif
  }

  // 2. Ambil durasi dari config
  const { data: configDurasi } = await supabase
    .from('system_config')
    .select('nilai')
    .eq('kunci', 'durasi_menit')
    .maybeSingle()

  const durasiMenit = parseInt(configDurasi?.nilai || '90')
  
  // Hitung End Time
  const startTime = new Date(examSession.mulai_at).getTime()
  const endTime = new Date(startTime + durasiMenit * 60 * 1000)

  // Jika waktu sudah habis secara server-side, otomatis panggil finish via redirect atau route handler? 
  // Biarkan CbtClient yang auto-submit jika sudah habis, tapi jika direfresh setelah waktu habis:
  if (Date.now() > endTime.getTime()) {
    // Lebih aman jika server bisa memanggil finishExam(), tapi kita di Server Component (read-only render).
    // Sementara kita pass endTime yang sudah lewat ke CbtClient agar CbtClient langsung submit saat mount.
  }

  // 3. Ambil soal sesuai kategori peserta
  const { data: allQuestions } = await supabase
    .from('questions')
    .select('id, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, pertanyaan_en, pilihan_a_en, pilihan_b_en, pilihan_c_en, pilihan_d_en, pertanyaan_ms, pilihan_a_ms, pilihan_b_ms, pilihan_c_ms, pilihan_d_ms')
    .eq('aktif', true)
    .eq('kategori', kategoriPeserta)  // ← Filter by participant's category
    
  let questions = allQuestions || []

  // Ambil config acak_soal dan batas_soal (live dari config, bukan dari session lama)
  const { data: configs } = await supabase
    .from('system_config')
    .select('kunci, nilai')
    .in('kunci', ['acak_soal', 'batas_soal'])

  const configMap: Record<string, string> = {}
  configs?.forEach(c => { configMap[c.kunci] = c.nilai })

  const acakSoal = configMap['acak_soal'] === 'true'
  const batasSoal = parseInt(configMap['batas_soal'] || String(examSession.total_soal) || '50')
  
  if (acakSoal) {
    // Stable shuffle seeded by session ID — same order on every reload
    const seedStr = examSession.id
    let h = 1779033703
    for (let i = 0; i < seedStr.length; i++) {
      h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353)
      h = h << 13 | h >>> 19
      h = Math.imul(h, 461845907)
    }
    let seed = h >>> 0

    const prng = () => {
      let t = seed += 0x6D2B79F5
      t = Math.imul(t ^ t >>> 15, t | 1)
      t ^= t + Math.imul(t ^ t >>> 7, t | 61)
      return ((t ^ t >>> 14) >>> 0) / 4294967296
    }

    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(prng() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]]
    }
  }

  // Batasi sesuai batas_soal dari config (selalu ambil nilai terbaru)
  questions = questions.slice(0, batasSoal)

  if (!questions || questions.length === 0) {
    return (
      <div className="section" style={{ textAlign: 'center', paddingTop: '8rem' }}>
        <h2>Questions Unavailable</h2>
        <p style={{ color: 'var(--muted-fg)' }}>No questions found for category: <strong>{kategoriPeserta}</strong>.</p>
      </div>
    )
  }

  // 4. Ambil jawaban tersimpan (jika peserta resume ujian)
  const { data: existingAnswers } = await supabase
    .from('answers')
    .select('soal_id, jawaban')
    .eq('sesi_id', examSession.id)

  const initialAnswers: Record<string, string> = {}
  if (existingAnswers) {
    existingAnswers.forEach(ans => {
      if (ans.jawaban) {
        initialAnswers[ans.soal_id] = ans.jawaban
      }
    })
  }

  const serverTimeStr = new Date().toISOString()

  return (
    <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 5rem)' }}>
      <CbtClient
        examSessionId={examSession.id}
        questions={questions}
        initialAnswers={initialAnswers}
        endTimeStr={endTime.toISOString()}
        serverTimeStr={serverTimeStr}
        kategori={kategoriPeserta}
      />
    </div>
  )
}
