-- Migration: 20261102000001_add_multi_market_probabilities.sql
-- Description: Register Model 3.0 (roys_betting_engine_BTS_O2-5) and add dedicated
-- multi-market probability tracking columns (prob_over_1_5, prob_over_2_5, prob_btts_yes, prob_under_3_5, market_evaluations)
-- to both betting_selections and betting_alternatives.

-- 1. Register New Model 3.0 & Archive Model 2.1
INSERT INTO public.betting_models (uuid, version, name, description, status, is_active)
VALUES (
  gen_random_uuid(),
  '3.0',
  'roys_betting_engine_BTS_O2-5',
  'Multi-market statistical engine targeting Over 2.5, BTTS (Yes/No), Under 3.5, and Over 1.5 in short 2-3 leg accumulators.',
  'active',
  true
)
ON CONFLICT (version) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  status = 'active',
  is_active = true,
  updated_at = timezone('utc'::text, now());

UPDATE public.betting_models
SET is_active = false, status = 'retired', updated_at = timezone('utc'::text, now())
WHERE version = '2.1';

-- 2. Add Dedicated Tracking Columns to betting_selections
ALTER TABLE public.betting_selections
  ADD COLUMN IF NOT EXISTS prob_over_1_5 NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS prob_over_2_5 NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS prob_btts_yes NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS prob_under_3_5 NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS market_evaluations JSONB;

-- 3. Add Dedicated Tracking Columns to betting_alternatives (Full Parity)
ALTER TABLE public.betting_alternatives
  ADD COLUMN IF NOT EXISTS prob_over_1_5 NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS prob_over_2_5 NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS prob_btts_yes NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS prob_under_3_5 NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS market_evaluations JSONB;

COMMENT ON COLUMN public.betting_selections.prob_over_1_5 IS 'Poisson model probability of match having Over 1.5 goals (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_selections.prob_over_2_5 IS 'Poisson model probability of match having Over 2.5 goals (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_selections.prob_btts_yes IS 'Poisson model probability of both teams scoring at least 1 goal (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_selections.prob_under_3_5 IS 'Poisson model probability of match having Under 3.5 goals (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_selections.market_evaluations IS 'Full JSON matrix of odds, break-even %, edges, and EVs evaluated across all markets for this match';

COMMENT ON COLUMN public.betting_alternatives.prob_over_1_5 IS 'Poisson model probability of match having Over 1.5 goals (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_alternatives.prob_over_2_5 IS 'Poisson model probability of match having Over 2.5 goals (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_alternatives.prob_btts_yes IS 'Poisson model probability of both teams scoring at least 1 goal (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_alternatives.prob_under_3_5 IS 'Poisson model probability of match having Under 3.5 goals (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_alternatives.market_evaluations IS 'Full JSON matrix of odds, break-even %, edges, and EVs evaluated across all markets for this match';

