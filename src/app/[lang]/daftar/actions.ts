'use server'

import { createClient } from '@/lib/supabase/server'

const VALID_CATEGORIES = ['Environmental Technology', 'Smart Robotics', 'Science In Action', 'Mathematic']

type Locale = 'en' | 'id' | 'ms'

const ERRORS: Record<string, Record<Locale, string>> = {
  fill_required: {
    en: 'Please fill in all required fields.',
    id: 'Mohon lengkapi semua field yang wajib diisi.',
    ms: 'Sila lengkapkan semua medan yang diperlukan.',
  },
  invalid_category: {
    en: 'Invalid competition field. Please select one of the available fields.',
    id: 'Bidang kompetisi tidak valid. Silakan pilih salah satu bidang yang tersedia.',
    ms: 'Bidang pertandingan tidak sah. Sila pilih salah satu bidang yang tersedia.',
  },
  rpc_failed: {
    en: 'Failed to generate participant number. Please try again.',
    id: 'Gagal membuat nomor peserta. Silakan coba lagi nanti.',
    ms: 'Gagal menjana nombor peserta. Sila cuba lagi.',
  },
  passport_taken: {
    en: 'This passport number is already registered. Please log in using your participant number.',
    id: 'No Passport ini sudah terdaftar. Silakan login menggunakan nomor peserta Anda.',
    ms: 'Nombor pasport ini sudah didaftarkan. Sila log masuk menggunakan nombor peserta anda.',
  },
  save_failed: {
    en: 'Failed to save registration data. Please try again.',
    id: 'Gagal menyimpan data pendaftaran. Silakan coba lagi.',
    ms: 'Gagal menyimpan data pendaftaran. Sila cuba lagi.',
  },
  system_error: {
    en: 'An unexpected system error occurred. Please try again.',
    id: 'Terjadi kesalahan sistem yang tidak terduga.',
    ms: 'Ralat sistem yang tidak dijangka berlaku.',
  },
}

function err(key: string, locale: Locale): string {
  return ERRORS[key]?.[locale] ?? ERRORS[key]?.['en'] ?? key
}

export async function registerParticipant(formData: FormData) {
  const locale: Locale = (['en', 'id', 'ms'].includes(formData.get('locale') as string)
    ? formData.get('locale') as Locale
    : 'en')

  try {
    const nama_lengkap = (formData.get('nama_lengkap') as string)?.trim()
    const no_passport  = (formData.get('no_passport')  as string)?.trim().toUpperCase()
    const kategori     = formData.get('kategori')     as string

    if (!nama_lengkap || !no_passport) {
      return { error: err('fill_required', locale) }
    }

    if (!kategori || !VALID_CATEGORIES.includes(kategori)) {
      return { error: err('invalid_category', locale) }
    }

    const supabase = await createClient()

    // Generate Nomor Peserta via RPC (SEQUENCE atomic)
    const { data: nomor_peserta, error: rpcError } = await supabase.rpc('generate_nomor_peserta')

    if (rpcError || !nomor_peserta) {
      console.error('RPC Error:', rpcError)
      return { error: err('rpc_failed', locale) }
    }

    // Insert langsung — SEQUENCE menjamin nomor_peserta unik
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

      // Duplikat no_passport
      if (insertError.code === '23505') {
        return { error: err('passport_taken', locale) }
      }

      return { error: err('save_failed', locale) }
    }

    return {
      data: {
        nomor_peserta,
        nama: nama_lengkap,
        kategori,
      }
    }

  } catch (err_: any) {
    console.error('Registration Error:', err_)
    return { error: err('system_error', locale) }
  }
}
