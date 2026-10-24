'use client'

import { useState, useMemo } from 'react'
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
  Brain,
  FileText,
  Sparkles,
  Target,
  Info,
  ShieldAlert,
} from 'lucide-react'
import {
  BettingTicket,
  BettingSelection,
  BettingAlternative,
  BettingWarning,
  WarningsExportJSON,
  WarningBatchUpdateJSON,
  SelectionResultStatus,
  TicketStatus,
} from '@/types/betting'
import {
  updateSelectionResult,
  updateAlternativeResult,
  exportTicketAsJson,
  exportTicketWarningsAsJson,
  applyWarningBatchUpdates,
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
  currency = 'FCFA',
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
  const [snapshotAlternative, setSnapshotAlternative] = useState<BettingAlternative | null>(null)

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

  const [hasCopiedTicketPrompt, setHasCopiedTicketPrompt] = useState(false)

  const handleCopyTicketPrompt = async () => {
    const promptText = `Analyze this completed football betting ticket including selections, alternatives, and pre-match risk warnings against the final scores:

CRITICAL INSTRUCTIONS:
- Review the betting model's statistical calibration against the actual match results.
- Evaluate whether the pre-match warnings materialized or if any blind spots were missed.
- Synthesize actionable learnings for future betting model iterations.

TICKET DATA PAYLOAD:
${exportJsonString}`

    try {
      await navigator.clipboard.writeText(promptText)
      setHasCopiedTicketPrompt(true)
      setNotification({
        open: true,
        message:
          locale === 'fr'
            ? 'Prompt d\'analyse post-mortem copié avec le ticket complet !'
            : 'Post-mortem ChatGPT prompt copied with complete ticket payload!',
        type: 'success',
      })
      setTimeout(() => setHasCopiedTicketPrompt(false), 2500)
    } catch {
      setNotification({ open: true, message: 'Could not copy prompt', type: 'error' })
    }
  }

  // Warning Export State & Handlers
  const [isWarningExportOpen, setIsWarningExportOpen] = useState(false)
  const [warningExportJson, setWarningExportJson] = useState('')
  const [hasCopiedWarnings, setHasCopiedWarnings] = useState(false)
  const [hasCopiedWarningPrompt, setHasCopiedWarningPrompt] = useState(false)

  // Warning Review / Evaluation State & Handlers
  const [isWarningReviewOpen, setIsWarningReviewOpen] = useState(false)
  const [warningReviewJsonInput, setWarningReviewJsonInput] = useState('')
  const [parsedWarningReview, setParsedWarningReview] = useState<WarningBatchUpdateJSON | null>(null)
  const [warningReviewError, setWarningReviewError] = useState<string | null>(null)
  const [approvedWarningIds, setApprovedWarningIds] = useState<Set<string>>(new Set())
  const [isApplyingWarningUpdates, setIsApplyingWarningUpdates] = useState(false)

  interface WarningGroupItem {
    key: string
    title: string
    targetType: 'selection' | 'alternative' | 'ticket'
    country?: string | null
    league?: string | null
    market?: string | null
    selection?: string | null
    odds?: number | null
    actual_home_score?: number | null
    actual_away_score?: number | null
    result?: string | null
    warnings: BettingWarning[]
  }

  // Group warnings by match / fixture
  const groupedWarnings: WarningGroupItem[] = useMemo(() => {
    const warnings: BettingWarning[] = ticket.betting_warnings || []
    if (warnings.length === 0) return []

    const groups: Map<string, WarningGroupItem> = new Map()

    warnings.forEach((w) => {
      let key = 'ticket'
      let title = locale === 'fr' ? 'Contexte Global Ticket' : 'Ticket Scope'
      let targetType: 'selection' | 'alternative' | 'ticket' = 'ticket'
      let country: string | null = null
      let league: string | null = null
      let market: string | null = null
      let selection: string | null = null
      let odds: number | null = null
      let actual_home_score: number | null = null
      let actual_away_score: number | null = null
      let result: string | null = null

      if (w.target_type === 'selection' && w.selection_id) {
        const sel = (ticket.betting_selections || []).find((s) => s.id === w.selection_id)
        if (sel) {
          key = `sel-${sel.id}`
          title = `${sel.home_team} vs ${sel.away_team}`
          targetType = 'selection'
          country = sel.country
          league = sel.league
          market = sel.market
          selection = sel.selection
          odds = sel.odds ? Number(sel.odds) : null
          actual_home_score = sel.actual_home_score
          actual_away_score = sel.actual_away_score
          result = sel.result
        }
      } else if (w.target_type === 'alternative' && w.alternative_id) {
        const alt = (ticket.betting_alternatives || []).find((a) => a.id === w.alternative_id)
        if (alt) {
          key = `alt-${alt.id}`
          title = `${alt.home_team} vs ${alt.away_team}`
          targetType = 'alternative'
          country = alt.country
          league = alt.league
          market = alt.market
          selection = alt.selection
          odds = alt.odds ? Number(alt.odds) : null
          actual_home_score = alt.actual_home_score
          actual_away_score = alt.actual_away_score
          result = alt.result
        }
      }

      if (!groups.has(key)) {
        groups.set(key, {
          key,
          title,
          targetType,
          country,
          league,
          market,
          selection,
          odds,
          actual_home_score,
          actual_away_score,
          result,
          warnings: [],
        })
      }
      groups.get(key)!.warnings.push(w)
    })

    return Array.from(groups.values())
  }, [ticket, locale])

  const handleOpenWarningExport = async () => {
    const res = await exportTicketWarningsAsJson(ticket.uuid)
    if (res.exportData) {
      setWarningExportJson(JSON.stringify(res.exportData, null, 2))
      setIsWarningExportOpen(true)
      setHasCopiedWarnings(false)
    } else {
      setNotification({ open: true, message: res.error || 'Failed to export warnings', type: 'error' })
    }
  }

  const handleCopyWarningJson = async () => {
    try {
      await navigator.clipboard.writeText(warningExportJson)
      setHasCopiedWarnings(true)
      setNotification({
        open: true,
        message:
          locale === 'fr'
            ? 'JSON des alertes copié dans le presse-papiers ! Collez-le dans ChatGPT.'
            : 'Warnings JSON copied to clipboard! Paste it into ChatGPT for post-match evaluation.',
        type: 'success',
      })
      setTimeout(() => setHasCopiedWarnings(false), 2500)
    } catch {
      setNotification({ open: true, message: 'Could not copy to clipboard', type: 'error' })
    }
  }

  const handleCopyWarningPrompt = async () => {
    const promptText = `You are an expert sports betting methodology and risk analyst.
Evaluate the following pre-match warnings based on the final match outcomes and scores provided in the JSON payload below.

For each warning, determine:
1. "post_match_status":
   - "CONFIRMED": The documented risk materialized and noticeably influenced the market/selection outcome.
   - "NOT_CONFIRMED": The feared risk did not materialize and the match proceeded favorably unaffected.
   - "INCONCLUSIVE": Match events are ambiguous, contradictory, or insufficient data to definitively conclude.
   - "NOT_APPLICABLE": The match was postponed, voided, or the market was unaffected.
2. "evidence_assessment": "SUPPORTED" | "CONTRADICTED" | "PARTIAL" | "INCONCLUSIVE"
3. "confidence": "LOW" | "MEDIUM" | "HIGH"
4. "review_notes": 1-2 sentence concise diagnostic explanation of how the match unfolded relative to this warning.

CRITICAL INSTRUCTIONS:
- You MUST preserve each warning's exact "warning_id" (UUID from "warning_uuid").
- Output ONLY a single valid JSON object adhering strictly to this schema:
{
  "operation": "warning_post_match_update",
  "schema_version": "1.0",
  "updates": [
    {
      "warning_id": "<UUID from warning_uuid>",
      "post_match_status": "CONFIRMED",
      "evidence_assessment": "SUPPORTED",
      "confidence": "HIGH",
      "review_notes": "Diagnostic rationale..."
    }
  ]
}

DATA PAYLOAD:
${warningExportJson}`

    try {
      await navigator.clipboard.writeText(promptText)
      setHasCopiedWarningPrompt(true)
      setNotification({
        open: true,
        message:
          locale === 'fr'
            ? 'Prompt complet d\'évaluation copié ! Collez-le directement dans ChatGPT.'
            : 'Complete ChatGPT Evaluation Prompt copied! Paste it directly into ChatGPT.',
        type: 'success',
      })
      setTimeout(() => setHasCopiedWarningPrompt(false), 2500)
    } catch {
      setNotification({ open: true, message: 'Could not copy prompt', type: 'error' })
    }
  }

  const handleParseWarningReviewJson = (val: string) => {
    setWarningReviewJsonInput(val)
    if (!val.trim()) {
      setParsedWarningReview(null)
      setWarningReviewError(null)
      return
    }
    try {
      const parsed = JSON.parse(val) as WarningBatchUpdateJSON
      if (!parsed.updates || !Array.isArray(parsed.updates)) {
        setWarningReviewError(
          locale === 'fr'
            ? 'Le JSON doit contenir un tableau "updates".'
            : 'JSON must contain an "updates" array.'
        )
        setParsedWarningReview(null)
        return
      }
      setParsedWarningReview(parsed)
      setWarningReviewError(null)
      setApprovedWarningIds(new Set(parsed.updates.map((u) => u.warning_id)))
    } catch (e: any) {
      setWarningReviewError(e.message || 'Invalid JSON format')
      setParsedWarningReview(null)
    }
  }

  const handleApplyWarningReviews = async () => {
    if (!parsedWarningReview) return
    setIsApplyingWarningUpdates(true)
    const filteredUpdates = parsedWarningReview.updates.filter((u) => approvedWarningIds.has(u.warning_id))
    const res = await applyWarningBatchUpdates({
      ...parsedWarningReview,
      updates: filteredUpdates,
    })
    setIsApplyingWarningUpdates(false)
    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setIsWarningReviewOpen(false)
      setWarningReviewJsonInput('')
      setParsedWarningReview(null)
      setNotification({
        open: true,
        message:
          locale === 'fr'
            ? `${res.updatedCount || 0} alerte(s) mise(s) à jour avec succès !`
            : `Successfully updated ${res.updatedCount || 0} warning(s)!`,
        type: 'success',
      })
      window.location.reload()
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
            {locale === 'fr' ? 'Exporter JSON' : 'Export Ticket JSON'}
          </CustomButton>

          <CustomButton
            variant="outlined"
            onClick={handleOpenWarningExport}
            startIcon={<AlertTriangle size={16} />}
            sx={{
              borderColor: 'rgba(246, 174, 45, 0.4)',
              color: '#F6AE2D',
              fontWeight: 700,
              '&:hover': { borderColor: '#F6AE2D', backgroundColor: alpha('#F6AE2D', 0.1) },
            }}
          >
            {locale === 'fr' ? 'Exporter Alertes' : 'Export Warnings'}
          </CustomButton>

          <CustomButton
            variant="outlined"
            onClick={() => setIsWarningReviewOpen(true)}
            startIcon={<CheckCircle2 size={16} />}
            sx={{
              borderColor: 'rgba(102, 187, 106, 0.4)',
              color: '#66BB6A',
              fontWeight: 700,
              '&:hover': { borderColor: '#66BB6A', backgroundColor: alpha('#66BB6A', 0.1) },
            }}
          >
            {locale === 'fr' ? 'Évaluer Alertes' : 'Review Warnings'}
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
                          {sel.home_team}
                          {sel.home_league_position !== null && sel.home_league_position !== undefined && (
                            <span style={{ color: '#F6AE2D', fontSize: '0.75rem', fontWeight: 700, marginLeft: 4 }}>
                              (#{sel.home_league_position})
                            </span>
                          )}{' '}
                          <span style={{ color: '#9AA3B2', fontWeight: 400 }}>vs</span> {sel.away_team}
                          {sel.away_league_position !== null && sel.away_league_position !== undefined && (
                            <span style={{ color: '#F6AE2D', fontSize: '0.75rem', fontWeight: 700, marginLeft: 4 }}>
                              (#{sel.away_league_position})
                            </span>
                          )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {sel.country ? `${sel.country} • ` : ''}{sel.league || '—'} &bull; {sel.match_date || ticket.ticket_date}
                        </Typography>
                        {/* Warnings Badges if any */}
                        {(() => {
                          const warnings = (ticket.betting_warnings || []).filter(
                            (w) => w.selection_id === sel.id
                          )
                          if (warnings.length === 0) return null
                          return (
                            <Box sx={{ display: 'flex', gap: 0.5, mt: 0.75, flexWrap: 'wrap' }}>
                              {warnings.map((w) => {
                                const isHigh = w.severity === 'CRITICAL' || w.severity === 'HIGH'
                                return (
                                  <Chip
                                    key={w.id}
                                    icon={<AlertTriangle size={11} />}
                                    label={`${w.warning_type}: ${w.severity}`}
                                    size="small"
                                    sx={{
                                      height: 18,
                                      fontSize: '0.625rem',
                                      fontWeight: 800,
                                      backgroundColor: isHigh ? alpha('#EF5350', 0.2) : alpha('#F6AE2D', 0.2),
                                      color: isHigh ? '#EF5350' : '#F6AE2D',
                                      border: `1px solid ${isHigh ? 'rgba(239, 83, 80, 0.4)' : 'rgba(246, 174, 45, 0.4)'}`,
                                      '& .MuiChip-icon': { color: 'inherit', ml: 0.5 },
                                    }}
                                  />
                                )
                              })}
                            </Box>
                          )
                        })()}
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
                          {(alt.country || alt.league) && (
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.75rem' }}>
                              {alt.country ? `${alt.country} • ` : ''}{alt.league || ''}
                            </Typography>
                          )}
                          {/* Warnings Badges if any */}
                          {(() => {
                            const warnings = (ticket.betting_warnings || []).filter(
                              (w) => w.alternative_id === alt.id
                            )
                            if (warnings.length === 0) return null
                            return (
                              <Box sx={{ display: 'flex', gap: 0.5, mt: 0.75, flexWrap: 'wrap' }}>
                                {warnings.map((w) => {
                                  const isHigh = w.severity === 'CRITICAL' || w.severity === 'HIGH'
                                  return (
                                    <Chip
                                      key={w.id}
                                      icon={<AlertTriangle size={11} />}
                                      label={`${w.warning_type}: ${w.severity}`}
                                      size="small"
                                      sx={{
                                        height: 18,
                                        fontSize: '0.625rem',
                                        fontWeight: 800,
                                        backgroundColor: isHigh ? alpha('#EF5350', 0.2) : alpha('#F6AE2D', 0.2),
                                        color: isHigh ? '#EF5350' : '#F6AE2D',
                                        border: `1px solid ${isHigh ? 'rgba(239, 83, 80, 0.4)' : 'rgba(246, 174, 45, 0.4)'}`,
                                        '& .MuiChip-icon': { color: 'inherit', ml: 0.5 },
                                      }}
                                    />
                                  )
                                })}
                              </Box>
                            )
                          })()}
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
                            <CustomTooltip title={locale === 'fr' ? "Détails de l'alternative" : "View alternative details"}>
                              <IconButton
                                size="small"
                                onClick={() => setSnapshotAlternative(alt)}
                                sx={{ color: '#F6AE2D', backgroundColor: alpha('#F6AE2D', 0.1) }}
                              >
                                <SlidersHorizontal size={16} />
                              </IconButton>
                            </CustomTooltip>

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

      {/* ─── TICKET WARNINGS & RISK FLAGS SECTION ─── */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <ShieldAlert size={22} color="#F6AE2D" />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {locale === 'fr' ? 'Alertes Pré-Match & Facteurs de Risque' : 'Pre-Match Warnings & Risk Flags'}
                  </Typography>
                  <Chip
                    label={(ticket.betting_warnings || []).length}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      backgroundColor: alpha('#F6AE2D', 0.2),
                      color: '#F6AE2D',
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {locale === 'fr'
                    ? 'Facteurs qualitatifs documentés avant le coup d\'envoi et évaluation post-match.'
                    : 'Documented risk patterns prior to kickoff and post-match ChatGPT verification.'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <CustomButton
                size="small"
                variant="outlined"
                onClick={handleOpenWarningExport}
                startIcon={<AlertTriangle size={15} />}
                sx={{
                  borderColor: 'rgba(246, 174, 45, 0.3)',
                  color: '#F6AE2D',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  '&:hover': { borderColor: '#F6AE2D', backgroundColor: alpha('#F6AE2D', 0.1) },
                }}
              >
                {locale === 'fr' ? 'Exporter Alertes JSON' : 'Export Warnings JSON'}
              </CustomButton>

              <CustomButton
                size="small"
                variant="outlined"
                onClick={() => setIsWarningReviewOpen(true)}
                startIcon={<CheckCircle2 size={15} />}
                sx={{
                  borderColor: 'rgba(102, 187, 106, 0.3)',
                  color: '#66BB6A',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  '&:hover': { borderColor: '#66BB6A', backgroundColor: alpha('#66BB6A', 0.1) },
                }}
              >
                {locale === 'fr' ? 'Évaluer les Alertes' : 'Review Warnings'}
              </CustomButton>
            </Box>
          </Box>

          {(!ticket.betting_warnings || ticket.betting_warnings.length === 0) ? (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: alpha('#121824', 0.5),
                borderRadius: 2,
                border: '1px dashed rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {locale === 'fr'
                  ? 'Aucune alerte pré-match enregistrée pour ce ticket.'
                  : 'No pre-match risk warnings or adverse indicators were logged for this ticket.'}
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {groupedWarnings.map((group) => {
                const isSelection = group.targetType === 'selection'
                const themeColor = isSelection ? '#66BB6A' : '#CE93D8'

                return (
                  <Paper
                    key={group.key}
                    elevation={0}
                    sx={{
                      p: 2,
                      backgroundColor: alpha('#121824', 0.6),
                      borderRadius: 2,
                      border: `1px solid ${alpha(themeColor, 0.25)}`,
                    }}
                  >
                    {/* Fixture Header Bar */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1.5,
                        pb: 1.5,
                        mb: 1.5,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                        <Chip
                          label={
                            isSelection
                              ? locale === 'fr' ? 'SÉLECTION' : 'SELECTION'
                              : group.targetType === 'alternative'
                              ? locale === 'fr' ? 'ALTERNATIVE' : 'ALTERNATIVE'
                              : 'TICKET'
                          }
                          size="small"
                          sx={{
                            fontWeight: 800,
                            fontSize: '0.65rem',
                            backgroundColor: alpha(themeColor, 0.15),
                            color: themeColor,
                            border: `1px solid ${alpha(themeColor, 0.3)}`,
                          }}
                        />
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                          {group.title}
                        </Typography>
                        {(group.country || group.league) && (
                          <Typography variant="caption" sx={{ color: '#9AA3B2' }}>
                            {group.country ? `${group.country} • ` : ''}{group.league || ''}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {group.market && group.selection && (
                          <Chip
                            label={`${group.market}: ${group.selection}${group.odds ? ` @ ${group.odds.toFixed(2)}` : ''}`}
                            size="small"
                            sx={{ backgroundColor: alpha('#F0F2F5', 0.05), color: '#F0F2F5', fontWeight: 600, fontSize: '0.75rem' }}
                          />
                        )}
                        {group.actual_home_score !== null && group.actual_away_score !== null && (
                          <Chip
                            label={`${group.actual_home_score} - ${group.actual_away_score}${group.result ? ` (${group.result.toUpperCase()})` : ''}`}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.7rem',
                              backgroundColor: group.result === 'won' ? alpha('#66BB6A', 0.2) : alpha('#EF5350', 0.2),
                              color: group.result === 'won' ? '#66BB6A' : '#EF5350',
                            }}
                          />
                        )}
                        <Chip
                          label={`${group.warnings.length} warning${group.warnings.length > 1 ? 's' : ''}`}
                          size="small"
                          sx={{
                            backgroundColor: alpha('#F6AE2D', 0.15),
                            color: '#F6AE2D',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Warnings sub-table for this game */}
                    <Box sx={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                            <th style={{ padding: '8px 12px', color: '#9AA3B2', fontSize: '0.7rem', textTransform: 'uppercase' }}>Type & Severity</th>
                            <th style={{ padding: '8px 12px', color: '#9AA3B2', fontSize: '0.7rem', textTransform: 'uppercase' }}>Direction</th>
                            <th style={{ padding: '8px 12px', color: '#9AA3B2', fontSize: '0.7rem', textTransform: 'uppercase' }}>Description & Pre-Match Evidence</th>
                            <th style={{ padding: '8px 12px', color: '#9AA3B2', fontSize: '0.7rem', textTransform: 'uppercase' }}>Post-Match Status</th>
                            <th style={{ padding: '8px 12px', color: '#9AA3B2', fontSize: '0.7rem', textTransform: 'uppercase' }}>Review Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.warnings.map((w) => {
                            const isHigh = w.severity === 'CRITICAL' || w.severity === 'HIGH'
                            const statusColor =
                              w.post_match_status === 'CONFIRMED'
                                ? '#66BB6A'
                                : w.post_match_status === 'NOT_CONFIRMED'
                                ? '#EF5350'
                                : w.post_match_status === 'INCONCLUSIVE'
                                ? '#F6AE2D'
                                : '#9AA3B2'

                            return (
                              <tr key={w.id} style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.03)' }}>
                                <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                                    {w.warning_type}
                                  </Typography>
                                  <Chip
                                    label={w.severity}
                                    size="small"
                                    sx={{
                                      height: 18,
                                      fontSize: '0.625rem',
                                      fontWeight: 800,
                                      mt: 0.5,
                                      backgroundColor: isHigh ? alpha('#EF5350', 0.2) : alpha('#F6AE2D', 0.2),
                                      color: isHigh ? '#EF5350' : '#F6AE2D',
                                    }}
                                  />
                                </td>
                                <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                                  <Chip
                                    label={w.direction}
                                    size="small"
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: '0.65rem',
                                      backgroundColor:
                                        w.direction === 'CONTRADICTORY'
                                          ? alpha('#EF5350', 0.15)
                                          : w.direction === 'SUPPORTIVE'
                                          ? alpha('#66BB6A', 0.15)
                                          : alpha('#9AA3B2', 0.15),
                                      color:
                                        w.direction === 'CONTRADICTORY'
                                          ? '#EF5350'
                                          : w.direction === 'SUPPORTIVE'
                                          ? '#66BB6A'
                                          : '#9AA3B2',
                                    }}
                                  />
                                </td>
                                <td style={{ padding: '10px 12px', maxWidth: 360, verticalAlign: 'top' }}>
                                  <Typography variant="body2" sx={{ mb: 0.5, color: '#F0F2F5', fontSize: '0.85rem' }}>
                                    {w.description}
                                  </Typography>
                                  {w.evidence && (
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontStyle: 'italic', fontSize: '0.75rem' }}>
                                      &ldquo;{w.evidence}&rdquo;
                                    </Typography>
                                  )}
                                </td>
                                <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                                  <Chip
                                    label={w.post_match_status}
                                    size="small"
                                    sx={{
                                      fontWeight: 800,
                                      fontSize: '0.7rem',
                                      backgroundColor: alpha(statusColor, 0.18),
                                      color: statusColor,
                                      border: `1px solid ${alpha(statusColor, 0.3)}`,
                                    }}
                                  />
                                </td>
                                <td style={{ padding: '10px 12px', maxWidth: 280, verticalAlign: 'top' }}>
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                    {w.review_notes || '—'}
                                  </Typography>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </Box>
                  </Paper>
                )
              })}
            </Box>
          )}
        </CardContent>
      </Card>


      {/* ─── STATISTICAL SNAPSHOT & SELECTION DETAIL DRAWER ──────────────── */}
      <CustomDrawer
        open={Boolean(snapshotSelection)}
        onClose={() => setSnapshotSelection(null)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SlidersHorizontal size={20} color="#42A5F5" />
            <span>{locale === 'fr' ? 'Détails & Snapshot de la Sélection' : 'Selection Details & Statistical Snapshot'}</span>
          </Box>
        }
        width={540}
      >
        {snapshotSelection && (() => {
          const selColor =
            snapshotSelection.result === 'won'
              ? '#66BB6A'
              : snapshotSelection.result === 'lost'
              ? '#EF5350'
              : snapshotSelection.result === 'void'
              ? '#9AA3B2'
              : '#F6AE2D'

          const homeGD =
            snapshotSelection.home_goals_scored !== null &&
            snapshotSelection.home_goals_scored !== undefined &&
            snapshotSelection.home_goals_conceded !== null &&
            snapshotSelection.home_goals_conceded !== undefined
              ? Number(snapshotSelection.home_goals_scored) - Number(snapshotSelection.home_goals_conceded)
              : null

          const awayGD =
            snapshotSelection.away_goals_scored !== null &&
            snapshotSelection.away_goals_scored !== undefined &&
            snapshotSelection.away_goals_conceded !== null &&
            snapshotSelection.away_goals_conceded !== undefined
              ? Number(snapshotSelection.away_goals_scored) - Number(snapshotSelection.away_goals_conceded)
              : null

          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Match Header */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: '#F0F2F5' }}>
                  {snapshotSelection.home_team}{' '}
                  {snapshotSelection.home_league_position !== null && snapshotSelection.home_league_position !== undefined && (
                    <span style={{ color: '#F6AE2D', fontSize: '0.85rem' }}>
                      (#{snapshotSelection.home_league_position})
                    </span>
                  )}{' '}
                  <span style={{ color: '#9AA3B2', fontWeight: 400 }}>vs</span>{' '}
                  {snapshotSelection.away_team}{' '}
                  {snapshotSelection.away_league_position !== null && snapshotSelection.away_league_position !== undefined && (
                    <span style={{ color: '#F6AE2D', fontSize: '0.85rem' }}>
                      (#{snapshotSelection.away_league_position})
                    </span>
                  )}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {snapshotSelection.country ? `${snapshotSelection.country} • ` : ''}
                  {snapshotSelection.league || '—'} &bull; Match Date: {snapshotSelection.match_date || ticket.ticket_date}
                </Typography>
              </Box>

              {/* Market Pick & Result Bar */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: alpha('#121824', 0.8),
                  border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Chip
                  label={`${snapshotSelection.market}: ${snapshotSelection.selection}`}
                  size="small"
                  sx={{ backgroundColor: alpha('#F26419', 0.2), color: '#F26419', fontWeight: 700 }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {snapshotSelection.actual_home_score !== null &&
                  snapshotSelection.actual_away_score !== null &&
                  snapshotSelection.actual_home_score !== undefined &&
                  snapshotSelection.actual_away_score !== undefined ? (
                    <Chip
                      label={`Score: ${snapshotSelection.actual_home_score} - ${snapshotSelection.actual_away_score}`}
                      size="small"
                      sx={{ fontWeight: 800, backgroundColor: alpha('#F0F2F5', 0.1) }}
                    />
                  ) : null}
                  <Chip
                    label={snapshotSelection.result.toUpperCase()}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      fontSize: '0.7rem',
                      backgroundColor: alpha(selColor, 0.15),
                      color: selColor,
                      border: `1px solid ${alpha(selColor, 0.3)}`,
                    }}
                  />
                </Box>
              </Box>

              {/* Mathematical Model Analytics */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha('#121824', 0.6),
                  border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#42A5F5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Target size={16} />
                  {locale === 'fr' ? 'Métriques Mathématiques & Cote' : 'Model Valuation & Mathematical Edge'}
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 6, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary">Bookmaker Odds</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800 }}>
                      {snapshotSelection.odds ? Number(snapshotSelection.odds).toFixed(2) : '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary">Model Probability</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: '#66BB6A' }}>
                      {snapshotSelection.estimated_probability
                        ? `${(Number(snapshotSelection.estimated_probability) * 100).toFixed(1)}%`
                        : '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary">Break-even Prob</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#9AA3B2' }}>
                      {snapshotSelection.breakeven_probability
                        ? `${(Number(snapshotSelection.breakeven_probability) * 100).toFixed(1)}%`
                        : '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary">Edge Points</Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 800,
                        color: (Number(snapshotSelection.edge_percentage_points) || 0) >= 0 ? '#66BB6A' : '#EF5350',
                      }}
                    >
                      {snapshotSelection.edge_percentage_points !== null && snapshotSelection.edge_percentage_points !== undefined
                        ? `${Number(snapshotSelection.edge_percentage_points) >= 0 ? '+' : ''}${snapshotSelection.edge_percentage_points}%`
                        : '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary">Expected Value (EV)</Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 800,
                        color: (Number(snapshotSelection.expected_value) || 0) >= 0 ? '#66BB6A' : '#EF5350',
                      }}
                    >
                      {snapshotSelection.expected_value !== null && snapshotSelection.expected_value !== undefined
                        ? `${Number(snapshotSelection.expected_value) >= 0 ? '+' : ''}${snapshotSelection.expected_value}`
                        : '—'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Pre-Match Statistical Matchup Comparison */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha('#121824', 0.6),
                  border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#F26419',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <TrendingUp size={16} />
                  {locale === 'fr' ? 'Profil & Statistiques Pré-Match' : 'Pre-Match Statistical Matchup'}
                </Typography>
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.1)' }}>
                        <th style={{ padding: '8px 6px', textAlign: 'left', color: '#9AA3B2', fontWeight: 600 }}>Metric</th>
                        <th style={{ padding: '8px 6px', textAlign: 'center', color: '#F6AE2D', fontWeight: 700 }}>
                          {snapshotSelection.home_team} (Home)
                        </th>
                        <th style={{ padding: '8px 6px', textAlign: 'center', color: '#42A5F5', fontWeight: 700 }}>
                          {snapshotSelection.away_team} (Away)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                        <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>League Position</td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                          {snapshotSelection.home_league_position !== null && snapshotSelection.home_league_position !== undefined
                            ? `#${snapshotSelection.home_league_position}`
                            : '—'}
                        </td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                          {snapshotSelection.away_league_position !== null && snapshotSelection.away_league_position !== undefined
                            ? `#${snapshotSelection.away_league_position}`
                            : '—'}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                        <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Matches Played (MP)</td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                          {snapshotSelection.home_matches_played ?? '—'}
                        </td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                          {snapshotSelection.away_matches_played ?? '—'}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                        <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Goals Scored (GF)</td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#66BB6A' }}>
                          {snapshotSelection.home_goals_scored ?? '—'}
                        </td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#66BB6A' }}>
                          {snapshotSelection.away_goals_scored ?? '—'}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                        <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Goals Conceded (GA)</td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#EF5350' }}>
                          {snapshotSelection.home_goals_conceded ?? '—'}
                        </td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#EF5350' }}>
                          {snapshotSelection.away_goals_conceded ?? '—'}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                        <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Goal Difference (GD)</td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                          {homeGD !== null ? `${homeGD > 0 ? '+' : ''}${homeGD}` : '—'}
                        </td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                          {awayGD !== null ? `${awayGD > 0 ? '+' : ''}${awayGD}` : '—'}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                        <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Avg Goals Scored / Match</td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                          {snapshotSelection.home_goals_per_game !== null && snapshotSelection.home_goals_per_game !== undefined
                            ? Number(snapshotSelection.home_goals_per_game).toFixed(2)
                            : '—'}
                        </td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                          {snapshotSelection.away_goals_per_game !== null && snapshotSelection.away_goals_per_game !== undefined
                            ? Number(snapshotSelection.away_goals_per_game).toFixed(2)
                            : '—'}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Avg Goals Conceded / Match</td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                          {snapshotSelection.home_conceded_per_game !== null && snapshotSelection.home_conceded_per_game !== undefined
                            ? Number(snapshotSelection.home_conceded_per_game).toFixed(2)
                            : '—'}
                        </td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                          {snapshotSelection.away_conceded_per_game !== null && snapshotSelection.away_conceded_per_game !== undefined
                            ? Number(snapshotSelection.away_conceded_per_game).toFixed(2)
                            : '—'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Paper>

              {/* Methodology Reasoning */}
              {snapshotSelection.comment && (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha('#F26419', 0.08),
                    border: `1px solid ${alpha('#F26419', 0.2)}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.75,
                      mb: 0.75,
                    }}
                  >
                    <Brain size={15} />
                    {locale === 'fr' ? 'Justification Méthodologique du Modèle :' : 'Model Methodology & Selection Reasoning:'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                    "{snapshotSelection.comment}"
                  </Typography>
                </Box>
              )}

              {/* Contextual / Match Notes */}
              {snapshotSelection.notes && (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha('#42A5F5', 0.08),
                    border: `1px solid ${alpha('#42A5F5', 0.2)}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: '#42A5F5',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.75,
                      mb: 0.75,
                    }}
                  >
                    <FileText size={15} />
                    {locale === 'fr' ? 'Notes Contextuelles & Équipe :' : 'Contextual Notes & Match Insights:'}
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {snapshotSelection.notes}
                  </Typography>
                </Box>
              )}

              {/* System Audit Details */}
              <Box
                sx={{
                  pt: 1.5,
                  borderTop: '1px solid rgba(240, 242, 245, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  UUID: {snapshotSelection.uuid?.substring(0, 8)}...
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Ticket #{ticket.ticket_number || ticket.id}
                </Typography>
              </Box>
            </Box>
          )
        })()}
      </CustomDrawer>

      {/* ─── CONSIDERED ALTERNATIVE DETAILS DRAWER ────────────────────────── */}
      <CustomDrawer
        open={Boolean(snapshotAlternative)}
        onClose={() => setSnapshotAlternative(null)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Scale size={20} color="#F6AE2D" />
            <span>{locale === 'fr' ? "Détails de l'Alternative Rejetée" : 'Rejected Alternative Details'}</span>
          </Box>
        }
        width={540}
      >
        {snapshotAlternative && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: '#F0F2F5' }}>
                {snapshotAlternative.home_team}{' '}
                <span style={{ color: '#9AA3B2', fontWeight: 400 }}>vs</span>{' '}
                {snapshotAlternative.away_team}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                {snapshotAlternative.country ? `${snapshotAlternative.country} • ` : ''}
                {snapshotAlternative.league || '—'} &bull; Match Date: {snapshotAlternative.match_date || ticket.ticket_date}
              </Typography>
            </Box>

            {/* Market & Score Bar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha('#121824', 0.8),
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Chip
                label={`${snapshotAlternative.market}: ${snapshotAlternative.selection}`}
                size="small"
                sx={{ backgroundColor: alpha('#F6AE2D', 0.2), color: '#F6AE2D', fontWeight: 700 }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {snapshotAlternative.actual_home_score !== null &&
                snapshotAlternative.actual_away_score !== null &&
                snapshotAlternative.actual_home_score !== undefined &&
                snapshotAlternative.actual_away_score !== undefined ? (
                  <Chip
                    label={`Score: ${snapshotAlternative.actual_home_score} - ${snapshotAlternative.actual_away_score}`}
                    size="small"
                    sx={{ fontWeight: 800, backgroundColor: alpha('#F0F2F5', 0.1) }}
                  />
                ) : null}
                <Chip
                  label={snapshotAlternative.result.toUpperCase()}
                  size="small"
                  sx={{
                    fontWeight: 800,
                    fontSize: '0.7rem',
                    backgroundColor: alpha(
                      snapshotAlternative.result === 'won'
                        ? '#66BB6A'
                        : snapshotAlternative.result === 'lost'
                        ? '#EF5350'
                        : '#9AA3B2',
                      0.15
                    ),
                    color:
                      snapshotAlternative.result === 'won'
                        ? '#66BB6A'
                        : snapshotAlternative.result === 'lost'
                        ? '#EF5350'
                        : '#9AA3B2',
                  }}
                />
              </Box>
            </Box>

            {/* Model Metrics */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: alpha('#121824', 0.6),
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                  color: '#F6AE2D',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Target size={16} />
                {locale === 'fr' ? 'Évaluation Statistique du Modèle' : 'Model Statistical Evaluation'}
              </Typography>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Typography variant="caption" color="text.secondary">Odds</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 800 }}>
                    {snapshotAlternative.odds ? Number(snapshotAlternative.odds).toFixed(2) : '—'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Typography variant="caption" color="text.secondary">Est. Probability</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 800, color: '#66BB6A' }}>
                    {snapshotAlternative.estimated_probability
                      ? `${(Number(snapshotAlternative.estimated_probability) * 100).toFixed(1)}%`
                      : '—'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Typography variant="caption" color="text.secondary">Break-even</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#9AA3B2' }}>
                    {snapshotAlternative.breakeven_probability
                      ? `${(Number(snapshotAlternative.breakeven_probability) * 100).toFixed(1)}%`
                      : '—'}
                  </Typography>
                </Grid>
                {(snapshotAlternative.home_matches_played !== undefined && snapshotAlternative.home_matches_played !== null) ||
                (snapshotAlternative.away_matches_played !== undefined && snapshotAlternative.away_matches_played !== null) ? (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="caption" color="text.secondary">Matches Played (MP)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {snapshotAlternative.home_team}: {snapshotAlternative.home_matches_played ?? '—'} &bull; {snapshotAlternative.away_team}: {snapshotAlternative.away_matches_played ?? '—'}
                    </Typography>
                  </Grid>
                ) : null}
                <Grid size={{ xs: 6, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">Edge Points</Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 800,
                      color: (Number(snapshotAlternative.edge_percentage_points) || 0) >= 0 ? '#66BB6A' : '#EF5350',
                    }}
                  >
                    {snapshotAlternative.edge_percentage_points !== null && snapshotAlternative.edge_percentage_points !== undefined
                      ? `${Number(snapshotAlternative.edge_percentage_points) >= 0 ? '+' : ''}${snapshotAlternative.edge_percentage_points}%`
                      : '—'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">Expected Value (EV)</Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 800,
                      color: (Number(snapshotAlternative.expected_value) || 0) >= 0 ? '#66BB6A' : '#EF5350',
                    }}
                  >
                    {snapshotAlternative.expected_value !== null && snapshotAlternative.expected_value !== undefined
                      ? `${Number(snapshotAlternative.expected_value) >= 0 ? '+' : ''}${snapshotAlternative.expected_value}`
                      : '—'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Rejection Reason */}
            {snapshotAlternative.comment && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha('#F6AE2D', 0.08),
                  border: `1px solid ${alpha('#F6AE2D', 0.2)}`,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: '#F6AE2D',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    mb: 0.75,
                  }}
                >
                  <Brain size={15} />
                  {locale === 'fr' ? 'Motif de Rejet par le Modèle :' : 'Rejection Reason / Analysis:'}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                  "{snapshotAlternative.comment}"
                </Typography>
              </Box>
            )}

            {/* Contextual Notes */}
            {snapshotAlternative.notes && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha('#42A5F5', 0.08),
                  border: `1px solid ${alpha('#42A5F5', 0.2)}`,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: '#42A5F5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    mb: 0.75,
                  }}
                >
                  <FileText size={15} />
                  {locale === 'fr' ? 'Notes Additionnelles :' : 'Additional Notes:'}
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  {snapshotAlternative.notes}
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
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <CustomButton variant="outlined" onClick={() => setIsExportOpen(false)}>
              {locale === 'fr' ? 'Fermer' : 'Close'}
            </CustomButton>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <CustomButton
                variant="outlined"
                onClick={handleCopyJson}
                startIcon={hasCopied ? <Check size={18} /> : <Copy size={18} />}
              >
                {hasCopied
                  ? locale === 'fr' ? 'Copié !' : 'Copied!'
                  : locale === 'fr' ? 'Copier JSON' : 'Copy JSON'}
              </CustomButton>
              <CustomButton
                variant="contained"
                onClick={handleCopyTicketPrompt}
                startIcon={hasCopiedTicketPrompt ? <Check size={18} /> : <Sparkles size={18} />}
                sx={{
                  background: hasCopiedTicketPrompt
                    ? '#66BB6A'
                    : 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  px: 2.5,
                }}
              >
                {hasCopiedTicketPrompt
                  ? locale === 'fr' ? 'Prompt Copié !' : 'Prompt Copied!'
                  : locale === 'fr' ? 'Copier Prompt ChatGPT + JSON' : 'Copy ChatGPT Prompt + JSON'}
              </CustomButton>
            </Box>
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
                label={locale === 'fr' ? `Mise (${currency})` : `Stake (${currency})`}
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
      {/* ─── WARNINGS EXPORT MODAL ────────────────────────────────────────── */}
      <CustomModal
        open={isWarningExportOpen}
        onClose={() => setIsWarningExportOpen(false)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AlertTriangle size={20} color="#F6AE2D" />
            <span>{locale === 'fr' ? 'Export des Alertes pour Évaluation Post-Match' : 'Export Warnings for Post-Match Review'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <CustomButton variant="outlined" onClick={() => setIsWarningExportOpen(false)}>
              {locale === 'fr' ? 'Fermer' : 'Close'}
            </CustomButton>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <CustomButton
                variant="outlined"
                onClick={handleCopyWarningJson}
                startIcon={hasCopiedWarnings ? <Check size={16} /> : <Copy size={16} />}
              >
                {hasCopiedWarnings
                  ? locale === 'fr' ? 'Copié !' : 'Copied!'
                  : locale === 'fr' ? 'Copier JSON' : 'Copy JSON'}
              </CustomButton>
              <CustomButton
                variant="contained"
                onClick={handleCopyWarningPrompt}
                startIcon={hasCopiedWarningPrompt ? <Check size={16} /> : <Sparkles size={16} />}
                sx={{
                  background: hasCopiedWarningPrompt
                    ? '#66BB6A'
                    : 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  px: 2.5,
                }}
              >
                {hasCopiedWarningPrompt
                  ? locale === 'fr' ? 'Prompt Copié !' : 'Prompt Copied!'
                  : locale === 'fr' ? 'Copier Prompt ChatGPT + JSON' : 'Copy ChatGPT Prompt + JSON'}
              </CustomButton>
            </Box>
          </Box>
        }
      >
        <Box sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {locale === 'fr'
              ? 'Ce JSON contient les alertes pré-match, les scores réels constatés et les résultats. Collez-le dans ChatGPT pour générer l\'évaluation post-match automatique.'
              : 'This payload pairs each pre-match risk warning with the final match outcome and scores. Paste it into ChatGPT to produce a structured batch review.'}
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={14}
            value={warningExportJson}
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

      {/* ─── WARNINGS BATCH REVIEW & APPROVAL MODAL ────────────────────────── */}
      <CustomModal
        open={isWarningReviewOpen}
        onClose={() => setIsWarningReviewOpen(false)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle2 size={20} color="#66BB6A" />
            <span>{locale === 'fr' ? 'Évaluation des Alertes par ChatGPT' : 'ChatGPT Post-Match Warning Review'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setIsWarningReviewOpen(false)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </CustomButton>
            <LoadingButton
              variant="contained"
              loading={isApplyingWarningUpdates}
              disabled={!parsedWarningReview || approvedWarningIds.size === 0}
              onClick={handleApplyWarningReviews}
              sx={{
                backgroundColor: '#66BB6A',
                color: '#FFFFFF',
                fontWeight: 700,
                '&:hover': { backgroundColor: '#4CAF50' },
              }}
            >
              {locale === 'fr'
                ? `Approuver (${approvedWarningIds.size}) & Appliquer`
                : `Approve (${approvedWarningIds.size}) & Apply`}
            </LoadingButton>
          </Box>
        }
      >
        <Box sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {locale === 'fr'
              ? 'Collez la réponse JSON produite par ChatGPT pour valider et mettre à jour les statuts des alertes avec prévisualisation.'
              : 'Paste the batch JSON generated by ChatGPT. Review each proposed status change and approve them below.'}
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder='{ "operation": "warning_post_match_update", "updates": [ ... ] }'
            value={warningReviewJsonInput}
            onChange={(e) => handleParseWarningReviewJson(e.target.value)}
            error={Boolean(warningReviewError)}
            helperText={warningReviewError}
            sx={{ mb: 3 }}
          />

          {parsedWarningReview && parsedWarningReview.updates && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#66BB6A' }}>
                {locale === 'fr' ? 'Modifications proposées (Aperçu) :' : 'Proposed Updates Preview:'}
              </Typography>
              <Box sx={{ maxHeight: 260, overflowY: 'auto', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 2 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: alpha('#121824', 0.8) }}>
                      <th style={{ padding: '8px 12px' }}>Approve</th>
                      <th style={{ padding: '8px 12px' }}>Warning ID</th>
                      <th style={{ padding: '8px 12px' }}>New Status</th>
                      <th style={{ padding: '8px 12px' }}>Assessment</th>
                      <th style={{ padding: '8px 12px' }}>Review Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedWarningReview.updates.map((item, idx) => {
                      const isChecked = approvedWarningIds.has(item.warning_id)
                      return (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                          <td style={{ padding: '8px 12px' }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                const next = new Set(approvedWarningIds)
                                if (e.target.checked) next.add(item.warning_id)
                                else next.delete(item.warning_id)
                                setApprovedWarningIds(next)
                              }}
                            />
                          </td>
                          <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                            {item.warning_id.slice(0, 8)}...
                          </td>
                          <td style={{ padding: '8px 12px', fontWeight: 700, color: '#66BB6A' }}>
                            {item.post_match_status}
                          </td>
                          <td style={{ padding: '8px 12px' }}>
                            {item.evidence_assessment || '—'}
                          </td>
                          <td style={{ padding: '8px 12px', color: '#9AA3B2' }}>
                            {item.review_notes}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Box>
            </Box>
          )}
        </Box>
      </CustomModal>
    </Box>
  )
}
