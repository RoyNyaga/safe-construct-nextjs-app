'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import {
  BettingModel,
  BettingTicket,
  BettingSelection,
  BettingAlternative,
  TicketImportJSON,
  TicketExportJSON,
  SelectionResultStatus,
  TicketStatus,
  CalibrationBucket,
  SelectedVsAlternativesComparison,
} from '@/types/betting'
import { autoSettleSelection, calculateTicketStatus, calculateProfitLoss } from '@/utils/bettingSettlement'
import { executeTransaction, getActiveBankroll } from './bankroll'

// ─── 1. MODEL OPERATIONS ─────────────────────────────────────────────────────

export async function getBettingModels(): Promise<{ models: BettingModel[]; error?: string }> {
  const supabase = await createClient()

  const { data: models, error } = await supabase
    .from('betting_models')
    .select(`
      *,
      betting_tickets (
        id,
        status,
        stake,
        profit_loss
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to get betting models:', error)
    return { models: [], error: error.message }
  }

  // Calculate dynamic model aggregates
  const enrichedModels: BettingModel[] = (models || []).map((m: any) => {
    const tickets = m.betting_tickets || []
    const totalTickets = tickets.length
    const wonTickets = tickets.filter((t: any) => t.status === 'won').length
    const lostTickets = tickets.filter((t: any) => t.status === 'lost').length
    const settledTickets = wonTickets + lostTickets
    const winRate = settledTickets > 0 ? Number(((wonTickets / settledTickets) * 100).toFixed(1)) : 0

    const totalStake = tickets.reduce((acc: number, t: any) => acc + Number(t.stake || 0), 0)
    const totalProfit = tickets.reduce((acc: number, t: any) => acc + Number(t.profit_loss || 0), 0)
    const roi = totalStake > 0 ? Number(((totalProfit / totalStake) * 100).toFixed(1)) : 0

    return {
      id: m.id,
      uuid: m.uuid,
      version: m.version,
      name: m.name,
      description: m.description,
      content: m.content,
      status: m.status,
      is_active: m.is_active,
      created_at: m.created_at,
      updated_at: m.updated_at,
      total_tickets: totalTickets,
      won_tickets: wonTickets,
      lost_tickets: lostTickets,
      win_rate: winRate,
      roi: roi,
    }
  })

  return { models: enrichedModels }
}

export async function getBettingModelByUuid(uuid: string): Promise<{ model: BettingModel | null; error?: string }> {
  const supabase = await createClient()

  const { data: model, error } = await supabase
    .from('betting_models')
    .select(`
      *,
      betting_tickets (
        id,
        uuid,
        ticket_number,
        ticket_date,
        status,
        stake,
        combined_odds,
        profit_loss
      )
    `)
    .eq('uuid', uuid)
    .single()

  if (error) {
    console.error('Failed to get model by uuid:', error)
    return { model: null, error: error.message }
  }

  const tickets = model.betting_tickets || []
  const totalTickets = tickets.length
  const wonTickets = tickets.filter((t: any) => t.status === 'won').length
  const lostTickets = tickets.filter((t: any) => t.status === 'lost').length
  const settledTickets = wonTickets + lostTickets
  const winRate = settledTickets > 0 ? Number(((wonTickets / settledTickets) * 100).toFixed(1)) : 0

  const totalStake = tickets.reduce((acc: number, t: any) => acc + Number(t.stake || 0), 0)
  const totalProfit = tickets.reduce((acc: number, t: any) => acc + Number(t.profit_loss || 0), 0)
  const roi = totalStake > 0 ? Number(((totalProfit / totalStake) * 100).toFixed(1)) : 0

  return {
    model: {
      ...model,
      total_tickets: totalTickets,
      won_tickets: wonTickets,
      lost_tickets: lostTickets,
      win_rate: winRate,
      roi: roi,
    },
  }
}

export async function createBettingModel(data: {
  version: string
  name: string
  description?: string
  content?: string
  status?: 'draft' | 'active' | 'retired'
  isActive?: boolean
}) {
  const supabase = await createClient()

  const { data: inserted, error } = await supabase
    .from('betting_models')
    .insert([
      {
        version: data.version,
        name: data.name,
        description: data.description || null,
        content: data.content || null,
        status: data.status || 'active',
        is_active: data.isActive !== undefined ? data.isActive : true,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Failed to create betting model:', error)
    return { error: error.message }
  }

  revalidatePath('/[locale]/admin/betting/models', 'layout')
  return { success: true, model: inserted as BettingModel }
}

export async function updateBettingModel(
  id: number,
  data: {
    name?: string
    description?: string
    content?: string
    status?: 'draft' | 'active' | 'retired'
    isActive?: boolean
  }
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('betting_models')
    .update({
      ...(data.name && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.content !== undefined && { content: data.content }),
      ...(data.status && { status: data.status }),
      ...(data.isActive !== undefined && { is_active: data.isActive }),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    console.error('Failed to update betting model:', error)
    return { error: error.message }
  }

  revalidatePath('/[locale]/admin/betting/models', 'layout')
  return { success: true }
}

// ─── 2. TICKET IMPORT & CREATION ─────────────────────────────────────────────

export async function importBettingTicket(payload: TicketImportJSON): Promise<{
  success?: boolean
  ticketUuid?: string
  error?: string
}> {
  const supabase = await createClient()

  if (!payload || !payload.ticket || !payload.selections || payload.selections.length === 0) {
    return { error: 'Invalid payload: A ticket must have general information and at least one selection.' }
  }

  // 1. Resolve Model
  let modelId: number | null = null
  if (payload.ticket.model_uuid) {
    const { data: m } = await supabase
      .from('betting_models')
      .select('id')
      .eq('uuid', payload.ticket.model_uuid)
      .single()
    if (m) modelId = m.id
  }

  if (!modelId && payload.ticket.model_version) {
    const { data: m } = await supabase
      .from('betting_models')
      .select('id')
      .eq('version', payload.ticket.model_version)
      .order('is_active', { ascending: false })
      .limit(1)
      .single()
    if (m) modelId = m.id
  }

  // If still no model, fallback to active model
  if (!modelId) {
    const { data: m } = await supabase
      .from('betting_models')
      .select('id')
      .eq('is_active', true)
      .limit(1)
      .single()
    if (m) modelId = m.id
  }

  if (!modelId) {
    return {
      error: `Model version "${payload.ticket.model_version || ''}" was not found. Please create or activate this model in the Model Registry before importing.`,
    }
  }

  // 2. Resolve Bankroll
  const { bankroll } = await getActiveBankroll()
  const bankrollId = bankroll ? bankroll.id : null

  const stake = Number(payload.ticket.stake || 0)

  // 3. Insert Ticket
  const { data: ticket, error: ticketError } = await supabase
    .from('betting_tickets')
    .insert([
      {
        ticket_number: payload.ticket.ticket_number || null,
        ticket_date: payload.ticket.date || new Date().toISOString().split('T')[0],
        model_id: modelId,
        bankroll_id: bankrollId,
        stake: stake,
        combined_odds: payload.ticket.combined_odds || null,
        estimated_ticket_probability: payload.ticket.estimated_ticket_probability || null,
        status: payload.ticket.status || 'pending',
        notes: payload.ticket.notes || null,
        profit_loss: 0.00,
      },
    ])
    .select()
    .single()

  if (ticketError || !ticket) {
    console.error('Failed to insert ticket:', ticketError)
    return { error: ticketError?.message || 'Failed to create ticket' }
  }

  // 4. Automatically Deduct Stake from Bankroll
  if (stake > 0 && bankrollId) {
    await executeTransaction({
      bankrollId: bankrollId,
      ticketId: ticket.id,
      transactionType: 'bet_stake',
      triggerType: 'automatic',
      amount: -stake,
      description: `Stake deducted for Ticket #${ticket.ticket_number || ticket.id}`,
    })
  }

  // 5. Insert Selected Selections
  const selectionsPayload = payload.selections.map((sel) => ({
    ticket_id: ticket.id,
    match_date: sel.match_date || payload.ticket.date || null,
    league: sel.league || null,
    home_team: sel.home_team,
    away_team: sel.away_team,
    home_league_position: sel.home_league_position ?? null,
    away_league_position: sel.away_league_position ?? null,
    home_goals_scored: sel.home_goals_scored ?? null,
    home_goals_conceded: sel.home_goals_conceded ?? null,
    away_goals_scored: sel.away_goals_scored ?? null,
    away_goals_conceded: sel.away_goals_conceded ?? null,
    home_goals_per_game: sel.home_goals_per_game ?? null,
    home_conceded_per_game: sel.home_conceded_per_game ?? null,
    away_goals_per_game: sel.away_goals_per_game ?? null,
    away_conceded_per_game: sel.away_conceded_per_game ?? null,
    market: sel.market,
    selection: sel.selection,
    odds: sel.odds ?? null,
    estimated_probability: sel.estimated_probability ?? null,
    breakeven_probability: sel.breakeven_probability ?? null,
    edge_percentage_points: sel.edge_percentage_points ?? null,
    expected_value: sel.expected_value ?? null,
    comment: sel.comment || null,
    notes: sel.notes || null,
    result: 'pending',
  }))

  const { error: selError } = await supabase.from('betting_selections').insert(selectionsPayload)
  if (selError) {
    console.error('Failed to insert selections:', selError)
    // Clean up ticket if selections fail
    await supabase.from('betting_tickets').delete().eq('id', ticket.id)
    return { error: `Failed to insert selections: ${selError.message}` }
  }

  // 6. Insert Rejected Alternatives (if any)
  if (payload.alternatives && payload.alternatives.length > 0) {
    const alternativesPayload = payload.alternatives.map((alt) => ({
      ticket_id: ticket.id,
      match_date: alt.match_date || payload.ticket.date || null,
      league: alt.league || null,
      home_team: alt.home_team,
      away_team: alt.away_team,
      market: alt.market,
      selection: alt.selection,
      odds: alt.odds ?? null,
      estimated_probability: alt.estimated_probability ?? null,
      breakeven_probability: alt.breakeven_probability ?? null,
      edge_percentage_points: alt.edge_percentage_points ?? null,
      expected_value: alt.expected_value ?? null,
      comment: alt.comment || null,
      notes: alt.notes || null,
      result: 'pending',
    }))

    const { error: altError } = await supabase.from('betting_alternatives').insert(alternativesPayload)
    if (altError) {
      console.warn('Warning: Failed to insert alternatives:', altError)
    }
  }

  revalidatePath('/[locale]/admin/betting', 'layout')
  return { success: true, ticketUuid: ticket.uuid }
}

