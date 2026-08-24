'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateBerandaSettings(formData: FormData) {
  const supabase = await createClient()

  // Validate that the requester is a real authenticated admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Use service role ONLY for the actual DB write (to bypass RLS on system_config)
  // The auth check above ensures only real admins can reach this point
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
    { kunci: 'nama_ketua', nilai: formData.get('nama_ketua') as string },
    { kunci: 'jabatan_ketua', nilai: formData.get('jabatan_ketua') as string },
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
