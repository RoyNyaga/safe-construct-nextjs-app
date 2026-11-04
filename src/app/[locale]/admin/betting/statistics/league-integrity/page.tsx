import { Box } from '@mui/material'
import BettingSubNav from '../../BettingSubNav'
import StatisticsSubNav from '../StatisticsSubNav'
import LeagueIntegrityClient from './LeagueIntegrityClient'
import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'
import { getLeagueMarketIntegrity } from '@/app/[locale]/actions/betting'

export default async function LeagueMarketIntegrityPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const [{ bankroll }, integrityPayload] = await Promise.all([
    getActiveBankroll(),
    getLeagueMarketIntegrity(),
  ])

  return (
    <Box sx={{ pb: 6 }}>
      <BettingSubNav
        locale={locale}
        currentBalance={Number(bankroll?.current_balance || 0)}
        currency={bankroll?.currency || 'FCFA'}
      />
      <StatisticsSubNav
        locale={locale}
        totalCompetitions={integrityPayload.data?.competitions?.length || 0}
      />
      <LeagueIntegrityClient
        locale={locale}
        initialPayload={integrityPayload.data}
        error={integrityPayload.error}
      />
    </Box>
  )
}

