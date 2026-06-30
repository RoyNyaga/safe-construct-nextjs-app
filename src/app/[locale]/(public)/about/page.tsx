import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/utils/supabase/server'
import AboutClient from './AboutClient'

export const revalidate = 120 // Revalidate every 2 minutes


interface TeamMember {
  id: string
  full_name: string
  title: string
  title_fr: string | null
  phone: string | null
  photo_url: string | null
  order_index: number
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'About.hero' })
  return {
    title: `${t('title')} ${t('titleHighlight')}`,
    description: t('subtitle'),
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Load team members
  const supabase = await createClient()
  const { data: teamMembersRaw } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_visible', true)
    .order('order_index', { ascending: true })

  const teamMembers = (teamMembersRaw || []) as TeamMember[]

  return <AboutClient teamMembers={teamMembers} locale={locale} />
}
