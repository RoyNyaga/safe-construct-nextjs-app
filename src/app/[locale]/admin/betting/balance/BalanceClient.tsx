'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Paper,
  TextField,
  Tabs,
  Tab,
  alpha,
  Divider,
} from '@mui/material'
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  User,
  Bot,
  PlusCircle,
  MinusCircle,
  Receipt,
  RotateCcw,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { BettingBankroll, BettingTransaction, TriggerType } from '@/types/betting'
import { recordManualDeposit, recordManualWithdrawal, updateBankrollCurrency } from '@/app/[locale]/actions/bankroll'
import { CustomModal, CustomTooltip, CustomNotification } from '@/components/ui'
import CustomButton from '@/components/ui/CustomButton'
import { LoadingButton } from '@/components/ui/PromptButtons'
import { formatCurrency, formatCurrencySign } from '@/utils/bettingCurrency'

interface BalanceClientProps {
  locale: string
  bankroll: BettingBankroll | null
  transactions: BettingTransaction[]
}

export default function BalanceClient({
  locale,
  bankroll,
  transactions: initialTransactions,
}: BalanceClientProps) {
  const [transactions, setTransactions] = useState<BettingTransaction[]>(initialTransactions)
  const [triggerTab, setTriggerTab] = useState<'all' | 'manual' | 'automatic'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Deposit Modal State
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState('')
  const [depositNotes, setDepositNotes] = useState('')
  const [isDepositLoading, setIsDepositLoading] = useState(false)

  // Withdraw Modal State
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawNotes, setWithdrawNotes] = useState('')
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false)

  // Notification State
  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({ open: false, message: '', type: 'info' })

  const [currency, setCurrency] = useState(bankroll?.currency || 'USD')
  const currentBal = Number(bankroll?.current_balance || 0)

  // Filter Transactions
  const filteredTransactions = transactions.filter((tx) => {
    if (triggerTab !== 'all' && tx.trigger_type !== triggerTab) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const desc = (tx.description || '').toLowerCase()
      const type = tx.transaction_type.toLowerCase()
      const ticketNum = (tx.betting_tickets?.ticket_number || '').toLowerCase()
      return desc.includes(q) || type.includes(q) || ticketNum.includes(q)
    }
    return true
  })

  // Quick Amount Handlers
  const handleDeposit = async () => {
    const val = parseFloat(depositAmount)
    if (isNaN(val) || val <= 0) {
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Veuillez saisir un montant valide supérieur à 0.' : 'Please enter a valid amount greater than 0.',
        type: 'error',
      })
      return
    }

    setIsDepositLoading(true)
    const res = await recordManualDeposit(val, depositNotes)
    setIsDepositLoading(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else if (res.transaction) {
      setTransactions([res.transaction, ...transactions])
      setIsDepositOpen(false)
      setDepositAmount('')
      setDepositNotes('')
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Dépôt enregistré avec succès dans le ledger !' : 'Deposit recorded successfully in the ledger!',
        type: 'success',
      })
    }
  }

  const handleWithdraw = async () => {
    const val = parseFloat(withdrawAmount)
    if (isNaN(val) || val <= 0) {
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Veuillez saisir un montant valide supérieur à 0.' : 'Please enter a valid amount greater than 0.',
        type: 'error',
      })
      return
    }

    setIsWithdrawLoading(true)
    const res = await recordManualWithdrawal(val, withdrawNotes)
    setIsWithdrawLoading(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else if (res.transaction) {
      setTransactions([res.transaction, ...transactions])
      setIsWithdrawOpen(false)
      setWithdrawAmount('')
      setWithdrawNotes('')
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Retrait enregistré avec succès dans le ledger !' : 'Withdrawal recorded successfully in the ledger!',
        type: 'success',
      })
    }
  }

  const handleCurrencyChange = async (newCurr: string) => {
    if (newCurr === currency) return
    setCurrency(newCurr)
    const res = await updateBankrollCurrency(newCurr)
    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setNotification({
        open: true,
        message: locale === 'fr' ? `Devise active : ${newCurr}` : `Active currency: ${newCurr}`,
        type: 'success',
      })
    }
  }

  return (
    <Box>
      {/* Toast Feedback */}
      <CustomNotification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, open: false })}
      />

      {/* Hero Bankroll Banner */}
      <Card
        sx={{
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: alpha('#1E2635', 0.95),
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 320,
            height: '100%',
            background: 'radial-gradient(circle at top right, rgba(242, 100, 25, 0.15), transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    backgroundColor: alpha('#66BB6A', 0.15),
                    color: '#66BB6A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Wallet size={20} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                  {bankroll?.name || 'Main Bankroll'}
                </Typography>
                <Chip
                  label="LEDGER STRICT"
                  size="small"
                  sx={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    backgroundColor: alpha('#F26419', 0.15),
                    color: '#F26419',
                    border: '1px solid rgba(242, 100, 25, 0.3)',
                  }}
                />

                {/* Currency Switcher (FCFA vs USD) */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    p: 0.35,
                    borderRadius: 2,
                    backgroundColor: alpha('#000000', 0.35),
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Chip
                    label="FCFA"
                    size="small"
                    onClick={() => handleCurrencyChange('FCFA')}
                    sx={{
                      height: 22,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      backgroundColor: currency === 'FCFA' ? '#F26419' : 'transparent',
                      color: currency === 'FCFA' ? '#fff' : 'text.secondary',
                      '&:hover': {
                        backgroundColor: currency === 'FCFA' ? '#F26419' : alpha('#fff', 0.1),
                      },
                    }}
                  />
                  <Chip
                    label="USD ($)"
                    size="small"
                    onClick={() => handleCurrencyChange('USD')}
                    sx={{
                      height: 22,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      backgroundColor: currency === 'USD' ? '#2F80ED' : 'transparent',
                      color: currency === 'USD' ? '#fff' : 'text.secondary',
                      '&:hover': {
                        backgroundColor: currency === 'USD' ? '#2F80ED' : alpha('#fff', 0.1),
                      },
                    }}
                  />
                </Box>
              </Box>

              <Typography variant="h2" sx={{ fontWeight: 800, color: '#66BB6A', mb: 2 }}>
                {formatCurrency(currentBal, currency)}
              </Typography>

              {/* Sub Metrics */}
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {locale === 'fr' ? 'Dépôts Cumulés' : 'Total Deposited'}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {formatCurrency(bankroll?.total_deposited || 0, currency)}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ borderColor: 'divider' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {locale === 'fr' ? 'Retraits Cumulés' : 'Total Withdrawn'}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {formatCurrency(bankroll?.total_withdrawn || 0, currency)}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ borderColor: 'divider' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {locale === 'fr' ? 'Total Misé' : 'Total Staked'}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {formatCurrency(bankroll?.total_staked || 0, currency)}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ borderColor: 'divider' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {locale === 'fr' ? 'Gains Reçus' : 'Total Payouts'}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#66BB6A' }}>
                    {formatCurrency(bankroll?.total_payout || 0, currency)}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Quick Action Buttons */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' }, flexWrap: 'wrap' }}>
                <CustomButton
                  variant="contained"
                  onClick={() => setIsDepositOpen(true)}
                  startIcon={<PlusCircle size={18} />}
                  sx={{
                    background: 'linear-gradient(135deg, #66BB6A 0%, #43A047 100%)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    px: 3,
                    py: 1.25,
                    boxShadow: '0 4px 14px rgba(102, 187, 106, 0.35)',
                  }}
                >
                  {locale === 'fr' ? 'Ajouter du Capital' : 'Deposit Capital'}
                </CustomButton>

                <CustomButton
                  variant="outlined"
                  onClick={() => setIsWithdrawOpen(true)}
                  startIcon={<MinusCircle size={18} />}
                  sx={{
                    borderColor: alpha('#EF5350', 0.5),
                    color: '#EF5350',
                    fontWeight: 700,
                    px: 3,
                    py: 1.25,
                    '&:hover': {
                      borderColor: '#EF5350',
                      backgroundColor: alpha('#EF5350', 0.1),
                    },
                  }}
                >
                  {locale === 'fr' ? 'Effectuer un Retrait' : 'Withdraw Capital'}
                </CustomButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Transaction Ledger Card */}
      <Card
        sx={{
          backgroundColor: alpha('#1E2635', 0.9),
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Controls Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Receipt size={22} color="#F26419" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {locale === 'fr' ? 'Grand Livre des Transactions' : 'Bankroll Transaction Ledger'}
              </Typography>
              <Chip
                label={`${filteredTransactions.length} ${locale === 'fr' ? 'opérations' : 'entries'}`}
                size="small"
                sx={{ ml: 1, backgroundColor: alpha('#F0F2F5', 0.08) }}
              />
            </Box>

            {/* Filter Tabs & Search */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Tabs
                value={triggerTab}
                onChange={(_, v) => setTriggerTab(v)}
                sx={{
                  minHeight: 38,
                  backgroundColor: alpha('#121824', 0.6),
                  borderRadius: 2,
                  p: 0.5,
                  '& .MuiTab-root': {
                    minHeight: 32,
                    py: 0.5,
                    px: 1.5,
                    borderRadius: 1.5,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      color: '#FFFFFF',
                      backgroundColor: alpha('#F26419', 0.25),
                    },
                  },
                  '& .MuiTabs-indicator': { display: 'none' },
                }}
              >
                <Tab label={locale === 'fr' ? 'Toutes' : 'All'} value="all" />
                <Tab
                  icon={<User size={14} style={{ marginRight: 4 }} />}
                  iconPosition="start"
                  label={locale === 'fr' ? 'Manuelles' : 'Manual'}
                  value="manual"
                />
                <Tab
                  icon={<Bot size={14} style={{ marginRight: 4 }} />}
                  iconPosition="start"
                  label={locale === 'fr' ? 'Automatiques' : 'Automatic'}
                  value="automatic"
                />
              </Tabs>

              <TextField
                size="small"
                placeholder={locale === 'fr' ? 'Filtrer les notes ou tickets...' : 'Search description / tickets...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <Search size={16} color="#9AA3B2" style={{ marginRight: 8 }} />,
                  },
                }}
                sx={{ width: { xs: '100%', sm: 240 } }}
              />
            </Box>
          </Box>

          {/* Transactions Table */}
          {filteredTransactions.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Receipt size={42} color="#9AA3B2" style={{ margin: '0 auto 12px' }} />
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                {locale === 'fr' ? 'Aucune transaction enregistrée' : 'No transactions found'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {locale === 'fr'
                  ? 'Effectuez un dépôt initial ou créez un ticket pour commencer à alimenter le grand livre.'
                  : 'Deposit capital or import a betting ticket to generate your first ledger entries.'}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Date & Time</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Trigger</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Type</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Amount</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Balance (Before &rarr; After)</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Ticket</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => {
                    const isCredit = Number(tx.amount) > 0
                    const isManual = tx.trigger_type === 'manual'

                    return (
                      <tr
                        key={tx.uuid || tx.id}
                        style={{
                          borderBottom: '1px solid rgba(240, 242, 245, 0.05)',
                          transition: 'background 0.2s ease',
                        }}
                      >
                        {/* Date */}
                        <td style={{ padding: '14px 16px', color: '#9AA3B2', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                          {new Date(tx.created_at).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>

                        {/* Trigger */}
                        <td style={{ padding: '14px 16px' }}>
                          <Chip
                            icon={isManual ? <User size={13} /> : <Bot size={13} />}
                            label={isManual ? 'MANUAL' : 'AUTOMATIC'}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              fontSize: '0.65rem',
                              backgroundColor: isManual ? alpha('#818CF8', 0.15) : alpha('#F6AE2D', 0.15),
                              color: isManual ? '#818CF8' : '#F6AE2D',
                              border: `1px solid ${isManual ? alpha('#818CF8', 0.3) : alpha('#F6AE2D', 0.3)}`,
                            }}
                          />
                        </td>

                        {/* Type */}
                        <td style={{ padding: '14px 16px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                            {tx.transaction_type.replace('_', ' ')}
                          </Typography>
                        </td>

                        {/* Amount */}
                        <td style={{ padding: '14px 16px', fontWeight: 800, fontSize: '0.9rem', color: isCredit ? '#66BB6A' : '#EF5350', whiteSpace: 'nowrap' }}>
                          {formatCurrencySign(isCredit ? Math.abs(Number(tx.amount)) : -Math.abs(Number(tx.amount)), currency)}
                        </td>

                        {/* Balance Before -> After */}
                        <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: '#9AA3B2', whiteSpace: 'nowrap' }}>
                          {formatCurrency(tx.balance_before, currency)} &rarr;{' '}
                          <span style={{ fontWeight: 700, color: '#F0F2F5' }}>
                            {formatCurrency(tx.balance_after, currency)}
                          </span>
                        </td>

                        {/* Ticket */}
                        <td style={{ padding: '14px 16px' }}>
                          {tx.betting_tickets ? (
                            <Link
                              href={`/${locale}/admin/betting/tickets/${tx.betting_tickets.uuid}`}
                              style={{ textDecoration: 'none' }}
                            >
                              <Chip
                                label={tx.betting_tickets.ticket_number ? `#${tx.betting_tickets.ticket_number}` : 'Ticket'}
                                size="small"
                                sx={{
                                  cursor: 'pointer',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  backgroundColor: alpha('#F26419', 0.15),
                                  color: '#F26419',
                                  '&:hover': { backgroundColor: alpha('#F26419', 0.25) },
                                }}
                              />
                            </Link>
                          ) : (
                            <Typography variant="caption" color="text.secondary">—</Typography>
                          )}
                        </td>

                        {/* Description */}
                        <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: 'text.secondary' }}>
                          {tx.description || '—'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* ─── DEPOSIT MODAL ─────────────────────────────────────────────────── */}
      <CustomModal
        open={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PlusCircle size={22} color="#66BB6A" />
            <span>{locale === 'fr' ? 'Ajouter du Capital (Dépôt Manuel)' : 'Deposit Capital (Manual Ledger)'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setIsDepositOpen(false)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </CustomButton>
            <LoadingButton
              variant="contained"
              loading={isDepositLoading}
              onClick={handleDeposit}
              sx={{
                background: 'linear-gradient(135deg, #66BB6A 0%, #43A047 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
              }}
            >
              {locale === 'fr' ? 'Confirmer le Dépôt' : 'Confirm Deposit'}
            </LoadingButton>
          </Box>
        }
      >
        <Box sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {locale === 'fr'
              ? 'Ce dépôt sera enregistré avec le déclencheur MANUAL dans le grand livre et augmentera le solde actif de votre bankroll.'
              : 'This deposit will be recorded with trigger MANUAL in the transaction ledger and will increase your active bankroll balance.'}
          </Typography>

          <TextField
            fullWidth
            type="number"
            label={locale === 'fr' ? 'Montant à Déposer ($)' : 'Deposit Amount ($)'}
            placeholder="100.00"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            sx={{ mb: 2.5 }}
          />

          {/* Quick Amount Chips */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            {[50, 100, 250, 500, 1000].map((amt) => (
              <Chip
                key={amt}
                label={`+$${amt}`}
                size="small"
                onClick={() => setDepositAmount(amt.toString())}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 700,
                  backgroundColor: alpha('#66BB6A', 0.1),
                  color: '#66BB6A',
                  '&:hover': { backgroundColor: alpha('#66BB6A', 0.2) },
                }}
              />
            ))}
          </Box>

          <TextField
            fullWidth
            multiline
            rows={2}
            label={locale === 'fr' ? 'Note / Description' : 'Notes / Description'}
            placeholder="e.g. Initial testing capital from bank transfer"
            value={depositNotes}
            onChange={(e) => setDepositNotes(e.target.value)}
          />
        </Box>
      </CustomModal>

      {/* ─── WITHDRAWAL MODAL ──────────────────────────────────────────────── */}
      <CustomModal
        open={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MinusCircle size={22} color="#EF5350" />
            <span>{locale === 'fr' ? 'Retirer du Capital (Retrait Manuel)' : 'Withdraw Capital (Manual Ledger)'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setIsWithdrawOpen(false)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </CustomButton>
            <LoadingButton
              variant="contained"
              loading={isWithdrawLoading}
              onClick={handleWithdraw}
              sx={{
                background: 'linear-gradient(135deg, #EF5350 0%, #D32F2F 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
              }}
            >
              {locale === 'fr' ? 'Confirmer le Retrait' : 'Confirm Withdrawal'}
            </LoadingButton>
          </Box>
        }
      >
        <Box sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {locale === 'fr'
              ? 'Ce retrait sera enregistré avec le déclencheur MANUAL dans le grand livre et réduira le solde actif de votre bankroll.'
              : 'This withdrawal will be recorded with trigger MANUAL in the transaction ledger and will reduce your active bankroll balance.'}
          </Typography>

          <TextField
            fullWidth
            type="number"
            label={locale === 'fr' ? 'Montant à Retirer ($)' : 'Withdrawal Amount ($)'}
            placeholder="50.00"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            sx={{ mb: 2.5 }}
          />

          <TextField
            fullWidth
            multiline
            rows={2}
            label={locale === 'fr' ? 'Note / Description' : 'Notes / Description'}
            placeholder="e.g. Profit withdrawal to personal account"
            value={withdrawNotes}
            onChange={(e) => setWithdrawNotes(e.target.value)}
          />
        </Box>
      </CustomModal>
    </Box>
  )
}
