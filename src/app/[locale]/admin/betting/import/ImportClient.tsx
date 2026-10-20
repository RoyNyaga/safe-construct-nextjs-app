'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Chip,
  Paper,
  alpha,
  Divider,
} from '@mui/material'
import {
  FileCode2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Send,
  Sparkles,
  Info,
} from 'lucide-react'
import { TicketImportJSON } from '@/types/betting'
import { importBettingTicket } from '@/app/[locale]/actions/betting'
import { CustomNotification, CustomTooltip } from '@/components/ui'
import CustomButton from '@/components/ui/CustomButton'
import { LoadingButton } from '@/components/ui/PromptButtons'

const SAMPLE_CHATGPT_JSON: TicketImportJSON = {
  ticket: {
    ticket_number: '001',
    date: new Date().toISOString().split('T')[0],
    model_version: '1.0',
    stake: 100,
    combined_odds: 2.1736,
    estimated_ticket_probability: 0.49,
    status: 'pending',
    notes: 'Two-leg statistical ticket based on our Poisson goal-rate model.',
  },
  selections: [
    {
      match_date: new Date().toISOString().split('T')[0],
      league: 'La Liga',
      home_team: 'Getafe',
      away_team: 'Rayo Vallecano',
      home_league_position: 14,
      away_league_position: 13,
      home_goals_scored: 4,
      home_goals_conceded: 10,
      away_goals_scored: 11,
      away_goals_conceded: 16,
      home_goals_per_game: 0.5,
      home_conceded_per_game: 1.25,
      away_goals_per_game: 1.375,
      away_conceded_per_game: 2.0,
      market: 'Over/Under',
      selection: 'Over 1.5',
      odds: 1.52,
      estimated_probability: 0.723,
      breakeven_probability: 0.658,
      edge_percentage_points: 6.5,
      expected_value: 0.099,
      comment: 'Strongest goal-market candidate; model probability comfortably above break-even.',
    },
    {
      match_date: new Date().toISOString().split('T')[0],
      league: 'Serie A',
      home_team: 'Parma',
      away_team: 'Torino',
      home_league_position: 15,
      away_league_position: 9,
      home_goals_scored: 11,
      home_goals_conceded: 14,
      away_goals_scored: 14,
      away_goals_conceded: 14,
      home_goals_per_game: 1.375,
      home_conceded_per_game: 1.75,
      away_goals_per_game: 1.75,
      away_conceded_per_game: 1.75,
      market: 'Over/Under',
      selection: 'Over 1.5',
      odds: 1.43,
      estimated_probability: 0.755,
      breakeven_probability: 0.699,
      edge_percentage_points: 5.6,
      expected_value: 0.08,
      comment: 'Both teams profiling over 3.0 match expected goals; high probability buffer.',
    },
  ],
  alternatives: [
    {
      match_date: new Date().toISOString().split('T')[0],
      league: 'Primeira Liga',
      home_team: 'Braga',
      away_team: 'Gil Vicente',
      market: 'Over/Under',
      selection: 'Over 2.5',
      odds: 2.02,
      estimated_probability: 0.508,
      breakeven_probability: 0.495,
      edge_percentage_points: 1.3,
      expected_value: 0.026,
      comment: 'Positive value but lower confidence than the selected matches.',
    },
    {
      match_date: new Date().toISOString().split('T')[0],
      league: 'Serie A',
      home_team: 'Monza',
      away_team: 'Cagliari',
      market: 'Over/Under',
      selection: 'Over 1.5',
      odds: 1.36,
      estimated_probability: 0.702,
      breakeven_probability: 0.735,
      edge_percentage_points: -3.3,
      expected_value: -0.045,
      comment: 'Rejected because bookmaker odds offered negative expected value.',
    },
  ],
}

interface ImportClientProps {
  locale: string
}

