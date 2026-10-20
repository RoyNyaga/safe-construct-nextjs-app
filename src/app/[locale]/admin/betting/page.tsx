import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'
import {
  getBettingSummaryStats,
  getBettingTickets,
  getBettingModels,
  getSelectedVsAlternativesComparison,
} from '@/app/[locale]/actions/betting'
import BettingSummaryClient from './BettingSummaryClient'

export default async function BettingSummaryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Parallel data fetching on the server
  const [
    { bankroll },
    stats,
    { tickets },
    { models },
    comparison,
  ] = await Promise.all([
    getActiveBankroll(),
    getBettingSummaryStats(),
    getBettingTickets(),
    getBettingModels(),
    getSelectedVsAlternativesComparison(),
  ])

  return (
    <BettingSummaryClient
      locale={locale}
      bankroll={bankroll}
      stats={stats}
      tickets={tickets}
      models={models}
      comparison={comparison}
    />
  )
}
