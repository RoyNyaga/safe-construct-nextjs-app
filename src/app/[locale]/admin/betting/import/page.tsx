import { Box } from '@mui/material'
import BettingSubNav from '../BettingSubNav'
import ImportClient from './ImportClient'
import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'

export default async function BettingImportPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { bankroll } = await getActiveBankroll()

  return (
    <Box sx={{ pb: 6 }}>
      <BettingSubNav
        locale={locale}
        currentBalance={Number(bankroll?.current_balance || 0)}
        currency={bankroll?.currency || 'FCFA'}
      />
      <ImportClient locale={locale} />
    </Box>
  )
}
