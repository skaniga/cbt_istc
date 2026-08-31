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

    // Generate Nomor Peserta via RPC
    const { data: nomor_peserta, error: rpcError } = await supabase.rpc('generate_nomor_peserta')

    if (rpcError || !nomor_peserta) {
      console.error('RPC Error:', rpcError)
      return { error: 'Gagal membuat nomor peserta. Silakan coba lagi nanti.' }
    }

    // Insert langsung — tidak ada pre-check untuk menghindari race condition TOCTOU.
    // Unique constraint di DB akan menangkap duplikasi no_passport atau nomor_peserta.
    let insertError: any = null
    let finalNomorPeserta = nomor_peserta

    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) {
        // Ambil nomor peserta baru untuk retry (hanya jika konflik di nomor_peserta)
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
          kategori,
        })

      insertError = error

      if (!error) break // Berhasil

      // Hanya retry jika konflik di nomor_peserta (bukan no_passport)
      if (error.code !== '23505') break // Error lain, langsung keluar

      const isPassportConflict =
        error.message?.toLowerCase().includes('no_passport') ||
        error.details?.toLowerCase().includes('no_passport') ||
        error.message?.toLowerCase().includes('passport')

      if (isPassportConflict) break // Jangan retry untuk konflik passport
    }

    if (insertError) {
      console.error('Insert Error:', JSON.stringify(insertError))

      if (insertError.code === '23505') {
        const msg = (insertError.message ?? '') + (insertError.details ?? '')
        const isPassport = msg.toLowerCase().includes('no_passport') || msg.toLowerCase().includes('passport')
        if (isPassport) {
          return { error: 'No Passport ini sudah terdaftar. Silakan login menggunakan nomor peserta Anda.' }
        }
      }

      return { error: 'Gagal menyimpan data pendaftaran. Silakan coba lagi.' }
    }

    return {
      data: {
        nomor_peserta: finalNomorPeserta,
        nama: nama_lengkap,
        kategori,
      }
    }

  } catch (err: any) {
    console.error('Registration Error:', err)
    return { error: 'Terjadi kesalahan sistem yang tidak terduga.' }
  }
}
