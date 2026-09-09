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
    <div className="admin-layout">
      {/* Sidebar Admin & Mobile Header */}
      <AdminSidebar userEmail={user.email} />

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
