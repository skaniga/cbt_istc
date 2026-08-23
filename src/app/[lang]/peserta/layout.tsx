import { getSession, clearSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PesertaNavbar from './PesertaNavbar'

export const revalidate = 0

export default async function PesertaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  // Verifikasi peserta masih ada di DB (bukan hanya cek cookie)
  const supabase = await createClient()
  const { data: participant } = await supabase
    .from('participants')
    .select('id')
    .eq('id', session.pesertaId)
    .maybeSingle()

  if (!participant) {
    // Peserta sudah dihapus — hapus session dan redirect ke login
    await clearSession()
    redirect('/login')
  }

  return (
    <>
      <PesertaNavbar />
      
      <main style={{ paddingTop: '5rem', minHeight: '100vh' }}>
        {children}
      </main>
    </>
  )
}

