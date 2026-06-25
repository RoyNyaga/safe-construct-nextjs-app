import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import SelectContextClient from './SelectContextClient'

export default async function SelectContextPage({
  params,
}: {
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

  // Fetch role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    // Standard client user, bypass context switcher
    redirect(`/${locale}`)
  }

  return <SelectContextClient locale={locale} />
}
