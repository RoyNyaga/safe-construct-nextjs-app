import { createClient } from '@/utils/supabase/server'
import CataloguesClient from './CataloguesClient'

export default async function AdminCataloguesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  // Fetch all catalogues with nested cost items and image galleries
  const { data: catalogues } = await supabase
    .from('catalogues')
    .select('*, cost_items:catalogue_cost_items(*), images:catalogue_images(*)')
    .order('created_at', { ascending: false })

  return (
    <CataloguesClient
      locale={locale}
      catalogues={catalogues || []}
    />
  )
}
