import { Box } from '@mui/material'
import BettingSubNav from '../BettingSubNav'
import ModelsClient from './ModelsClient'
import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'
import { getBettingModels } from '@/app/[locale]/actions/betting'

export default async function BettingModelsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const [{ bankroll }, { models }] = await Promise.all([
    getActiveBankroll(),
    getBettingModels(),
  ])

  return (
    <Box sx={{ pb: 6 }}>
      <BettingSubNav
        locale={locale}
        currentBalance={Number(bankroll?.current_balance || 0)}
        currency={bankroll?.currency || 'FCFA'}
      />
      <ModelsClient locale={locale} models={models} />
    </Box>
  )
}
