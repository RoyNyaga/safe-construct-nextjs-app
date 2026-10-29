-- Migration: 20261029000000_add_overall_team_stats.sql
-- Purpose:
-- 1. Add season-overall (all venues) performance metrics to betting_selections and betting_alternatives.
-- 2. Clarify and document existing venue-specific columns vs new overall columns.

-- 1. Add overall performance columns to betting_selections
ALTER TABLE public.betting_selections
  ADD COLUMN IF NOT EXISTS home_overall_matches_played integer,
  ADD COLUMN IF NOT EXISTS home_overall_goals_scored numeric(6,2),
  ADD COLUMN IF NOT EXISTS home_overall_goals_conceded numeric(6,2),
  ADD COLUMN IF NOT EXISTS home_overall_goals_per_game numeric(6,3),
  ADD COLUMN IF NOT EXISTS home_overall_conceded_per_game numeric(6,3),
  ADD COLUMN IF NOT EXISTS away_overall_matches_played integer,
  ADD COLUMN IF NOT EXISTS away_overall_goals_scored numeric(6,2),
  ADD COLUMN IF NOT EXISTS away_overall_goals_conceded numeric(6,2),
  ADD COLUMN IF NOT EXISTS away_overall_goals_per_game numeric(6,3),
  ADD COLUMN IF NOT EXISTS away_overall_conceded_per_game numeric(6,3);

-- 2. Add overall performance columns to betting_alternatives for 100% schema parity
ALTER TABLE public.betting_alternatives
  ADD COLUMN IF NOT EXISTS home_overall_matches_played integer,
  ADD COLUMN IF NOT EXISTS home_overall_goals_scored numeric(6,2),
  ADD COLUMN IF NOT EXISTS home_overall_goals_conceded numeric(6,2),
  ADD COLUMN IF NOT EXISTS home_overall_goals_per_game numeric(6,3),
  ADD COLUMN IF NOT EXISTS home_overall_conceded_per_game numeric(6,3),
  ADD COLUMN IF NOT EXISTS away_overall_matches_played integer,
  ADD COLUMN IF NOT EXISTS away_overall_goals_scored numeric(6,2),
  ADD COLUMN IF NOT EXISTS away_overall_goals_conceded numeric(6,2),
  ADD COLUMN IF NOT EXISTS away_overall_goals_per_game numeric(6,3),
  ADD COLUMN IF NOT EXISTS away_overall_conceded_per_game numeric(6,3);

-- 3. Document venue-specific vs season-overall columns on betting_selections
COMMENT ON COLUMN public.betting_selections.home_matches_played IS 'Venue-specific: Total home matches played by home team (used by Poisson model)';
COMMENT ON COLUMN public.betting_selections.home_goals_scored IS 'Venue-specific: Total home goals scored by home team at home';
COMMENT ON COLUMN public.betting_selections.home_goals_conceded IS 'Venue-specific: Total home goals conceded by home team at home';
COMMENT ON COLUMN public.betting_selections.home_goals_per_game IS 'Venue-specific: Average home goals scored per match by home team';
COMMENT ON COLUMN public.betting_selections.home_conceded_per_game IS 'Venue-specific: Average home goals conceded per match by home team';

COMMENT ON COLUMN public.betting_selections.away_matches_played IS 'Venue-specific: Total away matches played by away team (used by Poisson model)';
COMMENT ON COLUMN public.betting_selections.away_goals_scored IS 'Venue-specific: Total away goals scored by away team away from home';
COMMENT ON COLUMN public.betting_selections.away_goals_conceded IS 'Venue-specific: Total away goals conceded by away team away from home';
COMMENT ON COLUMN public.betting_selections.away_goals_per_game IS 'Venue-specific: Average away goals scored per match by away team';
COMMENT ON COLUMN public.betting_selections.away_conceded_per_game IS 'Venue-specific: Average away goals conceded per match by away team';

