import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { Box, Skeleton } from '@mui/material'
import HeroSection from './home/HeroSection'
import ServicesTeaser from './home/ServicesTeaser'
import ProcessSection from './home/ProcessSection'
import FeaturedCatalogue from './home/FeaturedCatalogue'
import TestimonialsSection from './home/TestimonialsSection'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Home.hero' })
  return {
    title: `${t('title')} ${t('titleHighlight')}`,
    description: t('subtitle'),
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <Box component="article">
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Services Teaser */}
      <ServicesTeaser />

      {/* Section 3: Our Process */}
      <ProcessSection />

      {/* Section 4: Featured Catalogue (Server Component with ISR) */}
      <Suspense
        fallback={
          <Box sx={{ py: 12, px: 4 }}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4 }} />
          </Box>
        }
      >
        <FeaturedCatalogue locale={locale} />
      </Suspense>

      {/* Section 5: Testimonials */}
      <TestimonialsSection />
    </Box>
  )
}
