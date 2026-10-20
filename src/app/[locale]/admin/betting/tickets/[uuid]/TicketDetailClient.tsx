'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  alpha,
  Divider,
} from '@mui/material'
import {
  Receipt,
  FileCode2,
  Copy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  SlidersHorizontal,
  ArrowLeft,
  Share2,
  Scale,
  Percent,
  Wallet,
  Check,
  ChevronRight,
  TrendingUp,
  Pencil,
  Trash2,
  AlertTriangle,
} from 'lucide-react'
import { BettingTicket, BettingSelection, BettingAlternative, SelectionResultStatus, TicketStatus } from '@/types/betting'
import {
  updateSelectionResult,
  updateAlternativeResult,
  exportTicketAsJson,
  updateBettingTicket,
  deleteBettingTicket,
  deleteBettingSelection,
  deleteBettingAlternative,
} from '@/app/[locale]/actions/betting'
import { CustomModal, CustomDrawer, CustomNotification, CustomTooltip } from '@/components/ui'
import CustomButton from '@/components/ui/CustomButton'
import { LoadingButton } from '@/components/ui/PromptButtons'
import { formatCurrency, formatCurrencySign } from '@/utils/bettingCurrency'

interface TicketDetailClientProps {
  locale: string
  ticket: BettingTicket
  currency?: string
}

