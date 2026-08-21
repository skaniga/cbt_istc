'use server'

import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function saveAnswer(examSessionId: string, questionId: string, answer: string) {
  const session = await getSession()
  if (!session) return { error: 'Unauthorized' }

  const supabase = await createClient()

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

  const supabase = await createClient()

  // Ambil semua jawaban peserta dan cocokkan dengan tabel questions
  const { data: answers } = await supabase
    .from('answers')
    .select(`
      jawaban,
      questions ( id, kunci_jawaban )
    `)
    .eq('sesi_id', examSessionId)

  let correctCount = 0
  if (answers) {
    answers.forEach((ans: any) => {
      if (ans.questions && ans.jawaban === ans.questions.kunci_jawaban) {
        correctCount++
      }
    })
  }

  // Hitung skor berdasarkan batas soal (asumsi 50 jika tidak ada)
  const { data: sessionData } = await supabase
    .from('exam_sessions')
    .select('total_soal, peserta_id')
    .eq('id', examSessionId)
    .single()

  const totalSoal = sessionData?.total_soal || 50
  const finalScore = Math.round((correctCount / totalSoal) * 100)
  
  // Asumsi passing grade 70
  const isPassed = finalScore >= 70

  // Update participant
  await supabase
    .from('participants')
    .update({
      skor: finalScore,
      lulus: isPassed
    })
    .eq('id', sessionData!.peserta_id)

  // Update session
  await supabase
    .from('exam_sessions')
    .update({ status: 'selesai' })
    .eq('id', examSessionId)

  redirect('/peserta')
}
