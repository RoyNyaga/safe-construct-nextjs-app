-- 20261020000003_allow_public_betting_rls.sql
-- Allow full access to both anon and authenticated roles on internal betting tables so local dev and server actions never fail RLS

DROP POLICY IF EXISTS "Admin manage betting_models" ON public.betting_models;
DROP POLICY IF EXISTS "Admin manage betting_bankrolls" ON public.betting_bankrolls;
DROP POLICY IF EXISTS "Admin manage betting_tickets" ON public.betting_tickets;
DROP POLICY IF EXISTS "Admin manage betting_transactions" ON public.betting_transactions;
DROP POLICY IF EXISTS "Admin manage betting_selections" ON public.betting_selections;
DROP POLICY IF EXISTS "Admin manage betting_alternatives" ON public.betting_alternatives;

DROP POLICY IF EXISTS "Manage betting_models" ON public.betting_models;
DROP POLICY IF EXISTS "Manage betting_bankrolls" ON public.betting_bankrolls;
DROP POLICY IF EXISTS "Manage betting_tickets" ON public.betting_tickets;
DROP POLICY IF EXISTS "Manage betting_transactions" ON public.betting_transactions;
DROP POLICY IF EXISTS "Manage betting_selections" ON public.betting_selections;
DROP POLICY IF EXISTS "Manage betting_alternatives" ON public.betting_alternatives;

CREATE POLICY "Manage betting_models" ON public.betting_models
    FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Manage betting_bankrolls" ON public.betting_bankrolls
    FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Manage betting_tickets" ON public.betting_tickets
    FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Manage betting_transactions" ON public.betting_transactions
    FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Manage betting_selections" ON public.betting_selections
    FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Manage betting_alternatives" ON public.betting_alternatives
    FOR ALL TO public USING (true) WITH CHECK (true);
