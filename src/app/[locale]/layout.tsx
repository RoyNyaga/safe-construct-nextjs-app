import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import MuiProvider from '@/theme/MuiProvider'
import { routing } from '@/i18n/routing'

type LocaleParams = { locale: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Home.hero' })

  return {
    title: {
      default: 'Safe-Construct — Premium Architectural Design & Construction',
      template: '%s | Safe-Construct',
    },
    description: t('subtitle'),
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://safe-construct.org'),
    openGraph: {
      siteName: 'Safe-Construct',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/opengraph-image.jpeg',
          width: 1200,
          height: 630,
          alt: 'Safe-Construct — Premium Architectural Design & Construction',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/twitter-image.jpeg'],
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<LocaleParams>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <MuiProvider>{children}</MuiProvider>
    </NextIntlClientProvider>
  )
}