export default function ImportClient({ locale }: ImportClientProps) {
  const router = useRouter()
  const [jsonText, setJsonText] = useState('')
  const [parsedPayload, setParsedPayload] = useState<TicketImportJSON | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({ open: false, message: '', type: 'info' })

  // Validate JSON string
  const handleValidate = () => {
    setParseError(null)
    setParsedPayload(null)

    if (!jsonText.trim()) {
      setParseError(locale === 'fr' ? 'Veuillez coller le JSON généré par ChatGPT.' : 'Please paste the ChatGPT JSON.')
      return
    }

    try {
      const obj = JSON.parse(jsonText)

      // Basic structure validation
      if (!obj.ticket) {
        throw new Error('Missing "ticket" root object in JSON.')
      }
      if (!Array.isArray(obj.selections) || obj.selections.length === 0) {
        throw new Error('Ticket must contain at least one selection in the "selections" array.')
      }

      setParsedPayload(obj as TicketImportJSON)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'JSON validé avec succès ! Consultez l\'aperçu ci-dessous.' : 'JSON successfully validated! Review preview below.',
        type: 'success',
      })
    } catch (err: any) {
      setParseError(err.message || 'Malformed JSON syntax')
      setNotification({
        open: true,
        message: err.message || 'JSON Parse Error',
        type: 'error',
      })
    }
  }

  // Load Sample JSON
  const handleLoadSample = () => {
    setJsonText(JSON.stringify(SAMPLE_CHATGPT_JSON, null, 2))
    setParseError(null)
    setParsedPayload(SAMPLE_CHATGPT_JSON)
  }

  // Clear & Reset
  const handleReset = () => {
    setJsonText('')
    setParsedPayload(null)
    setParseError(null)
  }

  // Submit and create ticket
  const handleSubmit = async () => {
    if (!parsedPayload) return

    setIsSubmitting(true)
    const res = await importBettingTicket(parsedPayload)
    setIsSubmitting(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else if (res.ticketUuid) {
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Ticket créé avec succès ! Redirection...' : 'Ticket created successfully! Redirecting...',
        type: 'success',
      })
      setTimeout(() => {
        router.push(`/${locale}/admin/betting/tickets/${res.ticketUuid}`)
      }, 1000)
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

      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
          {locale === 'fr' ? 'Importer un Ticket ChatGPT' : 'Import ChatGPT Ticket'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {locale === 'fr'
            ? 'Collez la structure JSON générée par votre méthodologie ChatGPT. Le ticket et son snapshot statistique seront préservés dans leur état d\'origine.'
            : 'Paste the JSON structure generated by your ChatGPT methodology. The ticket and its statistical snapshot will be preserved in their exact historical state.'}
        </Typography>
      </Box>

      {/* Main Form Card */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Action Bar */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FileCode2 size={20} color="#F26419" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {locale === 'fr' ? 'Contenu JSON' : 'JSON Payload'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <CustomButton
                size="small"
                variant="outlined"
                onClick={handleLoadSample}
                startIcon={<Sparkles size={16} />}
                sx={{ fontSize: '0.8rem', textTransform: 'none' }}
              >
                {locale === 'fr' ? 'Exemple Démo' : 'Load Sample JSON'}
              </CustomButton>

              <CustomButton
                size="small"
                variant="outlined"
                onClick={handleReset}
                startIcon={<Trash2 size={16} />}
                sx={{ fontSize: '0.8rem', textTransform: 'none', color: 'text.secondary' }}
              >
                {locale === 'fr' ? 'Réinitialiser' : 'Clear'}
              </CustomButton>
            </Box>
          </Box>

          {/* JSON Textarea */}
          <TextField
            fullWidth
            multiline
            rows={14}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder={`{\n  "ticket": {\n    "ticket_number": "001",\n    "date": "2026-10-20",\n    "model_version": "1.0",\n    "stake": 100,\n    "combined_odds": 2.17\n  },\n  "selections": [ ... ],\n  "alternatives": [ ... ]\n}`}
            slotProps={{
              input: {
                sx: {
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  backgroundColor: alpha('#121824', 0.8),
                },
              },
            }}
          />

          {parseError && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, color: 'error.main' }}>
              <AlertCircle size={18} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {parseError}
              </Typography>
            </Box>
          )}

          {/* Bottom Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, flexWrap: 'wrap', gap: 2 }}>
            <CustomButton
              variant="contained"
              onClick={handleValidate}
              startIcon={<Eye size={18} />}
              sx={{
                background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                px: 3,
              }}
            >
              {locale === 'fr' ? 'Valider et Prévisualiser' : 'Validate & Preview'}
            </CustomButton>

            {parsedPayload && (
              <LoadingButton
                variant="contained"
                loading={isSubmitting}
                onClick={handleSubmit}
                startIcon={<Send size={18} />}
                sx={{
                  backgroundColor: '#66BB6A',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  px: 4,
                  boxShadow: '0 4px 14px rgba(102, 187, 106, 0.35)',
                  '&:hover': { backgroundColor: '#43A047' },
                }}
              >
                {locale === 'fr' ? 'Créer le Ticket Définitivement' : 'Create & Save Ticket'}
              </LoadingButton>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* ─── LIVE PREVIEW SECTION ──────────────────────────────────────────── */}
      {parsedPayload && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CheckCircle2 size={20} color="#66BB6A" />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {locale === 'fr' ? 'Aperçu du Ticket' : 'Ticket Preview'}
            </Typography>
          </Box>

          {/* Ticket Header Metadata */}
          <Card
            sx={{
              mb: 3,
              backgroundColor: alpha('#1E2635', 0.9),
              border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="caption" color="text.secondary">Ticket #</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {parsedPayload.ticket.ticket_number ? `#${parsedPayload.ticket.ticket_number}` : 'Auto-assigned'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="caption" color="text.secondary">Date</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {parsedPayload.ticket.date || 'Today'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="caption" color="text.secondary">Model Version</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#F6AE2D' }}>
                    v{parsedPayload.ticket.model_version || '1.0'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="caption" color="text.secondary">Stake & Odds</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    ${parsedPayload.ticket.stake || 0} @ {parsedPayload.ticket.combined_odds ? Number(parsedPayload.ticket.combined_odds).toFixed(2) : '—'}
                  </Typography>
                </Grid>
              </Grid>

              {parsedPayload.ticket.notes && (
                <Box sx={{ mt: 2, pt: 2, borderTop: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}` }}>
                  <Typography variant="caption" color="text.secondary">Notes:</Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 0.25 }}>
                    "{parsedPayload.ticket.notes}"
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Selected Selections Table */}
          <Card
            sx={{
              mb: 3,
              backgroundColor: alpha('#1E2635', 0.9),
              border: `1px solid ${alpha('#66BB6A', 0.3)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#66BB6A' }}>
                    {locale === 'fr' ? 'Paris Retenus (Selections)' : 'Selected Bets (Selections)'}
                  </Typography>
                  <Chip label={`${parsedPayload.selections.length} legs`} size="small" sx={{ backgroundColor: alpha('#66BB6A', 0.15), color: '#66BB6A', fontWeight: 800 }} />
                </Box>
              </Box>

              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                      <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Match</th>
                      <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>League</th>
                      <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Market & Pick</th>
                      <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Odds</th>
                      <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Est. Prob</th>
                      <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Edge</th>
                      <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>EV</th>
                      <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>GF/GA Snapshot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedPayload.selections.map((sel, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 700 }}>
                          {sel.home_team} <span style={{ color: '#9AA3B2' }}>vs</span> {sel.away_team}
                        </td>
                        <td style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.85rem' }}>{sel.league || '—'}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <Chip label={`${sel.market}: ${sel.selection}`} size="small" sx={{ backgroundColor: alpha('#F26419', 0.15), color: '#F26419', fontWeight: 700 }} />
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: 700 }}>{sel.odds ? Number(sel.odds).toFixed(2) : '—'}</td>
                        <td style={{ padding: '12px 14px', color: '#66BB6A', fontWeight: 700 }}>
                          {sel.estimated_probability ? `${(Number(sel.estimated_probability) * 100).toFixed(1)}%` : '—'}
                        </td>
                        <td style={{ padding: '12px 14px', color: (sel.edge_percentage_points || 0) >= 0 ? '#66BB6A' : '#EF5350', fontWeight: 700 }}>
                          {sel.edge_percentage_points !== undefined ? `+${sel.edge_percentage_points}%` : '—'}
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: 700 }}>
                          {sel.expected_value !== undefined ? (Number(sel.expected_value) >= 0 ? `+${sel.expected_value}` : `${sel.expected_value}`) : '—'}
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '0.75rem', color: '#9AA3B2' }}>
                          H: {sel.home_goals_scored ?? '—'}/{sel.home_goals_conceded ?? '—'} | A: {sel.away_goals_scored ?? '—'}/{sel.away_goals_conceded ?? '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>

          {/* Alternatives Table */}
          {parsedPayload.alternatives && parsedPayload.alternatives.length > 0 && (
            <Card
              sx={{
                backgroundColor: alpha('#1E2635', 0.9),
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                    {locale === 'fr' ? 'Alternatives Rejetées (Non Retenues)' : 'Considered Alternatives (Rejected)'}
                  </Typography>
                  <Chip label={`${parsedPayload.alternatives.length} matches`} size="small" sx={{ backgroundColor: alpha('#9AA3B2', 0.15) }} />
                </Box>

                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                        <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Match</th>
                        <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Market</th>
                        <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Odds</th>
                        <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Est. Prob</th>
                        <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Rejection Reason / Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsedPayload.alternatives.map((alt, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                          <td style={{ padding: '12px 14px', fontWeight: 600, color: 'text.secondary' }}>
                            {alt.home_team} vs {alt.away_team}
                          </td>
                          <td style={{ padding: '12px 14px', color: 'text.secondary', fontSize: '0.85rem' }}>
                            {alt.market}: {alt.selection}
                          </td>
                          <td style={{ padding: '12px 14px', fontSize: '0.85rem' }}>{alt.odds ? Number(alt.odds).toFixed(2) : '—'}</td>
                          <td style={{ padding: '12px 14px', fontSize: '0.85rem' }}>
                            {alt.estimated_probability ? `${(Number(alt.estimated_probability) * 100).toFixed(1)}%` : '—'}
                          </td>
                          <td style={{ padding: '12px 14px', fontSize: '0.8rem', color: '#9AA3B2', fontStyle: 'italic' }}>
                            {alt.comment || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
    </Box>
  )
}
