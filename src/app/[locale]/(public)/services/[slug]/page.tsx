import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES, SERVICE_META } from '@/lib/services-data'
import ServiceDetailClient from './ServiceDetailClient'

export const revalidate = 120 // Revalidate every 2 minutes


export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = SERVICE_META[slug]
  if (!meta) return {}
  return { title: meta.name, description: meta.tagline }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) notFound()

  // Pass only the plain string slug — the Client Component resolves the
  // full service definition (including icon components) from its own import.
  return <ServiceDetailClient slug={slug} />
}
