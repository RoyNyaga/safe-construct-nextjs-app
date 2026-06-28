import { getAllProfiles } from '@/app/[locale]/actions/admin'
import UsersClient from './UsersClient'
import { redirect } from 'next/navigation'

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const result = await getAllProfiles()
  if ('error' in result) {
    if (result.error === 'Unauthorized') {
      redirect(`/${locale}/login`)
    }
    // Fallback if forbidden
    redirect(`/${locale}/admin/dashboard`)
  }

  return (
    <UsersClient
      locale={locale}
      initialProfiles={result.profiles || []}
    />
  )
}
