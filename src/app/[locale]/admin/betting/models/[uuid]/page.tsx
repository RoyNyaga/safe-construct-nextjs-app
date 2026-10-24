import { notFound } from 'next/navigation'
import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'
import { getBettingModelByUuid, getModelCalibrationData } from '@/app/[locale]/actions/betting'
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

  const [{ bankroll }, calibrationData] = await Promise.all([
    getActiveBankroll(),
    getModelCalibrationData(model.id),
  ])

  return (
    <ModelDetailClient
      locale={locale}
      model={model}
      calibrationData={calibrationData}
      bankroll={bankroll}
    />
  )
}
