import { Box } from '@mui/material'
import BettingSubNav from '../BettingSubNav'
import ImportClient from './ImportClient'
import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'
import { getBettingModels } from '@/app/[locale]/actions/betting'

export default async function BettingImportPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [{ bankroll }, { models }] = await Promise.all([
    getActiveBankroll(),
    getBettingModels(),
  ])

  const currency = bankroll?.currency || 'FCFA'

  return (
    <Box sx={{ pb: 6 }}>
      <BettingSubNav
        locale={locale}
        currentBalance={Number(bankroll?.current_balance || 0)}
        currency={currency}
      />
      <ImportClient
        locale={locale}
        models={models || []}
        currency={currency}
      />
    </Box>
  )
}
