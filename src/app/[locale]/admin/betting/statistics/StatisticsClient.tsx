'use client'

import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Paper,
  LinearProgress,
  alpha,
  Divider,
} from '@mui/material'
import {
  BarChart3,
  Scale,
  Percent,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { CalibrationBucket, SelectedVsAlternativesComparison } from '@/types/betting'
import { CustomTooltip } from '@/components/ui'

interface StatisticsClientProps {
  locale: string
  summary: {
    tickets: {
      total: number
      won: number
      lost: number
      pending: number
      void: number
      winRate: number
      totalStake: number
      totalProfit: number
      roi: number
    }
    selections: {
      total: number
      won: number
      lost: number
      winRate: number
    }
    totalModels: number
    totalAlternatives: number
  }
  calibration: CalibrationBucket[]
  comparison: SelectedVsAlternativesComparison
}

export default function StatisticsClient({
  locale,
  summary,
  calibration,
  comparison,
}: StatisticsClientProps) {
  const winRateDelta = Number(
    (comparison.selected.winRate - comparison.alternatives.winRate).toFixed(1)
  )

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
          {locale === 'fr' ? 'Centre d\'Analyses Statistiques' : 'Statistical & Calibration Analytics'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {locale === 'fr'
            ? 'Évaluation objective des probabilités estimées, calibration du modèle et valeur ajoutée de la sélection.'
            : 'Objective evaluation of predicted probabilities, model calibration curves, and selection alpha.'}
        </Typography>
      </Box>

      {/* Top High-level KPIs */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ backgroundColor: alpha('#1E2635', 0.95), border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}` }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                Ticket Win Rate
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#66BB6A', mb: 0.5 }}>
                {summary.tickets.winRate}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {summary.tickets.won} won / {summary.tickets.lost} lost / {summary.tickets.pending} pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ backgroundColor: alpha('#1E2635', 0.95), border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}` }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                Selection Win Rate
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#42A5F5', mb: 0.5 }}>
                {summary.selections.winRate}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {summary.selections.won} won / {summary.selections.total} total legs placed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ backgroundColor: alpha('#1E2635', 0.95), border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}` }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                Cumulative ROI
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: summary.tickets.roi >= 0 ? '#66BB6A' : '#EF5350',
                  mb: 0.5,
                }}
              >
                {summary.tickets.roi >= 0 ? '+' : ''}{summary.tickets.roi}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Net P&L: {summary.tickets.totalProfit >= 0 ? '+' : ''}${summary.tickets.totalProfit.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ backgroundColor: alpha('#1E2635', 0.95), border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}` }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                Selection Edge Added
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: winRateDelta >= 0 ? '#66BB6A' : '#EF5350',
                  mb: 0.5,
                }}
              >
                {winRateDelta >= 0 ? '+' : ''}{winRateDelta} pp
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Selected vs Alternatives win rate delta
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ─── SELECTED VS ALTERNATIVES COMPARISON ───────────────────────────── */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Scale size={22} color="#F6AE2D" />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {locale === 'fr' ? 'Sélections vs Alternatives Rejetées' : 'Selected Bets vs Rejected Alternatives'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {locale === 'fr'
                  ? 'Répond à la question cruciale : "Nos paris retenus ont-ils obtenu un meilleur taux de réussite que les options rejetées ?"'
                  : 'Answers the critical test: "Did our selected matches outperform the candidate matches that ChatGPT considered but rejected?"'}
              </Typography>
            </Box>

            <Chip
              icon={winRateDelta >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              label={
                winRateDelta >= 0
                  ? `Selection Process Adding Value (+${winRateDelta}% win rate)`
                  : `Alternatives Outperforming by ${Math.abs(winRateDelta)}%`
              }
              sx={{
                fontWeight: 800,
                backgroundColor: winRateDelta >= 0 ? alpha('#66BB6A', 0.15) : alpha('#EF5350', 0.15),
                color: winRateDelta >= 0 ? '#66BB6A' : '#EF5350',
                border: `1px solid ${winRateDelta >= 0 ? alpha('#66BB6A', 0.3) : alpha('#EF5350', 0.3)}`,
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {/* Selected Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: alpha('#66BB6A', 0.08),
                  border: `1px solid ${alpha('#66BB6A', 0.3)}`,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#66BB6A' }}>
                    {locale === 'fr' ? 'Sélections Retenues (Selected)' : 'Selected Bets (Placed)'}
                  </Typography>
                  <Chip label="ACTUAL BETS" size="small" sx={{ fontWeight: 800, backgroundColor: alpha('#66BB6A', 0.2), color: '#66BB6A' }} />
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="caption" color="text.secondary">Total Bets</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>{comparison.selected.total}</Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="caption" color="text.secondary">Won / Lost</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {comparison.selected.won} / {comparison.selected.lost}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="caption" color="text.secondary">Win Rate</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#66BB6A' }}>
                      {comparison.selected.winRate}%
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2, borderColor: alpha('#66BB6A', 0.2) }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Average Estimated Probability:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{comparison.selected.avgProbability}%</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Average Odds:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{comparison.selected.avgOdds || '—'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Average Value Edge:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#66BB6A' }}>
                    +{comparison.selected.avgEdge}%
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Alternatives Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: alpha('#9AA3B2', 0.08),
                  border: `1px solid ${alpha('#9AA3B2', 0.2)}`,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.secondary' }}>
                    {locale === 'fr' ? 'Alternatives Rejetées' : 'Rejected Alternatives'}
                  </Typography>
                  <Chip label="REJECTED" size="small" sx={{ fontWeight: 800, backgroundColor: alpha('#9AA3B2', 0.2), color: 'text.secondary' }} />
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="caption" color="text.secondary">Total Bets</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>{comparison.alternatives.total}</Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="caption" color="text.secondary">Won / Lost</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {comparison.alternatives.won} / {comparison.alternatives.lost}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="caption" color="text.secondary">Win Rate</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
                      {comparison.alternatives.winRate}%
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2, borderColor: alpha('#9AA3B2', 0.2) }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Average Estimated Probability:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{comparison.alternatives.avgProbability}%</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Average Odds:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{comparison.alternatives.avgOdds || '—'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Average Value Edge:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {comparison.alternatives.avgEdge !== 0 ? `+${comparison.alternatives.avgEdge}%` : '—'}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ─── PROBABILITY CALIBRATION ANALYSIS ────────────────────────────── */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Target size={22} color="#F26419" />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {locale === 'fr' ? 'Calibration des Probabilités Estimées' : 'Probability Calibration Analysis'}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {locale === 'fr'
                ? 'Compare le taux de réussite effectif des paris à la probabilité calculée par le modèle pour détecter la surconfiance ou sous-confiance.'
                : 'Evaluates whether a bet estimated at 70% probability actually wins ~70% of the time over a large sample.'}
            </Typography>
          </Box>

          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                  <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Probability Bucket</th>
                  <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Bets Placed</th>
                  <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Won Bets</th>
                  <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Avg Predicted Prob</th>
                  <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Actual Win Rate</th>
                  <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Calibration Difference</th>
                  <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Visual Calibration</th>
                </tr>
              </thead>
              <tbody>
                {calibration.map((b, idx) => {
                  const isPerfect = Math.abs(b.differencePp) <= 3
                  const diffColor =
                    b.totalBets === 0
                      ? '#9AA3B2'
                      : isPerfect
                      ? '#66BB6A'
                      : b.differencePp > 0
                      ? '#42A5F5'
                      : '#EF5350'

                  return (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid rgba(240, 242, 245, 0.05)',
                      }}
                    >
                      <td style={{ padding: '16px 18px', fontWeight: 800 }}>{b.rangeLabel}</td>
                      <td style={{ padding: '16px 18px' }}>{b.totalBets}</td>
                      <td style={{ padding: '16px 18px', color: '#66BB6A', fontWeight: 700 }}>{b.wonBets}</td>
                      <td style={{ padding: '16px 18px' }}>{b.avgPredictedProb}%</td>
                      <td style={{ padding: '16px 18px', fontWeight: 800 }}>{b.actualWinRate}%</td>
                      <td style={{ padding: '16px 18px', fontWeight: 800, color: diffColor }}>
                        {b.totalBets === 0 ? '—' : `${b.differencePp >= 0 ? '+' : ''}${b.differencePp} pp`}
                      </td>
                      <td style={{ padding: '16px 18px', minWidth: 180 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={b.actualWinRate}
                            sx={{
                              flex: 1,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: alpha('#F0F2F5', 0.1),
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: diffColor,
                              },
                            }}
                          />
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
    </Box>
  )
}
