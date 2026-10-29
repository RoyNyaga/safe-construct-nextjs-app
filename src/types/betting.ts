export type BettingModelStatus = 'draft' | 'active' | 'retired'
export type TicketStatus = 'pending' | 'won' | 'lost' | 'void'
export type SelectionResultStatus = 'pending' | 'won' | 'lost' | 'void'
export type TransactionType = 'deposit' | 'withdrawal' | 'bet_stake' | 'bet_win' | 'bet_refund' | 'adjustment'
export type TriggerType = 'manual' | 'automatic'
export type AlignmentRemark = 'very_high' | 'high' | 'medium' | 'low' | 'very_low'
export type EdgeRemark = 'very_high' | 'high' | 'medium' | 'low' | 'very_low'

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
  // Season-overall statistics (All venues combined)
  home_overall_matches_played?: number | null
  home_overall_goals_scored?: number | null
  home_overall_goals_conceded?: number | null
  home_overall_goals_per_game?: number | null
  home_overall_conceded_per_game?: number | null
  away_overall_matches_played?: number | null
  away_overall_goals_scored?: number | null
  away_overall_goals_conceded?: number | null
  away_overall_goals_per_game?: number | null
  away_overall_conceded_per_game?: number | null
  market: string
  selection: string
  odds: number | null
  estimated_probability: number | null
  breakeven_probability: number | null
  edge_percentage_points: number | null
  expected_value: number | null
  current_league_home_avg?: number | null
  current_league_away_avg?: number | null
  historical_league_home_avg?: number | null
  historical_league_away_avg?: number | null
  historical_estimated_probability?: number | null
  alignment_delta_pp?: number | null
  alignment_remark?: AlignmentRemark | null
  edge_remark?: EdgeRemark | null
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
  home_league_position?: number | null
  away_league_position?: number | null
  home_matches_played?: number | null
  away_matches_played?: number | null
  home_goals_scored?: number | null
  home_goals_conceded?: number | null
  away_goals_scored?: number | null
  away_goals_conceded?: number | null
  home_goals_per_game?: number | null
  home_conceded_per_game?: number | null
  away_goals_per_game?: number | null
  away_conceded_per_game?: number | null
  // Season-overall statistics (All venues combined)
  home_overall_matches_played?: number | null
  home_overall_goals_scored?: number | null
  home_overall_goals_conceded?: number | null
  home_overall_goals_per_game?: number | null
  home_overall_conceded_per_game?: number | null
  away_overall_matches_played?: number | null
  away_overall_goals_scored?: number | null
  away_overall_goals_conceded?: number | null
  away_overall_goals_per_game?: number | null
  away_overall_conceded_per_game?: number | null
  market: string
  selection: string
  odds: number | null
  estimated_probability: number | null
  breakeven_probability: number | null
  edge_percentage_points: number | null
  expected_value: number | null
  current_league_home_avg?: number | null
  current_league_away_avg?: number | null
  historical_league_home_avg?: number | null
  historical_league_away_avg?: number | null
  historical_estimated_probability?: number | null
  alignment_delta_pp?: number | null
  alignment_remark?: AlignmentRemark | null
  edge_remark?: EdgeRemark | null
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
  betting_warnings?: BettingWarning[]
}

// ─── CHATGPT JSON CONTRACTS ──────────────────────────────────────────────────

export interface NestedWarningImportJSON {
  warning_id?: string | null
  type: string
  severity?: WarningSeverity
  market_relevance?: WarningMarketRelevance
  direction?: WarningDirection
  description: string
  evidence?: string | null
  verified?: boolean
  numerical_adjustment?: boolean
  pre_match_status?: string
  post_match_status?: WarningPostMatchStatus
  review_notes?: string | null
}

export interface NestedWarningExportJSON {
  warning_uuid: string
  type: string
  severity: WarningSeverity
  market_relevance: WarningMarketRelevance
  direction: WarningDirection
  description: string
  evidence: string | null
  pre_match_status: string
  post_match_status: WarningPostMatchStatus
  review_notes: string | null
}

export interface WarningImportJSON {
  warning_id?: string | null
  selection_reference: {
    home_team: string
    away_team: string
    market?: string
    selection?: string
    target_type?: 'selection' | 'alternative'
  }
  type: string
  severity?: WarningSeverity
  market_relevance?: WarningMarketRelevance
  direction?: WarningDirection
  description: string
  evidence?: string | null
  verified?: boolean
  numerical_adjustment?: boolean
  pre_match_status?: string
  post_match_status?: WarningPostMatchStatus
  review_notes?: string | null
}

