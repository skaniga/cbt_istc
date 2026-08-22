import { createClient } from '@supabase/supabase-js'

/**
 * Admin Supabase client yang menggunakan service_role key.
 * Bypass semua RLS — hanya gunakan di Server Actions / Route Handlers yang sudah terproteksi auth admin.
 * JANGAN expose ke client-side.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY belum dikonfigurasi di .env.local')
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
