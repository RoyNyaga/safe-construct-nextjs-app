'use client'

import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Paper,
  alpha,
  Divider,
} from '@mui/material'
import {
  Cpu,
  ArrowLeft,
  Percent,
} from 'lucide-react'
import BettingSubNav from '../../BettingSubNav'
import { BettingBankroll, BettingModel, CalibrationBucket } from '@/types/betting'

interface ModelDetailClientProps {
  locale: string
  model: BettingModel
  calibration: CalibrationBucket[]
  bankroll: BettingBankroll | null
}

export default function ModelDetailClient({
  locale,
  model,
  calibration,
  bankroll,
}: ModelDetailClientProps) {
  const currentBalance = Number(bankroll?.current_balance || 0)
  const currency = bankroll?.currency || 'USD'

  return (
    <Box sx={{ pb: 6 }}>
      <BettingSubNav
        locale={locale}
        currentBalance={currentBalance}
        currency={currency}
      />

      {/* Back Link */}
      <Box sx={{ mb: 3 }}>
        <Box
          component={Link}
          href={`/${locale}/admin/betting/models`}
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
          <span>{locale === 'fr' ? 'Retour aux modèles' : 'Back to models list'}</span>
        </Box>
      </Box>

      {/* Header Card */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Chip
                  label={`VERSION ${model.version}`}
                  sx={{
                    fontWeight: 800,
                    backgroundColor: alpha('#F26419', 0.15),
                    color: '#F26419',
                    border: '1px solid rgba(242, 100, 25, 0.3)',
                  }}
                />
                {model.is_active && (
                  <Chip
                    label="CURRENT ACTIVE MODEL"
                    sx={{
                      fontWeight: 800,
                      backgroundColor: alpha('#66BB6A', 0.15),
                      color: '#66BB6A',
                    }}
                  />
                )}
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                {model.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {model.description || 'No summary description.'}
              </Typography>
            </Box>

            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
              <Typography variant="caption" color="text.secondary">Registered On</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {new Date(model.created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Performance KPIs */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Total Tickets</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {model.total_tickets || 0}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Ticket Win Rate</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#66BB6A' }}>
                {model.win_rate || 0}%
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Model ROI</Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: (model.roi || 0) >= 0 ? '#66BB6A' : '#EF5350',
                }}
              >
                {(model.roi || 0) >= 0 ? '+' : ''}{model.roi || 0}%
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Won / Lost</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.secondary' }}>
                {model.won_tickets || 0}W / {model.lost_tickets || 0}L
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Methodology Content Box */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Cpu size={20} color="#F26419" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {locale === 'fr' ? 'Notes & Règles Méthodologiques (Prompt / Rules Reference)' : 'Methodology Notes & Calculation Rules'}
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: alpha('#121824', 0.8),
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              color: '#F0F2F5',
            }}
          >
            {model.content || 'No methodology documentation stored for this model.'}
          </Paper>
        </CardContent>
      </Card>

      {/* Model Probability Calibration Table */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Percent size={20} color="#F6AE2D" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {locale === 'fr' ? 'Matrice de Calibration des Probabilités' : 'Probability Calibration Matrix'}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Predicted probability vs actual win rate
            </Typography>
          </Box>

          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Probability Range</th>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Total Bets</th>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Won Bets</th>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Avg Predicted</th>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Actual Win Rate</th>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Calibration Difference</th>
                </tr>
              </thead>
              <tbody>
                {calibration.map((bucket, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700 }}>{bucket.rangeLabel}</td>
                    <td style={{ padding: '14px 16px' }}>{bucket.totalBets}</td>
                    <td style={{ padding: '14px 16px', color: '#66BB6A', fontWeight: 700 }}>{bucket.wonBets}</td>
                    <td style={{ padding: '14px 16px' }}>{bucket.avgPredictedProb}%</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700 }}>{bucket.actualWinRate}%</td>
                    <td
                      style={{
                        padding: '14px 16px',
                        fontWeight: 700,
                        color:
                          bucket.totalBets === 0
                            ? '#9AA3B2'
                            : Math.abs(bucket.differencePp) <= 3
                            ? '#66BB6A'
                            : bucket.differencePp > 0
                            ? '#42A5F5'
                            : '#EF5350',
                      }}
                    >
                      {bucket.totalBets === 0
                        ? '—'
                        : `${bucket.differencePp >= 0 ? '+' : ''}${bucket.differencePp} pp`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
