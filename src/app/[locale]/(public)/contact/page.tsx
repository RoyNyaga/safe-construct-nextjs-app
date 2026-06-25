import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ContactForm from './ContactForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Contact' })
  return { title: t('title'), description: t('subtitle') }
}

export default function ContactPage() {
  return <ContactForm />
}
