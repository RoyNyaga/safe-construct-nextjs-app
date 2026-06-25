import { createClient } from '@/utils/supabase/server'
import LeadsClient from './LeadsClient'

export default async function AdminLeadsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  // Load all leads categories
  const [
    { data: services },
    { data: designs },
    { data: contacts },
    { data: newsletters },
  ] = await Promise.all([
    supabase.from('service_requests').select('*').order('created_at', { ascending: false }),
    supabase.from('request_designs').select('*').order('created_at', { ascending: false }),
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
    supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false }),
  ])

  return (
    <LeadsClient
      locale={locale}
      serviceRequests={services || []}
      designRequests={designs || []}
      contactMessages={contacts || []}
      newsletterSubscribers={newsletters || []}
    />
  )
}
