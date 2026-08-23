import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-alt)' }}>
      
      {/* Sidebar Admin */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="admin-main" style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto' }}>
        {children}
      </main>

    </div>
  )
}
