'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updatePemenangUrls(id: string, formData: FormData) {
  const supabase = await createClient()

  const bukti_hadiah_url = formData.get('bukti_hadiah_url') as string
  const dokumentasi_penyerahan_url = formData.get('dokumentasi_penyerahan_url') as string

  const { error } = await supabase
    .from('winners')
    .update({ 
      bukti_hadiah_url: bukti_hadiah_url || null, 
      dokumentasi_penyerahan_url: dokumentasi_penyerahan_url || null 
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/pemenang')
  return { success: true }
}
