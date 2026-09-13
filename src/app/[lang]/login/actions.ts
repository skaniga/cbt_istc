'use server'

import { createClient } from '@/lib/supabase/server'
import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'

// Password universal peserta — validasi dilakukan di sini sebelum hit database
// agar request yang salah password tidak perlu round-trip ke Supabase sama sekali
const PARTICIPANT_PASSWORD = '123456'

export async function loginParticipant(formData: FormData) {
  const identifier = (formData.get('nomor_peserta') as string)?.trim()
  const password = formData.get('password') as string

  // 1. Validasi input dasar — tidak perlu ke database
  if (!identifier || !password) {
    return { error: 'Nomor peserta dan kata sandi wajib diisi.' }
  }

  // Gunakan password "ISTC2026" untuk semua peserta
  if (password !== 'ISTC2026') {
    return { error: 'Kata sandi salah.' }
  }

  try {
    const supabase = await createClient()

    // 3. Cari peserta melalui RPC Security Definer (tidak terhalang RLS)
    //    RPC menggunakan index pada nomor_peserta & no_passport untuk query cepat
    const { data: participantId, error } = await supabase
      .rpc('verify_participant_login', { p_identifier: identifier })

    if (error) {
      console.error('Login Query Error:', error)
      return { error: 'Terjadi kesalahan sistem saat memverifikasi data.' }
    }

    if (!participantId) {
      return { error: 'Nomor peserta atau No Passport tidak ditemukan.' }
    }

    // 4. Buat sesi cookie custom (JWT signed dengan SESSION_SECRET)
    await createSession(participantId)

  } catch (err: any) {
    console.error('Login Error:', err)
    return { error: 'Terjadi kesalahan sistem.' }
  }

  // 5. Redirect setelah session tersimpan
  const locale = (formData.get('locale') as string) || 'id'
  redirect(`/${locale}/peserta`)
}
