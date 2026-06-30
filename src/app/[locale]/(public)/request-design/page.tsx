import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/utils/supabase/server'
import RequestDesignClient from './RequestDesignClient'

export const revalidate = 120 // Revalidate every 2 minutes


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'RequestDesign' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function RequestDesignPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params
  const sParams = await searchParams
  const catalogueSlug = typeof sParams.catalogue === 'string' ? sParams.catalogue : null

  let initialCatalogue = null

  if (catalogueSlug) {
    const supabase = await createClient()
    const { data } = await supabase
      .from('catalogues')
      .select('id, title, title_fr, style, size_sqm, bedrooms, bathrooms, floors')
      .eq('slug', catalogueSlug)
      .eq('is_published', true)
      .maybeSingle()

    if (data) {
      initialCatalogue = data
    }
  }

  return (
    <RequestDesignClient
      locale={locale}
      initialCatalogue={initialCatalogue}
    />
  )
}