// ─── 3. TICKET QUERIES & DETAIL ──────────────────────────────────────────────

export async function getBettingTickets(filters?: {
  status?: string
  modelId?: number
  search?: string
}): Promise<{ tickets: BettingTicket[]; error?: string }> {
  const supabase = await createClient()

  let query = supabase
    .from('betting_tickets')
    .select(`
      *,
      betting_models (
        id,
        name,
        version
      ),
      betting_selections (
        id,
        home_team,
        away_team,
        market,
        selection,
        odds,
        result
      )
    `)
    .order('ticket_date', { ascending: false })
    .order('created_at', { ascending: false })

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  if (filters?.modelId) {
    query = query.eq('model_id', filters.modelId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Failed to get tickets:', error)
    return { tickets: [], error: error.message }
  }

  let results = (data || []) as BettingTicket[]

  if (filters?.search) {
    const s = filters.search.toLowerCase()
    results = results.filter((t) => {
      const matchNum = (t.ticket_number || '').toLowerCase().includes(s)
      const matchNotes = (t.notes || '').toLowerCase().includes(s)
      const matchTeam = (t.betting_selections || []).some(
        (sel) => sel.home_team.toLowerCase().includes(s) || sel.away_team.toLowerCase().includes(s)
      )
      return matchNum || matchNotes || matchTeam
    })
  }

  return { tickets: results }
}

export async function getBettingTicketByUuid(uuid: string): Promise<{
  ticket: BettingTicket | null
  error?: string
}> {
  const supabase = await createClient()

  const { data: ticket, error } = await supabase
    .from('betting_tickets')
    .select(`
      *,
      betting_models (
        id,
        uuid,
        name,
        version,
        description
      ),
      betting_selections (
        *
      ),
      betting_alternatives (
        *
      ),
      betting_transactions (
        *
      )
    `)
    .eq('uuid', uuid)
    .single()

  if (error) {
    console.error('Failed to get ticket by uuid:', error)
    return { ticket: null, error: error.message }
  }

  return { ticket: ticket as BettingTicket }
}

// ─── 4. RESULT SETTLEMENT ENGINE ─────────────────────────────────────────────

export async function updateSelectionResult(params: {
  selectionId: number
  homeScore?: number | null
  awayScore?: number | null
  manualResult?: SelectionResultStatus
}): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient()

  // 1. Fetch current selection and ticket
  const { data: selection, error: selError } = await supabase
    .from('betting_selections')
    .select('*, betting_tickets (*)')
    .eq('id', params.selectionId)
    .single()

  if (selError || !selection) {
    return { error: selError?.message || 'Selection not found' }
  }

  const ticket = selection.betting_tickets
  const homeScore = params.homeScore !== undefined ? params.homeScore : selection.actual_home_score
  const awayScore = params.awayScore !== undefined ? params.awayScore : selection.actual_away_score

  // 2. Determine Result
  let settledResult: SelectionResultStatus = 'pending'
  if (params.manualResult) {
    settledResult = params.manualResult
  } else {
    const auto = autoSettleSelection(selection.market, selection.selection, homeScore, awayScore)
    settledResult = auto !== null ? auto : (selection.result || 'pending')
  }

  // 3. Update Selection
  const { error: updateSelError } = await supabase
    .from('betting_selections')
    .update({
      actual_home_score: homeScore,
      actual_away_score: awayScore,
      result: settledResult,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.selectionId)

  if (updateSelError) {
    return { error: updateSelError.message }
  }

  // 4. Fetch all selections of this ticket to re-evaluate overall ticket
  const { data: allSelections } = await supabase
    .from('betting_selections')
    .select('odds, result')
    .eq('ticket_id', ticket.id)

  const updatedSelections = (allSelections || []).map((s) =>
    s.id === params.selectionId ? { ...s, result: settledResult } : s
  )

  const previousStatus = ticket.status as TicketStatus
  const newStatus = calculateTicketStatus(updatedSelections)
  const newProfitLoss = calculateProfitLoss(newStatus, ticket.stake, ticket.combined_odds, updatedSelections)

  // 5. Update Ticket
  await supabase
    .from('betting_tickets')
    .update({
      status: newStatus,
      actual_result: newStatus,
      profit_loss: newProfitLoss,
      updated_at: new Date().toISOString(),
    })
    .eq('id', ticket.id)

  // 6. Bankroll Balance Synchronization
  // If ticket newly transitioned to 'won', credit the payout
  if (newStatus === 'won' && previousStatus !== 'won' && ticket.stake > 0 && ticket.bankroll_id) {
    const totalReturn = Number((ticket.stake + newProfitLoss).toFixed(2))
    await executeTransaction({
      bankrollId: ticket.bankroll_id,
      ticketId: ticket.id,
      transactionType: 'bet_win',
      triggerType: 'automatic',
      amount: totalReturn,
      description: `Win payout for Ticket #${ticket.ticket_number || ticket.id} (+${newProfitLoss} profit)`,
    })
  }

  // If ticket newly transitioned to 'void', refund the stake
  if (newStatus === 'void' && previousStatus !== 'void' && ticket.stake > 0 && ticket.bankroll_id) {
    await executeTransaction({
      bankrollId: ticket.bankroll_id,
      ticketId: ticket.id,
      transactionType: 'bet_refund',
      triggerType: 'automatic',
      amount: Number(ticket.stake),
      description: `Stake refund for Void Ticket #${ticket.ticket_number || ticket.id}`,
    })
  }

  revalidatePath('/[locale]/admin/betting', 'layout')
  return { success: true }
}

export async function updateAlternativeResult(params: {
  alternativeId: number
  homeScore?: number | null
  awayScore?: number | null
  manualResult?: SelectionResultStatus
}): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient()

  const { data: alternative, error: altError } = await supabase
    .from('betting_alternatives')
    .select('*')
    .eq('id', params.alternativeId)
    .single()

  if (altError || !alternative) {
    return { error: altError?.message || 'Alternative not found' }
  }

  const homeScore = params.homeScore !== undefined ? params.homeScore : alternative.actual_home_score
  const awayScore = params.awayScore !== undefined ? params.awayScore : alternative.actual_away_score

  let settledResult: SelectionResultStatus = 'pending'
  if (params.manualResult) {
    settledResult = params.manualResult
  } else {
    const auto = autoSettleSelection(alternative.market, alternative.selection, homeScore, awayScore)
    settledResult = auto !== null ? auto : (alternative.result || 'pending')
  }

  const { error: updateError } = await supabase
    .from('betting_alternatives')
    .update({
      actual_home_score: homeScore,
      actual_away_score: awayScore,
      result: settledResult,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.alternativeId)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/[locale]/admin/betting', 'layout')
  return { success: true }
}

// ─── 5. JSON EXPORT BUILDER ──────────────────────────────────────────────────

export async function exportTicketAsJson(ticketUuid: string): Promise<{
  exportData: TicketExportJSON | null
  error?: string
}> {
  const { ticket, error } = await getBettingTicketByUuid(ticketUuid)

  if (error || !ticket) {
    return { exportData: null, error: error || 'Ticket not found' }
  }

  const exportPayload: TicketExportJSON = {
    ticket: {
      ticket_number: ticket.ticket_number,
      date: ticket.ticket_date,
      model_version: ticket.betting_models?.version || null,
      model_uuid: ticket.betting_models?.uuid || null,
      model_name: ticket.betting_models?.name || null,
      stake: Number(ticket.stake),
      combined_odds: ticket.combined_odds,
      estimated_ticket_probability: ticket.estimated_ticket_probability,
      status: ticket.status,
      actual_result: ticket.actual_result,
      profit_loss: Number(ticket.profit_loss),
      notes: ticket.notes,
    },
    selections: (ticket.betting_selections || []).map((s) => ({
      match_date: s.match_date,
      league: s.league,
      home_team: s.home_team,
      away_team: s.away_team,
      home_league_position: s.home_league_position,
      away_league_position: s.away_league_position,
      home_goals_scored: s.home_goals_scored,
      home_goals_conceded: s.home_goals_conceded,
      away_goals_scored: s.away_goals_scored,
      away_goals_conceded: s.away_goals_conceded,
      home_goals_per_game: s.home_goals_per_game,
      home_conceded_per_game: s.home_conceded_per_game,
      away_goals_per_game: s.away_goals_per_game,
      away_conceded_per_game: s.away_conceded_per_game,
      market: s.market,
      selection: s.selection,
      odds: s.odds,
      estimated_probability: s.estimated_probability,
      breakeven_probability: s.breakeven_probability,
      edge_percentage_points: s.edge_percentage_points,
      expected_value: s.expected_value,
      actual_home_score: s.actual_home_score,
      actual_away_score: s.actual_away_score,
      result: s.result,
      comment: s.comment,
      notes: s.notes,
    })),
    alternatives: (ticket.betting_alternatives || []).map((a) => ({
      match_date: a.match_date,
      league: a.league,
      home_team: a.home_team,
      away_team: a.away_team,
      market: a.market,
      selection: a.selection,
      odds: a.odds,
      estimated_probability: a.estimated_probability,
      breakeven_probability: a.breakeven_probability,
      edge_percentage_points: a.edge_percentage_points,
      expected_value: a.expected_value,
      actual_home_score: a.actual_home_score,
      actual_away_score: a.actual_away_score,
      result: a.result,
      comment: a.comment,
      notes: a.notes,
    })),
  }

  return { exportData: exportPayload }
}

// ─── 6. ANALYTICS & CALIBRATION QUERIES ───────────────────────────────────────

export async function getBettingSummaryStats() {
  const supabase = await createClient()

  const [
    { data: tickets },
    { data: selections },
    { data: alternatives },
    { count: modelsCount },
  ] = await Promise.all([
    supabase.from('betting_tickets').select('id, stake, status, profit_loss'),
    supabase.from('betting_selections').select('id, result, odds, estimated_probability'),
    supabase.from('betting_alternatives').select('id, result, odds, estimated_probability'),
    supabase.from('betting_models').select('*', { count: 'exact', head: true }),
  ])

  const ticketList = tickets || []
  const selList = selections || []
  const altList = alternatives || []

  const totalTickets = ticketList.length
  const wonTickets = ticketList.filter((t) => t.status === 'won').length
  const lostTickets = ticketList.filter((t) => t.status === 'lost').length
  const pendingTickets = ticketList.filter((t) => t.status === 'pending').length
  const voidTickets = ticketList.filter((t) => t.status === 'void').length

  const settledTickets = wonTickets + lostTickets
  const ticketWinRate = settledTickets > 0 ? Number(((wonTickets / settledTickets) * 100).toFixed(1)) : 0

  const totalStake = ticketList.reduce((acc, t) => acc + Number(t.stake || 0), 0)
  const totalProfit = ticketList.reduce((acc, t) => acc + Number(t.profit_loss || 0), 0)
  const roi = totalStake > 0 ? Number(((totalProfit / totalStake) * 100).toFixed(1)) : 0

  // Selections stats
  const totalSelections = selList.length
  const wonSelections = selList.filter((s) => s.result === 'won').length
  const lostSelections = selList.filter((s) => s.result === 'lost').length
  const settledSelections = wonSelections + lostSelections
  const selectionWinRate = settledSelections > 0 ? Number(((wonSelections / settledSelections) * 100).toFixed(1)) : 0

  return {
    tickets: {
      total: totalTickets,
      won: wonTickets,
      lost: lostTickets,
      pending: pendingTickets,
      void: voidTickets,
      winRate: ticketWinRate,
      totalStake: Number(totalStake.toFixed(2)),
      totalProfit: Number(totalProfit.toFixed(2)),
      roi: roi,
    },
    selections: {
      total: totalSelections,
      won: wonSelections,
      lost: lostSelections,
      winRate: selectionWinRate,
    },
    totalModels: modelsCount || 0,
    totalAlternatives: altList.length,
  }
}

export async function getCalibrationStats(modelId?: number): Promise<CalibrationBucket[]> {
  const supabase = await createClient()

  let query = supabase
    .from('betting_selections')
    .select(`
      estimated_probability,
      result,
      betting_tickets!inner (
        model_id
      )
    `)
    .in('result', ['won', 'lost'])

  if (modelId) {
    query = query.eq('betting_tickets.model_id', modelId)
  }

  const { data: selections } = await query
  const settled = selections || []

  // Bucket thresholds
  const bucketsDef = [
    { label: '50–59%', min: 0.50, max: 0.5999 },
    { label: '60–64%', min: 0.60, max: 0.6499 },
    { label: '65–69%', min: 0.65, max: 0.6999 },
    { label: '70–74%', min: 0.70, max: 0.7499 },
    { label: '75–79%', min: 0.75, max: 0.7999 },
    { label: '80%+', min: 0.80, max: 1.00 },
  ]

  return bucketsDef.map((b) => {
    const itemsInBucket = settled.filter((s) => {
      const p = Number(s.estimated_probability || 0)
      return p >= b.min && p <= b.max
    })

    const totalBets = itemsInBucket.length
    const wonBets = itemsInBucket.filter((s) => s.result === 'won').length
    const actualWinRate = totalBets > 0 ? Number(((wonBets / totalBets) * 100).toFixed(1)) : 0

    const avgPredictedProb =
      totalBets > 0
        ? Number(
            (
              (itemsInBucket.reduce((acc, s) => acc + Number(s.estimated_probability || 0), 0) / totalBets) *
              100
            ).toFixed(1)
          )
        : 0

    const differencePp = totalBets > 0 ? Number((actualWinRate - avgPredictedProb).toFixed(1)) : 0

    return {
      rangeLabel: b.label,
      minProb: b.min,
      maxProb: b.max,
      totalBets,
      wonBets,
      avgPredictedProb,
      actualWinRate,
      differencePp,
    }
  })
}

export async function getSelectedVsAlternativesComparison(modelId?: number): Promise<SelectedVsAlternativesComparison> {
  const supabase = await createClient()

  let selQuery = supabase
    .from('betting_selections')
    .select(`
      result,
      odds,
      estimated_probability,
      edge_percentage_points,
      betting_tickets!inner (
        model_id
      )
    `)

  let altQuery = supabase
    .from('betting_alternatives')
    .select(`
      result,
      odds,
      estimated_probability,
      edge_percentage_points,
      betting_tickets!inner (
        model_id
      )
    `)

  if (modelId) {
    selQuery = selQuery.eq('betting_tickets.model_id', modelId)
    altQuery = altQuery.eq('betting_tickets.model_id', modelId)
  }

  const [{ data: selData }, { data: altData }] = await Promise.all([selQuery, altQuery])

  function calculateGroup(items: any[]) {
    const list = items || []
    const total = list.length
    const won = list.filter((i) => i.result === 'won').length
    const lost = list.filter((i) => i.result === 'lost').length
    const pending = list.filter((i) => i.result === 'pending').length
    const voidCount = list.filter((i) => i.result === 'void').length
    const settled = won + lost
    const winRate = settled > 0 ? Number(((won / settled) * 100).toFixed(1)) : 0

    const avgProbability =
      total > 0
        ? Number(((list.reduce((acc, i) => acc + Number(i.estimated_probability || 0), 0) / total) * 100).toFixed(1))
        : 0

    const avgOdds =
      total > 0
        ? Number((list.reduce((acc, i) => acc + Number(i.odds || 0), 0) / total).toFixed(2))
        : 0

    const avgEdge =
      total > 0
        ? Number((list.reduce((acc, i) => acc + Number(i.edge_percentage_points || 0), 0) / total).toFixed(1))
        : 0

    return {
      total,
      won,
      lost,
      pending,
      void: voidCount,
      winRate,
      avgProbability,
      avgOdds,
      avgEdge,
    }
  }

  return {
    selected: calculateGroup(selData || []),
    alternatives: calculateGroup(altData || []),
  }
}
