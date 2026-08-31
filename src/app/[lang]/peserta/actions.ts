'use server'

import { clearSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'

export async function logoutParticipant() {
  await clearSession()
  redirect('/')
}

export async function startExam() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const supabase = await createClient()

  // Pastikan akses terbuka
  const { data: config } = await supabase
    .from('system_config')
    .select('nilai')
    .eq('kunci', 'akses_ujian_terbuka')
    .single()

  if (config?.nilai !== 'true') {
    return { error: 'Akses ujian sedang ditutup.' }
  }

  // Cek apakah sudah punya sesi
  const { data: existingSession } = await supabase
    .from('exam_sessions')
    .select('id, status')
    .eq('peserta_id', session.pesertaId)
    .maybeSingle()

  if (existingSession) {
    if (existingSession.status === 'selesai') {
      return { error: 'Anda sudah menyelesaikan ujian ini.' }
    }
    // Jika masih in_progress, langsung redirect saja
    redirect('/peserta/ujian')
  }

  // Validasi peserta punya kategori
  const { data: peserta } = await supabase
    .from('participants')
    .select('kategori')
    .eq('id', session.pesertaId)
    .single()

  if (!peserta?.kategori) {
    return { error: 'Data bidang kompetisi tidak ditemukan. Silakan hubungi panitia.' }
  }

  // Ambil jumlah soal dari config atau default 50
  const { data: configSoal } = await supabase
    .from('system_config')
    .select('nilai')
    .eq('kunci', 'batas_soal')
    .maybeSingle()
  
  const totalSoal = parseInt(configSoal?.nilai || '50')

  // Buat sesi ujian baru
  const { error: insertError } = await supabase
    .from('exam_sessions')
    .insert({
      peserta_id: session.pesertaId,
      status: 'in_progress',
      total_soal: totalSoal
    })

  if (insertError) {
    console.error('Error starting exam:', insertError)
    return { error: 'Gagal memulai ujian. Silakan coba lagi.' }
  }

  redirect('/peserta/ujian')
}
