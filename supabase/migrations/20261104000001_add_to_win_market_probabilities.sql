-- Migration: 20261104000001_add_to_win_market_probabilities.sql
-- Description: Register Model 4.0 (roys_betting_engine_BTS_O2-5_win) and add dedicated
-- 1X2 / Match Winner probability tracking columns (prob_home_win, prob_away_win, prob_draw)
-- to both public.betting_selections and public.betting_alternatives.

-- 1. Register Model 4.0 & Transition Model 3.0
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.betting_models WHERE version = '4.0') THEN
    UPDATE public.betting_models
    SET
      name = 'roys_betting_engine_BTS_O2-5_win',
      description = 'Multi-market statistical engine targeting Over 2.5, BTTS, Under 3.5, Over 1.5, and rigorous 5-Gate To Win / Draw No Bet (DNB) selections in short 2-3 leg accumulators.',
      status = 'active',
      is_active = true,
      updated_at = timezone('utc'::text, now())
    WHERE version = '4.0';
  ELSE
    INSERT INTO public.betting_models (uuid, version, name, description, status, is_active)
    VALUES (
      gen_random_uuid(),
      '4.0',
      'roys_betting_engine_BTS_O2-5_win',
      'Multi-market statistical engine targeting Over 2.5, BTTS, Under 3.5, Over 1.5, and rigorous 5-Gate To Win / Draw No Bet (DNB) selections in short 2-3 leg accumulators.',
      'active',
      true
    );
  END IF;
END $$;

UPDATE public.betting_models
SET is_active = false, status = 'retired', updated_at = timezone('utc'::text, now())
WHERE version = '3.0' OR (version NOT IN ('4.0') AND is_active = true);

-- 2. Add Dedicated Tracking Columns to betting_selections
ALTER TABLE public.betting_selections
  ADD COLUMN IF NOT EXISTS prob_home_win NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS prob_away_win NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS prob_draw NUMERIC(5,4);

-- 3. Add Dedicated Tracking Columns to betting_alternatives (Full Parity)
ALTER TABLE public.betting_alternatives
  ADD COLUMN IF NOT EXISTS prob_home_win NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS prob_away_win NUMERIC(5,4),
  ADD COLUMN IF NOT EXISTS prob_draw NUMERIC(5,4);

-- 4. Comments for Schema Documentation
COMMENT ON COLUMN public.betting_selections.prob_home_win IS 'Poisson model probability of the home team winning (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_selections.prob_away_win IS 'Poisson model probability of the away team winning (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_selections.prob_draw IS 'Poisson model probability of a draw (0.0000 - 1.0000)';

COMMENT ON COLUMN public.betting_alternatives.prob_home_win IS 'Poisson model probability of the home team winning (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_alternatives.prob_away_win IS 'Poisson model probability of the away team winning (0.0000 - 1.0000)';
COMMENT ON COLUMN public.betting_alternatives.prob_draw IS 'Poisson model probability of a draw (0.0000 - 1.0000)';

