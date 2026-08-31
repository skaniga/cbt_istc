'use server'

import { createClient } from '@/lib/supabase/server'

const VALID_CATEGORIES = ['Environmental Technology', 'Smart Robotics', 'Science In Action', 'Mathematic']

export async function registerParticipant(formData: FormData) {
  try {
    const nama_lengkap = (formData.get('nama_lengkap') as string)?.trim()
    const no_passport  = (formData.get('no_passport')  as string)?.trim().toUpperCase()
    const kategori     = formData.get('kategori')     as string

    if (!nama_lengkap || !no_passport) {
      return { error: 'Mohon lengkapi semua field yang wajib diisi.' }
    }

    if (!kategori || !VALID_CATEGORIES.includes(kategori)) {
      return { error: 'Bidang kompetisi tidak valid. Silakan pilih salah satu.' }
    }

    const supabase = await createClient()

    // Generate Nomor Peserta via RPC (sekarang pakai SEQUENCE — atomic, tidak duplikat)
    const { data: nomor_peserta, error: rpcError } = await supabase.rpc('generate_nomor_peserta')

    if (rpcError || !nomor_peserta) {
      console.error('RPC Error:', rpcError)
      return { error: 'Gagal membuat nomor peserta. Silakan coba lagi nanti.' }
    }

    // Insert langsung — SEQUENCE menjamin nomor_peserta unik tanpa retry
    const { error: insertError } = await supabase
      .from('participants')
      .insert({
        nomor_peserta,
        nama_lengkap,
        no_passport,
        kategori,
      })

    if (insertError) {
      console.error('Insert Error:', JSON.stringify(insertError))

      // Duplikat no_passport — peserta sudah terdaftar
      if (insertError.code === '23505') {
        return { error: 'No Passport ini sudah terdaftar. Silakan login menggunakan nomor peserta Anda.' }
      }

      return { error: 'Gagal menyimpan data pendaftaran. Silakan coba lagi.' }
    }

    return {
      data: {
        nomor_peserta,
        nama: nama_lengkap,
        kategori,
      }
    }

  } catch (err: any) {
    console.error('Registration Error:', err)
    return { error: 'Terjadi kesalahan sistem yang tidak terduga.' }
  }
}
