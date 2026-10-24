import { Box } from '@mui/material'
import BettingSubNav from '../BettingSubNav'
import WarningsClient from './WarningsClient'
import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'
import { getWarningsList, getWarningAnalytics } from '@/app/[locale]/actions/betting'

export default async function BettingWarningsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const [{ bankroll }, { warnings }, analytics] = await Promise.all([
    getActiveBankroll(),
    getWarningsList(),
    getWarningAnalytics(),
  ])

  return (
    <Box sx={{ pb: 6 }}>
      <BettingSubNav
        locale={locale}
        currentBalance={Number(bankroll?.current_balance || 0)}
        currency={bankroll?.currency || 'FCFA'}
      />
      <WarningsClient
        locale={locale}
        initialWarnings={warnings || []}
        analytics={analytics}
        currency={bankroll?.currency || 'FCFA'}
      />
    </Box>
  )
}
