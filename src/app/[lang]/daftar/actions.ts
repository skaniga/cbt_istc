'use server'

import { createClient } from '@/lib/supabase/server'

export async function registerParticipant(formData: FormData) {
  try {
    const nama_lengkap = formData.get('nama_lengkap') as string
    const no_passport = formData.get('no_passport') as string

    if (!nama_lengkap || !no_passport) {
      return { error: 'Mohon lengkapi semua field yang wajib diisi.' }
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

    // Insert ke tabel participants tanpa .select() agar tidak terhalang RLS anon select policy
    const { error: insertError } = await supabase
      .from('participants')
      .insert({
        nomor_peserta,
        nama_lengkap,
        no_passport
      })

    if (insertError) {
      console.error('Insert Error:', insertError)
      return { error: 'Gagal menyimpan data pendaftaran. Silakan coba lagi.' }
    }

    return { 
      data: { 
        nomor_peserta: nomor_peserta, 
        nama: nama_lengkap 
      } 
    }

  } catch (err: any) {
    console.error('Registration Error:', err)
    return { error: 'Terjadi kesalahan sistem yang tidak terduga.' }
  }
}
