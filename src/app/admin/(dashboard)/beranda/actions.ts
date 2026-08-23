'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateBerandaSettings(formData: FormData) {
  const supabase = await createClient()

  // Get current user to ensure auth
  const { data: { user } } = await supabase.auth.getUser()
  const { cookies } = await import('next/headers')
  const hasBypassCookie = cookies().get('ipe_admin_session')?.value === 'true'

  if (!user && !hasBypassCookie) {
    return { error: 'Unauthorized' }
  }

  // Use service role to bypass RLS since admin might be using bypass cookie
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js')
  const adminSupabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const entries = [
    { kunci: 'nama_lomba', nilai: formData.get('nama_lomba') as string },
    { kunci: 'tahun_aktif', nilai: formData.get('tahun_aktif') as string },
    { kunci: 'hero_title', nilai: formData.get('hero_title') as string },
    { kunci: 'hero_subtitle', nilai: formData.get('hero_subtitle') as string },
    { kunci: 'about_title', nilai: formData.get('about_title') as string },
    { kunci: 'about_desc', nilai: formData.get('about_desc') as string },
  ]

  // Optional image URLs
  const heroUrl = formData.get('hero_image_url') as string
  if (heroUrl) {
    entries.push({ kunci: 'hero_image_url', nilai: heroUrl })
  }

  const aboutUrl = formData.get('about_image_url') as string
  if (aboutUrl) {
    entries.push({ kunci: 'about_image_url', nilai: aboutUrl })
  }

  // filter out empty values for basic strings, but allow images to be empty if they didn't upload a new one
  
  for (const entry of entries) {
    if (!entry.nilai && entry.kunci.includes('image_url')) continue; // Skip empty updates for images
    
    // Check if exists
    const { data: existing } = await adminSupabase
      .from('system_config')
      .select('id')
      .eq('kunci', entry.kunci)
      .maybeSingle()

    if (existing) {
      await adminSupabase
        .from('system_config')
        .update({ nilai: entry.nilai, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
    } else {
      await adminSupabase
        .from('system_config')
        .insert({
          kunci: entry.kunci,
          nilai: entry.nilai,
          keterangan: `Konfigurasi untuk ${entry.kunci}`
        })
    }
  }

  revalidatePath('/')
  revalidatePath('/admin/beranda')
  
  return { success: true }
}
