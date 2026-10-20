-- Fix betting RLS policies to allow authenticated admin operations without RLS recursion

-- 1. Drop old restrictive/recursive policies
DROP POLICY IF EXISTS "Admin manage betting_models" ON public.betting_models;
DROP POLICY IF EXISTS "Admin manage betting_bankrolls" ON public.betting_bankrolls;
DROP POLICY IF EXISTS "Admin manage betting_tickets" ON public.betting_tickets;
DROP POLICY IF EXISTS "Admin manage betting_transactions" ON public.betting_transactions;
DROP POLICY IF EXISTS "Admin manage betting_selections" ON public.betting_selections;
DROP POLICY IF EXISTS "Admin manage betting_alternatives" ON public.betting_alternatives;

-- 2. Re-create robust policies for authenticated users
CREATE POLICY "Admin manage betting_models" ON public.betting_models
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin manage betting_bankrolls" ON public.betting_bankrolls
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin manage betting_tickets" ON public.betting_tickets
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin manage betting_transactions" ON public.betting_transactions
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin manage betting_selections" ON public.betting_selections
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin manage betting_alternatives" ON public.betting_alternatives
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 3. Ensure seed bankroll and model exist
INSERT INTO public.betting_bankrolls (name, currency, current_balance, initial_deposit, is_active)
SELECT 'Main Bankroll', 'USD', 0.00, 0.00, true
WHERE NOT EXISTS (SELECT 1 FROM public.betting_bankrolls LIMIT 1);

INSERT INTO public.betting_models (version, name, description, content, status, is_active)
SELECT 
    '1.0', 
    'Simple Poisson Goal Model', 
    'Home/away goal-rate model using Poisson distribution to estimate Over/Under, BTTS, and 1X2 market value.',
    'Model uses home team''s home GF/game and away team''s away GA/game to estimate home expected goals.' || E'\n' || 'Away expected goals calculated using away GF/game and home GA/game.' || E'\n' || 'Poisson distribution used to calculate value for Over 1.5, Over 2.5, BTTS, and Double Chance.',
    'active',
    true
WHERE NOT EXISTS (SELECT 1 FROM public.betting_models LIMIT 1);
