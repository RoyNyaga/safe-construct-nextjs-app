'use client'

import { useState, useMemo } from 'react'
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  IconButton,
  alpha,
  LinearProgress,
} from '@mui/material'
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FileCode2,
  BarChart3,
  Search,
  Copy,
  Check,
  History,
  TrendingDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import {
  BettingWarning,
  WarningAnalyticsSummary,
  WarningsExportJSON,
  WarningBatchUpdateJSON,
  WarningSeverity,
  WarningDirection,
  WarningPostMatchStatus,
} from '@/types/betting'
import {
  exportTicketWarningsAsJson,
  applyWarningBatchUpdates,
} from '@/app/[locale]/actions/betting'
import { CustomModal, CustomDrawer, CustomNotification } from '@/components/ui'
import CustomButton from '@/components/ui/CustomButton'
import { LoadingButton } from '@/components/ui/PromptButtons'

interface WarningsClientProps {
  locale: string
  initialWarnings: BettingWarning[]
  analytics: WarningAnalyticsSummary
  currency?: string
}

export default function WarningsClient({
  locale,
  initialWarnings,
  analytics,
}: WarningsClientProps) {
  const [warnings, setWarnings] = useState<BettingWarning[]>(initialWarnings)
  const [activeTab, setActiveTab] = useState<number>(0)

  // Filters State
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [directionFilter, setDirectionFilter] = useState<string>('all')
  const [targetFilter, setTargetFilter] = useState<string>('all')

  // Selected Warning for Review History Drawer
  const [selectedWarningForHistory, setSelectedWarningForHistory] = useState<BettingWarning | null>(null)

  // Global Export Modal State
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [exportJsonString, setExportJsonString] = useState('')
  const [hasCopiedExport, setHasCopiedExport] = useState(false)

  // Bulk Review State
  const [reviewJsonInput, setReviewJsonInput] = useState('')
  const [parsedReview, setParsedReview] = useState<WarningBatchUpdateJSON | null>(null)
  const [reviewError, setReviewError] = useState<string | null>(null)
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set())
  const [isApplyingUpdates, setIsApplyingUpdates] = useState(false)

  // Notification State
  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({ open: false, message: '', type: 'info' })

  // Filtered Warnings List
  const filteredWarnings = useMemo(() => {
    return warnings.filter((w) => {
      if (statusFilter !== 'all' && w.post_match_status !== statusFilter) return false
      if (severityFilter !== 'all' && w.severity !== severityFilter) return false
      if (directionFilter !== 'all' && w.direction !== directionFilter) return false
      if (targetFilter !== 'all' && w.target_type !== targetFilter) return false

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const match = w.target_type === 'selection' ? w.betting_selections : w.betting_alternatives
        const teamMatch =
          (match?.home_team && match.home_team.toLowerCase().includes(q)) ||
          (match?.away_team && match.away_team.toLowerCase().includes(q))
        const typeMatch = w.warning_type.toLowerCase().includes(q)
        const descMatch = w.description.toLowerCase().includes(q)
        const ticketMatch = w.betting_tickets?.ticket_number?.toLowerCase().includes(q)
        if (!teamMatch && !typeMatch && !descMatch && !ticketMatch) return false
      }

      return true
    })
  }, [warnings, statusFilter, severityFilter, directionFilter, targetFilter, searchQuery])

  // Handle Export All Pending Warnings
  const handleOpenExportPending = async () => {
    const res = await exportTicketWarningsAsJson()
    if (res.exportData) {
      setExportJsonString(JSON.stringify(res.exportData, null, 2))
      setIsExportOpen(true)
      setHasCopiedExport(false)
    } else {
      setNotification({ open: true, message: res.error || 'Failed to export warnings', type: 'error' })
    }
  }

  const [hasCopiedExportPrompt, setHasCopiedExportPrompt] = useState(false)

  const handleCopyExportJson = async () => {
    try {
      await navigator.clipboard.writeText(exportJsonString)
      setHasCopiedExport(true)
      setNotification({
        open: true,
        message:
          locale === 'fr'
            ? 'JSON copié dans le presse-papiers ! Collez-le dans ChatGPT.'
            : 'Warnings JSON copied to clipboard! Paste it into ChatGPT for evaluation.',
        type: 'success',
      })
      setTimeout(() => setHasCopiedExport(false), 2500)
    } catch {
      setNotification({ open: true, message: 'Could not copy to clipboard', type: 'error' })
    }
  }

  const handleCopyExportPrompt = async () => {
    const promptText = `You are an expert sports betting and statistical methodology analyst.
Evaluate the following pending pre-match warnings across multiple matches based on the final match outcomes and scores provided in the JSON payload below.

For each warning, assess:
1. "post_match_status":
   - "CONFIRMED": The documented risk materialized and noticeably influenced the market/selection outcome.
   - "NOT_CONFIRMED": The feared risk did not materialize and the match proceeded favorably unaffected.
   - "INCONCLUSIVE": Match events are ambiguous, contradictory, or insufficient data to definitively conclude.
   - "NOT_APPLICABLE": The match was postponed, voided, or the market was unaffected.
2. "evidence_assessment": "SUPPORTED" | "CONTRADICTED" | "PARTIAL" | "INCONCLUSIVE"
3. "confidence": "LOW" | "MEDIUM" | "HIGH"
4. "review_notes": 1-2 sentence concise diagnostic explanation of what happened in the match relative to the warning.

CRITICAL INSTRUCTIONS:
- You MUST preserve each warning's exact "warning_id" (UUID from "warning_uuid").
- Output ONLY a single valid JSON object strictly adhering to this schema:
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
${exportJsonString}`

    try {
      await navigator.clipboard.writeText(promptText)
      setHasCopiedExportPrompt(true)
      setNotification({
        open: true,
        message:
          locale === 'fr'
            ? 'Prompt complet d\'évaluation copié ! Collez-le directement dans ChatGPT.'
            : 'Complete ChatGPT Evaluation Prompt copied! Paste it directly into ChatGPT.',
        type: 'success',
      })
      setTimeout(() => setHasCopiedExportPrompt(false), 2500)
    } catch {
      setNotification({ open: true, message: 'Could not copy prompt', type: 'error' })
    }
  }

  // Handle Parsing Bulk Review Input
  const handleParseReviewJson = (val: string) => {
    setReviewJsonInput(val)
    if (!val.trim()) {
      setParsedReview(null)
      setReviewError(null)
      return
    }
    try {
      const parsed = JSON.parse(val) as WarningBatchUpdateJSON
      if (!parsed.updates || !Array.isArray(parsed.updates)) {
        setReviewError(
          locale === 'fr'
            ? 'Le JSON doit contenir un tableau "updates".'
            : 'JSON must contain an "updates" array.'
        )
        setParsedReview(null)
        return
      }
      setParsedReview(parsed)
      setReviewError(null)
      setApprovedIds(new Set(parsed.updates.map((u) => u.warning_id)))
    } catch (e: any) {
      setReviewError(e.message || 'Invalid JSON format')
      setParsedReview(null)
    }
  }

  // Handle Commit Bulk Updates
  const handleApplyBulkUpdates = async () => {
    if (!parsedReview) return
    setIsApplyingUpdates(true)
    const filteredUpdates = parsedReview.updates.filter((u) => approvedIds.has(u.warning_id))
    const res = await applyWarningBatchUpdates({
      ...parsedReview,
      updates: filteredUpdates,
    })
    setIsApplyingUpdates(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setReviewJsonInput('')
      setParsedReview(null)
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

  return (
    <Box>
      <CustomNotification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, open: false })}
      />

      {/* Header Bar */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {locale === 'fr' ? 'Gestion des Alertes & Évaluation' : 'Warnings & Risk Analytics'}
            </Typography>
            <Chip
              label={`${warnings.length} ${locale === 'fr' ? 'Alertes' : 'Warnings'}`}
              sx={{
                fontWeight: 800,
                backgroundColor: alpha('#F26419', 0.15),
                color: '#F26419',
                border: '1px solid rgba(242, 100, 25, 0.3)',
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {locale === 'fr'
              ? 'Documentation qualitative pré-match, évaluation post-match avec ChatGPT et apprentissage statistique.'
              : 'Pre-match risk documentation, ChatGPT post-match validation, and statistical reliability analytics.'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <CustomButton
            variant="outlined"
            onClick={handleOpenExportPending}
            startIcon={<AlertTriangle size={16} />}
            sx={{
              borderColor: 'rgba(246, 174, 45, 0.4)',
              color: '#F6AE2D',
              fontWeight: 700,
              '&:hover': { borderColor: '#F6AE2D', backgroundColor: alpha('#F6AE2D', 0.1) },
            }}
          >
            {locale === 'fr' ? 'Exporter Alertes (ChatGPT)' : 'Export for ChatGPT Review'}
          </CustomButton>

          <CustomButton
            variant="contained"
            onClick={() => setActiveTab(1)}
            startIcon={<CheckCircle2 size={16} />}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
            }}
          >
            {locale === 'fr' ? 'Évaluation par Lot' : 'Bulk Review Import'}
          </CustomButton>
        </Box>
      </Box>

      {/* Tabs */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          backgroundColor: alpha('#1E2635', 0.8),
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{
            px: 2,
            '& .MuiTab-root': {
              color: 'text.secondary',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '0.9rem',
              minHeight: 48,
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: 3,
              borderRadius: 3,
            },
          }}
        >
          <Tab
            icon={<ShieldAlert size={18} />}
            iconPosition="start"
            label={`${locale === 'fr' ? 'Registre des Alertes' : 'Warnings Register'} (${warnings.length})`}
          />
          <Tab
            icon={<FileCode2 size={18} />}
            iconPosition="start"
            label={locale === 'fr' ? 'Évaluation par ChatGPT' : 'Bulk Post-Match Review'}
          />
          <Tab
            icon={<BarChart3 size={18} />}
            iconPosition="start"
            label={locale === 'fr' ? 'Statistiques & Calibration' : 'Warning Analytics & Impact'}
          />
        </Tabs>
      </Paper>

      {/* ─── TAB 0: WARNING REGISTER TABLE ─────────────────────────────────── */}
      {activeTab === 0 && (
        <Box>
          {/* Filter Bar */}
          <Card
            sx={{
              mb: 3,
              backgroundColor: alpha('#1E2635', 0.95),
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Grid container spacing={1.5} sx={{ alignItems: 'center' }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder={locale === 'fr' ? 'Rechercher match, type, description...' : 'Search fixture, warning type...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <Box sx={{ mr: 1, color: 'text.secondary', display: 'flex' }}>
                            <Search size={16} />
                          </Box>
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 6, sm: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>{locale === 'fr' ? 'Statut' : 'Status'}</InputLabel>
                    <Select
                      value={statusFilter}
                      label={locale === 'fr' ? 'Statut' : 'Status'}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <MenuItem value="all">{locale === 'fr' ? 'Tous les statuts' : 'All Statuses'}</MenuItem>
                      <MenuItem value="PENDING">PENDING</MenuItem>
                      <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
                      <MenuItem value="NOT_CONFIRMED">NOT_CONFIRMED</MenuItem>
                      <MenuItem value="INCONCLUSIVE">INCONCLUSIVE</MenuItem>
                      <MenuItem value="NOT_APPLICABLE">NOT_APPLICABLE</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 6, sm: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>{locale === 'fr' ? 'Sévérité' : 'Severity'}</InputLabel>
                    <Select
                      value={severityFilter}
                      label={locale === 'fr' ? 'Sévérité' : 'Severity'}
                      onChange={(e) => setSeverityFilter(e.target.value)}
                    >
                      <MenuItem value="all">{locale === 'fr' ? 'Toutes' : 'All Severities'}</MenuItem>
                      <MenuItem value="CRITICAL">CRITICAL</MenuItem>
                      <MenuItem value="HIGH">HIGH</MenuItem>
                      <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                      <MenuItem value="LOW">LOW</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 6, sm: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>{locale === 'fr' ? 'Direction' : 'Direction'}</InputLabel>
                    <Select
                      value={directionFilter}
                      label={locale === 'fr' ? 'Direction' : 'Direction'}
                      onChange={(e) => setDirectionFilter(e.target.value)}
                    >
                      <MenuItem value="all">{locale === 'fr' ? 'Toutes' : 'All Directions'}</MenuItem>
                      <MenuItem value="CONTRADICTORY">CONTRADICTORY</MenuItem>
                      <MenuItem value="SUPPORTIVE">SUPPORTIVE</MenuItem>
                      <MenuItem value="NEUTRAL">NEUTRAL</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 6, sm: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>{locale === 'fr' ? 'Cible' : 'Target'}</InputLabel>
                    <Select
                      value={targetFilter}
                      label={locale === 'fr' ? 'Cible' : 'Target'}
                      onChange={(e) => setTargetFilter(e.target.value)}
                    >
                      <MenuItem value="all">{locale === 'fr' ? 'Toutes' : 'All Targets'}</MenuItem>
                      <MenuItem value="selection">Selection</MenuItem>
                      <MenuItem value="alternative">Alternative</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Table */}
          <Card
            sx={{
              backgroundColor: alpha('#1E2635', 0.95),
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                      <th style={{ padding: '14px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Warning Type & Severity</th>
                      <th style={{ padding: '14px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Match / Ticket</th>
                      <th style={{ padding: '14px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Direction</th>
                      <th style={{ padding: '14px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Description & Pre-match Evidence</th>
                      <th style={{ padding: '14px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Post-Match Status</th>
                      <th style={{ padding: '14px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Review Notes</th>
                      <th style={{ padding: '14px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'right' }}>History</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWarnings.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ padding: '36px 16px', textAlign: 'center', color: '#9AA3B2' }}>
                          {locale === 'fr'
                            ? 'Aucune alerte trouvée correspondant aux critères de recherche.'
                            : 'No warnings found matching the filter criteria.'}
                        </td>
                      </tr>
                    ) : (
                      filteredWarnings.map((w) => {
                        const match =
                          w.target_type === 'selection' ? w.betting_selections : w.betting_alternatives
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
                          <tr
                            key={w.id}
                            style={{
                              borderBottom: '1px solid rgba(240, 242, 245, 0.05)',
                              transition: 'background 0.15s ease',
                            }}
                          >
                            <td style={{ padding: '14px 16px' }}>
                              <Typography variant="body2" sx={{ fontWeight: 800 }}>
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

                            <td style={{ padding: '14px 16px' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {match ? `${match.home_team} vs ${match.away_team}` : 'Unknown Fixture'}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                <Chip
                                  label={w.target_type === 'selection' ? 'SELECTION' : 'ALTERNATIVE'}
                                  size="small"
                                  sx={{
                                    height: 16,
                                    fontSize: '0.6rem',
                                    fontWeight: 700,
                                    backgroundColor: alpha('#FFFFFF', 0.08),
                                  }}
                                />
                                {w.betting_tickets && (
                                  <Link
                                    href={`/${locale}/admin/betting/tickets/${w.betting_tickets.uuid}`}
                                    style={{
                                      fontSize: '0.75rem',
                                      color: '#F26419',
                                      fontWeight: 700,
                                      textDecoration: 'none',
                                    }}
                                  >
                                    #{w.betting_tickets.ticket_number || w.betting_tickets.id}
                                  </Link>
                                )}
                              </Box>
                            </td>

                            <td style={{ padding: '14px 16px' }}>
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

                            <td style={{ padding: '14px 16px', maxWidth: 320 }}>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                {w.description}
                              </Typography>
                              {w.evidence && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ display: 'block', fontStyle: 'italic' }}
                                >
                                  &ldquo;{w.evidence}&rdquo;
                                </Typography>
                              )}
                            </td>

                            <td style={{ padding: '14px 16px' }}>
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

                            <td style={{ padding: '14px 16px', maxWidth: 280 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                {w.review_notes || '—'}
                              </Typography>
                            </td>

                            <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                              <IconButton
                                size="small"
                                onClick={() => setSelectedWarningForHistory(w)}
                                sx={{
                                  color: 'text.secondary',
                                  '&:hover': { color: 'primary.main', backgroundColor: alpha('#F26419', 0.1) },
                                }}
                                title="View Review History"
                              >
                                <History size={16} />
                              </IconButton>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* ─── TAB 1: BULK POST-MATCH EVALUATION ─────────────────────────────── */}
      {activeTab === 1 && (
        <Card
          sx={{
            backgroundColor: alpha('#1E2635', 0.95),
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Sparkles size={22} color="#F6AE2D" />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {locale === 'fr'
                    ? 'Import par Lot des Évaluations Post-Match (ChatGPT)'
                    : 'ChatGPT Bulk Post-Match Warning Evaluation'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {locale === 'fr'
                  ? 'Collez la réponse JSON produite par ChatGPT suite à l\'export des alertes pour mettre à jour automatiquement les statuts de validation avec prévisualisation humaine.'
                  : 'Paste the batch JSON generated by ChatGPT. The system parses and previews every status change before applying them.'}
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={8}
              placeholder='{
  "operation": "warning_post_match_update",
  "schema_version": "1.0",
  "updates": [
    {
      "warning_id": "00000000-0000-0000-0000-000000000000",
      "post_match_status": "CONFIRMED",
      "review_notes": "Match ended 1-0. Low goal pattern held as predicted.",
      "evidence_assessment": "SUPPORTED",
      "confidence": "HIGH"
    }
  ]
}'
              value={reviewJsonInput}
              onChange={(e) => handleParseReviewJson(e.target.value)}
              error={Boolean(reviewError)}
              helperText={reviewError}
              sx={{
                mb: 3,
                '& .MuiInputBase-root': {
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  backgroundColor: alpha('#121824', 0.8),
                },
              }}
            />

            {parsedReview && parsedReview.updates && (
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#66BB6A' }}>
                    {locale === 'fr'
                      ? `Modifications Proposées (${approvedIds.size} / ${parsedReview.updates.length} sélectionnées) :`
                      : `Proposed Status Updates (${approvedIds.size} / ${parsedReview.updates.length} selected):`}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <CustomButton
                      size="small"
                      variant="text"
                      onClick={() => setApprovedIds(new Set(parsedReview.updates.map((u) => u.warning_id)))}
                    >
                      {locale === 'fr' ? 'Tout cocher' : 'Select All'}
                    </CustomButton>
                    <CustomButton
                      size="small"
                      variant="text"
                      onClick={() => setApprovedIds(new Set())}
                    >
                      {locale === 'fr' ? 'Tout décocher' : 'Deselect All'}
                    </CustomButton>
                  </Box>
                </Box>

                <Box
                  sx={{
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 2,
                    maxHeight: 340,
                    overflowY: 'auto',
                    backgroundColor: alpha('#121824', 0.6),
                  }}
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: alpha('#121824', 0.9) }}>
                        <th style={{ padding: '10px 14px' }}>Approve</th>
                        <th style={{ padding: '10px 14px' }}>Warning UUID</th>
                        <th style={{ padding: '10px 14px' }}>New Status</th>
                        <th style={{ padding: '10px 14px' }}>Assessment</th>
                        <th style={{ padding: '10px 14px' }}>Confidence</th>
                        <th style={{ padding: '10px 14px' }}>Review Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsedReview.updates.map((item, idx) => {
                        const isChecked = approvedIds.has(item.warning_id)
                        return (
                          <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                            <td style={{ padding: '10px 14px' }}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  const next = new Set(approvedIds)
                                  if (e.target.checked) next.add(item.warning_id)
                                  else next.delete(item.warning_id)
                                  setApprovedIds(next)
                                }}
                              />
                            </td>
                            <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                              {item.warning_id}
                            </td>
                            <td style={{ padding: '10px 14px', fontWeight: 800, color: '#66BB6A' }}>
                              {item.post_match_status}
                            </td>
                            <td style={{ padding: '10px 14px' }}>
                              <Chip
                                label={item.evidence_assessment || '—'}
                                size="small"
                                sx={{ height: 18, fontSize: '0.625rem', fontWeight: 700 }}
                              />
                            </td>
                            <td style={{ padding: '10px 14px' }}>
                              {item.confidence || '—'}
                            </td>
                            <td style={{ padding: '10px 14px', color: '#9AA3B2' }}>
                              {item.review_notes}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </Box>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton
                    variant="contained"
                    loading={isApplyingUpdates}
                    disabled={approvedIds.size === 0}
                    onClick={handleApplyBulkUpdates}
                    sx={{
                      backgroundColor: '#66BB6A',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      px: 3,
                      py: 1.2,
                      '&:hover': { backgroundColor: '#4CAF50' },
                    }}
                  >
                    {locale === 'fr'
                      ? `Appliquer les ${approvedIds.size} modifications`
                      : `Commit & Apply ${approvedIds.size} Updates`}
                  </LoadingButton>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* ─── TAB 2: ANALYTICS & CALIBRATION ───────────────────────────────── */}
      {activeTab === 2 && (
        <Box>
          {/* Top KPI Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ backgroundColor: alpha('#1E2635', 0.95), border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="caption" color="text.secondary">Total Warnings Logged</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>
                    {analytics.totalWarnings}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {analytics.pendingWarnings} pending post-match review
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ backgroundColor: alpha('#1E2635', 0.95), border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="caption" color="text.secondary">Review Completion Rate</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#42A5F5' }}>
                    {analytics.evaluationRate}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    of warnings have final verdict
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ backgroundColor: alpha('#1E2635', 0.95), border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="caption" color="text.secondary">Warning Confirmation Rate</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#66BB6A' }}>
                    {analytics.confirmationRate}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    of evaluated warnings held true
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ backgroundColor: alpha('#1E2635', 0.95), border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="caption" color="text.secondary">High-Risk Win Rate</Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      mt: 0.5,
                      color: analytics.impactOnOutcome.withHighCriticalContradictoryWinRate < 50 ? '#EF5350' : '#F6AE2D',
                    }}
                  >
                    {analytics.impactOnOutcome.withHighCriticalContradictoryWinRate}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    win rate on bets with HIGH/CRIT warning
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Severity & Direction Distributions */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ backgroundColor: alpha('#1E2635', 0.95), border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    {locale === 'fr' ? 'Répartition par Sévérité' : 'Warnings by Severity Tier'}
                  </Typography>

                  {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as WarningSeverity[]).map((sev) => {
                    const count = analytics.bySeverity[sev] || 0
                    const pct = analytics.totalWarnings > 0 ? (count / analytics.totalWarnings) * 100 : 0
                    const color =
                      sev === 'CRITICAL'
                        ? '#D32F2F'
                        : sev === 'HIGH'
                        ? '#EF5350'
                        : sev === 'MEDIUM'
                        ? '#F6AE2D'
                        : '#42A5F5'

                    return (
                      <Box key={sev} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{sev}</Typography>
                          <Typography variant="body2" color="text.secondary">{count} ({pct.toFixed(1)}%)</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: alpha('#FFFFFF', 0.08),
                            '& .MuiLinearProgress-bar': { backgroundColor: color },
                          }}
                        />
                      </Box>
                    )
                  })}
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ backgroundColor: alpha('#1E2635', 0.95), border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    {locale === 'fr' ? 'Répartition par Direction' : 'Warnings by Directional Bias'}
                  </Typography>

                  {(['CONTRADICTORY', 'SUPPORTIVE', 'NEUTRAL'] as WarningDirection[]).map((dir) => {
                    const count = analytics.byDirection[dir] || 0
                    const pct = analytics.totalWarnings > 0 ? (count / analytics.totalWarnings) * 100 : 0
                    const color =
                      dir === 'CONTRADICTORY'
                        ? '#EF5350'
                        : dir === 'SUPPORTIVE'
                        ? '#66BB6A'
                        : '#9AA3B2'

                    return (
                      <Box key={dir} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{dir}</Typography>
                          <Typography variant="body2" color="text.secondary">{count} ({pct.toFixed(1)}%)</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: alpha('#FFFFFF', 0.08),
                            '& .MuiLinearProgress-bar': { backgroundColor: color },
                          }}
                        />
                      </Box>
                    )
                  })}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Warning Type Reliability Table */}
          <Card sx={{ backgroundColor: alpha('#1E2635', 0.95), border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                {locale === 'fr' ? 'Fiabilité par Type d\'Alerte' : 'Reliability by Warning Category'}
              </Typography>

              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                      <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Warning Type</th>
                      <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Occurrences</th>
                      <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Confirmed</th>
                      <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Confirmation Rate</th>
                      <th style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Win Rate When Present</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.byType.map((t) => {
                      const confRate = t.count > 0 ? (t.confirmed / t.count) * 100 : 0
                      return (
                        <tr key={t.type} style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                          <td style={{ padding: '14px', fontWeight: 700 }}>{t.type}</td>
                          <td style={{ padding: '14px' }}>{t.count}</td>
                          <td style={{ padding: '14px', color: '#66BB6A', fontWeight: 700 }}>{t.confirmed}</td>
                          <td style={{ padding: '14px', fontWeight: 700 }}>{confRate.toFixed(1)}%</td>
                          <td
                            style={{
                              padding: '14px',
                              fontWeight: 700,
                              color: t.winRateWhenPresent >= 50 ? '#66BB6A' : '#EF5350',
                            }}
                          >
                            {t.winRateWhenPresent}%
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* ─── REVIEW HISTORY DRAWER ────────────────────────────────────────── */}
      <CustomDrawer
        open={Boolean(selectedWarningForHistory)}
        onClose={() => setSelectedWarningForHistory(null)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <History size={20} color="#F26419" />
            <span>{locale === 'fr' ? 'Historique des Évaluations' : 'Warning Review Audit History'}</span>
          </Box>
        }
        width={500}
      >
        {selectedWarningForHistory && (
          <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {selectedWarningForHistory.warning_type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedWarningForHistory.description}
              </Typography>
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#F6AE2D' }}>
              {locale === 'fr' ? 'Journal des Évaluations :' : 'Audit Log Entries:'}
            </Typography>

            {(!selectedWarningForHistory.betting_warning_reviews ||
              selectedWarningForHistory.betting_warning_reviews.length === 0) ? (
              <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: alpha('#121824', 0.6) }}>
                <Typography variant="body2" color="text.secondary">
                  {locale === 'fr'
                    ? 'Aucune évaluation historique enregistrée pour cette alerte.'
                    : 'No past evaluation reviews logged for this warning record.'}
                </Typography>
              </Paper>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {selectedWarningForHistory.betting_warning_reviews.map((rev) => (
                  <Paper
                    key={rev.id}
                    sx={{
                      p: 2,
                      backgroundColor: alpha('#121824', 0.8),
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          {rev.previous_status || 'PENDING'}
                        </Typography>
                        <ArrowRight size={14} color="#9AA3B2" />
                        <Chip
                          label={rev.new_status}
                          size="small"
                          sx={{ height: 18, fontSize: '0.65rem', fontWeight: 800, color: '#66BB6A' }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(rev.created_at).toLocaleString()}
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {rev.review_notes || 'No review notes provided.'}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {rev.evidence_assessment && (
                        <Chip
                          label={`Evidence: ${rev.evidence_assessment}`}
                          size="small"
                          sx={{ height: 16, fontSize: '0.6rem' }}
                        />
                      )}
                      {rev.confidence && (
                        <Chip
                          label={`Confidence: ${rev.confidence}`}
                          size="small"
                          sx={{ height: 16, fontSize: '0.6rem' }}
                        />
                      )}
                      <Chip
                        label={`Source: ${rev.review_source}`}
                        size="small"
                        sx={{ height: 16, fontSize: '0.6rem' }}
                      />
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        )}
      </CustomDrawer>

      {/* ─── GLOBAL EXPORT MODAL ─────────────────────────────────────────── */}
      <CustomModal
        open={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AlertTriangle size={20} color="#F6AE2D" />
            <span>{locale === 'fr' ? 'Export des Alertes en Attente pour ChatGPT' : 'Export Pending Warnings for ChatGPT'}</span>
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
                onClick={handleCopyExportJson}
                startIcon={hasCopiedExport ? <Check size={16} /> : <Copy size={16} />}
              >
                {hasCopiedExport
                  ? locale === 'fr' ? 'JSON Copié !' : 'JSON Copied!'
                  : locale === 'fr' ? 'Copier JSON Seul' : 'Copy JSON Only'}
              </CustomButton>
              <CustomButton
                variant="contained"
                onClick={handleCopyExportPrompt}
                startIcon={hasCopiedExportPrompt ? <Check size={16} /> : <Sparkles size={16} />}
                sx={{
                  background: hasCopiedExportPrompt
                    ? '#66BB6A'
                    : 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  px: 2.5,
                }}
              >
                {hasCopiedExportPrompt
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
              ? 'Ce fichier regroupe toutes les alertes en attente avec leurs matchs et résultats réels. Collez-le dans ChatGPT pour générer l\'évaluation post-match par lot.'
              : 'This payload gathers all pending risk warnings with match final scores. Paste it into ChatGPT to produce a structured post-match batch review.'}
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
    </Box>
  )
}
