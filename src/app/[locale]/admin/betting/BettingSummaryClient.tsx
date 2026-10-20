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
} from '@mui/material'
import {
  Wallet,
  TrendingUp,
  Receipt,
  FileCode2,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Scale,
  Percent,
} from 'lucide-react'
import { CustomTooltip } from '@/components/ui'
import { formatCurrency, formatCurrencySign } from '@/utils/bettingCurrency'
import BettingSubNav from './BettingSubNav'
import {
  BettingBankroll,
  BettingTicket,
  BettingModel,
  SelectedVsAlternativesComparison,
} from '@/types/betting'

interface BettingSummaryClientProps {
  locale: string
  bankroll: BettingBankroll | null
  stats: {
    tickets: {
      total: number
      won: number
      lost: number
      pending: number
      winRate: number
      totalStake: number
      totalPayout: number
      totalProfit: number
      roi: number
    }
    selections: {
      total: number
      won: number
      lost: number
      pending: number
      winRate: number
    }
  }
  tickets: BettingTicket[]
  models: BettingModel[]
  comparison: SelectedVsAlternativesComparison
}

export default function BettingSummaryClient({
  locale,
  bankroll,
  stats,
  tickets,
  models,
  comparison,
}: BettingSummaryClientProps) {
  const activeModel = models.find((m) => m.is_active) || models[0]
  const recentTickets = tickets.slice(0, 5)

  const currentBal = Number(bankroll?.current_balance || 0)
  const currency = bankroll?.currency || 'FCFA'

  const statCards = [
    {
      title: locale === 'fr' ? 'Solde du Bankroll' : 'Bankroll Balance',
      value: formatCurrency(currentBal, currency),
      subtitle: `${locale === 'fr' ? 'Dépôts' : 'Deposits'}: ${formatCurrency(bankroll?.total_deposited || 0, currency)}`,
      icon: Wallet,
      color: '#66BB6A',
      href: `/${locale}/admin/betting/balance`,
      tooltip: 'Available cash balance in the active bankroll. Updated on every transaction.',
    },
    {
      title: locale === 'fr' ? 'Profit / Perte Net' : 'Net Profit / Loss',
      value: formatCurrencySign(stats.tickets.totalProfit, currency),
      subtitle: `ROI: ${stats.tickets.roi >= 0 ? '+' : ''}${stats.tickets.roi}%`,
      icon: TrendingUp,
      color: stats.tickets.totalProfit >= 0 ? '#66BB6A' : '#EF5350',
      href: `/${locale}/admin/betting/statistics`,
      tooltip: 'Realized net profit or loss from settled betting tickets and return on investment.',
    },
    {
      title: locale === 'fr' ? 'Taux de Réussite Tickets' : 'Ticket Win Rate',
      value: `${stats.tickets.winRate}%`,
      subtitle: `${stats.tickets.won} ${locale === 'fr' ? 'Gagnés' : 'Won'} / ${stats.tickets.lost} ${locale === 'fr' ? 'Perdus' : 'Lost'}`,
      icon: Percent,
      color: '#F6AE2D',
      href: `/${locale}/admin/betting/tickets`,
      tooltip: 'Win rate across all completed betting tickets (won vs settled).',
    },
    {
      title: locale === 'fr' ? 'Sélections Gagnées' : 'Selections Win Rate',
      value: `${stats.selections.winRate}%`,
      subtitle: `${stats.selections.won} / ${stats.selections.total} ${locale === 'fr' ? 'paris' : 'bets'}`,
      icon: Scale,
      color: '#42A5F5',
      href: `/${locale}/admin/betting/statistics`,
      tooltip: 'Individual match selections won compared to total placed selections.',
    },
  ]

  return (
    <Box sx={{ pb: 6 }}>
      {/* Sub Navbar */}
      <BettingSubNav locale={locale} currentBalance={currentBal} currency={currency} />

      {/* Header Banner */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
            {locale === 'fr' ? 'Centre de Suivi des Paris' : 'Betting Statistical Tracker'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {locale === 'fr'
              ? 'Enregistrement des prédictions ChatGPT, préservation des snapshots statistiques et analyse de performance.'
              : 'Historical ChatGPT predictions registry, statistical snapshot preservation, and calibration analytics.'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Box
            component={Link}
            href={`/${locale}/admin/betting/import`}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2.5,
              py: 1.25,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(242, 100, 25, 0.35)',
              transition: 'all 0.2s ease',
              '&:hover': { opacity: 0.9, transform: 'translateY(-1px)' },
            }}
          >
            <FileCode2 size={18} />
            <span>{locale === 'fr' ? 'Importer Ticket JSON' : 'Import ChatGPT JSON'}</span>
          </Box>
        </Box>
      </Box>

      {/* Metric Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
              <CustomTooltip title={stat.tooltip}>
                <Card
                  component={Link}
                  href={stat.href}
                  sx={{
                    textDecoration: 'none',
                    display: 'block',
                    height: '100%',
                    backgroundColor: alpha('#1E2635', 0.9),
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: stat.color,
                      transform: 'translateY(-3px)',
                      boxShadow: `0 8px 24px ${alpha(stat.color, 0.15)}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                        {stat.title}
                      </Typography>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          backgroundColor: alpha(stat.color, 0.12),
                          color: stat.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={20} />
                      </Box>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {stat.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </CustomTooltip>
            </Grid>
          )
        })}
      </Grid>

      {/* Second Row: Active Model & Selected vs Alternatives Comparison */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Active Model Spotlight */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            sx={{
              height: '100%',
              backgroundColor: alpha('#1E2635', 0.9),
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShieldCheck size={20} color="#F26419" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {locale === 'fr' ? 'Modèle Actif en Cours' : 'Active Model Methodology'}
                  </Typography>
                </Box>
                {activeModel && (
                  <Chip
                    label={`v${activeModel.version}`}
                    size="small"
                    sx={{
                      backgroundColor: alpha('#F26419', 0.15),
                      color: '#F26419',
                      fontWeight: 800,
                      border: '1px solid rgba(242, 100, 25, 0.3)',
                    }}
                  />
                )}
              </Box>

              {activeModel ? (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                    {activeModel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineClamp: 2 }}>
                    {activeModel.description || 'No methodology notes provided.'}
                  </Typography>

                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, p: 2, borderRadius: 2, backgroundColor: alpha('#121824', 0.6), mb: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Tickets</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{activeModel.total_tickets || 0}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Win Rate</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#66BB6A' }}>{activeModel.win_rate || 0}%</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">ROI</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: (activeModel.roi || 0) >= 0 ? '#66BB6A' : '#EF5350' }}>
                        {(activeModel.roi || 0) >= 0 ? '+' : ''}{activeModel.roi || 0}%
                      </Typography>
                    </Box>
                  </Box>

                  <Box component={Link} href={`/${locale}/admin/betting/models/${activeModel.uuid}`} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'primary.main', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    <span>{locale === 'fr' ? 'Voir la méthodologie & calibration' : 'Inspect methodology & calibration'}</span>
                    <ArrowRight size={16} />
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {locale === 'fr' ? 'Aucun modèle actif défini.' : 'No active model found. Visit Models section to register one.'}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Selected vs Alternatives Quick Overview */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card
            sx={{
              height: '100%',
              backgroundColor: alpha('#1E2635', 0.9),
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Scale size={20} color="#F6AE2D" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {locale === 'fr' ? 'Sélections vs Alternatives Rejetées' : 'Selected vs Rejected Alternatives'}
                  </Typography>
                </Box>
                <Chip
                  label={locale === 'fr' ? 'Hypothèse de Sélection' : 'Selection Edge Test'}
                  size="small"
                  sx={{ backgroundColor: alpha('#F6AE2D', 0.15), color: '#F6AE2D', fontWeight: 700 }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                {locale === 'fr'
                  ? 'Vérifie si notre processus de filtrage ajoute de la valeur par rapport aux paris envisagés mais écartés.'
                  : 'Validates whether our selection rationale is outperforming rejected matches that ChatGPT considered.'}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Selected */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      backgroundColor: alpha('#66BB6A', 0.08),
                      border: `1px solid ${alpha('#66BB6A', 0.25)}`,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#66BB6A', mb: 1 }}>
                      {locale === 'fr' ? 'Sélections Retenues' : 'Selected Bets'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">Total / Won:</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {comparison.selected.total} / {comparison.selected.won}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">Win Rate:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#66BB6A' }}>
                        {comparison.selected.winRate}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">Avg Odds:</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {comparison.selected.avgOdds || '—'}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                {/* Alternatives */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      backgroundColor: alpha('#9AA3B2', 0.08),
                      border: `1px solid ${alpha('#9AA3B2', 0.2)}`,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1 }}>
                      {locale === 'fr' ? 'Alternatives Rejetées' : 'Rejected Alternatives'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">Total / Won:</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {comparison.alternatives.total} / {comparison.alternatives.won}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">Win Rate:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                        {comparison.alternatives.winRate}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">Avg Odds:</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {comparison.alternatives.avgOdds || '—'}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Box component={Link} href={`/${locale}/admin/betting/statistics`} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'primary.main', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                <span>{locale === 'fr' ? 'Voir l\'analyse comparative détaillée' : 'View full comparative statistics'}</span>
                <ArrowRight size={16} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Third Row: Recent Tickets Table */}
      <Card
        sx={{
          backgroundColor: alpha('#1E2635', 0.9),
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Receipt size={20} color="#F26419" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {locale === 'fr' ? 'Derniers Tickets Enregistrés' : 'Recent Betting Tickets'}
              </Typography>
            </Box>
            <Box
              component={Link}
              href={`/${locale}/admin/betting/tickets`}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              <span>{locale === 'fr' ? 'Tous les tickets' : 'View all tickets'}</span>
              <ArrowRight size={16} />
            </Box>
          </Box>

          {recentTickets.length === 0 ? (
            <Box sx={{ py: 6, textAlign: 'center' }}>
              <Receipt size={40} color="#9AA3B2" style={{ margin: '0 auto 12px' }} />
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                {locale === 'fr' ? 'Aucun ticket enregistré pour le moment' : 'No betting tickets created yet'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {locale === 'fr'
                  ? 'Collez votre première analyse générée par ChatGPT pour créer un ticket.'
                  : 'Paste your first ChatGPT analysis JSON to create and track a historical ticket.'}
              </Typography>
              <Box
                component={Link}
                href={`/${locale}/admin/betting/import`}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2.5,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                }}
              >
                <FileCode2 size={16} />
                <span>{locale === 'fr' ? 'Importer un Ticket' : 'Import a Ticket'}</span>
              </Box>
            </Box>
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Ticket #</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Model</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Legs</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Combined Odds</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Stake</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>P & L</th>
                    <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTickets.map((t) => {
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
                        <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                          <Link
                            href={`/${locale}/admin/betting/tickets/${t.uuid}`}
                            style={{ color: '#F26419', textDecoration: 'none' }}
                          >
                            {t.ticket_number ? `#${t.ticket_number}` : `#${t.id}`}
                          </Link>
                        </td>
                        <td style={{ padding: '14px 16px', color: '#9AA3B2', fontSize: '0.875rem' }}>
                          {t.ticket_date}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
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
                        <td style={{ padding: '14px 16px', fontSize: '0.875rem' }}>
                          {t.betting_selections?.length || 0} legs
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: '0.875rem' }}>
                          {t.combined_odds ? Number(t.combined_odds).toFixed(2) : '—'}
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: '0.875rem' }}>
                          {formatCurrency(t.stake, currency)}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
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
                        <td style={{ padding: '14px 16px', fontWeight: 800, fontSize: '0.875rem', color: Number(t.profit_loss) >= 0 ? '#66BB6A' : '#EF5350' }}>
                          {t.status === 'pending'
                            ? '—'
                            : formatCurrencySign(t.profit_loss, currency)}
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <Link
                            href={`/${locale}/admin/betting/tickets/${t.uuid}`}
                            style={{
                              color: '#F26419',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              textDecoration: 'none',
                            }}
                          >
                            {locale === 'fr' ? 'Détails' : 'View'} &rarr;
                          </Link>
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
    </Box>
  )
}
