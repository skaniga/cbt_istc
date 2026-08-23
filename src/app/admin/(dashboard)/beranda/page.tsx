import { createClient } from '@/lib/supabase/server'
import { toConfigMap, SystemConfig } from '@/lib/types'
import BerandaForm from './BerandaForm'

export const revalidate = 0

export default async function BerandaAdminPage() {
  const supabase = await createClient()

  // Ambil konfigurasi saat ini
  const { data: configRes } = await supabase
    .from('system_config')
    .select('*')

  const config = toConfigMap((configRes as SystemConfig[]) ?? [])

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Pengaturan Beranda</h1>
        <p style={{ color: 'var(--muted-fg)' }}>Sesuaikan tampilan dan informasi pada halaman utama.</p>
      </div>

      <div className="card" style={{ background: '#fff' }}>
        <BerandaForm initialConfig={config} />
      </div>
    </div>
  )
}
