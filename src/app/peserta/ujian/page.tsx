import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import CbtClient from './CbtClient'

export const revalidate = 0

export default async function UjianPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const supabase = await createClient()

  // 1. Cek sesi ujian aktif
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

  // 3. Ambil data soal
  // Untuk lomba ini, kita asumsikan soal sama untuk semua. Jika random, order by id atau limit sesuai total_soal.
  const { data: questions } = await supabase
    .from('questions')
    .select('id, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d')
    .limit(examSession.total_soal)

  if (!questions || questions.length === 0) {
    return (
      <div className="section" style={{ textAlign: 'center', paddingTop: '8rem' }}>
        <h2>Soal Belum Tersedia</h2>
        <p style={{ color: 'var(--muted-fg)' }}>Admin belum memasukkan soal ke dalam sistem.</p>
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

  return (
    <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 5rem)' }}>
      <CbtClient
        examSessionId={examSession.id}
        questions={questions}
        initialAnswers={initialAnswers}
        endTimeStr={endTime.toISOString()}
      />
    </div>
  )
}
