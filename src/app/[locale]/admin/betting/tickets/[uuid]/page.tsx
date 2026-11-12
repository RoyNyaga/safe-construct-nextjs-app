import { notFound } from 'next/navigation'
import { Box } from '@mui/material'
import BettingSubNav from '../../BettingSubNav'
import TicketDetailClient from './TicketDetailClient'
import { getActiveBankroll } from '@/app/[locale]/actions/bankroll'
import { getBettingTicketByUuid, getBettingModels } from '@/app/[locale]/actions/betting'

export default async function BettingTicketDetailPage({
  params,
}: {
  params: Promise<{ locale: string; uuid: string }>
}) {
  const { locale, uuid } = await params

  const [{ bankroll }, { ticket }, { models }] = await Promise.all([
    getActiveBankroll(),
    getBettingTicketByUuid(uuid),
    getBettingModels(),
  ])

  if (!ticket) {
    notFound()
  }

  return (
    <Box sx={{ pb: 6 }}>
      <BettingSubNav
        locale={locale}
        currentBalance={Number(bankroll?.current_balance || 0)}
        currency={bankroll?.currency || 'FCFA'}
      />
      <TicketDetailClient
        locale={locale}
        ticket={ticket}
        models={models || []}
        currency={bankroll?.currency || 'FCFA'}
      />
    </Box>
  )
}
