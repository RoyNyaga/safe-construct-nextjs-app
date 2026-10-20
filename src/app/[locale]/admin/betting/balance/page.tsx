import { Box } from '@mui/material'
import BettingSubNav from '../BettingSubNav'
import BalanceClient from './BalanceClient'
import { getActiveBankroll, getBankrollTransactions } from '@/app/[locale]/actions/bankroll'

export default async function BettingBalancePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const [{ bankroll }, { transactions }] = await Promise.all([
    getActiveBankroll(),
    getBankrollTransactions(),
  ])

  const currentBal = Number(bankroll?.current_balance || 0)
  const currency = bankroll?.currency || 'FCFA'

  return (
    <Box sx={{ pb: 6 }}>
      {/* Sub Navigation Bar with Live Balance */}
      <BettingSubNav locale={locale} currentBalance={currentBal} currency={currency} />

      {/* Interactive Balance Client with Modals & Ledger */}
      <BalanceClient
        locale={locale}
        bankroll={bankroll}
        transactions={transactions}
      />
    </Box>
  )
}