COMMENT ON COLUMN public.betting_selections.home_overall_matches_played IS 'Season-overall: Total matches played across all venues by home team';
COMMENT ON COLUMN public.betting_selections.home_overall_goals_scored IS 'Season-overall: Total goals scored across all venues by home team';
COMMENT ON COLUMN public.betting_selections.home_overall_goals_conceded IS 'Season-overall: Total goals conceded across all venues by home team';
COMMENT ON COLUMN public.betting_selections.home_overall_goals_per_game IS 'Season-overall: Average goals scored per game across all venues by home team';
COMMENT ON COLUMN public.betting_selections.home_overall_conceded_per_game IS 'Season-overall: Average goals conceded per game across all venues by home team';

COMMENT ON COLUMN public.betting_selections.away_overall_matches_played IS 'Season-overall: Total matches played across all venues by away team';
COMMENT ON COLUMN public.betting_selections.away_overall_goals_scored IS 'Season-overall: Total goals scored across all venues by away team';
COMMENT ON COLUMN public.betting_selections.away_overall_goals_conceded IS 'Season-overall: Total goals conceded across all venues by away team';
COMMENT ON COLUMN public.betting_selections.away_overall_goals_per_game IS 'Season-overall: Average goals scored per game across all venues by away team';
COMMENT ON COLUMN public.betting_selections.away_overall_conceded_per_game IS 'Season-overall: Average goals conceded per game across all venues by away team';

-- 4. Document venue-specific vs season-overall columns on betting_alternatives
COMMENT ON COLUMN public.betting_alternatives.home_matches_played IS 'Venue-specific: Total home matches played by home team (used by Poisson model)';
COMMENT ON COLUMN public.betting_alternatives.home_goals_scored IS 'Venue-specific: Total home goals scored by home team at home';
COMMENT ON COLUMN public.betting_alternatives.home_goals_conceded IS 'Venue-specific: Total home goals conceded by home team at home';
COMMENT ON COLUMN public.betting_alternatives.home_goals_per_game IS 'Venue-specific: Average home goals scored per match by home team';
COMMENT ON COLUMN public.betting_alternatives.home_conceded_per_game IS 'Venue-specific: Average home goals conceded per match by home team';

COMMENT ON COLUMN public.betting_alternatives.away_matches_played IS 'Venue-specific: Total away matches played by away team (used by Poisson model)';
COMMENT ON COLUMN public.betting_alternatives.away_goals_scored IS 'Venue-specific: Total away goals scored by away team away from home';
COMMENT ON COLUMN public.betting_alternatives.away_goals_conceded IS 'Venue-specific: Total away goals conceded by away team away from home';
COMMENT ON COLUMN public.betting_alternatives.away_goals_per_game IS 'Venue-specific: Average away goals scored per match by away team';
COMMENT ON COLUMN public.betting_alternatives.away_conceded_per_game IS 'Venue-specific: Average away goals conceded per match by away team';

COMMENT ON COLUMN public.betting_alternatives.home_overall_matches_played IS 'Season-overall: Total matches played across all venues by home team';
COMMENT ON COLUMN public.betting_alternatives.home_overall_goals_scored IS 'Season-overall: Total goals scored across all venues by home team';
COMMENT ON COLUMN public.betting_alternatives.home_overall_goals_conceded IS 'Season-overall: Total goals conceded across all venues by home team';
COMMENT ON COLUMN public.betting_alternatives.home_overall_goals_per_game IS 'Season-overall: Average goals scored per game across all venues by home team';
COMMENT ON COLUMN public.betting_alternatives.home_overall_conceded_per_game IS 'Season-overall: Average goals conceded per game across all venues by home team';

COMMENT ON COLUMN public.betting_alternatives.away_overall_matches_played IS 'Season-overall: Total matches played across all venues by away team';
COMMENT ON COLUMN public.betting_alternatives.away_overall_goals_scored IS 'Season-overall: Total goals scored across all venues by away team';
COMMENT ON COLUMN public.betting_alternatives.away_overall_goals_conceded IS 'Season-overall: Total goals conceded across all venues by away team';
COMMENT ON COLUMN public.betting_alternatives.away_overall_goals_per_game IS 'Season-overall: Average goals scored per game across all venues by away team';
COMMENT ON COLUMN public.betting_alternatives.away_overall_conceded_per_game IS 'Season-overall: Average goals conceded per game across all venues by away team';

