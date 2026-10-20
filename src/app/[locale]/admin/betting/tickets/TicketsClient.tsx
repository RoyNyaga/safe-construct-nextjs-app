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
} from 'lucide-react'
import { BettingTicket, BettingModel } from '@/types/betting'
import { CustomTooltip } from '@/components/ui'
import CustomButton from '@/components/ui/CustomButton'
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
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [modelFilter, setModelFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filteredTickets = initialTickets.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    if (modelFilter !== 'all' && t.model_id?.toString() !== modelFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const matchNum = (t.ticket_number || '').toLowerCase().includes(q)
      const matchNotes = (t.notes || '').toLowerCase().includes(q)
      const matchTeam = (t.betting_selections || []).some(
        (s) => s.home_team.toLowerCase().includes(q) || s.away_team.toLowerCase().includes(q)
      )
      return matchNum || matchNotes || matchTeam
    }
    return true
  })

  return (
    <Box>
      {/* Header & Controls */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {locale === 'fr' ? 'Tickets de Paris' : 'Betting Tickets'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {locale === 'fr'
              ? 'Tous les tickets historiques et leurs sélections avec les résultats effectifs et snapshots de prédiction.'
              : 'Historical tickets registry preserving pre-match probability predictions alongside match outcomes.'}
          </Typography>
        </Box>

        <Box component={Link} href={`/${locale}/admin/betting/import`} sx={{ textDecoration: 'none' }}>
          <CustomButton
            variant="contained"
            startIcon={<PlusCircle size={18} />}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
            }}
          >
            {locale === 'fr' ? 'Créer un Ticket' : 'Import New Ticket'}
          </CustomButton>
        </Box>
      </Box>

      {/* Filter Toolbar */}
      <Card
        sx={{
          mb: 3,
          backgroundColor: alpha('#1E2635', 0.9),
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
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
              <Tab label={locale === 'fr' ? 'En Cours' : 'Pending'} value="pending" />
              <Tab label={locale === 'fr' ? 'Gagnés' : 'Won'} value="won" />
              <Tab label={locale === 'fr' ? 'Perdus' : 'Lost'} value="lost" />
              <Tab label={locale === 'fr' ? 'Annulés' : 'Void'} value="void" />
            </Tabs>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              {/* Model Select */}
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel sx={{ fontSize: '0.85rem' }}>Model</InputLabel>
                <Select
                  value={modelFilter}
                  label="Model"
                  onChange={(e) => setModelFilter(e.target.value)}
                  sx={{ fontSize: '0.85rem' }}
                >
                  <MenuItem value="all">All Models</MenuItem>
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
                placeholder={locale === 'fr' ? 'Rechercher équipe ou ticket...' : 'Search team, ticket #...'}
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
                    <th style={{ padding: '14px 18px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, textAlign: 'right' }}>Action</th>
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
