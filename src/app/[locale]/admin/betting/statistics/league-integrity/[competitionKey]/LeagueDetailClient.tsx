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
  InputAdornment,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Divider,
  Stack,
  Button,
  alpha,
} from '@mui/material'
import {
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Target,
  Scale,
  Brain,
  FileText,
  ExternalLink,
  Layers,
  Filter,
  ShieldAlert,
} from 'lucide-react'
import {
  LeagueCompetitionDetailPayload,
  LeagueMarketTier,
  LeagueSelectionDetailItem,
} from '@/types/betting'
import { CustomDrawer } from '@/components/ui'
import { PreMatchStatsTables } from '@/components/betting/PreMatchStatsTables'

interface LeagueDetailClientProps {
  locale: string
  detail: LeagueCompetitionDetailPayload
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

export default function LeagueDetailClient({ locale, detail }: LeagueDetailClientProps) {
  const isFr = locale === 'fr'
  const { competition, market_summaries, selections } = detail

  const [sourceFilter, setSourceFilter] = useState<'all' | 'selection' | 'alternative'>('all')
  const [resultFilter, setResultFilter] = useState<string>('all')
  const [marketFilter, setMarketFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState<LeagueSelectionDetailItem | null>(null)

  const mainCount = useMemo(
    () => selections.filter((s) => s.source_type === 'selection').length,
    [selections]
  )
  const altCount = useMemo(
    () => selections.filter((s) => s.source_type === 'alternative').length,
    [selections]
  )

  const filteredSelections = useMemo(() => {
    const q = search.trim().toLowerCase()
    return selections.filter((item) => {
      if (sourceFilter !== 'all' && item.source_type !== sourceFilter) return false
      if (resultFilter !== 'all' && item.result !== resultFilter) return false
      if (marketFilter !== 'all' && item.market_key !== marketFilter) return false
      if (q) {
        const matchTeams =
          item.home_team.toLowerCase().includes(q) || item.away_team.toLowerCase().includes(q)
        const matchTicket = (item.ticket_number || '').toLowerCase().includes(q)
        const matchMarket =
          item.market.toLowerCase().includes(q) ||
          item.selection.toLowerCase().includes(q) ||
          item.market_label.toLowerCase().includes(q)
        if (!matchTeams && !matchTicket && !matchMarket) return false
      }
      return true
    })
  }, [selections, sourceFilter, resultFilter, marketFilter, search])

  const overallColors = TIER_COLORS[competition.overall_tier] || TIER_COLORS.UNTESTED

  const getResultColor = (res: string) => {
    if (res === 'won') return '#66BB6A'
    if (res === 'lost') return '#EF5350'
    if (res === 'void') return '#9AA3B2'
    return '#F6AE2D'
  }

  return (
    <Box>
      {/* Back Link */}
      <Box sx={{ mb: 2.5 }}>
        <Box
          component={Link}
          href={`/${locale}/admin/betting/statistics/league-integrity`}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            '&:hover': { color: '#60A5FA' },
          }}
        >
          <ArrowLeft size={16} />
          <span>
            {isFr
              ? 'Retour à la Matrice d\'Intégrité Ligues & Marchés'
              : 'Back to League-Market Integrity Matrix'}
          </span>
        </Box>
      </Box>

      {/* League Header Card */}
      <Card
        sx={{
          mb: 3,
          backgroundColor: alpha('#1E2635', 0.95),
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 0.75 }}>
                <ShieldCheck size={26} color="#60A5FA" />
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {competition.name}
                </Typography>
                <Chip
                  label={competition.overall_tier.replace('_', ' ')}
                  size="small"
                  sx={{
                    fontWeight: 800,
                    backgroundColor: overallColors.bg,
                    color: overallColors.text,
                    border: `1px solid ${overallColors.border}`,
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {competition.country || 'International'}
                {competition.historical_home_avg !== null && competition.historical_home_avg !== undefined && (
                  <>
                    {' '}
                    &bull; {isFr ? 'Moyennes historiques' : 'Historical Baselines'}:{' '}
                    <strong style={{ color: '#E2E8F0' }}>
                      {competition.historical_home_avg}H / {competition.historical_away_avg}A
                    </strong>
                  </>
                )}
                {' '}
                &bull;{' '}
                <strong style={{ color: '#E2E8F0' }}>{selections.length}</strong>{' '}
                {isFr ? 'sélections au total' : 'total selections'} ({mainCount}{' '}
                {isFr ? 'principales' : 'main'}, {altCount}{' '}
                {isFr ? 'alternatives' : 'alternatives'})
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                p: 1.5,
                px: 2.25,
                borderRadius: 2.5,
                backgroundColor: alpha('#121824', 0.7),
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                  {isFr ? 'Taux de Succès Global' : 'Overall Success Rate'}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color:
                      competition.win_rate === null
                        ? '#94A3B8'
                        : competition.win_rate >= 75
                          ? '#4ADE80'
                          : competition.win_rate >= 60
                            ? '#FACC15'
                            : '#F87171',
                  }}
                >
                  {competition.win_rate !== null ? `${competition.win_rate}%` : 'N/A'}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                  {isFr ? 'Sélections Réglées' : 'Settled Selections'}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                  {competition.won_bets}W / {competition.lost_bets}L
                  {competition.pending_bets > 0 && (
                    <span style={{ color: '#F6AE2D', fontSize: '0.75rem', marginLeft: 6 }}>
                      (+{competition.pending_bets} pend.)
                    </span>
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Top Compact Stats Strip: Success Rate for ALL Market Options */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Layers size={18} color="#60A5FA" />
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              {isFr
                ? 'Taux de Succès par Option de Marché'
                : 'Market Option Success Rates'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {isFr ? '(Cliquez sur une carte pour filtrer)' : '(Click a market card to filter selections)'}
            </Typography>
          </Box>

          {marketFilter !== 'all' && (
            <Chip
              size="small"
              icon={<Filter size={13} />}
              label={
                isFr
                  ? `Filtre actif : ${market_summaries.find((m) => m.market_key === marketFilter)?.market || marketFilter} ✕`
                  : `Filtered: ${market_summaries.find((m) => m.market_key === marketFilter)?.market || marketFilter} ✕`
              }
              onClick={() => setMarketFilter('all')}
              sx={{
                fontWeight: 700,
                backgroundColor: alpha('#2563EB', 0.2),
                color: '#93C5FD',
                border: `1px solid ${alpha('#60A5FA', 0.4)}`,
                cursor: 'pointer',
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(auto-fit, minmax(150px, 1fr))',
            },
            gap: 1.5,
          }}
        >
          {market_summaries.map((m) => {
            const colors = TIER_COLORS[m.tier] || TIER_COLORS.UNTESTED
            const isSelected = marketFilter === m.market_key

            return (
              <Paper
                key={m.market_key}
                elevation={0}
                onClick={() =>
                  setMarketFilter((prev) => (prev === m.market_key ? 'all' : m.market_key))
                }
                sx={{
                  p: 1.75,
                  borderRadius: 2.5,
                  cursor: 'pointer',
                  height: '100%',
                  backgroundColor: isSelected
                    ? alpha('#2563EB', 0.16)
                    : alpha('#1E2635', 0.9),
                  border: isSelected
                    ? '1.5px solid #60A5FA'
                    : `1px solid ${m.total_evaluated > 0 ? colors.border : 'rgba(255, 255, 255, 0.07)'}`,
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    borderColor: '#60A5FA',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 0.5, mb: 0.75 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: '#E2E8F0',
                      fontSize: '0.73rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {m.market}
                  </Typography>
                  <Chip
                    size="small"
                    label={m.tier === 'UNTESTED' ? '—' : m.tier.replace('TIER_', 'T')}
                    sx={{
                      height: 18,
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      backgroundColor: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                      '& .MuiChip-label': { px: 0.75 },
                    }}
                  />
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.15,
                    color:
                      m.actual_win_rate !== null
                        ? m.actual_win_rate >= 75
                          ? '#4ADE80'
                          : m.actual_win_rate >= 60
                            ? '#FACC15'
                            : '#F87171'
                        : '#94A3B8',
                  }}
                >
                  {m.actual_win_rate !== null
                    ? `${m.actual_win_rate}%`
                    : m.macro_prior_win_rate !== null && m.macro_prior_win_rate !== undefined
                      ? `~${m.macro_prior_win_rate}%`
                      : '—'}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ display: 'block', color: '#94A3B8', fontSize: '0.68rem', mt: 0.35 }}
                >
                  {m.total_settled > 0
                    ? `${m.won_count}/${m.total_settled} ${isFr ? 'gagnées' : 'won'}`
                    : m.pending_count && m.pending_count > 0
                      ? `${m.pending_count} pending`
                      : m.macro_prior_win_rate !== null && m.macro_prior_win_rate !== undefined
                        ? 'Macro prior (0 sel.)'
                        : isFr
                          ? '0 sélection'
                          : '0 selections'}
                </Typography>

                {m.calibration_gap_pp !== null && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      fontSize: '0.64rem',
                      fontWeight: 700,
                      mt: 0.25,
                      color:
                        m.calibration_gap_pp >= 0
                          ? '#4ADE80'
                          : m.calibration_gap_pp < -10
                            ? '#F87171'
                            : '#FACC15',
                    }}
                  >
                    Gap: {m.calibration_gap_pp > 0 ? `+${m.calibration_gap_pp}` : m.calibration_gap_pp}pp
                  </Typography>
                )}
              </Paper>
            )
          })}
        </Box>
      </Box>

