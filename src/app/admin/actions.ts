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

  // Record keep alive
  const { error } = await supabase
    .from('keep_alives')
    .insert({
      status: 'success',
      details: 'Manual trigger via Admin Dashboard'
    })

  if (error) {
    return { error: 'Gagal mencatat Keep Alive.' }
  }

  revalidatePath('/admin')
  return { success: true }
}
