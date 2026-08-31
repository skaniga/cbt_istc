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

  // Gunakan password "ISTC2026" untuk semua peserta
  if (password !== 'ISTC2026') {
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

    // Jika cocok, buat sesi cookie custom
    await createSession(participantId)

  } catch (err: any) {
    console.error('Login Error:', err)
    return { error: 'Terjadi kesalahan sistem.' }
  }

  // Redirect setelah session tersimpan
  const locale = formData.get('locale') as string || 'id'
  redirect(`/${locale}/peserta`)
}
