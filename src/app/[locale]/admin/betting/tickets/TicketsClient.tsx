'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  TextField,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  alpha,
} from '@mui/material'
import {
  Receipt,
  Search,
  PlusCircle,
  FileCode2,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ArrowRight,
  Trash2,
  AlertTriangle,
} from 'lucide-react'
import { BettingTicket, BettingModel } from '@/types/betting'
import { deleteBettingTicket } from '@/app/[locale]/actions/betting'
import { CustomModal, CustomNotification, CustomTooltip } from '@/components/ui'
import CustomButton from '@/components/ui/CustomButton'
import { LoadingButton } from '@/components/ui/PromptButtons'
import { formatCurrency, formatCurrencySign } from '@/utils/bettingCurrency'

interface TicketsClientProps {
  locale: string
  tickets: BettingTicket[]
  models: BettingModel[]
  currency?: string
}

export default function TicketsClient({
  locale,
  tickets: initialTickets,
  models,
  currency = 'USD',
}: TicketsClientProps) {
  const [tickets, setTickets] = useState<BettingTicket[]>(initialTickets)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [modelFilter, setModelFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  // Delete Modal State
  const [deletingTicket, setDeletingTicket] = useState<BettingTicket | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Notification State
  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({ open: false, message: '', type: 'info' })

  const filteredTickets = tickets.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    if (modelFilter !== 'all' && t.model_id?.toString() !== modelFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const matchNum = (t.ticket_number || '').toLowerCase().includes(q)
      const matchNotes = (t.notes || '').toLowerCase().includes(q)
      const matchTeam = (t.betting_selections || []).some(
        (sel) => sel.home_team.toLowerCase().includes(q) || sel.away_team.toLowerCase().includes(q)
      )
      return matchNum || matchNotes || matchTeam
    }
    return true
  })

  const handleDeleteTicket = async () => {
    if (!deletingTicket) return
    setIsDeleting(true)
    const res = await deleteBettingTicket(deletingTicket.id)
    setIsDeleting(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setTickets(tickets.filter((t) => t.id !== deletingTicket.id))
      setDeletingTicket(null)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Ticket supprimé et solde synchronisé !' : 'Ticket deleted and bankroll synchronized!',
        type: 'success',
      })
    }
  }

  return (
    <Box>
      <CustomNotification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, open: false })}
      />

      {/* Header and Actions */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {locale === 'fr' ? 'Historique des Tickets' : 'Betting Ticket History'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {locale === 'fr'
              ? 'Consultez, filtrez et suivez l\'ensemble de vos tickets de paris enregistrés avec leur dénouement.'
              : 'Complete ledger of all placed tickets, combined odds, stake allocation, and automatic settlement.'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <CustomButton
            component={Link}
            href={`/${locale}/admin/betting/import`}
            variant="contained"
            startIcon={<PlusCircle size={18} />}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
            }}
          >
            {locale === 'fr' ? 'Importer un Ticket (JSON)' : 'Import New Ticket (JSON)'}
          </CustomButton>
        </Box>
      </Box>

      {/* Filter Toolbar Card */}
      <Card
        sx={{
          mb: 3,
          backgroundColor: alpha('#1E2635', 0.95),
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            {/* Status Tabs */}
            <Tabs
              value={statusFilter}
              onChange={(_, v) => setStatusFilter(v)}
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
              <Tab label={locale === 'fr' ? 'Tous' : 'All'} value="all" />
              <Tab
                icon={<Clock size={14} style={{ marginRight: 4 }} />}
                iconPosition="start"
                label={locale === 'fr' ? 'En cours' : 'Pending'}
                value="pending"
              />
              <Tab
                icon={<CheckCircle2 size={14} style={{ marginRight: 4 }} />}
                iconPosition="start"
                label={locale === 'fr' ? 'Gagnés' : 'Won'}
                value="won"
              />
              <Tab
                icon={<XCircle size={14} style={{ marginRight: 4 }} />}
                iconPosition="start"
                label={locale === 'fr' ? 'Perdus' : 'Lost'}
                value="lost"
              />
              <Tab
                icon={<RotateCcw size={14} style={{ marginRight: 4 }} />}
                iconPosition="start"
                label={locale === 'fr' ? 'Annulés' : 'Void'}
                value="void"
              />
            </Tabs>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Model Filter */}
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>{locale === 'fr' ? 'Modèle' : 'Model'}</InputLabel>
                <Select
                  value={modelFilter}
                  label={locale === 'fr' ? 'Modèle' : 'Model'}
                  onChange={(e) => setModelFilter(e.target.value)}
                >
                  <MenuItem value="all">{locale === 'fr' ? 'Tous les modèles' : 'All Models'}</MenuItem>
                  {models.map((m) => (
                    <MenuItem key={m.id} value={m.id.toString()}>
                      v{m.version} - {m.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Search */}
              <TextField
                size="small"
                placeholder={locale === 'fr' ? 'Chercher équipe, ticket...' : 'Search team, ticket #...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <Search size={16} color="#9AA3B2" style={{ marginRight: 8 }} />,
                  },
                }}
                sx={{ width: { xs: '100%', sm: 220 } }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card
        sx={{
          backgroundColor: alpha('#1E2635', 0.95),
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {filteredTickets.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Receipt size={42} color="#9AA3B2" style={{ margin: '0 auto 12px' }} />
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                {locale === 'fr' ? 'Aucun ticket correspondant' : 'No tickets match the selected filters'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {locale === 'fr' ? 'Ajustez vos filtres ou importez un nouveau ticket.' : 'Try adjusting your filters or import a new ticket.'}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                    <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Ticket #</th>
                    <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Model</th>
                    <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Legs / Matches</th>
                    <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Odds</th>
                    <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Stake</th>
                    <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Profit / Loss</th>
                    <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((t) => {
                    const statusColor =
                      t.status === 'won'
                        ? '#66BB6A'
                        : t.status === 'lost'
                        ? '#EF5350'
                        : t.status === 'void'
                        ? '#9AA3B2'
                        : '#F6AE2D'

                    return (
                      <tr
                        key={t.uuid}
                        style={{
                          borderBottom: '1px solid rgba(240, 242, 245, 0.05)',
                          transition: 'background 0.2s ease',
                        }}
                      >
                        <td style={{ padding: '16px 18px', fontWeight: 700 }}>
                          <Link
                            href={`/${locale}/admin/betting/tickets/${t.uuid}`}
                            style={{ color: '#F26419', textDecoration: 'none' }}
                          >
                            {t.ticket_number ? `#${t.ticket_number}` : `#${t.id}`}
                          </Link>
                        </td>
                        <td style={{ padding: '16px 18px', color: '#9AA3B2', fontSize: '0.85rem' }}>
                          {t.ticket_date}
                        </td>
                        <td style={{ padding: '16px 18px' }}>
                          <Chip
                            label={`v${t.betting_models?.version || '1.0'}`}
                            size="small"
                            sx={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              backgroundColor: alpha('#F26419', 0.1),
                              color: '#F26419',
                            }}
                          />
                        </td>
                        <td style={{ padding: '16px 18px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {t.betting_selections?.length || 0} legs
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {(t.betting_selections || []).map((s) => `${s.home_team} v ${s.away_team}`).join(', ')}
                          </Typography>
                        </td>
                        <td style={{ padding: '16px 18px', fontWeight: 700, fontSize: '0.9rem' }}>
                          {t.combined_odds ? Number(t.combined_odds).toFixed(2) : '—'}
                        </td>
                        <td style={{ padding: '16px 18px', fontSize: '0.9rem' }}>
                          {formatCurrency(t.stake, currency)}
                        </td>
                        <td style={{ padding: '16px 18px' }}>
                          <Chip
                            label={t.status.toUpperCase()}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              fontSize: '0.7rem',
                              backgroundColor: alpha(statusColor, 0.15),
                              color: statusColor,
                              border: `1px solid ${alpha(statusColor, 0.3)}`,
                            }}
                          />
                        </td>
                        <td
                          style={{
                            padding: '16px 18px',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            color: Number(t.profit_loss) >= 0 ? '#66BB6A' : '#EF5350',
                          }}
                        >
                          {t.status === 'pending'
                            ? '—'
                            : formatCurrencySign(t.profit_loss, currency)}
                        </td>
                        <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                            <Link
                              href={`/${locale}/admin/betting/tickets/${t.uuid}`}
                              style={{
                                color: '#F26419',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                              }}
                            >
                              <span>{locale === 'fr' ? 'Détails' : 'Details'}</span>
                              <ArrowRight size={15} />
                            </Link>

                            <IconButton
                              size="small"
                              onClick={() => setDeletingTicket(t)}
                              sx={{
                                color: 'text.secondary',
                                '&:hover': { color: '#EF5350', backgroundColor: alpha('#EF5350', 0.1) },
                              }}
                              title="Delete Ticket"
                            >
                              <Trash2 size={15} />
                            </IconButton>
                          </Box>
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

      {/* ─── DELETE TICKET CONFIRMATION MODAL ─────────────────────────────── */}
      <CustomModal
        open={Boolean(deletingTicket)}
        onClose={() => setDeletingTicket(null)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AlertTriangle size={20} color="#EF5350" />
            <span>{locale === 'fr' ? 'Confirmer la Suppression' : 'Confirm Ticket Deletion'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setDeletingTicket(null)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </CustomButton>
            <LoadingButton
              variant="contained"
              loading={isDeleting}
              onClick={handleDeleteTicket}
              sx={{
                backgroundColor: '#EF5350',
                color: '#FFFFFF',
                fontWeight: 700,
                '&:hover': { backgroundColor: '#D32F2F' },
              }}
            >
              {locale === 'fr' ? 'Supprimer le Ticket' : 'Delete Ticket'}
            </LoadingButton>
          </Box>
        }
      >
        <Box sx={{ py: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            {locale === 'fr'
              ? `Supprimer définitivement le Ticket #${deletingTicket?.ticket_number || deletingTicket?.id} ?`
              : `Permanently delete Ticket #${deletingTicket?.ticket_number || deletingTicket?.id}?`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {locale === 'fr'
              ? 'Toutes les sélections, alternatives et écritures comptables liées à ce ticket seront supprimées et le solde de bankroll sera rétabli.'
              : 'All selections, rejected alternatives, and linked ledger transactions for this ticket will be removed and bankroll balance will be reversed.'}
          </Typography>
        </Box>
      </CustomModal>
    </Box>
  )
}
