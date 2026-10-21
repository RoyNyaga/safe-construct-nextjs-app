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
  MenuItem,
  Select,
  FormControl,
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
  Copy,
} from 'lucide-react'
import { TicketImportJSON, BettingModel } from '@/types/betting'
import { importBettingTicket } from '@/app/[locale]/actions/betting'
import { CustomNotification, CustomTooltip } from '@/components/ui'
import CustomButton from '@/components/ui/CustomButton'
import { LoadingButton } from '@/components/ui/PromptButtons'
import { formatCurrency } from '@/utils/bettingCurrency'

const SAMPLE_CHATGPT_JSON: TicketImportJSON = {
  ticket: {
    ticket_number: '001',
    date: '2026-10-20',
    model_version: '1.0',
    stake: 100,
    combined_odds: 2.28,
    estimated_ticket_probability: 0.491,
    status: 'pending',
    notes: 'Two-leg statistical ticket based on our Poisson goal-rate model. Selected goal markets prioritize estimated probability above bookmaker break-even and positive expected value.',
  },
  selections: [
    {
      match_date: '2026-10-20',
      country: 'England',
      league: 'League One',
      home_team: 'Bromley',
      away_team: 'Leicester City',
      market: 'Over/Under',
      selection: 'Under 3.5',
      odds: 1.57,
      estimated_probability: 0.675,
      breakeven_probability: 0.637,
      edge_percentage_points: 3.8,
      expected_value: 0.06,
      comment: 'Selected because the statistical goal profile supports four or more goals being relatively unlikely. The estimated probability is above bookmaker break-even, providing a positive but modest value edge.',
    },
    {
      match_date: '2026-10-20',
      country: 'Colombia',
      league: 'Primera B',
      home_team: 'Tigres FC',
      away_team: 'Real Cundinamarca',
      market: 'Over/Under',
      selection: 'Under 2.5',
      odds: 1.45,
      estimated_probability: 0.728,
      breakeven_probability: 0.690,
      edge_percentage_points: 3.8,
      expected_value: 0.056,
      comment: 'Selected because both the home/away goal profile and recent league scoring pattern support a low-scoring match. Model probability is above bookmaker break-even.',
    },
  ],
  alternatives: [
    {
      match_date: '2026-10-20',
      country: 'Portugal',
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
  ],
}

interface ImportClientProps {
  locale: string
  models?: BettingModel[]
  currency?: string
}

export default function ImportClient({ locale, models = [], currency = 'FCFA' }: ImportClientProps) {
  const router = useRouter()
  const [jsonText, setJsonText] = useState('')
  const [parsedPayload, setParsedPayload] = useState<TicketImportJSON | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedModelUuid, setSelectedModelUuid] = useState<string>('')

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

      // Resolve matching model UUID
      const match =
        models.find((m) => m.uuid === obj.ticket?.model_uuid) ||
        models.find((m) => m.version === obj.ticket?.model_version) ||
        models.find((m) => m.is_active) ||
        models[0]
      if (match) {
        setSelectedModelUuid(match.uuid)
      }

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

    const match =
      models.find((m) => m.uuid === SAMPLE_CHATGPT_JSON.ticket.model_uuid) ||
      models.find((m) => m.version === SAMPLE_CHATGPT_JSON.ticket.model_version) ||
      models.find((m) => m.is_active) ||
      models[0]
    if (match) {
      setSelectedModelUuid(match.uuid)
    }
  }

  // Copy ChatGPT prompt template with country instruction
  const handleCopyPromptTemplate = () => {
    const template = `Analyze today's football fixtures using our statistical betting model and generate the betting ticket.

CRITICAL INSTRUCTIONS:
1. Output MUST be ONLY a single valid JSON object adhering to the schema below.
2. Country of League: Because leagues in different countries often share similar names (e.g. League One, Primera B, Premier League), you MUST specify the "country" field for each match in both "selections" and "alternatives".
3. Use the exact JSON format below:

${JSON.stringify(SAMPLE_CHATGPT_JSON, null, 2)}`

    navigator.clipboard.writeText(template)
    setNotification({
      open: true,
      message:
        locale === 'fr'
          ? 'Modèle de prompt ChatGPT copié avec instructions pour le pays !'
          : 'ChatGPT prompt template copied with country instructions! Paste it into ChatGPT.',
      type: 'success',
    })
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

    // Ensure target model UUID is explicitly linked
    const finalPayload: TicketImportJSON = {
      ...parsedPayload,
      ticket: {
        ...parsedPayload.ticket,
        ...(selectedModelUuid ? { model_uuid: selectedModelUuid } : {}),
      },
    }

    const res = await importBettingTicket(finalPayload)
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

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <CustomButton
                size="small"
                variant="outlined"
                onClick={handleCopyPromptTemplate}
                startIcon={<Copy size={16} />}
                sx={{
                  fontSize: '0.8rem',
                  textTransform: 'none',
                  borderColor: alpha('#F26419', 0.5),
                  color: '#F26419',
                  '&:hover': { borderColor: '#F26419', backgroundColor: alpha('#F26419', 0.08) },
                }}
              >
                {locale === 'fr' ? 'Copier le Prompt ChatGPT' : 'Copy ChatGPT Prompt'}
              </CustomButton>

              <CustomButton
                size="small"
                variant="outlined"
                onClick={handleLoadSample}
                startIcon={<Sparkles size={16} />}
                sx={{ fontSize: '0.8rem', textTransform: 'none' }}
              >
                {locale === 'fr' ? 'Charger Exemple' : 'Load Sample JSON'}
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
            placeholder={`{\n  "ticket": {\n    "ticket_number": "001",\n    "date": "2026-10-20",\n    "model_version": "1.0",\n    "stake": 100,\n    "combined_odds": 2.28\n  },\n  "selections": [\n    {\n      "match_date": "2026-10-20",\n      "country": "England",\n      "league": "League One",\n      "home_team": "Bromley",\n      "away_team": "Leicester City",\n      "market": "Over/Under",\n      "selection": "Under 3.5",\n      "odds": 1.57\n    }\n  ],\n  "alternatives": []\n}`}
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
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    {locale === 'fr' ? 'Modèle Statistique Associé' : 'Associated Model'}
                  </Typography>
                  {models.length > 0 ? (
                    <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
                      <Select
                        value={selectedModelUuid}
                        onChange={(e) => setSelectedModelUuid(e.target.value)}
                        sx={{
                          backgroundColor: alpha('#121824', 0.8),
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: '#F6AE2D',
                          borderRadius: 1.5,
                        }}
                      >
                        {models.map((m) => (
                          <MenuItem key={m.uuid} value={m.uuid} sx={{ fontSize: '0.85rem' }}>
                            v{m.version} - {m.name} {m.is_active ? `(${locale === 'fr' ? 'Actif' : 'Active'})` : ''}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#F6AE2D' }}>
                      v{parsedPayload.ticket.model_version || '1.0'}
                    </Typography>
                  )}
                </Grid>
                <Grid size={{ xs: 6, sm: 2.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {locale === 'fr' ? 'Mise & Cote Globale' : 'Stake & Odds'}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {formatCurrency(parsedPayload.ticket.stake || 0, currency)} @ {parsedPayload.ticket.combined_odds ? Number(parsedPayload.ticket.combined_odds).toFixed(2) : '—'}
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
                        <td style={{ padding: '12px 14px', color: '#9AA3B2', fontSize: '0.85rem' }}>
                          {sel.country ? (
                            <span style={{ color: '#F0F2F5', fontWeight: 600 }}>{sel.country} &bull; </span>
                          ) : null}
                          {sel.league || '—'}
                        </td>
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
                            <div>{alt.home_team} vs {alt.away_team}</div>
                            {(alt.country || alt.league) && (
                              <div style={{ fontSize: '0.75rem', color: '#9AA3B2', marginTop: 2 }}>
                                {alt.country ? `${alt.country} • ` : ''}{alt.league || ''}
                              </div>
                            )}
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