export default function TicketDetailClient({
  locale,
  ticket: initialTicket,
  currency = 'USD',
}: TicketDetailClientProps) {
  const router = useRouter()
  const [ticket, setTicket] = useState<BettingTicket>(initialTicket)

  // Edit Ticket State
  const [isEditTicketOpen, setIsEditTicketOpen] = useState(false)
  const [editTicketNumber, setEditTicketNumber] = useState(ticket.ticket_number || '')
  const [editTicketDate, setEditTicketDate] = useState(ticket.ticket_date)
  const [editStake, setEditStake] = useState(ticket.stake ? ticket.stake.toString() : '')
  const [editNotes, setEditNotes] = useState(ticket.notes || '')
  const [editStatus, setEditStatus] = useState<TicketStatus>(ticket.status as TicketStatus)
  const [isUpdatingTicket, setIsUpdatingTicket] = useState(false)

  // Delete Ticket State
  const [isDeleteTicketOpen, setIsDeleteTicketOpen] = useState(false)
  const [isDeletingTicket, setIsDeletingTicket] = useState(false)

  // Drawer for selection statistical snapshot
  const [snapshotSelection, setSnapshotSelection] = useState<BettingSelection | null>(null)

  // Score Entry Modal for Selection
  const [editingSelection, setEditingSelection] = useState<BettingSelection | null>(null)
  const [homeScore, setHomeScore] = useState<string>('')
  const [awayScore, setAwayScore] = useState<string>('')
  const [manualStatus, setManualStatus] = useState<SelectionResultStatus>('pending')
  const [isUpdatingSelection, setIsUpdatingSelection] = useState(false)

  // Score Entry Modal for Alternative
  const [editingAlternative, setEditingAlternative] = useState<BettingAlternative | null>(null)
  const [altHomeScore, setAltHomeScore] = useState<string>('')
  const [altAwayScore, setAltAwayScore] = useState<string>('')
  const [altManualStatus, setAltManualStatus] = useState<SelectionResultStatus>('pending')
  const [isUpdatingAlternative, setIsUpdatingAlternative] = useState(false)

  // JSON Export Modal
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [exportJsonString, setExportJsonString] = useState('')
  const [hasCopied, setHasCopied] = useState(false)

  // Notifications
  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({ open: false, message: '', type: 'info' })

  // Open Score Entry for Selection
  const openSelectionScoreDialog = (sel: BettingSelection) => {
    setEditingSelection(sel)
    setHomeScore(sel.actual_home_score !== null && sel.actual_home_score !== undefined ? sel.actual_home_score.toString() : '')
    setAwayScore(sel.actual_away_score !== null && sel.actual_away_score !== undefined ? sel.actual_away_score.toString() : '')
    setManualStatus(sel.result)
  }

  // Open Score Entry for Alternative
  const openAlternativeScoreDialog = (alt: BettingAlternative) => {
    setEditingAlternative(alt)
    setAltHomeScore(alt.actual_home_score !== null && alt.actual_home_score !== undefined ? alt.actual_home_score.toString() : '')
    setAltAwayScore(alt.actual_away_score !== null && alt.actual_away_score !== undefined ? alt.actual_away_score.toString() : '')
    setAltManualStatus(alt.result)
  }

  // Save Selection Score
  const handleSaveSelectionScore = async () => {
    if (!editingSelection) return

    setIsUpdatingSelection(true)
    const h = homeScore.trim() !== '' ? parseInt(homeScore) : null
    const a = awayScore.trim() !== '' ? parseInt(awayScore) : null

    const res = await updateSelectionResult({
      selectionId: editingSelection.id,
      homeScore: h,
      awayScore: a,
      manualResult: manualStatus !== 'pending' ? manualStatus : undefined,
    })
    setIsUpdatingSelection(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setEditingSelection(null)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Résultat enregistré et ticket recalculé !' : 'Result updated and ticket recalculated!',
        type: 'success',
      })
      window.location.reload()
    }
  }

  // Save Alternative Score
  const handleSaveAlternativeScore = async () => {
    if (!editingAlternative) return

    setIsUpdatingAlternative(true)
    const h = altHomeScore.trim() !== '' ? parseInt(altHomeScore) : null
    const a = altAwayScore.trim() !== '' ? parseInt(altAwayScore) : null

    const res = await updateAlternativeResult({
      alternativeId: editingAlternative.id,
      homeScore: h,
      awayScore: a,
      manualResult: altManualStatus !== 'pending' ? altManualStatus : undefined,
    })
    setIsUpdatingAlternative(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setEditingAlternative(null)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Résultat de l\'alternative enregistré !' : 'Alternative result updated!',
        type: 'success',
      })
      window.location.reload()
    }
  }

  // Generate & Open JSON Export
  const handleOpenExport = async () => {
    const res = await exportTicketAsJson(ticket.uuid)
    if (res.exportData) {
      setExportJsonString(JSON.stringify(res.exportData, null, 2))
      setIsExportOpen(true)
      setHasCopied(false)
    } else {
      setNotification({ open: true, message: res.error || 'Failed to export ticket', type: 'error' })
    }
  }

  // Copy JSON to Clipboard
  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(exportJsonString)
      setHasCopied(true)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'JSON copié dans le presse-papiers ! Collez-le dans ChatGPT.' : 'JSON copied to clipboard! Paste it back into ChatGPT.',
        type: 'success',
      })
      setTimeout(() => setHasCopied(false), 2500)
    } catch {
      setNotification({ open: true, message: 'Could not copy to clipboard', type: 'error' })
    }
  }

  // Open Edit Ticket Dialog
  const handleOpenEditTicket = () => {
    setEditTicketNumber(ticket.ticket_number || '')
    setEditTicketDate(ticket.ticket_date)
    setEditStake(ticket.stake ? ticket.stake.toString() : '')
    setEditNotes(ticket.notes || '')
    setEditStatus(ticket.status as TicketStatus)
    setIsEditTicketOpen(true)
  }

  // Save Edit Ticket
  const handleSaveEditTicket = async () => {
    setIsUpdatingTicket(true)
    const stakeNum = parseFloat(editStake)
    const res = await updateBettingTicket(ticket.id, {
      ticket_number: editTicketNumber,
      ticket_date: editTicketDate,
      stake: !isNaN(stakeNum) ? stakeNum : Number(ticket.stake),
      notes: editNotes,
      status: editStatus,
    })
    setIsUpdatingTicket(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setTicket({
        ...ticket,
        ticket_number: editTicketNumber,
        ticket_date: editTicketDate,
        stake: !isNaN(stakeNum) ? stakeNum : Number(ticket.stake),
        notes: editNotes,
        status: editStatus,
        actual_result: editStatus,
      })
      setIsEditTicketOpen(false)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Ticket modifié avec succès !' : 'Ticket updated successfully!',
        type: 'success',
      })
    }
  }

  // Delete Ticket
  const handleDeleteTicket = async () => {
    setIsDeletingTicket(true)
    const res = await deleteBettingTicket(ticket.id)
    setIsDeletingTicket(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setIsDeleteTicketOpen(false)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Ticket supprimé avec succès !' : 'Ticket deleted successfully!',
        type: 'success',
      })
      router.push(`/${locale}/admin/betting/tickets`)
    }
  }

  // Delete Individual Selection
  const handleDeleteSelection = async (selectionId: number) => {
    if (!confirm(locale === 'fr' ? 'Supprimer cette sélection du ticket ?' : 'Delete this selection from the ticket?')) return
    const res = await deleteBettingSelection(selectionId)
    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setTicket({
        ...ticket,
        betting_selections: (ticket.betting_selections || []).filter((s) => s.id !== selectionId),
      })
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Sélection supprimée !' : 'Selection removed!',
        type: 'success',
      })
    }
  }

  // Delete Individual Alternative
  const handleDeleteAlternative = async (altId: number) => {
    if (!confirm(locale === 'fr' ? 'Supprimer cette alternative ?' : 'Delete this rejected candidate?')) return
    const res = await deleteBettingAlternative(altId)
    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setTicket({
        ...ticket,
        betting_alternatives: (ticket.betting_alternatives || []).filter((a) => a.id !== altId),
      })
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Alternative supprimée !' : 'Alternative removed!',
        type: 'success',
      })
    }
  }

  const statusColor =
    ticket.status === 'won'
      ? '#66BB6A'
      : ticket.status === 'lost'
      ? '#EF5350'
      : ticket.status === 'void'
      ? '#9AA3B2'
      : '#F6AE2D'

  return (
    <Box>
      <CustomNotification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, open: false })}
      />

      {/* Top Back Link & Actions */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box
          component={Link}
          href={`/${locale}/admin/betting/tickets`}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.875rem',
            '&:hover': { color: 'text.primary' },
          }}
        >
          <ArrowLeft size={16} />
          <span>{locale === 'fr' ? 'Retour aux tickets' : 'Back to tickets list'}</span>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <CustomButton
            variant="outlined"
            onClick={handleOpenEditTicket}
            startIcon={<Pencil size={16} />}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontWeight: 700,
              '&:hover': { borderColor: '#F26419', backgroundColor: alpha('#F26419', 0.1) },
            }}
          >
            {locale === 'fr' ? 'Modifier' : 'Edit Ticket'}
          </CustomButton>

          <CustomButton
            variant="contained"
            onClick={() => setIsDeleteTicketOpen(true)}
            startIcon={<Trash2 size={16} />}
            sx={{
              backgroundColor: alpha('#EF5350', 0.15),
              color: '#EF5350',
              border: '1px solid rgba(239, 83, 80, 0.3)',
              fontWeight: 700,
              '&:hover': { backgroundColor: '#EF5350', color: '#FFFFFF' },
            }}
          >
            {locale === 'fr' ? 'Supprimer' : 'Delete'}
          </CustomButton>

          <CustomButton
            variant="contained"
            onClick={handleOpenExport}
            startIcon={<Share2 size={16} />}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
            }}
          >
            {locale === 'fr' ? 'Exporter JSON pour ChatGPT' : 'Export JSON to ChatGPT'}
          </CustomButton>
        </Box>
      </Box>

      {/* Ticket Header Card */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                  Ticket {ticket.ticket_number ? `#${ticket.ticket_number}` : `#${ticket.id}`}
                </Typography>
                <Chip
                  label={ticket.status.toUpperCase()}
                  sx={{
                    fontWeight: 800,
                    backgroundColor: alpha(statusColor, 0.15),
                    color: statusColor,
                    border: `1px solid ${alpha(statusColor, 0.3)}`,
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {locale === 'fr' ? 'Enregistré le' : 'Created on'} {ticket.ticket_date} &bull; Model:{' '}
                <Link
                  href={ticket.betting_models ? `/${locale}/admin/betting/models/${ticket.betting_models.uuid}` : '#'}
                  style={{ color: '#F26419', fontWeight: 700, textDecoration: 'none' }}
                >
                  v{ticket.betting_models?.version || '1.0'} ({ticket.betting_models?.name})
                </Link>
              </Typography>
            </Box>

            {/* Profit / Loss Banner */}
            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
              <Typography variant="caption" color="text.secondary">
                {locale === 'fr' ? 'Profit / Perte Réalisé' : 'Realized Profit / Loss'}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: ticket.status === 'pending' ? 'text.secondary' : Number(ticket.profit_loss) >= 0 ? '#66BB6A' : '#EF5350',
                }}
              >
                {ticket.status === 'pending'
                  ? 'Pending Settlement'
                  : formatCurrencySign(ticket.profit_loss, currency)}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Key Ticket Parameters */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Stake</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {formatCurrency(ticket.stake, currency)}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Combined Odds</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {ticket.combined_odds ? Number(ticket.combined_odds).toFixed(2) : '—'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Estimated Ticket Probability</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#66BB6A' }}>
                {ticket.estimated_ticket_probability ? `${(Number(ticket.estimated_ticket_probability) * 100).toFixed(1)}%` : '—'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Potential Payout</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#F6AE2D' }}>
                {formatCurrency((Number(ticket.stake) * (Number(ticket.combined_odds) || 1)), currency)}
              </Typography>
            </Grid>
          </Grid>

          {ticket.notes && (
            <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: alpha('#121824', 0.6) }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                {locale === 'fr' ? 'Notes de sélection :' : 'Selection notes:'}
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 0.5 }}>
                "{ticket.notes}"
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* ─── SELECTED SELECTIONS SECTION ─────────────────────────────────── */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: `1px solid ${alpha('#66BB6A', 0.3)}`,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle2 size={20} color="#66BB6A" />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#66BB6A' }}>
                {locale === 'fr' ? 'Sélections Validées (Selected)' : 'Selected Matches (Placed Bets)'}
              </Typography>
              <Chip
                label={`${ticket.betting_selections?.length || 0} legs`}
                size="small"
                sx={{ backgroundColor: alpha('#66BB6A', 0.15), color: '#66BB6A', fontWeight: 800 }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {locale === 'fr' ? 'Cliquez sur un match pour voir le snapshot ou entrer le score' : 'Click match to inspect statistical snapshot or record score'}
            </Typography>
          </Box>

          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                  <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Match</th>
                  <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Market & Pick</th>
                  <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Odds</th>
                  <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Est. Prob</th>
                  <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Break-even</th>
                  <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Edge</th>
                  <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Actual Score</th>
                  <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Result</th>
                  <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(ticket.betting_selections || []).map((sel) => {
                  const selColor =
                    sel.result === 'won'
                      ? '#66BB6A'
                      : sel.result === 'lost'
                      ? '#EF5350'
                      : sel.result === 'void'
                      ? '#9AA3B2'
                      : '#F6AE2D'

                  return (
                    <tr
                      key={sel.id}
                      style={{
                        borderBottom: '1px solid rgba(240, 242, 245, 0.05)',
                        transition: 'background 0.2s ease',
                      }}
                    >
                      {/* Match & League */}
                      <td style={{ padding: '14px' }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {sel.home_team} vs {sel.away_team}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {sel.league || '—'} &bull; {sel.match_date || ticket.ticket_date}
                        </Typography>
                      </td>

                      {/* Market & Pick */}
                      <td style={{ padding: '14px' }}>
                        <Chip
                          label={`${sel.market}: ${sel.selection}`}
                          size="small"
                          sx={{ backgroundColor: alpha('#F26419', 0.15), color: '#F26419', fontWeight: 700 }}
                        />
                      </td>

                      {/* Odds */}
                      <td style={{ padding: '14px', fontWeight: 700 }}>
                        {sel.odds ? Number(sel.odds).toFixed(2) : '—'}
                      </td>

                      {/* Est. Prob */}
                      <td style={{ padding: '14px', color: '#66BB6A', fontWeight: 700 }}>
                        {sel.estimated_probability ? `${(Number(sel.estimated_probability) * 100).toFixed(1)}%` : '—'}
                      </td>

                      {/* Break-even */}
                      <td style={{ padding: '14px', color: '#9AA3B2' }}>
                        {sel.breakeven_probability ? `${(Number(sel.breakeven_probability) * 100).toFixed(1)}%` : '—'}
                      </td>

                      {/* Edge */}
                      <td style={{ padding: '14px', fontWeight: 700, color: (sel.edge_percentage_points || 0) >= 0 ? '#66BB6A' : '#EF5350' }}>
                        {sel.edge_percentage_points !== null ? `+${sel.edge_percentage_points}%` : '—'}
                      </td>

                      {/* Actual Score */}
                      <td style={{ padding: '14px', fontWeight: 700 }}>
                        {sel.actual_home_score !== null && sel.actual_away_score !== null ? (
                          <Chip
                            label={`${sel.actual_home_score} - ${sel.actual_away_score}`}
                            size="small"
                            sx={{ fontWeight: 800, backgroundColor: alpha('#F0F2F5', 0.1) }}
                          />
                        ) : (
                          <Typography variant="caption" color="text.secondary">—</Typography>
                        )}
                      </td>

                      {/* Result */}
                      <td style={{ padding: '14px' }}>
                        <Chip
                          label={sel.result.toUpperCase()}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            fontSize: '0.7rem',
                            backgroundColor: alpha(selColor, 0.15),
                            color: selColor,
                            border: `1px solid ${alpha(selColor, 0.3)}`,
                          }}
                        />
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px', textAlign: 'right' }}>
                        <Box sx={{ display: 'inline-flex', gap: 1 }}>
                          <CustomTooltip title="View historical pre-match statistical snapshot (GF/GA, rank)">
                            <IconButton
                              size="small"
                              onClick={() => setSnapshotSelection(sel)}
                              sx={{ color: '#42A5F5', backgroundColor: alpha('#42A5F5', 0.1) }}
                            >
                              <SlidersHorizontal size={16} />
                            </IconButton>
                          </CustomTooltip>

                          <CustomButton
                            size="small"
                            variant="outlined"
                            onClick={() => openSelectionScoreDialog(sel)}
                            sx={{ fontSize: '0.75rem', py: 0.5 }}
                          >
                            {locale === 'fr' ? 'Score' : 'Record Score'}
                          </CustomButton>

                          <IconButton
                            size="small"
                            onClick={() => handleDeleteSelection(sel.id)}
                            sx={{
                              color: 'text.secondary',
                              '&:hover': { color: '#EF5350', backgroundColor: alpha('#EF5350', 0.1) },
                            }}
                            title="Delete Selection"
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
        </CardContent>
      </Card>

      {/* ─── CONSIDERED ALTERNATIVES SECTION ─────────────────────────────── */}
      {ticket.betting_alternatives && ticket.betting_alternatives.length > 0 && (
        <Card
          sx={{
            mb: 4,
            backgroundColor: alpha('#1E2635', 0.95),
            border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Scale size={20} color="#F6AE2D" />
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                  {locale === 'fr' ? 'Alternatives Rejetées (Considered but NOT selected)' : 'Considered Alternatives (Rejected Candidates)'}
                </Typography>
                <Chip
                  label={`${ticket.betting_alternatives.length} matches`}
                  size="small"
                  sx={{ backgroundColor: alpha('#9AA3B2', 0.15) }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                {locale === 'fr' ? 'Entrez les scores réels pour évaluer si nos rejets étaient justifiés' : 'Enter match scores to evaluate whether rejected options won or lost'}
              </Typography>
            </Box>

            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                    <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Match</th>
                    <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Market</th>
                    <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Odds</th>
                    <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Est. Prob</th>
                    <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Actual Score</th>
                    <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Result</th>
                    <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Rejection Reason</th>
                    <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ticket.betting_alternatives.map((alt) => {
                    const altColor =
                      alt.result === 'won'
                        ? '#66BB6A'
                        : alt.result === 'lost'
                        ? '#EF5350'
                        : alt.result === 'void'
                        ? '#9AA3B2'
                        : '#F6AE2D'

                    return (
                      <tr
                        key={alt.id}
                        style={{
                          borderBottom: '1px solid rgba(240, 242, 245, 0.05)',
                        }}
                      >
                        <td style={{ padding: '14px', fontWeight: 600, color: 'text.secondary' }}>
                          {alt.home_team} vs {alt.away_team}
                        </td>
                        <td style={{ padding: '14px', color: 'text.secondary', fontSize: '0.85rem' }}>
                          {alt.market}: {alt.selection}
                        </td>
                        <td style={{ padding: '14px', fontSize: '0.85rem' }}>
                          {alt.odds ? Number(alt.odds).toFixed(2) : '—'}
                        </td>
                        <td style={{ padding: '14px', fontSize: '0.85rem' }}>
                          {alt.estimated_probability ? `${(Number(alt.estimated_probability) * 100).toFixed(1)}%` : '—'}
                        </td>
                        <td style={{ padding: '14px' }}>
                          {alt.actual_home_score !== null && alt.actual_away_score !== null ? (
                            <Chip
                              label={`${alt.actual_home_score} - ${alt.actual_away_score}`}
                              size="small"
                              sx={{ fontWeight: 700 }}
                            />
                          ) : (
                            <Typography variant="caption" color="text.secondary">—</Typography>
                          )}
                        </td>
                        <td style={{ padding: '14px' }}>
                          <Chip
                            label={alt.result.toUpperCase()}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.65rem',
                              backgroundColor: alpha(altColor, 0.15),
                              color: altColor,
                            }}
                          />
                        </td>
                        <td style={{ padding: '14px', fontSize: '0.8rem', color: '#9AA3B2', fontStyle: 'italic', maxWidth: 280 }}>
                          {alt.comment || '—'}
                        </td>
                        <td style={{ padding: '14px', textAlign: 'right' }}>
                          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                            <CustomButton
                              size="small"
                              variant="outlined"
                              onClick={() => openAlternativeScoreDialog(alt)}
                              sx={{ fontSize: '0.75rem', py: 0.5 }}
                            >
                              {locale === 'fr' ? 'Score' : 'Record'}
                            </CustomButton>

                            <IconButton
                              size="small"
                              onClick={() => handleDeleteAlternative(alt.id)}
                              sx={{
                                color: 'text.secondary',
                                '&:hover': { color: '#EF5350', backgroundColor: alpha('#EF5350', 0.1) },
                              }}
                              title="Delete Alternative"
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
          </CardContent>
        </Card>
      )}

      {/* ─── STATISTICAL SNAPSHOT DRAWER ─────────────────────────────────── */}
      <CustomDrawer
        open={Boolean(snapshotSelection)}
        onClose={() => setSnapshotSelection(null)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SlidersHorizontal size={20} color="#42A5F5" />
            <span>{locale === 'fr' ? 'Snapshot Statistique Pré-Match' : 'Pre-Match Statistical Snapshot'}</span>
          </Box>
        }
        width={400}
      >
        {snapshotSelection && (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
              {snapshotSelection.home_team} vs {snapshotSelection.away_team}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
              {snapshotSelection.league} &bull; Stored on {snapshotSelection.match_date || ticket.ticket_date}
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                backgroundColor: alpha('#121824', 0.6),
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#F26419' }}>
                League Standings Snapshot
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{snapshotSelection.home_team} Position:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  #{snapshotSelection.home_league_position ?? '—'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{snapshotSelection.away_team} Position:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  #{snapshotSelection.away_league_position ?? '—'}
                </Typography>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                backgroundColor: alpha('#121824', 0.6),
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#66BB6A' }}>
                Goals Scored & Conceded (GF / GA)
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{snapshotSelection.home_team} GF / GA:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {snapshotSelection.home_goals_scored ?? '—'} / {snapshotSelection.home_goals_conceded ?? '—'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{snapshotSelection.away_team} GF / GA:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {snapshotSelection.away_goals_scored ?? '—'} / {snapshotSelection.away_goals_conceded ?? '—'}
                </Typography>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                backgroundColor: alpha('#121824', 0.6),
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#F6AE2D' }}>
                Average Goals Per Game
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{snapshotSelection.home_team} GF / GA per game:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {snapshotSelection.home_goals_per_game ?? '—'} / {snapshotSelection.home_conceded_per_game ?? '—'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{snapshotSelection.away_team} GF / GA per game:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {snapshotSelection.away_goals_per_game ?? '—'} / {snapshotSelection.away_conceded_per_game ?? '—'}
                </Typography>
              </Box>
            </Paper>

            {snapshotSelection.comment && (
              <Box sx={{ p: 2, borderRadius: 2, backgroundColor: alpha('#F26419', 0.08), border: `1px solid ${alpha('#F26419', 0.2)}` }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', display: 'block', mb: 0.5 }}>
                  Methodology Selection Reasoning:
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  "{snapshotSelection.comment}"
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CustomDrawer>

      {/* ─── SCORE ENTRY MODAL (SELECTION) ───────────────────────────────── */}
      <CustomModal
        open={Boolean(editingSelection)}
        onClose={() => setEditingSelection(null)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle2 size={20} color="#F26419" />
            <span>
              {locale === 'fr' ? 'Enregistrer le Score :' : 'Record Match Result:'}{' '}
              {editingSelection?.home_team} vs {editingSelection?.away_team}
            </span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setEditingSelection(null)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </CustomButton>
            <LoadingButton
              variant="contained"
              loading={isUpdatingSelection}
              onClick={handleSaveSelectionScore}
              sx={{
                backgroundColor: 'primary.main',
                color: '#FFFFFF',
                fontWeight: 700,
              }}
            >
              {locale === 'fr' ? 'Enregistrer & Recalculer' : 'Save & Settle'}
            </LoadingButton>
          </Box>
        }
      >
        {editingSelection && (
          <Box sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {locale === 'fr'
                ? `Pari sélectionné : ${editingSelection.market} (${editingSelection.selection}). Le résultat sera automatiquement déterminé dès la saisie des scores.`
                : `Selected pick: ${editingSelection.market} (${editingSelection.selection}). Auto-settlement engine will evaluate the outcome once scores are entered.`}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label={`${editingSelection.home_team} Score`}
                  value={homeScore}
                  onChange={(e) => setHomeScore(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label={`${editingSelection.away_team} Score`}
                  value={awayScore}
                  onChange={(e) => setAwayScore(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* Manual Status Override */}
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 700 }}>
              {locale === 'fr' ? 'Forcer manuellement le résultat (optionnel) :' : 'Manual Result Override (optional):'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {(['pending', 'won', 'lost', 'void'] as SelectionResultStatus[]).map((status) => (
                <Chip
                  key={status}
                  label={status.toUpperCase()}
                  onClick={() => setManualStatus(status)}
                  sx={{
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: manualStatus === status ? alpha('#F26419', 0.25) : alpha('#F0F2F5', 0.05),
                    color: manualStatus === status ? '#F26419' : 'text.secondary',
                    border: manualStatus === status ? '1px solid #F26419' : '1px solid transparent',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </CustomModal>

      {/* ─── SCORE ENTRY MODAL (ALTERNATIVE) ─────────────────────────────── */}
      <CustomModal
        open={Boolean(editingAlternative)}
        onClose={() => setEditingAlternative(null)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Scale size={20} color="#F6AE2D" />
            <span>
              {locale === 'fr' ? 'Score de l\'Alternative :' : 'Alternative Score:'}{' '}
              {editingAlternative?.home_team} vs {editingAlternative?.away_team}
            </span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setEditingAlternative(null)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </CustomButton>
            <LoadingButton
              variant="contained"
              loading={isUpdatingAlternative}
              onClick={handleSaveAlternativeScore}
              sx={{
                backgroundColor: '#F6AE2D',
                color: '#121824',
                fontWeight: 700,
              }}
            >
              {locale === 'fr' ? 'Enregistrer' : 'Save Alternative Result'}
            </LoadingButton>
          </Box>
        }
      >
        {editingAlternative && (
          <Box sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {locale === 'fr'
                ? `Alternative : ${editingAlternative.market} (${editingAlternative.selection}).`
                : `Alternative pick: ${editingAlternative.market} (${editingAlternative.selection}).`}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label={`${editingAlternative.home_team} Score`}
                  value={altHomeScore}
                  onChange={(e) => setAltHomeScore(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label={`${editingAlternative.away_team} Score`}
                  value={altAwayScore}
                  onChange={(e) => setAltAwayScore(e.target.value)}
                />
              </Grid>
            </Grid>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 700 }}>
              Manual Result Override:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {(['pending', 'won', 'lost', 'void'] as SelectionResultStatus[]).map((status) => (
                <Chip
                  key={status}
                  label={status.toUpperCase()}
                  onClick={() => setAltManualStatus(status)}
                  sx={{
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: altManualStatus === status ? alpha('#F6AE2D', 0.25) : alpha('#F0F2F5', 0.05),
                    color: altManualStatus === status ? '#F6AE2D' : 'text.secondary',
                    border: altManualStatus === status ? '1px solid #F6AE2D' : '1px solid transparent',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </CustomModal>

      {/* ─── JSON EXPORT MODAL ────────────────────────────────────────────── */}
      <CustomModal
        open={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FileCode2 size={22} color="#F26419" />
            <span>{locale === 'fr' ? 'Exporter vers ChatGPT (JSON)' : 'Export Ticket to ChatGPT (JSON)'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'space-between' }}>
            <CustomButton variant="outlined" onClick={() => setIsExportOpen(false)}>
              {locale === 'fr' ? 'Fermer' : 'Close'}
            </CustomButton>
            <CustomButton
              variant="contained"
              onClick={handleCopyJson}
              startIcon={hasCopied ? <Check size={18} /> : <Copy size={18} />}
              sx={{
                background: hasCopied
                  ? '#66BB6A'
                  : 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                px: 3,
              }}
            >
              {hasCopied
                ? locale === 'fr' ? 'Copié dans le presse-papiers !' : 'Copied to Clipboard!'
                : locale === 'fr' ? 'Copier le JSON' : 'Copy JSON to Clipboard'}
            </CustomButton>
          </Box>
        }
      >
        <Box sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {locale === 'fr'
              ? 'Ce JSON contient les prédictions historiques originales combinées aux scores et résultats constatés. Copiez-le en un clic pour le réinjecter dans ChatGPT pour analyse.'
              : 'This JSON contains the original pre-match prediction snapshot combined with final match scores and settled profit/loss. Copy and paste it back into ChatGPT for post-mortem methodology analysis.'}
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={14}
            value={exportJsonString}
            slotProps={{
              input: {
                readOnly: true,
                sx: {
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  lineHeight: 1.5,
                  backgroundColor: alpha('#121824', 0.9),
                },
              },
            }}
          />
        </Box>
      </CustomModal>

      {/* ─── EDIT TICKET MODAL ───────────────────────────────────────────── */}
      <CustomModal
        open={isEditTicketOpen}
        onClose={() => setIsEditTicketOpen(false)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Pencil size={20} color="#F26419" />
            <span>{locale === 'fr' ? 'Modifier le Ticket' : 'Edit Ticket'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setIsEditTicketOpen(false)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </CustomButton>
            <LoadingButton
              variant="contained"
              loading={isUpdatingTicket}
              onClick={handleSaveEditTicket}
              sx={{
                backgroundColor: 'primary.main',
                color: '#FFFFFF',
                fontWeight: 700,
              }}
            >
              {locale === 'fr' ? 'Enregistrer' : 'Save Changes'}
            </LoadingButton>
          </Box>
        }
      >
        <Box sx={{ pt: 1 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Ticket #"
                placeholder="001"
                value={editTicketNumber}
                onChange={(e) => setEditTicketNumber(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={editTicketDate}
                onChange={(e) => setEditTicketDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Stake ($)"
                value={editStake}
                onChange={(e) => setEditStake(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editStatus}
                  label="Status"
                  onChange={(e) => setEditStatus(e.target.value as any)}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="won">Won</MenuItem>
                  <MenuItem value="lost">Lost</MenuItem>
                  <MenuItem value="void">Void</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Notes"
            placeholder="Add general ticket rationale..."
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
          />
        </Box>
      </CustomModal>

      {/* ─── DELETE TICKET CONFIRMATION MODAL ─────────────────────────────── */}
      <CustomModal
        open={isDeleteTicketOpen}
        onClose={() => setIsDeleteTicketOpen(false)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AlertTriangle size={20} color="#EF5350" />
            <span>{locale === 'fr' ? 'Confirmer la Suppression' : 'Confirm Ticket Deletion'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setIsDeleteTicketOpen(false)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </CustomButton>
            <LoadingButton
              variant="contained"
              loading={isDeletingTicket}
              onClick={handleDeleteTicket}
              sx={{
                backgroundColor: '#EF5350',
                color: '#FFFFFF',
                fontWeight: 700,
                '&:hover': { backgroundColor: '#D32F2F' },
              }}
            >
              {locale === 'fr' ? 'Supprimer Définitivement' : 'Permanently Delete'}
            </LoadingButton>
          </Box>
        }
      >
        <Box sx={{ py: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            {locale === 'fr'
              ? `Supprimer définitivement le Ticket #${ticket.ticket_number || ticket.id} ?`
              : `Permanently delete Ticket #${ticket.ticket_number || ticket.id}?`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {locale === 'fr'
              ? 'Toutes les sélections, alternatives et écritures comptables liées à ce ticket seront supprimées et le solde de la bankroll sera rétabli.'
              : 'All selections, alternative matches, and ledger transactions associated with this ticket will be removed and bankroll balance reconciled.'}
          </Typography>
        </Box>
      </CustomModal>
    </Box>
  )
}
