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
  const acakSoal  = formData.get('acak_soal')  as string // 'true' | 'false'

  // Upsert — insert jika belum ada, update jika sudah ada
  const upserts = [
    { kunci: 'batas_soal', nilai: batasSoal || '50' },
    { kunci: 'acak_soal',  nilai: acakSoal === 'true' ? 'true' : 'false' },
  ]

  for (const row of upserts) {
    const { error } = await supabase
      .from('system_config')
      .upsert(row, { onConflict: 'kunci' })

    if (error) {
      console.error('saveSettings error:', error)
      return { error: `Gagal menyimpan ${row.kunci}: ${error.message}` }
    }
  }

  revalidatePath('/admin')
  return { success: true }
}