      {/* Filter Toolbar */}
      <Card
        sx={{
          mb: 3,
          backgroundColor: alpha('#1E2635', 0.9),
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 2.5,
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {/* Selection Source Tabs */}
            <Tabs
              value={sourceFilter}
              onChange={(_, v) => setSourceFilter(v)}
              sx={{
                minHeight: 38,
                backgroundColor: alpha('#121824', 0.65),
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
                    backgroundColor: alpha('#2563EB', 0.3),
                  },
                },
                '& .MuiTabs-indicator': { display: 'none' },
              }}
            >
              <Tab
                label={`${isFr ? 'Toutes' : 'All Selections'} (${selections.length})`}
                value="all"
              />
              <Tab
                label={`${isFr ? 'Principales' : 'Main Selections'} (${mainCount})`}
                value="selection"
              />
              <Tab
                label={`${isFr ? 'Alternatives' : 'Alternative Selections'} (${altCount})`}
                value="alternative"
              />
            </Tabs>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Result Filter */}
              <FormControl size="small" sx={{ minWidth: 135 }}>
                <InputLabel>{isFr ? 'Résultat' : 'Result'}</InputLabel>
                <Select
                  value={resultFilter}
                  label={isFr ? 'Résultat' : 'Result'}
                  onChange={(e) => setResultFilter(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">{isFr ? 'Tous' : 'All Results'}</MenuItem>
                  <MenuItem value="won">{isFr ? 'Gagnées' : 'Won'}</MenuItem>
                  <MenuItem value="lost">{isFr ? 'Perdues' : 'Lost'}</MenuItem>
                  <MenuItem value="pending">{isFr ? 'En cours' : 'Pending'}</MenuItem>
                  <MenuItem value="void">{isFr ? 'Annulées' : 'Void'}</MenuItem>
                </Select>
              </FormControl>

              {/* Search */}
              <TextField
                size="small"
                placeholder={isFr ? 'Équipe, marché, ticket...' : 'Search team, market, ticket...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={16} color="#9AA3B2" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  width: { xs: '100%', sm: 230 },
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Selections Table */}
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
          <Table sx={{ minWidth: 880 }}>
            <TableHead sx={{ backgroundColor: alpha('#1E2635', 0.9) }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#94A3B8', py: 1.6 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#94A3B8', py: 1.6 }}>
                  {isFr ? 'Type' : 'Selection Type'}
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#94A3B8', py: 1.6 }}>
                  {isFr ? 'Match' : 'Match'}
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#94A3B8', py: 1.6 }}>
                  {isFr ? 'Marché & Option' : 'Market & Selection'}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#94A3B8', py: 1.6 }}>
                  {isFr ? 'Cote' : 'Odds'}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#94A3B8', py: 1.6 }}>
                  {isFr ? 'Prob. Modèle' : 'Model Prob'}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#94A3B8', py: 1.6 }}>
                  Score
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#94A3B8', py: 1.6 }}>
                  {isFr ? 'Résultat' : 'Result'}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#94A3B8', py: 1.6 }}>
                  Ticket
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSelections.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 7 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {isFr
                        ? 'Aucune sélection trouvée pour ces filtres'
                        : 'No selections match your current filters'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {isFr
                        ? 'Essayez de modifier vos filtres de marché, de type ou de résultat.'
                        : 'Try clearing the market card filter or adjusting search criteria.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSelections.map((item) => {
                  const resColor = getResultColor(item.result)
                  const isMain = item.source_type === 'selection'

                  return (
                    <TableRow
                      key={`${item.source_type}-${item.id}`}
                      onClick={() => setSelectedItem(item)}
                      sx={{
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'background-color 0.15s ease',
                        '&:hover': {
                          backgroundColor: alpha('#60A5FA', 0.07),
                        },
                      }}
                    >
                      <TableCell sx={{ color: '#9AA3B2', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                        {item.match_date || '—'}
                      </TableCell>

                      <TableCell>
                        <Chip
                          size="small"
                          label={
                            isMain
                              ? isFr
                                ? 'Principale'
                                : 'Main'
                              : isFr
                                ? 'Alternative'
                                : 'Alternative'
                          }
                          sx={{
                            height: 22,
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            backgroundColor: isMain
                              ? alpha('#2563EB', 0.22)
                              : alpha('#A855F7', 0.22),
                            color: isMain ? '#93C5FD' : '#D8B4FE',
                            border: `1px solid ${isMain ? alpha('#60A5FA', 0.35) : alpha('#C084FC', 0.35)}`,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#F0F2F5' }}>
                          {item.home_team}{' '}
                          <span style={{ color: '#9AA3B2', fontWeight: 400 }}>vs</span>{' '}
                          {item.away_team}
                        </Typography>
                        {item.warnings.length > 0 && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#F6AE2D',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.5,
                              mt: 0.25,
                              fontSize: '0.68rem',
                            }}
                          >
                            <AlertTriangle size={11} />
                            {item.warnings.length}{' '}
                            {item.warnings.length === 1 ? 'warning' : 'warnings'}
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={`${item.market_label}: ${item.selection}`}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.73rem',
                            backgroundColor: alpha('#F26419', 0.16),
                            color: '#F26419',
                            border: `1px solid ${alpha('#F26419', 0.28)}`,
                          }}
                        />
                      </TableCell>

                      <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.88rem' }}>
                        {item.odds !== null ? item.odds.toFixed(2) : '—'}
                      </TableCell>

                      <TableCell align="center">
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#60A5FA' }}>
                          {item.estimated_probability !== null
                            ? `${(item.estimated_probability * 100).toFixed(1)}%`
                            : '—'}
                        </Typography>
                        {item.edge_percentage_points !== null && (
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              color: item.edge_percentage_points >= 0 ? '#66BB6A' : '#EF5350',
                            }}
                          >
                            {item.edge_percentage_points >= 0 ? '+' : ''}
                            {item.edge_percentage_points}pp
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell align="center" sx={{ fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                        {item.actual_home_score !== null && item.actual_away_score !== null
                          ? `${item.actual_home_score} - ${item.actual_away_score}`
                          : '—'}
                      </TableCell>

                      <TableCell align="center">
                        <Chip
                          label={item.result.toUpperCase()}
                          size="small"
                          icon={
                            item.result === 'won' ? (
                              <CheckCircle2 size={13} />
                            ) : item.result === 'lost' ? (
                              <XCircle size={13} />
                            ) : item.result === 'void' ? (
                              <RotateCcw size={13} />
                            ) : (
                              <Clock size={13} />
                            )
                          }
                          sx={{
                            fontWeight: 800,
                            fontSize: '0.68rem',
                            backgroundColor: alpha(resColor, 0.15),
                            color: resColor,
                            border: `1px solid ${alpha(resColor, 0.35)}`,
                            '& .MuiChip-icon': { color: resColor },
                          }}
                        />
                      </TableCell>

                      <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                        {item.ticket_uuid ? (
                          <Link
                            href={`/${locale}/admin/betting/tickets/${item.ticket_uuid}`}
                            style={{
                              color: '#F26419',
                              fontWeight: 700,
                              fontSize: '0.82rem',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                          >
                            <span>{item.ticket_number || `#${item.ticket_id}`}</span>
                            <ExternalLink size={12} />
                          </Link>
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            {item.ticket_number || '—'}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* ─── LEFT-SIDE SELECTION DETAIL & STATISTICAL SNAPSHOT DRAWER ──────── */}
      <CustomDrawer
        anchor="left"
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SlidersHorizontal size={20} color="#42A5F5" />
            <span>
              {selectedItem?.source_type === 'alternative'
                ? isFr
                  ? 'Détails & Snapshot (Alternative)'
                  : 'Alternative Selection Snapshot'
                : isFr
                  ? 'Détails & Snapshot de la Sélection'
                  : 'Selection Details & Statistical Snapshot'}
            </span>
          </Box>
        }
        width={540}
      >
        {selectedItem && (() => {
          const selColor = getResultColor(selectedItem.result)
          const isMain = selectedItem.source_type === 'selection'

          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Match Header */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75, flexWrap: 'wrap' }}>
                  <Chip
                    size="small"
                    label={
                      isMain
                        ? isFr
                          ? 'Sélection Principale'
                          : 'Main Selection'
                        : isFr
                          ? 'Sélection Alternative'
                          : 'Alternative Selection'
                    }
                    sx={{
                      height: 22,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      backgroundColor: isMain ? alpha('#2563EB', 0.22) : alpha('#A855F7', 0.22),
                      color: isMain ? '#93C5FD' : '#D8B4FE',
                    }}
                  />
                  {selectedItem.ticket_number && (
                    <Chip
                      size="small"
                      label={`Ticket ${selectedItem.ticket_number}`}
                      sx={{
                        height: 22,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        backgroundColor: alpha('#F26419', 0.15),
                        color: '#F26419',
                      }}
                    />
                  )}
                  {selectedItem.model_version && (
                    <Chip
                      size="small"
                      label={`Model v${selectedItem.model_version}`}
                      sx={{
                        height: 22,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        backgroundColor: alpha('#9AA3B2', 0.15),
                        color: '#CBD5E1',
                      }}
                    />
                  )}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: '#F0F2F5' }}>
                  {selectedItem.home_team}{' '}
                  {selectedItem.home_league_position !== null &&
                    selectedItem.home_league_position !== undefined && (
                      <span style={{ color: '#F6AE2D', fontSize: '0.85rem' }}>
                        (#{selectedItem.home_league_position})
                      </span>
                    )}{' '}
                  <span style={{ color: '#9AA3B2', fontWeight: 400 }}>vs</span>{' '}
                  {selectedItem.away_team}{' '}
                  {selectedItem.away_league_position !== null &&
                    selectedItem.away_league_position !== undefined && (
                      <span style={{ color: '#F6AE2D', fontSize: '0.85rem' }}>
                        (#{selectedItem.away_league_position})
                      </span>
                    )}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {selectedItem.country ? `${selectedItem.country} • ` : ''}
                  {selectedItem.league || competition.name} &bull; Match Date:{' '}
                  {selectedItem.match_date || selectedItem.ticket_date || '—'}
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
                  label={`${selectedItem.market}: ${selectedItem.selection}`}
                  size="small"
                  sx={{ backgroundColor: alpha('#F26419', 0.2), color: '#F26419', fontWeight: 700 }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {selectedItem.actual_home_score !== null &&
                    selectedItem.actual_away_score !== null && (
                      <Chip
                        label={`Score: ${selectedItem.actual_home_score} - ${selectedItem.actual_away_score}`}
                        size="small"
                        sx={{ fontWeight: 800, backgroundColor: alpha('#F0F2F5', 0.1) }}
                      />
                    )}
                  <Chip
                    label={selectedItem.result.toUpperCase()}
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

              {/* Model Valuation & Mathematical Edge */}
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
                  {isFr ? 'Métriques Mathématiques & Cote' : 'Model Valuation & Mathematical Edge'}
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 6, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary">
                      Bookmaker Odds
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800 }}>
                      {selectedItem.odds !== null ? Number(selectedItem.odds).toFixed(2) : '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary">
                      Model Probability
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: '#66BB6A' }}>
                      {selectedItem.estimated_probability !== null
                        ? `${(Number(selectedItem.estimated_probability) * 100).toFixed(1)}%`
                        : '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary">
                      Break-even Prob
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#9AA3B2' }}>
                      {selectedItem.breakeven_probability !== null
                        ? `${(Number(selectedItem.breakeven_probability) * 100).toFixed(1)}%`
                        : '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary">
                      Edge Points
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 800,
                        color:
                          (Number(selectedItem.edge_percentage_points) || 0) >= 0
                            ? '#66BB6A'
                            : '#EF5350',
                      }}
                    >
                      {selectedItem.edge_percentage_points !== null
                        ? `${Number(selectedItem.edge_percentage_points) >= 0 ? '+' : ''}${selectedItem.edge_percentage_points}pp`
                        : '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary">
                      Expected Value (EV)
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 800,
                        color:
                          (Number(selectedItem.expected_value) || 0) >= 0 ? '#66BB6A' : '#EF5350',
                      }}
                    >
                      {selectedItem.expected_value !== null
                        ? `${Number(selectedItem.expected_value) >= 0 ? '+' : ''}${selectedItem.expected_value}`
                        : '—'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Dual-Baseline Benchmark Card */}
              {((selectedItem.historical_estimated_probability !== null &&
                selectedItem.historical_estimated_probability !== undefined) ||
                (selectedItem.current_league_home_avg !== null &&
                  selectedItem.current_league_home_avg !== undefined) ||
                (selectedItem.historical_league_home_avg !== null &&
                  selectedItem.historical_league_home_avg !== undefined)) && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha('#121824', 0.6),
                    border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1.5,
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: '#42A5F5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Scale size={16} />
                      {isFr ? 'Double Référence & Validation Historique' : 'Dual-Baseline Benchmark'}
                    </Typography>
                    {selectedItem.estimated_probability !== null &&
                      selectedItem.historical_estimated_probability !== null &&
                      selectedItem.historical_estimated_probability !== undefined && (() => {
                        const diffPct =
                          selectedItem.alignment_delta_pp !== null &&
                          selectedItem.alignment_delta_pp !== undefined
                            ? Number(selectedItem.alignment_delta_pp)
                            : Math.abs(
                                Number(selectedItem.estimated_probability) -
                                  Number(selectedItem.historical_estimated_probability)
                              ) * 100
                        const rem =
                          selectedItem.alignment_remark ||
                          (diffPct <= 1.5
                            ? 'very_high'
                            : diffPct <= 3.0
                              ? 'high'
                              : diffPct <= 5.0
                                ? 'medium'
                                : diffPct <= 7.0
                                  ? 'low'
                                  : 'very_low')
                        const colorMap: Record<string, string> = {
                          very_high: '#00E676',
                          high: '#66BB6A',
                          medium: '#FFA726',
                          low: '#FF7043',
                          very_low: '#EF5350',
                        }
                        const labelMap: Record<string, string> = {
                          very_high: `Very High Alignment (Δ ${diffPct.toFixed(1)} pp)`,
                          high: `High Alignment (Δ ${diffPct.toFixed(1)} pp)`,
                          medium: `Medium Alignment (Δ ${diffPct.toFixed(1)} pp)`,
                          low: `Low Alignment (Δ ${diffPct.toFixed(1)} pp)`,
                          very_low: `Very Low Alignment (Δ ${diffPct.toFixed(1)} pp)`,
                        }
                        const color = colorMap[rem] || '#42A5F5'
                        const label = labelMap[rem] || `Alignment (Δ ${diffPct.toFixed(1)} pp)`
                        return (
                          <Chip
                            label={label}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.675rem',
                              height: 22,
                              backgroundColor: alpha(color, 0.15),
                              color,
                              border: `1px solid ${alpha(color, 0.3)}`,
                            }}
                          />
                        )
                      })()}
                  </Box>

                  <Grid container spacing={1.5}>
                    <Grid size={{ xs: 6 }}>
                      <Box
                        sx={{
                          p: 1.25,
                          borderRadius: 1.5,
                          backgroundColor: alpha('#1E2638', 0.5),
                          border: `1px solid ${alpha('#42A5F5', 0.2)}`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: '#42A5F5', fontWeight: 700, display: 'block', mb: 0.5 }}
                        >
                          Current Season (Primary)
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#66BB6A', lineHeight: 1.2 }}>
                          {selectedItem.estimated_probability !== null
                            ? `${(Number(selectedItem.estimated_probability) * 100).toFixed(1)}%`
                            : '—'}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: '#9AA3B2', fontSize: '0.72rem', display: 'block', mt: 0.5 }}
                        >
                          League Baselines:{' '}
                          {selectedItem.current_league_home_avg
                            ? `H: ${Number(selectedItem.current_league_home_avg).toFixed(2)} / A: ${Number(selectedItem.current_league_away_avg ?? 0).toFixed(2)}`
                            : 'Live Aggregates'}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <Box
                        sx={{
                          p: 1.25,
                          borderRadius: 1.5,
                          backgroundColor: alpha('#1E2638', 0.5),
                          border: `1px solid ${alpha('#9AA3B2', 0.2)}`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: '#9AA3B2', fontWeight: 700, display: 'block', mb: 0.5 }}
                        >
                          Historical Baseline (Benchmark)
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#F6AE2D', lineHeight: 1.2 }}>
                          {selectedItem.historical_estimated_probability !== null &&
                          selectedItem.historical_estimated_probability !== undefined
                            ? `${(Number(selectedItem.historical_estimated_probability) * 100).toFixed(1)}%`
                            : '—'}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: '#9AA3B2', fontSize: '0.72rem', display: 'block', mt: 0.5 }}
                        >
                          Historical Baselines:{' '}
                          {selectedItem.historical_league_home_avg
                            ? `H: ${Number(selectedItem.historical_league_home_avg).toFixed(2)} / A: ${Number(selectedItem.historical_league_away_avg ?? 0).toFixed(2)}`
                            : 'Locked Catalog'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Multi-Market & 1X2 Probabilities Grid */}
              {((selectedItem.prob_home_win !== null && selectedItem.prob_home_win !== undefined) ||
                (selectedItem.prob_draw !== null && selectedItem.prob_draw !== undefined) ||
                (selectedItem.prob_away_win !== null && selectedItem.prob_away_win !== undefined) ||
                (selectedItem.prob_over_1_5 !== null && selectedItem.prob_over_1_5 !== undefined) ||
                (selectedItem.prob_over_2_5 !== null && selectedItem.prob_over_2_5 !== undefined) ||
                (selectedItem.prob_btts_yes !== null && selectedItem.prob_btts_yes !== undefined) ||
                (selectedItem.prob_under_3_5 !== null && selectedItem.prob_under_3_5 !== undefined)) && (
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
                      color: '#66BB6A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Target size={16} />
                    {isFr ? 'Probabilités Multi-Marchés & 1X2' : 'Multi-Market & 1X2 Probabilities'}
                  </Typography>
                  <Grid container spacing={1}>
                    {selectedItem.prob_home_win !== null && selectedItem.prob_home_win !== undefined && (
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, backgroundColor: alpha('#1E2638', 0.5), textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#9AA3B2', display: 'block', fontSize: '0.7rem' }}>
                            1 (Home)
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: '#66BB6A' }}>
                            {(Number(selectedItem.prob_home_win) * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    {selectedItem.prob_draw !== null && selectedItem.prob_draw !== undefined && (
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, backgroundColor: alpha('#1E2638', 0.5), textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#9AA3B2', display: 'block', fontSize: '0.7rem' }}>
                            X (Draw)
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: '#F6AE2D' }}>
                            {(Number(selectedItem.prob_draw) * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    {selectedItem.prob_away_win !== null && selectedItem.prob_away_win !== undefined && (
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, backgroundColor: alpha('#1E2638', 0.5), textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#9AA3B2', display: 'block', fontSize: '0.7rem' }}>
                            2 (Away)
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: '#42A5F5' }}>
                            {(Number(selectedItem.prob_away_win) * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    {selectedItem.prob_over_1_5 !== null && selectedItem.prob_over_1_5 !== undefined && (
                      <Grid size={{ xs: 3 }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, backgroundColor: alpha('#1E2638', 0.5), textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#9AA3B2', display: 'block', fontSize: '0.68rem' }}>
                            Over 1.5
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {(Number(selectedItem.prob_over_1_5) * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    {selectedItem.prob_over_2_5 !== null && selectedItem.prob_over_2_5 !== undefined && (
                      <Grid size={{ xs: 3 }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, backgroundColor: alpha('#1E2638', 0.5), textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#9AA3B2', display: 'block', fontSize: '0.68rem' }}>
                            Over 2.5
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {(Number(selectedItem.prob_over_2_5) * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    {selectedItem.prob_btts_yes !== null && selectedItem.prob_btts_yes !== undefined && (
                      <Grid size={{ xs: 3 }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, backgroundColor: alpha('#1E2638', 0.5), textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#9AA3B2', display: 'block', fontSize: '0.68rem' }}>
                            BTTS Yes
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {(Number(selectedItem.prob_btts_yes) * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    {selectedItem.prob_under_3_5 !== null && selectedItem.prob_under_3_5 !== undefined && (
                      <Grid size={{ xs: 3 }}>
                        <Box sx={{ p: 1, borderRadius: 1.5, backgroundColor: alpha('#1E2638', 0.5), textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#9AA3B2', display: 'block', fontSize: '0.68rem' }}>
                            Under 3.5
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {(Number(selectedItem.prob_under_3_5) * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              )}

              {/* Pre-Match Statistical Matchup Comparison */}
              <PreMatchStatsTables item={selectedItem} locale={locale} />

              {/* Linked Risk Warnings */}
              {selectedItem.warnings.length > 0 && (
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
                    <ShieldAlert size={16} />
                    {isFr ? 'Alertes de Risque Associées' : 'Associated Risk Warnings'} (
                    {selectedItem.warnings.length})
                  </Typography>
                  <Stack spacing={1.25}>
                    {selectedItem.warnings.map((w) => {
                      const dirColor =
                        w.direction === 'CONTRADICTORY'
                          ? '#EF5350'
                          : w.direction === 'SUPPORTIVE'
                            ? '#66BB6A'
                            : '#9AA3B2'
                      return (
                        <Box
                          key={w.uuid}
                          sx={{
                            p: 1.25,
                            borderRadius: 1.5,
                            backgroundColor: alpha('#1E2638', 0.55),
                            border: `1px solid ${alpha(dirColor, 0.25)}`,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: 0.75,
                              mb: 0.5,
                            }}
                          >
                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#F0F2F5' }}>
                              {w.warning_type}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <Chip
                                size="small"
                                label={w.direction}
                                sx={{
                                  height: 18,
                                  fontSize: '0.62rem',
                                  fontWeight: 700,
                                  backgroundColor: alpha(dirColor, 0.15),
                                  color: dirColor,
                                }}
                              />
                              <Chip
                                size="small"
                                label={w.post_match_status}
                                sx={{
                                  height: 18,
                                  fontSize: '0.62rem',
                                  fontWeight: 700,
                                  backgroundColor: alpha('#60A5FA', 0.15),
                                  color: '#93C5FD',
                                }}
                              />
                            </Box>
                          </Box>
                          <Typography variant="caption" sx={{ display: 'block', color: '#CBD5E1', lineHeight: 1.5 }}>
                            {w.description}
                          </Typography>
                          {w.review_notes && (
                            <Typography
                              variant="caption"
                              sx={{ display: 'block', color: '#94A3B8', fontStyle: 'italic', mt: 0.5 }}
                            >
                              Review: {w.review_notes}
                            </Typography>
                          )}
                        </Box>
                      )
                    })}
                  </Stack>
                </Paper>
              )}

              {/* Methodology Reasoning */}
              {selectedItem.comment && (
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
                    {isFr
                      ? 'Justification Méthodologique du Modèle :'
                      : 'Model Methodology & Selection Reasoning:'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                    &ldquo;{selectedItem.comment}&rdquo;
                  </Typography>
                </Box>
              )}

              {/* Contextual Notes */}
              {selectedItem.notes && (
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
                    {isFr ? 'Notes Contextuelles & Équipe :' : 'Contextual Notes & Match Insights:'}
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {selectedItem.notes}
                  </Typography>
                </Box>
              )}

              {/* Footer: Audit UUID & Open Full Ticket Button */}
              <Box
                sx={{
                  pt: 1.5,
                  borderTop: '1px solid rgba(240, 242, 245, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 1.5,
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                  UUID: {selectedItem.uuid.slice(0, 8)}…
                </Typography>

                {selectedItem.ticket_uuid && (
                  <Button
                    component={Link}
                    href={`/${locale}/admin/betting/tickets/${selectedItem.ticket_uuid}`}
                    size="small"
                    variant="contained"
                    endIcon={<ExternalLink size={14} />}
                    sx={{
                      background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      textTransform: 'none',
                      borderRadius: 2,
                    }}
                  >
                    {isFr ? 'Voir le Ticket Complet' : 'Open Parent Ticket'}
                  </Button>
                )}
              </Box>
            </Box>
          )
        })()}
      </CustomDrawer>
    </Box>
  )
}
