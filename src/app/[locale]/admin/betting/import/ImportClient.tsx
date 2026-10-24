'use client'

import { useState, useMemo } from 'react'
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
  InputAdornment,
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
  AlertTriangle,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Brain,
  FileText,
  Scale,
} from 'lucide-react'
import { TicketImportJSON, BettingModel } from '@/types/betting'
import { importBettingTicket } from '@/app/[locale]/actions/betting'
import { CustomNotification, CustomTooltip, CustomDrawer } from '@/components/ui'
import CustomButton from '@/components/ui/CustomButton'
import { LoadingButton } from '@/components/ui/PromptButtons'
import { formatCurrency } from '@/utils/bettingCurrency'

function generateSamplePayload(activeModel?: BettingModel | null): TicketImportJSON {
  const modelVersion = activeModel?.version || '2.1'
  const modelName = activeModel?.name || 'roys_betting_engine_over_1_5_goals'

  return {
    ticket: {
      ticket_number: '001',
      date: '2026-10-20',
      model_version: modelVersion,
      ...(activeModel?.uuid ? { model_uuid: activeModel.uuid } : {}),
      model_name: modelName,
      stake: 100,
      combined_odds: 2.28,
      estimated_ticket_probability: 0.491,
      status: 'pending',
      actual_result: null,
      profit_loss: 0,
      notes: `Two-leg statistical ticket based on our ${modelName}. Selected goal markets prioritize estimated probability above bookmaker break-even and positive expected value.`,
    },
    selections: [
      {
        match_date: '2026-10-20',
        country: 'England',
        league: 'League One',
        home_team: 'Bromley',
        away_team: 'Leicester City',
        home_league_position: 8,
        away_league_position: 2,
        home_matches_played: 15,
        away_matches_played: 16,
        home_goals_scored: 24,
        home_goals_conceded: 18,
        away_goals_scored: 38,
        away_goals_conceded: 15,
        home_goals_per_game: 1.6,
        home_conceded_per_game: 1.2,
        away_goals_per_game: 2.38,
        away_conceded_per_game: 0.94,
        market: 'Over/Under',
        selection: 'Under 3.5',
        odds: 1.57,
        estimated_probability: 0.675,
        breakeven_probability: 0.637,
        edge_percentage_points: 3.8,
        expected_value: 0.06,
        actual_home_score: null,
        actual_away_score: null,
        result: 'pending',
        comment: 'Selected because the statistical goal profile supports four or more goals being relatively unlikely. The estimated probability is above bookmaker break-even, providing a positive but modest value edge.',
        notes: 'Pre-match team news: both sides starting defensive midfield pivots. Weather conditions dry.',
        warnings: [
          {
            type: 'Defensive Midfield Pivot',
            severity: 'MEDIUM',
            direction: 'SUPPORTIVE',
            market_relevance: 'DIRECT',
            description: 'Both sides starting defensive midfield pivots, lowering probability of high-scoring volatility.',
            evidence: 'Lineups confirmed 2 defensive CDMs each; tactical analysis indicates conservative initial phase.',
          },
        ],
      },
      {
        match_date: '2026-10-20',
        country: 'Colombia',
        league: 'Primera B',
        home_team: 'Tigres FC',
        away_team: 'Real Cundinamarca',
        home_league_position: 12,
        away_league_position: 6,
        home_matches_played: 13,
        away_matches_played: 13,
        home_goals_scored: 14,
        home_goals_conceded: 16,
        away_goals_scored: 19,
        away_goals_conceded: 15,
        home_goals_per_game: 1.08,
        home_conceded_per_game: 1.23,
        away_goals_per_game: 1.46,
        away_conceded_per_game: 1.15,
        market: 'Over/Under',
        selection: 'Under 2.5',
        odds: 1.45,
        estimated_probability: 0.728,
        breakeven_probability: 0.69,
        edge_percentage_points: 3.8,
        expected_value: 0.056,
        actual_home_score: null,
        actual_away_score: null,
        result: 'pending',
        comment: 'Selected because both the home/away goal profile and recent league scoring pattern support a low-scoring match. Model probability is above bookmaker break-even.',
        notes: 'Low scoring rate in head-to-head fixtures across recent seasons.',
      },
    ],
    alternatives: [
      {
        match_date: '2026-10-20',
        country: 'Portugal',
        league: 'Primeira Liga',
        home_team: 'Braga',
        away_team: 'Gil Vicente',
        home_matches_played: 7,
        away_matches_played: 8,
        market: 'Over/Under',
        selection: 'Over 2.5',
        odds: 2.02,
        estimated_probability: 0.508,
        breakeven_probability: 0.495,
        edge_percentage_points: 1.3,
        expected_value: 0.026,
        actual_home_score: null,
        actual_away_score: null,
        result: 'pending',
        comment: 'Positive value but lower confidence than the selected matches.',
        notes: 'Rejected due to high variance in Gil Vicente away defensive discipline.',
        warnings: [
          {
            type: 'Low-Volume Sample',
            severity: 'MEDIUM',
            direction: 'CONTRADICTORY',
            market_relevance: 'CONTEXTUAL',
            description: 'Only 7-8 matches played in the Portuguese Primeira Liga so far; sample variance remains elevated.',
            evidence: 'Portuguese season has only completed 7 matchdays; statistical sample size is below our 10-match stability threshold.',
          },
        ],
      },
    ],
  }
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
  const [snapshotSelection, setSnapshotSelection] = useState<TicketImportJSON['selections'][number] | null>(null)
  const [snapshotAlternative, setSnapshotAlternative] = useState<NonNullable<TicketImportJSON['alternatives']>[number] | null>(null)

  // Group warnings per match for the import preview
  const groupedDetectedWarnings = useMemo(() => {
    if (!parsedPayload) return []
    const groups: Array<{
      key: string
      target: string
      targetType: 'selection' | 'alternative' | 'ticket'
      country?: string | null
      league?: string | null
      market?: string | null
      selection?: string | null
      odds?: number | null
      warnings: Array<{
        type: string
        severity: string
        direction: string
        description: string
        evidence?: string | null
      }>
    }> = []

    // 1. From selections
    ;(parsedPayload.selections || []).forEach((s, idx) => {
      if (s.warnings && Array.isArray(s.warnings) && s.warnings.length > 0) {
        groups.push({
          key: `sel-${idx}`,
          target: `${s.home_team} vs ${s.away_team}`,
          targetType: 'selection',
          country: s.country,
          league: s.league,
          market: s.market,
          selection: s.selection,
          odds: s.odds ? Number(s.odds) : null,
          warnings: s.warnings.map((w) => ({
            type: w.type,
            severity: (w.severity || 'MEDIUM').toUpperCase(),
            direction: (w.direction || 'CONTRADICTORY').toUpperCase(),
            description: w.description,
            evidence: w.evidence,
          })),
        })
      }
    })

    // 2. From alternatives
    ;(parsedPayload.alternatives || []).forEach((a, idx) => {
      if (a.warnings && Array.isArray(a.warnings) && a.warnings.length > 0) {
        groups.push({
          key: `alt-${idx}`,
          target: `${a.home_team} vs ${a.away_team}`,
          targetType: 'alternative',
          country: a.country,
          league: a.league,
          market: a.market,
          selection: a.selection,
          odds: a.odds ? Number(a.odds) : null,
          warnings: a.warnings.map((w) => ({
            type: w.type,
            severity: (w.severity || 'MEDIUM').toUpperCase(),
            direction: (w.direction || 'CONTRADICTORY').toUpperCase(),
            description: w.description,
            evidence: w.evidence,
          })),
        })
      }
    })

    // 3. From legacy top-level warnings (for backward compatibility)
    if (parsedPayload.warnings && Array.isArray(parsedPayload.warnings) && parsedPayload.warnings.length > 0) {
      const legacyMap = new Map<string, typeof groups[0]>()
      parsedPayload.warnings.forEach((w) => {
        const target = w.selection_reference
          ? `${w.selection_reference.home_team} vs ${w.selection_reference.away_team}`
          : 'Ticket Scope'
        const targetType = (w.selection_reference?.target_type || 'ticket') as any

        if (!legacyMap.has(target)) {
          legacyMap.set(target, {
            key: `legacy-${target}`,
            target,
            targetType,
            warnings: [],
          })
        }
        legacyMap.get(target)!.warnings.push({
          type: w.type,
          severity: (w.severity || 'MEDIUM').toUpperCase(),
          direction: (w.direction || 'CONTRADICTORY').toUpperCase(),
          description: w.description,
          evidence: w.evidence,
        })
      })
      groups.push(...Array.from(legacyMap.values()))
    }

    return groups
  }, [parsedPayload])

  const totalWarningsCount = useMemo(() => {
    return groupedDetectedWarnings.reduce((acc, g) => acc + g.warnings.length, 0)
  }, [groupedDetectedWarnings])

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

      // Check for mandatory estimated_probability in selections
      for (const sel of obj.selections) {
        if (sel.estimated_probability === undefined || sel.estimated_probability === null) {
          throw new Error(
            locale === 'fr'
              ? `La sélection "${sel.home_team || 'Inconnue'} vs ${sel.away_team || 'Inconnue'}" ne contient pas "estimated_probability". Cette valeur est obligatoire pour Roy's Betting Engine.`
              : `Selection "${sel.home_team || 'Unknown'} vs ${sel.away_team || 'Unknown'}" is missing "estimated_probability". This attribute is mandatory for Roy's Betting Engine.`
          )
        }
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

  const activeModel = useMemo(() => {
    return models.find((m) => m.is_active) || models[0] || null
  }, [models])

  const sampleJson = useMemo(() => {
    return generateSamplePayload(activeModel)
  }, [activeModel])

  // Load Sample JSON
  const handleLoadSample = () => {
    setJsonText(JSON.stringify(sampleJson, null, 2))
    setParseError(null)
    setParsedPayload(sampleJson)

    if (activeModel) {
      setSelectedModelUuid(activeModel.uuid)
    }
  }

  // Copy ChatGPT prompt template with country, active model, and statistical snapshot instructions
  const handleCopyPromptTemplate = () => {
    const activeVersion = activeModel?.version || '2.1'
    const activeName = activeModel?.name || 'roys_betting_engine_over_1_5_goals'
    const template = `Analyze today's football fixtures using our statistical betting model (${activeName} v${activeVersion}) and generate the betting ticket.

CRITICAL INSTRUCTIONS:
1. Output MUST be ONLY a single valid JSON object adhering strictly to the schema below. Do not include markdown preamble, conversational text, or commentary outside the JSON.
2. Active Model Version: Specify "model_version": "${activeVersion}"${activeModel?.uuid ? ` (or "model_uuid": "${activeModel.uuid}")` : ''} and "model_name": "${activeName}".
3. Country of League: Because leagues in different countries often share similar names (e.g. League One, Primera B, Premier League), you MUST specify the "country" field for each match in both "selections" and "alternatives".

4. MANDATORY BETTING ENGINE PROBABILITY & VALUE ATTRIBUTES (CRITICAL - DO NOT OMIT):
   Roy's Betting Engine is fundamentally driven by model probability and mathematical expected value. For EVERY match in "selections" AND "alternatives", you MUST compute and include:
   - "estimated_probability": The model's estimated win probability expressed as a decimal between 0.000 and 1.000 (e.g., 0.675 for 67.5%). Under NO circumstances should this be omitted; any selection or alternative lacking this probability is invalid and will be rejected.
   - "odds": Current decimal bookmaker odds for the selection (e.g., 1.57).
   - "breakeven_probability": Implied bookmaker break-even probability = 1 / odds, as a decimal (e.g., 1 / 1.57 = 0.637).
   - "edge_percentage_points": Value edge in percentage points = (estimated_probability - breakeven_probability) * 100 (e.g., +3.8).
   - "expected_value": Expected value = (estimated_probability * odds) - 1 (e.g., (0.675 * 1.57) - 1 = +0.060).

5. TICKET-LEVEL AGGREGATE PROBABILITY & FINANCIALS:
   In the root "ticket" object, you MUST specify:
   - "combined_odds": Product of the odds of all selected legs (e.g., 1.57 * 1.45 = 2.28).
   - "estimated_ticket_probability": Product of "estimated_probability" across all selected legs (e.g., 0.675 * 0.728 = 0.491).
   - "stake": The stake allocated to the ticket (e.g., 100).
   - "notes": High-level rationale explaining the ticket's statistical thesis and model version.

6. PRE-MATCH STATISTICAL SNAPSHOT (MANDATORY FOR EVERY SELECTION):
   Every selection MUST include a complete statistical baseline to preserve the pre-match historical record:
   - "home_league_position" & "away_league_position": Current table ranks (e.g., 8, 2).
   - "home_matches_played" & "away_matches_played": Total league games played to date (e.g., 15, 16 - accounts for games in hand and unequal fixture schedules).
   - "home_goals_scored" & "home_goals_conceded": Total season goals scored and conceded by home team.
   - "away_goals_scored" & "away_goals_conceded": Total season goals scored and conceded by away team.
   - "home_goals_per_game" & "home_conceded_per_game": Average goals scored/conceded per match by home team.
   - "away_goals_per_game" & "away_conceded_per_game": Average goals scored/conceded per match by away team.
   - "comment": Detailed mathematical and qualitative rationale justifying why this selection holds positive value.
   - "notes": Critical contextual match notes: confirmed lineups, tactical adjustments, dry/wet pitch conditions, key absences.

7. CONSIDERED ALTERNATIVES (REJECTED CANDIDATES):
   Include candidate fixtures that were analyzed but not selected in "alternatives" with:
   - "match_date", "country", "league", "home_team", "away_team", "market", "selection", "odds"
   - "estimated_probability", "breakeven_probability", "edge_percentage_points", "expected_value"
   - "home_matches_played", "away_matches_played"
   - "comment": Clear explanation of why this candidate was rejected in favor of the selected bets (e.g., high defensive variance, insufficient margin of safety, lower expected value).

8. TICKET STATUS & MATCH SCORES:
   - If creating a pending ticket: leave "actual_home_score": null, "actual_away_score": null, "actual_result": null, and set "status": "pending" and "result": "pending".
   - If importing a completed ticket: supply the final scores and mark "result" as "won", "lost", or "void".

9. PRE-MATCH WARNINGS & RISK FLAGS (Optional "warnings" array inside each match):
   Identify any non-quantifiable or contextual risks that could contradict or support the mathematical edge (e.g., small sample sizes <10 matches, weather abnormalities, tactical style mismatches, defensive instability, missing key players).
   Include an optional "warnings" array directly inside each match in "selections" or "alternatives" formatted as:
   - "type": category (e.g. "Low-Volume Sample", "Tactical Mismatch", "Key Absence", "Adverse Weather", "Defensive Instability")
   - "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
   - "direction": "CONTRADICTORY" (risks that threaten our pick) | "NEUTRAL" | "SUPPORTIVE"
   - "market_relevance": "DIRECT" | "INDIRECT" | "CONTEXTUAL"
   - "description": concise 1-sentence risk summary
   - "evidence": objective facts or statistics justifying the flag

10. Use the exact JSON format below:

${JSON.stringify(sampleJson, null, 2)}`

    navigator.clipboard.writeText(template)
    setNotification({
      open: true,
      message:
        locale === 'fr'
          ? `Modèle de prompt ChatGPT copié avec le modèle actif (${activeName} v${activeVersion}) !`
          : `ChatGPT prompt template copied using active model (${activeName} v${activeVersion})!`,
      type: 'success',
    })
  }

  // Clear & Reset
  const handleReset = () => {
    setJsonText('')
    setParsedPayload(null)
    setParseError(null)
  }

  // Delete a selection from preview & recalculate dependent metrics
  const handleDeleteSelection = (indexToDelete: number) => {
    if (!parsedPayload) return

    if (parsedPayload.selections.length <= 1) {
      setNotification({
        open: true,
        message:
          locale === 'fr'
            ? 'Un ticket doit contenir au moins une sélection.'
            : 'A ticket must contain at least one selection.',
        type: 'error',
      })
      return
    }

    const targetSel = parsedPayload.selections[indexToDelete]
    const remainingSelections = parsedPayload.selections.filter((_, i) => i !== indexToDelete)

    // Recalculate combined_odds: product of remaining selections' odds
    const newCombinedOdds =
      remainingSelections.length > 0
        ? Number(remainingSelections.reduce((acc, s) => acc * (Number(s.odds) || 1), 1).toFixed(2))
        : 0

    // Recalculate estimated_ticket_probability: product of remaining selections' estimated_probability
    const newEstimatedProb =
      remainingSelections.length > 0
        ? Number(
            remainingSelections.reduce(
              (acc, s) => acc * (Number(s.estimated_probability) || 1),
              1
            ).toFixed(3)
          )
        : 0

    // Clean any legacy top-level warnings associated with this selection
    const remainingLegacyWarnings = parsedPayload.warnings?.filter((w) => {
      if (!w.selection_reference) return true
      return !(
        w.selection_reference.home_team === targetSel.home_team &&
        w.selection_reference.away_team === targetSel.away_team
      )
    })

    const updatedPayload: TicketImportJSON = {
      ...parsedPayload,
      ticket: {
        ...parsedPayload.ticket,
        combined_odds: newCombinedOdds,
        estimated_ticket_probability: newEstimatedProb,
      },
      selections: remainingSelections,
      ...(remainingLegacyWarnings ? { warnings: remainingLegacyWarnings } : {}),
    }

    setParsedPayload(updatedPayload)
    setJsonText(JSON.stringify(updatedPayload, null, 2))

    // Close drawer if it was showing this selection
    if (
      snapshotSelection &&
      snapshotSelection.home_team === targetSel.home_team &&
      snapshotSelection.away_team === targetSel.away_team
    ) {
      setSnapshotSelection(null)
    }

    setNotification({
      open: true,
      message:
        locale === 'fr'
          ? `Sélection "${targetSel.home_team} vs ${targetSel.away_team}" retirée. Cote (${newCombinedOdds}) et probabilité (${(newEstimatedProb * 100).toFixed(1)}%) recalculées.`
          : `Selection "${targetSel.home_team} vs ${targetSel.away_team}" removed. Combined odds (${newCombinedOdds}) and probability (${(newEstimatedProb * 100).toFixed(1)}%) recalculated.`,
      type: 'info',
    })
  }

  // Update stake in preview
  const handleUpdateStake = (newStake: number) => {
    if (!parsedPayload) return
    const safeStake = isNaN(newStake) || newStake < 0 ? 0 : newStake
    const updatedPayload: TicketImportJSON = {
      ...parsedPayload,
      ticket: {
        ...parsedPayload.ticket,
        stake: safeStake,
      },
    }
    setParsedPayload(updatedPayload)
    setJsonText(JSON.stringify(updatedPayload, null, 2))
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
            placeholder={`{\n  "ticket": {\n    "ticket_number": "001",\n    "date": "2026-10-20",\n    "model_version": "${activeModel?.version || '1.0'}",\n    "stake": 100,\n    "combined_odds": 2.28\n  },\n  "selections": [\n    {\n      "match_date": "2026-10-20",\n      "country": "England",\n      "league": "League One",\n      "home_team": "Bromley",\n      "away_team": "Leicester City",\n      "market": "Over/Under",\n      "selection": "Under 3.5",\n      "odds": 1.57\n    }\n  ],\n  "alternatives": []\n}`}
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
              <Grid container spacing={2.5} sx={{ alignItems: 'flex-start' }}>
                <Grid size={{ xs: 6, sm: 2 }}>
                  <Typography variant="caption" color="text.secondary">Ticket #</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {parsedPayload.ticket.ticket_number ? `#${parsedPayload.ticket.ticket_number}` : 'Auto-assigned'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 2 }}>
                  <Typography variant="caption" color="text.secondary">Date</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {parsedPayload.ticket.date || 'Today'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 3.5 }}>
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
                <Grid size={{ xs: 12, sm: 4.5 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: alpha('#121824', 0.7),
                      border: `1px solid ${alpha('#66BB6A', 0.3)}`,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" sx={{ color: '#66BB6A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {locale === 'fr' ? 'Mise (Éditable)' : 'Stake (Editable)'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {locale === 'fr' ? 'Gain Potentiel' : 'Est. Return'}:{' '}
                        <span style={{ color: '#F6AE2D', fontWeight: 800 }}>
                          {formatCurrency((parsedPayload.ticket.stake || 0) * (parsedPayload.ticket.combined_odds || 0), currency)}
                        </span>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <TextField
                        type="number"
                        size="small"
                        value={parsedPayload.ticket.stake ?? ''}
                        onChange={(e) => handleUpdateStake(Number(e.target.value))}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <span style={{ color: '#66BB6A', fontWeight: 800, fontSize: '0.8rem' }}>{currency}</span>
                              </InputAdornment>
                            ),
                            sx: {
                              fontWeight: 800,
                              fontSize: '0.95rem',
                              color: '#66BB6A',
                              backgroundColor: alpha('#1E2635', 0.9),
                              borderRadius: 1.5,
                              height: 38,
                            },
                          },
                        }}
                        sx={{ maxWidth: 160 }}
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="caption" color="text.secondary">
                          {locale === 'fr' ? 'Cote Combinée' : 'Combined Odds'}:{' '}
                          <span style={{ color: '#F0F2F5', fontWeight: 800 }}>
                            @{parsedPayload.ticket.combined_odds ? Number(parsedPayload.ticket.combined_odds).toFixed(2) : '—'}
                          </span>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {locale === 'fr' ? 'Probabilité Ticket' : 'Ticket Prob'}:{' '}
                          <span style={{ color: '#42A5F5', fontWeight: 800 }}>
                            {parsedPayload.ticket.estimated_ticket_probability !== undefined && parsedPayload.ticket.estimated_ticket_probability !== null
                              ? `${(Number(parsedPayload.ticket.estimated_ticket_probability) * 100).toFixed(1)}%`
                              : '—'}
                          </span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
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
                      <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Stats Snapshot</th>
                      <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedPayload.selections.map((sel, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 700 }}>
                          <div>{sel.home_team} <span style={{ color: '#9AA3B2' }}>vs</span> {sel.away_team}</div>
                          {sel.warnings && sel.warnings.length > 0 && (
                            <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                              {sel.warnings.map((w, wIdx) => (
                                <Chip
                                  key={wIdx}
                                  label={`${w.type} (${w.severity || 'MED'})`}
                                  size="small"
                                  sx={{
                                    height: 18,
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    backgroundColor: alpha('#F6AE2D', 0.15),
                                    color: '#F6AE2D',
                                  }}
                                />
                              ))}
                            </Box>
                          )}
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
                        <td style={{ padding: '12px 14px', fontSize: '0.75rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25, flexWrap: 'wrap' }}>
                            <span style={{ color: '#9AA3B2' }}>Pos:</span>
                            <span style={{ color: '#F6AE2D', fontWeight: 700 }}>
                              #{sel.home_league_position ?? '—'}
                            </span>
                            <span style={{ color: '#9AA3B2' }}>vs</span>
                            <span style={{ color: '#F6AE2D', fontWeight: 700 }}>
                              #{sel.away_league_position ?? '—'}
                            </span>
                            <span style={{ color: '#9AA3B2', marginLeft: 4 }}>• MP:</span>
                            <span style={{ color: '#F0F2F5', fontWeight: 700 }}>
                              {sel.home_matches_played ?? sel.home_games_played ?? '—'}
                            </span>
                            <span style={{ color: '#9AA3B2' }}>vs</span>
                            <span style={{ color: '#F0F2F5', fontWeight: 700 }}>
                              {sel.away_matches_played ?? sel.away_games_played ?? '—'}
                            </span>
                          </Box>
                          <Box sx={{ color: '#9AA3B2' }}>
                            GF/GA: {sel.home_goals_scored ?? '—'}/{sel.home_goals_conceded ?? '—'} vs {sel.away_goals_scored ?? '—'}/{sel.away_goals_conceded ?? '—'}
                          </Box>
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <CustomTooltip title={locale === 'fr' ? 'Voir toutes les statistiques & buts' : 'View Full Match Stats & Goals Snapshot'}>
                              <CustomButton
                                size="small"
                                variant="outlined"
                                onClick={() => setSnapshotSelection(sel)}
                                sx={{
                                  minWidth: 32,
                                  p: '4px 8px',
                                  borderColor: alpha('#42A5F5', 0.5),
                                  color: '#42A5F5',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  textTransform: 'none',
                                  '&:hover': {
                                    borderColor: '#42A5F5',
                                    backgroundColor: alpha('#42A5F5', 0.1),
                                  },
                                }}
                                startIcon={<SlidersHorizontal size={14} />}
                              >
                                {locale === 'fr' ? 'Détails' : 'Stats'}
                              </CustomButton>
                            </CustomTooltip>

                            <CustomTooltip
                              title={
                                parsedPayload.selections.length <= 1
                                  ? locale === 'fr'
                                    ? 'Au moins une sélection requise pour un ticket'
                                    : 'At least 1 selection required for a ticket'
                                  : locale === 'fr'
                                  ? 'Supprimer cette sélection et recalculer cotes & alertes'
                                  : 'Remove this selection and recalculate odds, probability & warnings'
                              }
                            >
                              <span>
                                <CustomButton
                                  size="small"
                                  variant="outlined"
                                  disabled={parsedPayload.selections.length <= 1}
                                  onClick={() => handleDeleteSelection(idx)}
                                  sx={{
                                    minWidth: 32,
                                    p: '4px 8px',
                                    borderColor: alpha('#EF5350', 0.5),
                                    color: '#EF5350',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    '&:hover': {
                                      borderColor: '#EF5350',
                                      backgroundColor: alpha('#EF5350', 0.1),
                                    },
                                    '&.Mui-disabled': {
                                      borderColor: alpha('#EF5350', 0.15),
                                      color: alpha('#EF5350', 0.3),
                                    },
                                  }}
                                  startIcon={<Trash2 size={14} />}
                                >
                                  {locale === 'fr' ? 'Retirer' : 'Delete'}
                                </CustomButton>
                              </span>
                            </CustomTooltip>
                          </Box>
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
                        <th style={{ padding: '10px 14px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'center' }}>Details</th>
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
                            {alt.warnings && alt.warnings.length > 0 && (
                              <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {alt.warnings.map((w, wIdx) => (
                                  <Chip
                                    key={wIdx}
                                    label={`${w.type} (${w.severity || 'MED'})`}
                                    size="small"
                                    sx={{
                                      height: 18,
                                      fontSize: '0.65rem',
                                      fontWeight: 700,
                                      backgroundColor: alpha('#CE93D8', 0.15),
                                      color: '#CE93D8',
                                    }}
                                  />
                                ))}
                              </Box>
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
                          <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                            <CustomButton
                              size="small"
                              variant="outlined"
                              onClick={() => setSnapshotAlternative(alt)}
                              sx={{
                                minWidth: 32,
                                p: '4px 8px',
                                borderColor: alpha('#9AA3B2', 0.4),
                                color: '#9AA3B2',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                '&:hover': {
                                  borderColor: '#F6AE2D',
                                  color: '#F6AE2D',
                                  backgroundColor: alpha('#F6AE2D', 0.1),
                                },
                              }}
                              startIcon={<SlidersHorizontal size={14} />}
                            >
                              {locale === 'fr' ? 'Voir' : 'View'}
                            </CustomButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Warnings Preview Card (Grouped Per Game) */}
          {groupedDetectedWarnings.length > 0 && (
            <Card
              sx={{
                mt: 3,
                backgroundColor: alpha('#1E2635', 0.9),
                border: `1px solid ${alpha('#F6AE2D', 0.4)}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                  <AlertTriangle size={20} color="#F6AE2D" />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#F6AE2D' }}>
                    {locale === 'fr' ? 'Alertes & Signaux de Risque Détectés (Par Match)' : 'Pre-Match Warnings & Risk Flags (Grouped by Match)'}
                  </Typography>
                  <Chip
                    label={`${totalWarningsCount} warning${totalWarningsCount > 1 ? 's' : ''} across ${groupedDetectedWarnings.length} fixture${groupedDetectedWarnings.length > 1 ? 's' : ''}`}
                    size="small"
                    sx={{ backgroundColor: alpha('#F6AE2D', 0.15), color: '#F6AE2D', fontWeight: 800 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {groupedDetectedWarnings.map((group) => {
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
                        {/* Game Header Bar */}
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
                              {group.target}
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
                                <th style={{ padding: '8px 12px', color: '#9AA3B2', fontSize: '0.7rem', textTransform: 'uppercase' }}>Type</th>
                                <th style={{ padding: '8px 12px', color: '#9AA3B2', fontSize: '0.7rem', textTransform: 'uppercase' }}>Severity</th>
                                <th style={{ padding: '8px 12px', color: '#9AA3B2', fontSize: '0.7rem', textTransform: 'uppercase' }}>Direction</th>
                                <th style={{ padding: '8px 12px', color: '#9AA3B2', fontSize: '0.7rem', textTransform: 'uppercase' }}>Description & Pre-Match Evidence</th>
                              </tr>
                            </thead>
                            <tbody>
                              {group.warnings.map((w, idx) => {
                                const sev = w.severity
                                const sevColor = sev === 'HIGH' || sev === 'CRITICAL' ? '#EF5350' : sev === 'MEDIUM' ? '#F6AE2D' : '#42A5F5'

                                return (
                                  <tr key={idx} style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.03)' }}>
                                    <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                                      <Chip
                                        label={w.type}
                                        size="small"
                                        sx={{ backgroundColor: alpha('#9C27B0', 0.15), color: '#CE93D8', fontWeight: 700, fontSize: '0.75rem' }}
                                      />
                                    </td>
                                    <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                                      <Chip
                                        label={sev}
                                        size="small"
                                        sx={{ backgroundColor: alpha(sevColor, 0.15), color: sevColor, fontWeight: 800, fontSize: '0.7rem' }}
                                      />
                                    </td>
                                    <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                                      <Chip
                                        label={w.direction}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                          fontSize: '0.7rem',
                                          fontWeight: 600,
                                          borderColor:
                                            w.direction === 'CONTRADICTORY'
                                              ? alpha('#EF5350', 0.5)
                                              : w.direction === 'SUPPORTIVE'
                                              ? alpha('#66BB6A', 0.5)
                                              : 'inherit',
                                          color:
                                            w.direction === 'CONTRADICTORY'
                                              ? '#EF5350'
                                              : w.direction === 'SUPPORTIVE'
                                              ? '#66BB6A'
                                              : 'inherit',
                                        }}
                                      />
                                    </td>
                                    <td style={{ padding: '10px 12px', fontSize: '0.825rem', verticalAlign: 'top' }}>
                                      <div style={{ color: '#F0F2F5', fontWeight: 500, marginBottom: 2 }}>{w.description}</div>
                                      {w.evidence && (
                                        <div style={{ color: '#9AA3B2', fontSize: '0.75rem', fontStyle: 'italic' }}>
                                          &ldquo;{w.evidence}&rdquo;
                                        </div>
                                      )}
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
              </CardContent>
            </Card>
          )}
        </Box>
      )}

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
        width={560}
      >
        {snapshotSelection && (() => {
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

          const selIndex = parsedPayload?.selections?.findIndex(
            (s) => s.home_team === snapshotSelection.home_team && s.away_team === snapshotSelection.away_team
          ) ?? -1

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
                  {snapshotSelection.league || '—'} &bull; Match Date: {snapshotSelection.match_date || parsedPayload?.ticket.date || 'Today'}
                </Typography>
              </Box>

              {/* Market Pick & Quick Bar */}
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

                <Chip
                  label={`Odds: ${snapshotSelection.odds ? Number(snapshotSelection.odds).toFixed(2) : '—'}`}
                  size="small"
                  sx={{ fontWeight: 800, backgroundColor: alpha('#F6AE2D', 0.15), color: '#F6AE2D' }}
                />
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
                          {snapshotSelection.home_matches_played ?? snapshotSelection.home_games_played ?? '—'}
                        </td>
                        <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                          {snapshotSelection.away_matches_played ?? snapshotSelection.away_games_played ?? '—'}
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

              {/* Associated Pre-Match Warnings (if any) */}
              {snapshotSelection.warnings && snapshotSelection.warnings.length > 0 && (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha('#F6AE2D', 0.08),
                    border: `1px solid ${alpha('#F6AE2D', 0.3)}`,
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
                      mb: 1,
                    }}
                  >
                    <AlertTriangle size={15} />
                    {locale === 'fr'
                      ? `Alertes de Risque Associées (${snapshotSelection.warnings.length})`
                      : `Associated Risk Flags & Warnings (${snapshotSelection.warnings.length})`}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {snapshotSelection.warnings.map((w, wIdx) => {
                      const sev = w.severity || 'MEDIUM'
                      const sevColor = sev === 'HIGH' || sev === 'CRITICAL' ? '#EF5350' : sev === 'MEDIUM' ? '#F6AE2D' : '#42A5F5'
                      return (
                        <Box
                          key={wIdx}
                          sx={{
                            p: 1.5,
                            borderRadius: 1.5,
                            backgroundColor: alpha('#121824', 0.7),
                            border: `1px solid ${alpha(sevColor, 0.3)}`,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                            <Chip
                              label={w.type}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                backgroundColor: alpha('#9C27B0', 0.2),
                                color: '#CE93D8',
                              }}
                            />
                            <Chip
                              label={sev}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                backgroundColor: alpha(sevColor, 0.2),
                                color: sevColor,
                              }}
                            />
                            <Chip
                              label={w.direction || 'CONTRADICTORY'}
                              size="small"
                              variant="outlined"
                              sx={{
                                height: 20,
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                borderColor:
                                  w.direction === 'SUPPORTIVE'
                                    ? alpha('#66BB6A', 0.5)
                                    : alpha('#EF5350', 0.5),
                                color: w.direction === 'SUPPORTIVE' ? '#66BB6A' : '#EF5350',
                              }}
                            />
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#F0F2F5', mb: 0.5 }}>
                            {w.description}
                          </Typography>
                          {w.evidence && (
                            <Typography variant="caption" sx={{ color: '#9AA3B2', fontStyle: 'italic', display: 'block' }}>
                              &ldquo;{w.evidence}&rdquo;
                            </Typography>
                          )}
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              )}

              {/* Delete / Remove Action at Bottom of Drawer */}
              {selIndex !== -1 && (
                <Box sx={{ pt: 1, borderTop: '1px solid rgba(240, 242, 245, 0.08)' }}>
                  <CustomButton
                    fullWidth
                    variant="outlined"
                    disabled={Boolean(parsedPayload && parsedPayload.selections.length <= 1)}
                    onClick={() => handleDeleteSelection(selIndex)}
                    startIcon={<Trash2 size={16} />}
                    sx={{
                      borderColor: alpha('#EF5350', 0.5),
                      color: '#EF5350',
                      fontWeight: 700,
                      py: 1,
                      '&:hover': {
                        borderColor: '#EF5350',
                        backgroundColor: alpha('#EF5350', 0.1),
                      },
                      '&.Mui-disabled': {
                        borderColor: alpha('#EF5350', 0.2),
                        color: alpha('#EF5350', 0.3),
                      },
                    }}
                  >
                    {locale === 'fr'
                      ? 'Retirer cette sélection du ticket et recalculer'
                      : 'Remove This Selection from Ticket & Recalculate'}
                  </CustomButton>
                </Box>
              )}
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
                {snapshotAlternative.league || '—'} &bull; Match Date: {snapshotAlternative.match_date || parsedPayload?.ticket.date || 'Today'}
              </Typography>
            </Box>

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

              <Chip
                label={`Odds: ${snapshotAlternative.odds ? Number(snapshotAlternative.odds).toFixed(2) : '—'}`}
                size="small"
                sx={{ fontWeight: 800, backgroundColor: alpha('#F6AE2D', 0.15), color: '#F6AE2D' }}
              />
            </Box>

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
                {locale === 'fr' ? 'Évaluation & Probabilité' : 'Model Probability & Valuation'}
              </Typography>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 6, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">Model Probability</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 800, color: '#66BB6A' }}>
                    {snapshotAlternative.estimated_probability
                      ? `${(Number(snapshotAlternative.estimated_probability) * 100).toFixed(1)}%`
                      : '—'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">Bookmaker Odds</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 800 }}>
                    {snapshotAlternative.odds ? Number(snapshotAlternative.odds).toFixed(2) : '—'}
                  </Typography>
                </Grid>
                {snapshotAlternative.edge_percentage_points !== undefined && snapshotAlternative.edge_percentage_points !== null && (
                  <Grid size={{ xs: 6, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary">Edge</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: (snapshotAlternative.edge_percentage_points || 0) >= 0 ? '#66BB6A' : '#EF5350' }}>
                      {snapshotAlternative.edge_percentage_points > 0 ? '+' : ''}{snapshotAlternative.edge_percentage_points}%
                    </Typography>
                  </Grid>
                )}
                {snapshotAlternative.expected_value !== undefined && snapshotAlternative.expected_value !== null && (
                  <Grid size={{ xs: 6, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary">Expected Value (EV)</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: (Number(snapshotAlternative.expected_value) || 0) >= 0 ? '#66BB6A' : '#EF5350' }}>
                      {Number(snapshotAlternative.expected_value) > 0 ? '+' : ''}{snapshotAlternative.expected_value}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>

            {snapshotAlternative.comment && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha('#EF5350', 0.08),
                  border: `1px solid ${alpha('#EF5350', 0.2)}`,
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#EF5350', display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
                  <Brain size={15} />
                  {locale === 'fr' ? 'Motif de Rejet :' : 'Rejection Reason / Analysis:'}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                  "{snapshotAlternative.comment}"
                </Typography>
              </Box>
            )}

            {snapshotAlternative.warnings && snapshotAlternative.warnings.length > 0 && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha('#F6AE2D', 0.08),
                  border: `1px solid ${alpha('#F6AE2D', 0.3)}`,
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#F6AE2D', display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
                  <AlertTriangle size={15} />
                  {locale === 'fr' ? `Alertes Détectées (${snapshotAlternative.warnings.length})` : `Detected Warnings (${snapshotAlternative.warnings.length})`}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {snapshotAlternative.warnings.map((w: any, wIdx: number) => (
                    <Box
                      key={wIdx}
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        backgroundColor: alpha('#121824', 0.7),
                        border: `1px solid ${alpha('#F6AE2D', 0.3)}`,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Chip label={w.type} size="small" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700, backgroundColor: alpha('#9C27B0', 0.2), color: '#CE93D8' }} />
                        <Chip label={w.severity || 'MED'} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800, backgroundColor: alpha('#F6AE2D', 0.2), color: '#F6AE2D' }} />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#F0F2F5', mb: 0.5 }}>
                        {w.description}
                      </Typography>
                      {w.evidence && (
                        <Typography variant="caption" sx={{ color: '#9AA3B2', fontStyle: 'italic', display: 'block' }}>
                          &ldquo;{w.evidence}&rdquo;
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </CustomDrawer>
    </Box>
  )
}
