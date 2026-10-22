-- Add matches played attributes to betting_selections
ALTER TABLE public.betting_selections
ADD COLUMN IF NOT EXISTS home_matches_played integer,
ADD COLUMN IF NOT EXISTS away_matches_played integer;

-- Add matches played attributes to betting_alternatives for schema parity
ALTER TABLE public.betting_alternatives
ADD COLUMN IF NOT EXISTS home_matches_played integer,
ADD COLUMN IF NOT EXISTS away_matches_played integer;
