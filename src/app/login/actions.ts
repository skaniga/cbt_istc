'use server'

import { createClient } from '@/lib/supabase/server'
import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function loginParticipant(formData: FormData) {
  const identifier = formData.get('nomor_peserta') as string
  const password = formData.get('password') as string

  if (!identifier || !password) {
    return { error: 'Nomor peserta dan kata sandi wajib diisi.' }
  }

  // Gunakan password "123456" untuk semua peserta sesuai permintaan
  if (password !== '123456') {
    return { error: 'Kata sandi salah.' }
  }

  try {
    const supabase = await createClient()

    // Cari peserta melalui RPC Security Definer agar tidak terhalang RLS
    const { data: participantId, error } = await supabase
      .rpc('verify_participant_login', { p_identifier: identifier })

    if (error) {
      console.error('Login Query Error:', error)
      return { error: 'Terjadi kesalahan sistem saat memverifikasi data.' }
    }

    if (!participantId) {
      return { error: 'Nomor peserta atau No Passport tidak ditemukan.' }
    }

    // Double-check: pastikan peserta masih ada di DB (tidak dihapus admin)
    const { data: participantExists } = await supabase
      .from('participants')
      .select('id')
      .eq('id', participantId)
      .maybeSingle()

    if (!participantExists) {
      return { error: 'Akun peserta ini tidak ditemukan atau telah dihapus.' }
    }

    // Jika cocok, buat sesi cookie custom
    await createSession(participantId)

  } catch (err: any) {
    console.error('Login Error:', err)
    return { error: 'Terjadi kesalahan sistem.' }
  }

  // Redirect setelah session tersimpan
  redirect('/peserta')
}
