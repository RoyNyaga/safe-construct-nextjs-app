import { Box } from '@mui/material'
import BettingSubNav from '../BettingSubNav'
import StatisticsClient from './StatisticsClient'
import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'
import {
  getBettingSummaryStats,
  getCalibrationStats,
  getSelectedVsAlternativesComparison,
} from '@/app/[locale]/actions/betting'

export default async function BettingStatisticsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const [
    { bankroll },
    summary,
    calibration,
    comparison,
  ] = await Promise.all([
    getActiveBankroll(),
    getBettingSummaryStats(),
    getCalibrationStats(),
    getSelectedVsAlternativesComparison(),
  ])

  return (
    <Box sx={{ pb: 6 }}>
      <BettingSubNav
        locale={locale}
        currentBalance={Number(bankroll?.current_balance || 0)}
        currency={bankroll?.currency || 'USD'}
      />
      <StatisticsClient
        locale={locale}
        summary={summary}
        calibration={calibration}
        comparison={comparison}
      />
    </Box>
  )
}
