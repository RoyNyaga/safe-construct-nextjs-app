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
    .select('id, label, label_fr, cost')
    .eq('catalogue_id', catalogue.id)
    .order('cost', { ascending: false })

  return { ...catalogue, images: images ?? [], costItems: costItems ?? [] }
}

async function getSimilarDesigns(catalogueId: string, bedrooms: number, style: string, origin: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('catalogues')
    .select('id, title, title_fr, slug, style, design_style_origin, size_sqm, bedrooms, bathrooms, floors, total_cost, currency, main_image_url, is_featured, view_count, like_count')
    .eq('is_published', true)
    .neq('id', catalogueId)
    .eq('bedrooms', bedrooms)
    .eq('style', style)
    .eq('design_style_origin', origin)
    .order('like_count', { ascending: false })
    .limit(6)
  return data ?? []
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

  const similarDesigns = await getSimilarDesigns(
    catalogue.id,
    catalogue.bedrooms,
    catalogue.style,
    catalogue.design_style_origin
  )

  return <CatalogueDetailClient catalogue={catalogue} similarDesigns={similarDesigns} />
}
