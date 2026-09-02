'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function logoutAdmin() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

export async function toggleAksesUjian(currentStatus: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const newStatus = currentStatus === 'true' ? 'false' : 'true'

  const { error } = await supabase
    .from('system_config')
    .update({ nilai: newStatus })
    .eq('kunci', 'akses_ujian_terbuka')

  if (error) {
    console.error('Toggle Error:', error)
    return { error: 'Gagal mengubah status akses.' }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function toggleRilisHasil(currentStatus: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const newStatus = currentStatus === 'true' ? 'false' : 'true'

  // Coba UPDATE dulu
  const { data: updated, error: updErr } = await supabase
    .from('system_config')
    .update({ nilai: newStatus })
    .eq('kunci', 'rilis_hasil')
    .select('id')

  if (updErr) {
    console.error('toggleRilisHasil update error:', updErr)
    return { error: 'Gagal mengubah status rilis hasil.' }
  }

  // Kalau belum ada row, INSERT baru
  if (!updated || updated.length === 0) {
    const { error: insErr } = await supabase.from('system_config').insert({
      kunci: 'rilis_hasil',
      nilai: newStatus,
      keterangan: 'Tampilkan nilai dan sertifikat peserta setelah ujian'
    })
    if (insErr) {
      console.error('toggleRilisHasil insert error:', insErr)
      return { error: 'Gagal membuat config rilis hasil.' }
    }
  }

  // Revalidate semua halaman peserta di semua locale
  revalidatePath('/admin')
  revalidatePath('/en/peserta')
  revalidatePath('/id/peserta')
  revalidatePath('/ms/peserta')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function manualKeepAlive() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('keep_alives')
    .insert({ method: 'manual' })

  if (error) {
    return { error: 'Gagal mencatat Keep Alive.' }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function saveSettings(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const batasSoal = formData.get('batas_soal') as string
  const acakSoal  = formData.get('acak_soal')  as string

  const settings = [
    { kunci: 'batas_soal', nilai: batasSoal || '50',                       keterangan: 'Jumlah soal per sesi ujian' },
    { kunci: 'acak_soal',  nilai: acakSoal === 'true' ? 'true' : 'false',  keterangan: 'Acak urutan soal: true/false' },
  ]

  for (const s of settings) {
    // Coba UPDATE dulu
    const { data: updated, error: updErr } = await supabase
      .from('system_config')
      .update({ nilai: s.nilai, updated_at: new Date().toISOString() })
      .eq('kunci', s.kunci)
      .select('id')

    if (updErr) {
      console.error('Update error:', updErr)
      return { error: `Gagal menyimpan ${s.kunci}: ${updErr.message}` }
    }

    // Jika tidak ada row yang terupdate (row belum ada), INSERT baru
    if (!updated || updated.length === 0) {
      const { error: insErr } = await supabase
        .from('system_config')
        .insert({ kunci: s.kunci, nilai: s.nilai, keterangan: s.keterangan })

      if (insErr) {
        console.error('Insert error:', insErr)
        return { error: `Gagal membuat ${s.kunci}: ${insErr.message}` }
      }
    }
  }

  revalidatePath('/admin')
  return { success: true }
}
