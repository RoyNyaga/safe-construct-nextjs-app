'use server'

import { createClient } from '@/utils/supabase/server'

export async function incrementView(catalogueId: string) {
  const supabase = await createClient()
  await supabase.rpc('increment_catalogue_view', { p_catalogue_id: catalogueId })
}

export async function incrementLike(catalogueId: string): Promise<{ like_count: number }> {
  const supabase = await createClient()
  await supabase.rpc('increment_catalogue_like', { p_catalogue_id: catalogueId })
  const { data } = await supabase
    .from('catalogues')
    .select('like_count')
    .eq('id', catalogueId)
    .single()
  return { like_count: data?.like_count ?? 0 }
}
