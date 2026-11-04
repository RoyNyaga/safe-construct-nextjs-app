'use client'

import { useState, useTransition, useMemo } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Paper,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  alpha,
  Divider,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  RefreshCw,
  Download,
  Copy,
  ExternalLink,
  HelpCircle,
  FileJson,
  Filter,
  Check,
  Calendar,
  Layers,
} from 'lucide-react'
import {
  LeagueIntegrityMatrixPayload,
  LeagueIntegrityCompetitionSummary,
  LeagueMarketIntegrityRecord,
  LeagueMarketTier,
  LeagueIntegrityBetItem,
} from '@/types/betting'
import { syncLeagueBaselinesFromFile, getLeagueMarketIntegrity } from '@/app/[locale]/actions/betting'

interface LeagueIntegrityClientProps {
  locale: string
  initialPayload: LeagueIntegrityMatrixPayload
  error?: string
}

const TIER_COLORS: Record<LeagueMarketTier, { bg: string; text: string; border: string }> = {
  TIER_1: {
    bg: 'rgba(34, 197, 94, 0.12)',
    text: '#4ADE80',
    border: 'rgba(34, 197, 94, 0.35)',
  },
  TIER_2: {
    bg: 'rgba(234, 179, 8, 0.12)',
    text: '#FACC15',
    border: 'rgba(234, 179, 8, 0.35)',
  },
  TIER_3: {
    bg: 'rgba(239, 68, 68, 0.14)',
    text: '#F87171',
    border: 'rgba(239, 68, 68, 0.4)',
  },
  UNTESTED: {
    bg: 'rgba(148, 163, 184, 0.08)',
    text: '#94A3B8',
    border: 'rgba(148, 163, 184, 0.2)',
  },
}

