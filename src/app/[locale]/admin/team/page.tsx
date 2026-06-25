import { createClient } from '@/utils/supabase/server'
import TeamClient from './TeamClient'

export default async function AdminTeamPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  // Fetch all team members sorted by order index
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })

  return (
    <TeamClient
      locale={locale}
      teamMembers={teamMembers || []}
    />
  )
}
