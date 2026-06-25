import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import CatalogueDetailClient from './CatalogueDetailClient'

export const revalidate = 3600

async function getCatalogue(slug: string) {
  const supabase = await createClient()

  const { data: catalogue } = await supabase
    .from('catalogues')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!catalogue) return null

  const { data: images } = await supabase
    .from('catalogue_images')
    .select('id, image_url, caption, order_index')
    .eq('catalogue_id', catalogue.id)
    .order('order_index', { ascending: true })

  const { data: costItems } = await supabase
    .from('catalogue_cost_items')
    .select('id, label, cost')
    .eq('catalogue_id', catalogue.id)
    .order('cost', { ascending: false })

  return { ...catalogue, images: images ?? [], costItems: costItems ?? [] }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const catalogue = await getCatalogue(slug)
  if (!catalogue) return {}
  return {
    title: catalogue.title,
    description: catalogue.description ?? `View details for ${catalogue.title}`,
  }
}

export default async function CatalogueDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const catalogue = await getCatalogue(slug)
  if (!catalogue) notFound()

  return <CatalogueDetailClient catalogue={catalogue} />
}
