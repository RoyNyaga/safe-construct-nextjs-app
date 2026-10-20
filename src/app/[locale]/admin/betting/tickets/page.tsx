import { Box } from '@mui/material'
import BettingSubNav from '../BettingSubNav'
import TicketsClient from './TicketsClient'
import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'
import { getBettingTickets, getBettingModels } from '@/app/[locale]/actions/betting'

export default async function BettingTicketsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const [{ bankroll }, { tickets }, { models }] = await Promise.all([
    getActiveBankroll(),
    getBettingTickets(),
    getBettingModels(),
  ])

  return (
    <Box sx={{ pb: 6 }}>
      <BettingSubNav
        locale={locale}
        currentBalance={Number(bankroll?.current_balance || 0)}
        currency={bankroll?.currency || 'USD'}
      />
      <TicketsClient
        locale={locale}
        tickets={tickets}
        models={models}
        currency={bankroll?.currency || 'USD'}
      />
    </Box>
  )
}
