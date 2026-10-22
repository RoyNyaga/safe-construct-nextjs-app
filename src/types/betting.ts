export type BettingModelStatus = 'draft' | 'active' | 'retired'
export type TicketStatus = 'pending' | 'won' | 'lost' | 'void'
export type SelectionResultStatus = 'pending' | 'won' | 'lost' | 'void'
export type TransactionType = 'deposit' | 'withdrawal' | 'bet_stake' | 'bet_win' | 'bet_refund' | 'adjustment'
export type TriggerType = 'manual' | 'automatic'

export interface BettingModel {
  id: number
  uuid: string
  version: string
  name: string
  description: string | null
  content: string | null
  status: BettingModelStatus
  is_active: boolean
  created_at: string
  updated_at: string
  // Derived/computed stats (optional)
  total_tickets?: number
  won_tickets?: number
  lost_tickets?: number
  win_rate?: number
  roi?: number
}

export interface BettingBankroll {
  id: number
  uuid: string
  name: string
  currency: string
  current_balance: number
  initial_deposit: number
  total_deposited: number
  total_withdrawn: number
  total_staked: number
  total_payout: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BettingTransaction {
  id: number
  uuid: string
  bankroll_id: number
  ticket_id: number | null
  transaction_type: TransactionType
  trigger_type: TriggerType
  amount: number
  balance_before: number
  balance_after: number
  description: string | null
  created_at: string
  // Joined relation
  betting_tickets?: {
    uuid: string
    ticket_number: string | null
  } | null
}

export interface BettingSelection {
  id: number
  uuid: string
  ticket_id: number
  match_date: string | null
  country: string | null
  league: string | null
  home_team: string
  away_team: string
  home_league_position: number | null
  away_league_position: number | null
  home_matches_played: number | null
  away_matches_played: number | null
  home_goals_scored: number | null
  home_goals_conceded: number | null
  away_goals_scored: number | null
  away_goals_conceded: number | null
  home_goals_per_game: number | null
  home_conceded_per_game: number | null
  away_goals_per_game: number | null
  away_conceded_per_game: number | null
  market: string
  selection: string
  odds: number | null
  estimated_probability: number | null
  breakeven_probability: number | null
  edge_percentage_points: number | null
  expected_value: number | null
  actual_home_score: number | null
  actual_away_score: number | null
  result: SelectionResultStatus
  comment: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface BettingAlternative {
  id: number
  uuid: string
  ticket_id: number
  match_date: string | null
  country: string | null
  league: string | null
  home_team: string
  away_team: string
  home_matches_played?: number | null
  away_matches_played?: number | null
  market: string
  selection: string
  odds: number | null
  estimated_probability: number | null
  breakeven_probability: number | null
  edge_percentage_points: number | null
  expected_value: number | null
  actual_home_score: number | null
  actual_away_score: number | null
  result: SelectionResultStatus
  comment: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface BettingTicket {
  id: number
  uuid: string
  ticket_number: string | null
  ticket_date: string
  model_id: number | null
  bankroll_id: number | null
  stake: number
  combined_odds: number | null
  estimated_ticket_probability: number | null
  status: TicketStatus
  actual_result: string | null
  profit_loss: number
  notes: string | null
  created_at: string
  updated_at: string
  // Relations
  betting_models?: BettingModel | null
  betting_selections?: BettingSelection[]
  betting_alternatives?: BettingAlternative[]
  betting_transactions?: BettingTransaction[]
}

// ─── CHATGPT JSON CONTRACTS ──────────────────────────────────────────────────

export interface TicketImportJSON {
  ticket: {
    ticket_number?: string
    date?: string
    model_version?: string
    model_uuid?: string
    model_name?: string
    stake?: number
    combined_odds?: number
    estimated_ticket_probability?: number
    status?: TicketStatus
    actual_result?: string | null
    profit_loss?: number
    notes?: string | null
  }
  selections: Array<{
    match_date?: string | null
    country?: string | null
    league?: string | null
    home_team: string
    away_team: string
    home_league_position?: number | null
    away_league_position?: number | null
    home_matches_played?: number | null
    away_matches_played?: number | null
    home_games_played?: number | null
    away_games_played?: number | null
    home_goals_scored?: number | null
    home_goals_conceded?: number | null
    away_goals_scored?: number | null
    away_goals_conceded?: number | null
    home_goals_per_game?: number | null
    home_conceded_per_game?: number | null
    away_goals_per_game?: number | null
    away_conceded_per_game?: number | null
    market: string
    selection: string
    odds?: number | null
    estimated_probability?: number | null
    breakeven_probability?: number | null
    edge_percentage_points?: number | null
    expected_value?: number | null
    actual_home_score?: number | null
    actual_away_score?: number | null
    result?: SelectionResultStatus
    comment?: string | null
    notes?: string | null
  }>
  alternatives?: Array<{
    match_date?: string | null
    country?: string | null
    league?: string | null
    home_team: string
    away_team: string
    home_matches_played?: number | null
    away_matches_played?: number | null
    home_games_played?: number | null
    away_games_played?: number | null
    market: string
    selection: string
    odds?: number | null
    estimated_probability?: number | null
    breakeven_probability?: number | null
    edge_percentage_points?: number | null
    expected_value?: number | null
    actual_home_score?: number | null
    actual_away_score?: number | null
    result?: SelectionResultStatus
    comment?: string | null
    notes?: string | null
  }>
}

export interface TicketExportJSON {
  ticket: {
    ticket_number: string | null
    date: string
    model_version: string | null
    model_uuid: string | null
    model_name: string | null
    stake: number
    combined_odds: number | null
    estimated_ticket_probability: number | null
    status: TicketStatus
    actual_result: string | null
    profit_loss: number
    notes: string | null
  }
  selections: Array<{
    match_date: string | null
    country: string | null
    league: string | null
    home_team: string
    away_team: string
    home_league_position: number | null
    away_league_position: number | null
    home_matches_played: number | null
    away_matches_played: number | null
    home_goals_scored: number | null
    home_goals_conceded: number | null
    away_goals_scored: number | null
    away_goals_conceded: number | null
    home_goals_per_game: number | null
    home_conceded_per_game: number | null
    away_goals_per_game: number | null
    away_conceded_per_game: number | null
    market: string
    selection: string
    odds: number | null
    estimated_probability: number | null
    breakeven_probability: number | null
    edge_percentage_points: number | null
    expected_value: number | null
    actual_home_score: number | null
    actual_away_score: number | null
    result: SelectionResultStatus
    comment: string | null
    notes: string | null
  }>
  alternatives: Array<{
    match_date: string | null
    country: string | null
    league: string | null
    home_team: string
    away_team: string
    home_matches_played?: number | null
    away_matches_played?: number | null
    market: string
    selection: string
    odds: number | null
    estimated_probability: number | null
    breakeven_probability: number | null
    edge_percentage_points: number | null
    expected_value: number | null
    actual_home_score: number | null
    actual_away_score: number | null
    result: SelectionResultStatus
    comment: string | null
    notes: string | null
  }>
}

// ─── STATISTICAL AGGREGATES & CALIBRATION ────────────────────────────────────

export interface CalibrationBucket {
  rangeLabel: string
  minProb: number
  maxProb: number
  totalBets: number
  wonBets: number
  avgPredictedProb: number
  actualWinRate: number
  differencePp: number
}

export interface ComparisonGroup {
  total: number
  won: number
  lost: number
  pending: number
  void: number
  winRate: number
  avgProbability: number
  avgOdds: number
  avgEdge: number
}

export interface SelectedVsAlternativesComparison {
  selected: ComparisonGroup
  alternatives: ComparisonGroup
}
