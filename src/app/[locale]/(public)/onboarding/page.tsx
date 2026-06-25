import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import OnboardingClient from './OnboardingClient'

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  // Verify authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/login`)
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // If already onboarded (has first and last names), bypass onboarding
  if (profile && profile.first_name && profile.last_name) {
    redirect(`/${locale}/select-context`)
  }

  return (
    <OnboardingClient
      locale={locale}
      userPhone={user.phone || ''}
      userEmail={user.email || ''}
    />
  )
}
