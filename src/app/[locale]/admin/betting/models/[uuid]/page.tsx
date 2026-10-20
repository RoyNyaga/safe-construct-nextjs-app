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

  const { model } = await getBettingModelByUuid(uuid)

  if (!model) {
    notFound()
  }

  const [{ bankroll }, calibration] = await Promise.all([
    getActiveBankroll(),
    getCalibrationStats(model.id),
  ])

  return (
    <ModelDetailClient
      locale={locale}
      model={model}
      calibration={calibration}
      bankroll={bankroll}
    />
  )
}
