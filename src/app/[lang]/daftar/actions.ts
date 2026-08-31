'use server'

import { createClient } from '@/lib/supabase/server'

const VALID_CATEGORIES = ['Environmental Technology', 'Smart Robotics', 'Science In Action', 'Mathematic']

export async function registerParticipant(formData: FormData) {
  try {
    const nama_lengkap = formData.get('nama_lengkap') as string
    const no_passport  = formData.get('no_passport')  as string
    const kategori     = formData.get('kategori')     as string

    if (!nama_lengkap || !no_passport) {
      return { error: 'Mohon lengkapi semua field yang wajib diisi.' }
    }

    if (!kategori || !VALID_CATEGORIES.includes(kategori)) {
      return { error: 'Bidang kompetisi tidak valid. Silakan pilih salah satu.' }
    }

    const supabase = await createClient()

    // Cek apakah no_passport sudah terdaftar
    const { data: existingPassport } = await supabase
      .from('participants')
      .select('id')
      .eq('no_passport', no_passport)
      .maybeSingle()

    if (existingPassport) {
      return { error: 'No Passport ini sudah terdaftar. Silakan login menggunakan nomor peserta dan tanggal lahir.' }
    }

    // Generate Nomor Peserta via RPC
    const { data: nomor_peserta, error: rpcError } = await supabase.rpc('generate_nomor_peserta')

    if (rpcError || !nomor_peserta) {
      console.error('RPC Error:', rpcError)
      return { error: 'Gagal membuat nomor peserta. Silakan coba lagi nanti.' }
    }

    // Insert ke tabel participants — coba hingga 3x jika nomor_peserta bentrok (race condition)
    let insertError: any = null
    let finalNomorPeserta = nomor_peserta

    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) {
        // Ambil nomor peserta baru untuk retry
        const { data: newNomor, error: retryRpcError } = await supabase.rpc('generate_nomor_peserta')
        if (retryRpcError || !newNomor) break
        finalNomorPeserta = newNomor
      }

      const { error } = await supabase
        .from('participants')
        .insert({
          nomor_peserta: finalNomorPeserta,
          nama_lengkap,
          no_passport,
          kategori
        })

      insertError = error

      if (!error) break // Berhasil, keluar dari loop

      // Jika bukan duplicate key, langsung keluar (error lain)
      if (error.code !== '23505') break
    }

    if (insertError) {
      console.error('Insert Error:', insertError)
      if (insertError.code === '23505' && insertError.message?.includes('no_passport')) {
        return { error: 'No Passport ini sudah terdaftar. Silakan login menggunakan nomor peserta Anda.' }
      }
      return { error: 'Gagal menyimpan data pendaftaran. Silakan coba lagi.' }
    }

    return { 
      data: { 
        nomor_peserta: finalNomorPeserta, 
        nama: nama_lengkap,
        kategori
      } 
    }

  } catch (err: any) {
    console.error('Registration Error:', err)
    return { error: 'Terjadi kesalahan sistem yang tidak terduga.' }
  }
}
