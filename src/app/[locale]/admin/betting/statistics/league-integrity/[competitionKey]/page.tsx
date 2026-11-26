import { notFound } from 'next/navigation'
import { Box } from '@mui/material'
import BettingSubNav from '../../../BettingSubNav'
import StatisticsSubNav from '../../StatisticsSubNav'
import LeagueDetailClient from './LeagueDetailClient'
import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'
import { getLeagueCompetitionDetail } from '@/app/[locale]/actions/betting'

export default async function LeagueCompetitionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; competitionKey: string }>
}) {
  const { locale, competitionKey } = await params

  const [{ bankroll }, detailRes] = await Promise.all([
    getActiveBankroll(),
    getLeagueCompetitionDetail(competitionKey),
  ])

  if (!detailRes.data) {
    notFound()
  }

  return (
    <Box sx={{ pb: 6 }}>
      <BettingSubNav
        locale={locale}
        currentBalance={Number(bankroll?.current_balance || 0)}
        currency={bankroll?.currency || 'FCFA'}
      />
      <StatisticsSubNav
        locale={locale}
        totalCompetitions={detailRes.data.total_competitions}
      />
      <LeagueDetailClient
        locale={locale}
        detail={detailRes.data}
      />
    </Box>
  )
}
