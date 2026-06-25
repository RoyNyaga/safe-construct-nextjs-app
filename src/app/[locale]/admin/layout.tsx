import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getAdminPermissions } from '@/app/[locale]/actions/admin'
import AdminLayoutClient from './AdminLayoutClient'

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  // Verify auth session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/login`)
  }

  // Verify role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect(`/${locale}`)
  }

  // Load capability tokens (auto-seeds standard permissions if empty)
  const permissions = await getAdminPermissions(user.id)

  return (
    <AdminLayoutClient locale={locale} permissions={permissions}>
      {children}
    </AdminLayoutClient>
  )
}
