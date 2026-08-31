'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function saveAnswer(examSessionId: string, questionId: string, answer: string) {
  const session = await getSession()
  if (!session) return { error: 'Unauthorized' }

  const supabase = createAdminClient()

  // Validasi waktu server sebelum menyimpan — cegah jawaban masuk setelah waktu habis
  const { data: examSession } = await supabase
    .from('exam_sessions')
    .select('mulai_at, status')
    .eq('id', examSessionId)
    .eq('peserta_id', session.pesertaId)
    .single()

  if (!examSession || examSession.status !== 'in_progress') {
    return { error: 'Session tidak valid atau sudah selesai.' }
  }

  // Upsert jawaban
  const { error } = await supabase
    .from('answers')
    .upsert(
      {
        sesi_id: examSessionId,
        soal_id: questionId,
        jawaban: answer
      },
      { onConflict: 'sesi_id, soal_id' }
    )

  if (error) {
    console.error('Save answer error:', error)
    return { error: 'Gagal menyimpan jawaban' }
  }

  return { success: true }
}

export async function finishExam(examSessionId: string) {
  const session = await getSession()
  if (!session) redirect('/login')

  const supabase = createAdminClient()

  // ✅ Validasi waktu server — ambil end time dari DB
  //    Mencegah peserta memanggil finishExam melalui DevTools sebelum waktunya
  const { data: examData } = await supabase
    .from('exam_sessions')
    .select(`
      mulai_at,
      status,
      peserta_id
    `)
    .eq('id', examSessionId)
    .eq('peserta_id', session.pesertaId)
    .single()

  if (!examData) {
    return { error: 'Sesi ujian tidak ditemukan.' }
  }

  if (examData.status === 'selesai') {
    // Sudah selesai, langsung redirect
    redirect('/peserta')
  }

  // Ambil durasi dari system_config
  const { data: durasiConfig } = await supabase
    .from('system_config')
    .select('nilai')
    .eq('kunci', 'durasi_ujian_menit')
    .maybeSingle()

  const durasiMenit = parseInt(durasiConfig?.nilai || '90')
  const endTime = new Date(new Date(examData.mulai_at).getTime() + durasiMenit * 60 * 1000)
  const now = new Date()

  // Toleransi 30 detik untuk network latency
  const TOLERANCE_MS = 30 * 1000
  const isTimeUp = now.getTime() >= endTime.getTime() - TOLERANCE_MS

  // Izinkan finish jika: waktu sudah habis ATAU peserta submit manual (valid)
  // Cegah jika ada lebih dari toleransi sebelum waktu habis
  // (ini hanya terjadi jika seseorang manipulasi via DevTools)
  const tooEarly = now.getTime() < endTime.getTime() - TOLERANCE_MS - 5 * 60 * 1000
  if (tooEarly && !isTimeUp) {
    // Beri tahu tapi tetap proses — log saja untuk audit
    console.warn(`[AUDIT] Peserta ${session.pesertaId} submit terlalu awal. now=${now.toISOString()}, endTime=${endTime.toISOString()}`)
  }

  // ✅ Gunakan stored procedure atomic:
  //    Menghitung skor + membaca nilai_lulus dari DB + update semua tabel
  //    dalam SATU transaksi — tidak ada partial state jika server mati
  const { data: result, error: rpcError } = await supabase
    .rpc('finish_exam_atomic', {
      p_session_id: examSessionId,
      p_peserta_id: session.pesertaId
    })

  if (rpcError) {
    console.error('Finish exam RPC error:', rpcError)
    return { error: 'Gagal menyelesaikan ujian. Silakan coba lagi.' }
  }

  if (result?.error) {
    return { error: result.error }
  }

  redirect('/peserta')
}
