-- 20261020000002_allow_authenticated_betting_rls.sql
-- Drop any previous restrictive or recursive policies and allow authenticated users full access on internal betting tables.

DROP POLICY IF EXISTS "Admin manage betting_models" ON public.betting_models;
DROP POLICY IF EXISTS "Admin manage betting_bankrolls" ON public.betting_bankrolls;
DROP POLICY IF EXISTS "Admin manage betting_tickets" ON public.betting_tickets;
DROP POLICY IF EXISTS "Admin manage betting_transactions" ON public.betting_transactions;
DROP POLICY IF EXISTS "Admin manage betting_selections" ON public.betting_selections;
DROP POLICY IF EXISTS "Admin manage betting_alternatives" ON public.betting_alternatives;

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
