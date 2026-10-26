-- Migration: 20261026000000_add_full_parity_and_dual_baselines.sql
-- Purpose:
-- 1. Add dual-baseline tracking columns to betting_selections and betting_alternatives.
-- 2. Add missing statistical matchup columns to betting_alternatives for 100% schema parity with betting_selections.

-- 1. Add dual-baseline tracking attributes to betting_selections
ALTER TABLE public.betting_selections
  ADD COLUMN IF NOT EXISTS current_league_home_avg numeric(4,2),
  ADD COLUMN IF NOT EXISTS current_league_away_avg numeric(4,2),
  ADD COLUMN IF NOT EXISTS historical_league_home_avg numeric(4,2),
  ADD COLUMN IF NOT EXISTS historical_league_away_avg numeric(4,2),
  ADD COLUMN IF NOT EXISTS historical_estimated_probability numeric(5,4);

-- 2. Add missing statistical attributes to betting_alternatives (100% schema parity with selections)
ALTER TABLE public.betting_alternatives
  ADD COLUMN IF NOT EXISTS home_league_position integer,
  ADD COLUMN IF NOT EXISTS away_league_position integer,
  ADD COLUMN IF NOT EXISTS home_goals_scored numeric(6,2),
  ADD COLUMN IF NOT EXISTS home_goals_conceded numeric(6,2),
  ADD COLUMN IF NOT EXISTS away_goals_scored numeric(6,2),
  ADD COLUMN IF NOT EXISTS away_goals_conceded numeric(6,2),
  ADD COLUMN IF NOT EXISTS home_goals_per_game numeric(6,3),
  ADD COLUMN IF NOT EXISTS home_conceded_per_game numeric(6,3),
  ADD COLUMN IF NOT EXISTS away_goals_per_game numeric(6,3),
  ADD COLUMN IF NOT EXISTS away_conceded_per_game numeric(6,3);

-- 3. Add dual-baseline tracking attributes to betting_alternatives
ALTER TABLE public.betting_alternatives
  ADD COLUMN IF NOT EXISTS current_league_home_avg numeric(4,2),
  ADD COLUMN IF NOT EXISTS current_league_away_avg numeric(4,2),
  ADD COLUMN IF NOT EXISTS historical_league_home_avg numeric(4,2),
  ADD COLUMN IF NOT EXISTS historical_league_away_avg numeric(4,2),
  ADD COLUMN IF NOT EXISTS historical_estimated_probability numeric(5,4);