export interface TicketSuggestionData {
  ticketNumber: string
  prefix: 'S' | 'A'
  countPlusOne: number
  totalCount: number
  modelVersion: string
  modelId: number | null
  modelUuid: string | null
  selectionCount: number
  alternativeCount: number
  nextSelectionTicketNumber: string
  nextAlternativeTicketNumber: string
  error?: string
}

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
    // Season-overall statistics (All venues combined)
    home_overall_matches_played?: number | null
    home_overall_goals_scored?: number | null
    home_overall_goals_conceded?: number | null
    home_overall_goals_per_game?: number | null
    home_overall_conceded_per_game?: number | null
    away_overall_matches_played?: number | null
    away_overall_goals_scored?: number | null
    away_overall_goals_conceded?: number | null
    away_overall_goals_per_game?: number | null
    away_overall_conceded_per_game?: number | null
    market: string
    selection: string
    odds?: number | null
    estimated_probability?: number | null
    breakeven_probability?: number | null
    edge_percentage_points?: number | null
    expected_value?: number | null
    current_league_home_avg?: number | null
    current_league_away_avg?: number | null
    historical_league_home_avg?: number | null
    historical_league_away_avg?: number | null
    historical_estimated_probability?: number | null
    alignment_delta_pp?: number | null
    alignment_remark?: AlignmentRemark | null
    edge_remark?: EdgeRemark | null
    actual_home_score?: number | null
    actual_away_score?: number | null
    result?: SelectionResultStatus
    comment?: string | null
    notes?: string | null
    warnings?: NestedWarningImportJSON[]
  }>
  alternatives?: Array<{
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
    // Season-overall statistics (All venues combined)
    home_overall_matches_played?: number | null
    home_overall_goals_scored?: number | null
    home_overall_goals_conceded?: number | null
    home_overall_goals_per_game?: number | null
    home_overall_conceded_per_game?: number | null
    away_overall_matches_played?: number | null
    away_overall_goals_scored?: number | null
    away_overall_goals_conceded?: number | null
    away_overall_goals_per_game?: number | null
    away_overall_conceded_per_game?: number | null
    market: string
    selection: string
    odds?: number | null
    estimated_probability?: number | null
    breakeven_probability?: number | null
    edge_percentage_points?: number | null
    expected_value?: number | null
    current_league_home_avg?: number | null
    current_league_away_avg?: number | null
    historical_league_home_avg?: number | null
    historical_league_away_avg?: number | null
    historical_estimated_probability?: number | null
    alignment_delta_pp?: number | null
    alignment_remark?: AlignmentRemark | null
    edge_remark?: EdgeRemark | null
    actual_home_score?: number | null
    actual_away_score?: number | null
    result?: SelectionResultStatus
    comment?: string | null
    notes?: string | null
    warnings?: NestedWarningImportJSON[]
  }>
  warnings?: WarningImportJSON[]
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
    // Season-overall statistics (All venues combined)
    home_overall_matches_played?: number | null
    home_overall_goals_scored?: number | null
    home_overall_goals_conceded?: number | null
    home_overall_goals_per_game?: number | null
    home_overall_conceded_per_game?: number | null
    away_overall_matches_played?: number | null
    away_overall_goals_scored?: number | null
    away_overall_goals_conceded?: number | null
    away_overall_goals_per_game?: number | null
    away_overall_conceded_per_game?: number | null
    market: string
    selection: string
    odds: number | null
    estimated_probability: number | null
    breakeven_probability: number | null
    edge_percentage_points: number | null
    expected_value: number | null
    current_league_home_avg?: number | null
    current_league_away_avg?: number | null
    historical_league_home_avg?: number | null
    historical_league_away_avg?: number | null
    historical_estimated_probability?: number | null
    alignment_delta_pp?: number | null
    alignment_remark?: AlignmentRemark | null
    edge_remark?: EdgeRemark | null
    actual_home_score: number | null
    actual_away_score: number | null
    result: SelectionResultStatus
    comment: string | null
    notes: string | null
    warnings?: NestedWarningExportJSON[]
  }>
  alternatives: Array<{
    match_date: string | null
    country: string | null
    league: string | null
    home_team: string
    away_team: string
    home_league_position?: number | null
    away_league_position?: number | null
    home_matches_played?: number | null
    away_matches_played?: number | null
    home_goals_scored?: number | null
    home_goals_conceded?: number | null
    away_goals_scored?: number | null
    away_goals_conceded?: number | null
    home_goals_per_game?: number | null
    home_conceded_per_game?: number | null
    away_goals_per_game?: number | null
    away_conceded_per_game?: number | null
    // Season-overall statistics (All venues combined)
    home_overall_matches_played?: number | null
    home_overall_goals_scored?: number | null
    home_overall_goals_conceded?: number | null
    home_overall_goals_per_game?: number | null
    home_overall_conceded_per_game?: number | null
    away_overall_matches_played?: number | null
    away_overall_goals_scored?: number | null
    away_overall_goals_conceded?: number | null
    away_overall_goals_per_game?: number | null
    away_overall_conceded_per_game?: number | null
    market: string
    selection: string
    odds: number | null
    estimated_probability: number | null
    breakeven_probability: number | null
    edge_percentage_points: number | null
    expected_value: number | null
    current_league_home_avg?: number | null
    current_league_away_avg?: number | null
    historical_league_home_avg?: number | null
    historical_league_away_avg?: number | null
    historical_estimated_probability?: number | null
    alignment_delta_pp?: number | null
    alignment_remark?: AlignmentRemark | null
    edge_remark?: EdgeRemark | null
    actual_home_score: number | null
    actual_away_score: number | null
    result: SelectionResultStatus
    comment: string | null
    notes: string | null
    warnings?: NestedWarningExportJSON[]
  }>
  warnings?: Array<{
    warning_uuid: string
    target_type: 'selection' | 'alternative'
    match: {
      home_team: string
      away_team: string
      country: string | null
      league: string | null
      market: string
      selection: string
      actual_home_score: number | null
      actual_away_score: number | null
      result: string
    }
    type: string
    severity: WarningSeverity
    market_relevance: WarningMarketRelevance
    direction: WarningDirection
    description: string
    evidence: string | null
    pre_match_status: string
    post_match_status: WarningPostMatchStatus
    review_notes: string | null
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

export type CalibrationScope = 'all' | 'selections' | 'alternatives'

export interface ModelCalibrationData {
  all: CalibrationBucket[]
  selections: CalibrationBucket[]
  alternatives: CalibrationBucket[]
  counts: {
    all: number
    selections: number
    alternatives: number
  }
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

// ─── WARNING MANAGEMENT & EVALUATION TYPES ───────────────────────────────────

export type WarningSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type WarningMarketRelevance = 'DIRECT' | 'INDIRECT' | 'CONTEXTUAL'
export type WarningDirection = 'CONTRADICTORY' | 'NEUTRAL' | 'SUPPORTIVE'
export type WarningPostMatchStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'NOT_CONFIRMED'
  | 'INCONCLUSIVE'
  | 'NOT_APPLICABLE'

export type WarningEvidenceAssessment =
  | 'SUPPORTED'
  | 'CONTRADICTED'
  | 'PARTIAL'
  | 'INCONCLUSIVE'

export type WarningConfidence = 'LOW' | 'MEDIUM' | 'HIGH'

export interface BettingWarningReview {
  id: number
  uuid: string
  warning_id: number
  previous_status: string | null
  new_status: WarningPostMatchStatus
  review_notes: string | null
  evidence_assessment: WarningEvidenceAssessment | null
  confidence: WarningConfidence | null
  review_source: string
  created_at: string
}

export interface BettingWarning {
  id: number
  uuid: string
  ticket_id: number
  selection_id: number | null
  alternative_id: number | null
  target_type: 'selection' | 'alternative'
  warning_type: string
  severity: WarningSeverity
  market_relevance: WarningMarketRelevance
  direction: WarningDirection
  description: string
  evidence: string | null
  verified: boolean
  numerical_adjustment: boolean
  pre_match_status: string
  post_match_status: WarningPostMatchStatus
  review_notes: string | null
  created_at: string
  updated_at: string
  // Relations
  betting_tickets?: BettingTicket | null
  betting_selections?: BettingSelection | null
  betting_alternatives?: BettingAlternative | null
  betting_warning_reviews?: BettingWarningReview[]
}

// ─── WARNING CHATGPT EXPORT & BATCH UPDATE CONTRACTS ─────────────────────────

export interface WarningExportItem {
  warning_uuid: string
  warning_type: string
  severity: WarningSeverity
  direction: WarningDirection
  market_relevance: WarningMarketRelevance
  target_type: 'selection' | 'alternative'
  ticket_number: string | null
  ticket_uuid: string
  match: {
    home_team: string
    away_team: string
    country: string | null
    league: string | null
    market: string
    selection: string
    odds: number | null
    estimated_probability: number | null
    historical_estimated_probability?: number | null
    actual_home_score: number | null
    actual_away_score: number | null
    result: string
    is_settled: boolean
  }
  description: string
  pre_match_evidence: string | null
  pre_match_status: string
  current_post_match_status: WarningPostMatchStatus
  existing_review_notes: string | null
}

export interface WarningsExportJSON {
  export_type: 'warning_post_match_evaluation_request'
  ticket_uuid?: string | null
  ticket_number?: string | null
  total_warnings: number
  pending_warnings_count: number
  generated_at: string
  warnings: WarningExportItem[]
}

export interface WarningBatchUpdateItem {
  warning_id: string // UUID
  post_match_status: WarningPostMatchStatus
  review_notes: string
  evidence_assessment?: WarningEvidenceAssessment
  confidence?: WarningConfidence
}

export interface WarningBatchUpdateJSON {
  operation: 'warning_post_match_update'
  schema_version: string
  updates: WarningBatchUpdateItem[]
}

// ─── WARNING ANALYTICS TYPES ─────────────────────────────────────────────────

export interface WarningAnalyticsSummary {
  totalWarnings: number
  pendingWarnings: number
  confirmedWarnings: number
  notConfirmedWarnings: number
  inconclusiveWarnings: number
  confirmationRate: number // % of evaluated warnings that are CONFIRMED
  evaluationRate: number // % of total warnings with settled status
  bySeverity: Record<WarningSeverity, number>
  byDirection: Record<WarningDirection, number>
  byType: Array<{
    type: string
    count: number
    confirmed: number
    winRateWhenPresent: number
  }>
  impactOnOutcome: {
    withHighCriticalContradictoryWinRate: number
    withoutWarningsWinRate: number
    allBetsWinRate: number
  }
}


