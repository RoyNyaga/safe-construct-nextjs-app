import { notFound } from 'next/navigation'
import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'
import { getBettingModelByUuid, getCalibrationStats } from '@/app/[locale]/actions/betting'
import ModelDetailClient from './ModelDetailClient'

export default async function BettingModelDetailPage({
  params,
}: {
  params: Promise<{ locale: string; uuid: string }>
}) {
  const { locale, uuid } = await params

  const [{ bankroll }, { model }, calibration] = await Promise.all([
    getActiveBankroll(),
    getBettingModelByUuid(uuid),
    getCalibrationStats(),
  ])

  if (!model) {
    notFound()
  }

  return (
    <ModelDetailClient
      locale={locale}
      model={model}
      calibration={calibration}
      bankroll={bankroll}
    />
  )
}