export default function LeagueIntegrityClient({
  locale,
  initialPayload,
  error: initialError,
}: LeagueIntegrityClientProps) {
  const [matrix, setMatrix] = useState<LeagueIntegrityMatrixPayload>(initialPayload)
  const [search, setSearch] = useState('')
  const [selectedMarketFilter, setSelectedMarketFilter] = useState<string>('all')
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>('all')

  // Drawer / Drilldown State
  const [selectedRecord, setSelectedRecord] = useState<{
    competition: LeagueIntegrityCompetitionSummary
    marketKey?: string
    record?: LeagueMarketIntegrityRecord
  } | null>(null)

  // Export Dialog State
  const [exportJsonOpen, setExportJsonOpen] = useState(false)
  const [exportedJsonText, setExportedJsonText] = useState('')
  const [copied, setCopied] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const [isPending, startTransition] = useTransition()

  // High level KPIs
  const kpis = useMemo(() => {
    let tier1Count = 0
    let tier2Count = 0
    let tier3Count = 0
    let totalEmpiricalBets = 0

    for (const comp of matrix.competitions) {
      totalEmpiricalBets += comp.total_bets
      for (const m of Object.values(comp.markets)) {
        if (m.tier === 'TIER_1') tier1Count++
        else if (m.tier === 'TIER_2') tier2Count++
        else if (m.tier === 'TIER_3') tier3Count++
      }
    }

    return {
      totalCompetitions: matrix.competitions.length,
      totalEmpiricalBets,
      tier1Count,
      tier2Count,
      tier3Count,
    }
  }, [matrix])

  // Filtered Competitions
  const filteredCompetitions = useMemo(() => {
    return matrix.competitions.filter((comp) => {
      // Search text
      const q = search.toLowerCase().trim()
      const matchesSearch =
        !q ||
        comp.name.toLowerCase().includes(q) ||
        (comp.country && comp.country.toLowerCase().includes(q))

      if (!matchesSearch) return false

      // Tier filter
      if (selectedTierFilter !== 'all') {
        if (selectedMarketFilter === 'all') {
          if (comp.overall_tier !== selectedTierFilter) return false
        } else {
          const rec = comp.markets[selectedMarketFilter]
          if (!rec || rec.tier !== selectedTierFilter) return false
        }
      }

      return true
    })
  }, [matrix, search, selectedMarketFilter, selectedTierFilter])

  // Sync Action
  const handleSyncBaselines = () => {
    startTransition(async () => {
      setNotification(null)
      const res = await syncLeagueBaselinesFromFile()
      if (res.success) {
        setNotification({
          type: 'success',
          message:
            locale === 'fr'
              ? `Synchronisation réussie! ${res.updatedCompetitions} compétitions mises à jour dans league_baselines.json.`
              : `Sync successful! ${res.updatedCompetitions} competitions calibrated and saved to league_baselines.json.`,
        })
        if (res.json) {
          setExportedJsonText(res.json)
        }
        // Refresh local state
        const refreshed = await getLeagueMarketIntegrity()
        if (refreshed.data) {
          setMatrix(refreshed.data)
        }
      } else {
        setNotification({
          type: 'error',
          message: res.error || 'Failed to sync baselines',
        })
      }
    })
  }

  // Open Export Modal
  const handleOpenExportModal = () => {
    startTransition(async () => {
      const res = await syncLeagueBaselinesFromFile()
      if (res.json) {
        setExportedJsonText(res.json)
      }
      setExportJsonOpen(true)
    })
  }

  // Copy JSON
  const handleCopyJson = () => {
    navigator.clipboard.writeText(exportedJsonText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  // Download JSON
  const handleDownloadJson = () => {
    const blob = new Blob([exportedJsonText], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `league_baselines_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const standardMarkets = [
    { key: 'over_1_5', label: 'Over 1.5' },
    { key: 'over_2_5', label: 'Over 2.5' },
    { key: 'btts_yes', label: 'BTTS Yes' },
    { key: 'under_3_5', label: 'Under 3.5' },
    { key: 'to_win', label: 'To Win (1X2)' },
    { key: 'draw_no_bet', label: 'Draw No Bet' },
  ]

  return (
    <Box>
      {/* Page Header */}
      <Box
        sx={{
          mb: 3.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <ShieldCheck size={28} color="#60A5FA" />
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {locale === 'fr'
                ? 'Matrice d\'Intégrité Ligues & Marchés'
                : 'League-Market Integrity Matrix (LMI)'}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {locale === 'fr'
              ? 'Matrice empirique croisée (Ligue × Option de marché) pour bloquer les pièges statistiques et calibrer les probabilités du Modèle 4.0.'
              : 'Empirical cross-matrix (League × Market Option) preventing fat-tail traps and calibrating Model 4.0 probabilities.'}
          </Typography>
        </Box>

        {/* Global Actions */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<FileJson size={16} />}
            onClick={handleOpenExportModal}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.15)',
              color: 'rgba(255, 255, 255, 0.85)',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': {
                borderColor: '#60A5FA',
                backgroundColor: alpha('#60A5FA', 0.08),
              },
            }}
          >
            {locale === 'fr' ? 'Exporter JSON' : 'Export JSON'}
          </Button>

          <Button
            variant="contained"
            startIcon={
              isPending ? <CircularProgress size={16} color="inherit" /> : <RefreshCw size={16} />
            }
            onClick={handleSyncBaselines}
            disabled={isPending}
            sx={{
              backgroundColor: '#2563EB',
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
              '&:hover': {
                backgroundColor: '#1D4ED8',
              },
            }}
          >
            {locale === 'fr' ? 'Synchroniser & Enregistrer' : 'Sync & Save to Baselines'}
          </Button>
        </Stack>
      </Box>

      {/* Notifications */}
      {notification && (
        <Alert
          severity={notification.type}
          onClose={() => setNotification(null)}
          sx={{ mb: 3, borderRadius: 2 }}
        >
          {notification.message}
        </Alert>
      )}

      {initialError && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {initialError}
        </Alert>
      )}

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card
            sx={{
              backgroundColor: alpha('#1E2635', 0.95),
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 2.5,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                Competitions
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#FFFFFF' }}>
                {kpis.totalCompetitions}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tracked in Engine
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card
            sx={{
              backgroundColor: alpha('#1E2635', 0.95),
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 2.5,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                Total Evaluated
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#60A5FA' }}>
                {kpis.totalEmpiricalBets}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Main + Shadow Bets
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card
            sx={{
              backgroundColor: alpha('#1E2635', 0.95),
              border: '1px solid rgba(34, 197, 94, 0.25)',
              borderRadius: 2.5,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#4ADE80', textTransform: 'uppercase' }}>
                Tier 1 (Reliable)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#4ADE80' }}>
                {kpis.tier1Count}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Green Corridor (≥78% Hit Rate)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card
            sx={{
              backgroundColor: alpha('#1E2635', 0.95),
              border: '1px solid rgba(234, 179, 8, 0.25)',
              borderRadius: 2.5,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#FACC15', textTransform: 'uppercase' }}>
                Tier 2 (Moderate)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#FACC15' }}>
                {kpis.tier2Count}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Strict Filters (65%–77%)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card
            sx={{
              backgroundColor: alpha('#1E2635', 0.95),
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 2.5,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#F87171', textTransform: 'uppercase' }}>
                Tier 3 (Fat-Tail Traps)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#F87171' }}>
                {kpis.tier3Count}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Blocked from Main Tickets
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters Toolbar */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2.5,
          backgroundColor: alpha('#1E2635', 0.8),
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          size="small"
          placeholder={locale === 'fr' ? 'Rechercher ligue, pays...' : 'Search league or country...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flex: { xs: '1 1 100%', sm: '1 1 240px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} color="rgba(255,255,255,0.4)" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 170 }}>
          <InputLabel>{locale === 'fr' ? 'Marché spécifique' : 'Market Focus'}</InputLabel>
          <Select
            value={selectedMarketFilter}
            label={locale === 'fr' ? 'Marché spécifique' : 'Market Focus'}
            onChange={(e) => setSelectedMarketFilter(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">{locale === 'fr' ? 'Tous les marchés (Grille)' : 'All Markets (Matrix)'}</MenuItem>
            {standardMarkets.map((m) => (
              <MenuItem key={m.key} value={m.key}>
                {m.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>{locale === 'fr' ? 'Niveau d\'intégrité' : 'Integrity Tier'}</InputLabel>
          <Select
            value={selectedTierFilter}
            label={locale === 'fr' ? 'Niveau d\'intégrité' : 'Integrity Tier'}
            onChange={(e) => setSelectedTierFilter(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">{locale === 'fr' ? 'Tous les niveaux' : 'All Tiers'}</MenuItem>
            <MenuItem value="TIER_1">Tier 1 (High Reliability)</MenuItem>
            <MenuItem value="TIER_2">Tier 2 (Moderate)</MenuItem>
            <MenuItem value="TIER_3">Tier 3 (Blocked / Traps)</MenuItem>
            <MenuItem value="UNTESTED">Untested</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {locale === 'fr' ? 'Dernière calibration:' : 'Last Calibrated:'}{' '}
            <strong style={{ color: '#E2E8F0' }}>
              {matrix.last_updated ? new Date(matrix.last_updated).toLocaleDateString() : 'N/A'}
            </strong>
          </Typography>
        </Box>
      </Paper>

      {/* Main Matrix Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          backgroundColor: alpha('#151B26', 0.95),
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead sx={{ backgroundColor: alpha('#1E2635', 0.9) }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#94A3B8', py: 1.75, width: '22%' }}>
                  {locale === 'fr' ? 'Compétition / Pays' : 'Competition / Country'}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#94A3B8', py: 1.75, width: '10%' }}>
                  {locale === 'fr' ? 'Statut Global' : 'Overall Status'}
                </TableCell>
                {standardMarkets.map((m) => (
                  <TableCell
                    key={m.key}
                    align="center"
                    sx={{
                      fontWeight: 700,
                      color: selectedMarketFilter === m.key ? '#60A5FA' : '#94A3B8',
                      backgroundColor:
                        selectedMarketFilter === m.key ? alpha('#2563EB', 0.08) : 'transparent',
                      py: 1.75,
                    }}
                  >
                    {m.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCompetitions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      {locale === 'fr'
                        ? 'Aucune compétition ne correspond aux critères de filtre.'
                        : 'No competitions matched your filter criteria.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompetitions.map((comp) => {
                  const overallColors = TIER_COLORS[comp.overall_tier] || TIER_COLORS.UNTESTED

                  return (
                    <TableRow
                      key={comp.competition_key}
                      sx={{
                        '&:hover': {
                          backgroundColor: alpha('#FFFFFF', 0.02),
                        },
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      }}
                    >
                      {/* Competition info */}
                      <TableCell sx={{ py: 2 }}>
                        <Box
                          sx={{ cursor: 'pointer' }}
                          onClick={() => setSelectedRecord({ competition: comp })}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 700,
                              color: '#FFFFFF',
                              '&:hover': { color: '#60A5FA', textDecoration: 'underline' },
                            }}
                          >
                            {comp.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.25 }}>
                            {comp.country && (
                              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                                {comp.country}
                              </Typography>
                            )}
                            {comp.historical_home_avg && (
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                                • Baselines: {comp.historical_home_avg}H / {comp.historical_away_avg}A
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Overall tier */}
                      <TableCell align="center" sx={{ py: 2 }}>
                        <Chip
                          size="small"
                          label={comp.overall_tier.replace('_', ' ')}
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.72rem',
                            backgroundColor: overallColors.bg,
                            color: overallColors.text,
                            border: `1px solid ${overallColors.border}`,
                          }}
                        />
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ color: '#94A3B8', mt: 0.5, fontSize: '0.68rem' }}
                        >
                          {comp.total_bets} bets ({comp.win_rate !== null ? `${comp.win_rate}%` : 'N/A'})
                        </Typography>
                      </TableCell>

                      {/* Standard Markets Columns */}
                      {standardMarkets.map((m) => {
                        const rec = comp.markets[m.key]
                        const tier = rec?.tier || 'UNTESTED'
                        const colors = TIER_COLORS[tier]
                        const isTrap = tier === 'TIER_3'

                        return (
                          <TableCell
                            key={m.key}
                            align="center"
                            onClick={() =>
                              setSelectedRecord({
                                competition: comp,
                                marketKey: m.key,
                                record: rec,
                              })
                            }
                            sx={{
                              py: 1.5,
                              px: 1,
                              cursor: 'pointer',
                              backgroundColor:
                                selectedMarketFilter === m.key
                                  ? alpha('#2563EB', 0.05)
                                  : 'transparent',
                              transition: 'background-color 0.15s ease',
                              '&:hover': {
                                backgroundColor: alpha('#FFFFFF', 0.06),
                              },
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                borderRadius: 2,
                                backgroundColor: colors.bg,
                                border: `1px solid ${colors.border}`,
                                display: 'inline-flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                minWidth: 84,
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {isTrap ? (
                                  <AlertTriangle size={13} color={colors.text} />
                                ) : tier === 'TIER_1' ? (
                                  <CheckCircle2 size={13} color={colors.text} />
                                ) : null}
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 800,
                                    color: colors.text,
                                    fontSize: '0.75rem',
                                    lineHeight: 1.1,
                                  }}
                                >
                                  {tier.replace('_', ' ')}
                                </Typography>
                              </Box>

                              <Typography
                                variant="caption"
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.85)',
                                  fontSize: '0.7rem',
                                  fontWeight: 600,
                                  mt: 0.4,
                                }}
                              >
                                {rec?.actual_win_rate !== null
                                  ? `${rec.actual_win_rate}% (${rec.won_count}/${rec.total_settled})`
                                  : rec?.macro_prior_win_rate !== null && rec?.macro_prior_win_rate !== undefined
                                    ? `~${rec.macro_prior_win_rate}% prior`
                                    : 'Untested'}
                              </Typography>

                              {rec?.calibration_gap_pp !== null && rec?.calibration_gap_pp !== undefined && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontSize: '0.65rem',
                                    fontWeight: 600,
                                    color:
                                      rec.calibration_gap_pp >= 0
                                        ? '#4ADE80'
                                        : rec.calibration_gap_pp < -10
                                          ? '#F87171'
                                          : '#FACC15',
                                  }}
                                >
                                  Gap: {rec.calibration_gap_pp > 0 ? `+${rec.calibration_gap_pp}` : rec.calibration_gap_pp}pp
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Drilldown Drawer */}
      <Drawer
        anchor="right"
        open={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 540, md: 620 },
            backgroundColor: '#111722',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            p: 3,
          },
        }}
      >
        {selectedRecord && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {selectedRecord.competition.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedRecord.competition.country || 'International'}
                  {selectedRecord.marketKey
                    ? ` • ${selectedRecord.record?.market || selectedRecord.marketKey}`
                    : ' • All Market Corridors'}
                </Typography>
              </Box>

              {selectedRecord.record && (
                <Chip
                  label={selectedRecord.record.tier.replace('_', ' ')}
                  sx={{
                    fontWeight: 800,
                    backgroundColor: TIER_COLORS[selectedRecord.record.tier].bg,
                    color: TIER_COLORS[selectedRecord.record.tier].text,
                    border: `1px solid ${TIER_COLORS[selectedRecord.record.tier].border}`,
                  }}
                />
              )}
            </Box>

            <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

            {/* Market Specific Analytics if clicked on specific cell */}
            {selectedRecord.record && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#60A5FA' }}>
                  Market Performance & Gate Evaluation
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 4 }}>
                    <Paper sx={{ p: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Settled Win Rate
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                        {selectedRecord.record.actual_win_rate !== null
                          ? `${selectedRecord.record.actual_win_rate}%`
                          : 'Untested'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedRecord.record.won_count}W / {selectedRecord.record.lost_count}L
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid size={{ xs: 4 }}>
                    <Paper sx={{ p: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Model Expected Rate
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#60A5FA' }}>
                        {selectedRecord.record.predicted_avg_prob !== null
                          ? `${selectedRecord.record.predicted_avg_prob}%`
                          : selectedRecord.record.macro_prior_win_rate !== null
                            ? `~${selectedRecord.record.macro_prior_win_rate}%`
                            : 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Expected Probability
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid size={{ xs: 4 }}>
                    <Paper sx={{ p: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Calibration Gap
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color:
                            (selectedRecord.record.calibration_gap_pp ?? 0) >= 0
                              ? '#4ADE80'
                              : (selectedRecord.record.calibration_gap_pp ?? 0) < -10
                                ? '#F87171'
                                : '#FACC15',
                        }}
                      >
                        {selectedRecord.record.calibration_gap_pp !== null
                          ? `${selectedRecord.record.calibration_gap_pp > 0 ? '+' : ''}${selectedRecord.record.calibration_gap_pp}pp`
                          : '0.0pp'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Actual - Expected
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {selectedRecord.record.status_label && (
                  <Alert
                    severity={
                      selectedRecord.record.tier === 'TIER_1'
                        ? 'success'
                        : selectedRecord.record.tier === 'TIER_3'
                          ? 'error'
                          : 'info'
                    }
                    sx={{ borderRadius: 2, mb: 2 }}
                  >
                    {selectedRecord.record.status_label}
                  </Alert>
                )}
              </Box>
            )}

            {/* Settled Bets History List */}
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
              {selectedRecord.record
                ? `Historical Fixtures Evaluated (${selectedRecord.record.items?.length || 0})`
                : `All Fixtures in Competition (${selectedRecord.competition.items?.length || 0})`}
            </Typography>

            {(() => {
              const items: LeagueIntegrityBetItem[] = selectedRecord.record
                ? selectedRecord.record.items || []
                : selectedRecord.competition.items || []

              if (items.length === 0) {
                return (
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {locale === 'fr'
                        ? 'Aucun match enregistré pour le moment. La classification actuelle repose sur le macro-prior historique.'
                        : 'No empirical matches settled yet. Tier classification is currently grounded on the locked macro prior.'}
                    </Typography>
                  </Box>
                )
              }

              return (
                <Stack spacing={1.5} sx={{ maxHeight: 420, overflowY: 'auto', pr: 0.5 }}>
                  {items.map((item) => {
                    const isWon = item.result === 'won'
                    const isLost = item.result === 'lost'
                    const isVoid = item.result === 'void'

                    return (
                      <Paper
                        key={`${item.source_type}-${item.id}`}
                        elevation={0}
                        sx={{
                          p: 1.75,
                          borderRadius: 2,
                          backgroundColor: alpha('#1E2635', 0.6),
                          border: `1px solid ${isWon
                              ? 'rgba(34, 197, 94, 0.3)'
                              : isLost
                                ? 'rgba(239, 68, 68, 0.3)'
                                : 'rgba(255, 255, 255, 0.08)'
                            }`,
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                          <Typography variant="caption" sx={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <Calendar size={13} />
                            {item.match_date}
                            {item.ticket_number && ` • ${item.ticket_number}`}
                          </Typography>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <Chip
                              size="small"
                              label={item.source_type === 'selection' ? 'Main Leg' : 'Shadow Alt'}
                              sx={{
                                height: 20,
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                backgroundColor:
                                  item.source_type === 'selection'
                                    ? alpha('#2563EB', 0.25)
                                    : alpha('#A855F7', 0.25),
                                color: item.source_type === 'selection' ? '#93C5FD' : '#D8B4FE',
                              }}
                            />
                            <Chip
                              size="small"
                              label={item.result.toUpperCase()}
                              sx={{
                                height: 20,
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                backgroundColor: isWon
                                  ? alpha('#22C55E', 0.2)
                                  : isLost
                                    ? alpha('#EF4444', 0.2)
                                    : alpha('#94A3B8', 0.2),
                                color: isWon ? '#4ADE80' : isLost ? '#F87171' : '#CBD5E1',
                              }}
                            />
                          </Box>
                        </Box>

                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 0.5 }}>
                          {item.home_team} vs {item.away_team}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#CBD5E1' }}>
                            Pick: <strong>{item.selection}</strong> ({item.market}) @ {item.odds?.toFixed(2) || 'N/A'}
                          </Typography>

                          {item.actual_home_score !== null && item.actual_away_score !== null && (
                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                              Score: {item.actual_home_score} - {item.actual_away_score}
                            </Typography>
                          )}
                        </Box>
                      </Paper>
                    )
                  })}
                </Stack>
              )
            })()}
          </Box>
        )}
      </Drawer>

      {/* Export JSON Dialog */}
      <Dialog
        open={exportJsonOpen}
        onClose={() => setExportJsonOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#111722',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FileJson size={22} color="#60A5FA" />
          {locale === 'fr' ? 'Exporter league_baselines.json' : 'Export Synced league_baselines.json'}
        </DialogTitle>

        <DialogContent dividers sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {locale === 'fr'
              ? 'Ce payload JSON contient les priors macro historiques enrichis par vos statistiques empiriques réelles. Copiez ce JSON ou téléchargez-le pour que Antigravity et le moteur de calcul Python utilisent ces règles à jour.'
              : 'This calibrated JSON contains locked historical macro priors enriched by your actual empirical win rates. Copy or download this payload so Antigravity and the calculate_model.py engine utilize live integrity tiers.'}
          </Typography>

          <TextField
            multiline
            rows={14}
            fullWidth
            value={exportedJsonText}
            variant="outlined"
            InputProps={{
              readOnly: true,
              sx: {
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: 2,
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleDownloadJson}
            startIcon={<Download size={16} />}
            sx={{
              borderColor: 'rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.85)',
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            {locale === 'fr' ? 'Télécharger .json' : 'Download .json'}
          </Button>

          <Button
            variant="contained"
            onClick={handleCopyJson}
            startIcon={copied ? <Check size={16} /> : <Copy size={16} />}
            sx={{
              backgroundColor: copied ? '#16A34A' : '#2563EB',
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: copied ? '#15803D' : '#1D4ED8',
              },
            }}
          >
            {copied ? (locale === 'fr' ? 'Copié !' : 'Copied!') : locale === 'fr' ? 'Copier le JSON' : 'Copy JSON'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
