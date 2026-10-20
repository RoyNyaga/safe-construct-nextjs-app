-- =========================================================================
-- BETTING TRACKER & BANKROLL LEDGER SCHEMA
-- Purpose: Complete database structure for internal Betting Tracker &
--          bankroll ledger integrated with ChatGPT methodology feedback.
-- =========================================================================

-- Enable UUID extension if not enabled
create extension if not exists "uuid-ossp" schema extensions;

-- 1. BETTING MODELS
create table if not exists public.betting_models (
    id bigint generated always as identity primary key,
    uuid uuid default gen_random_uuid() not null unique,
    version text not null,
    name text not null,
    description text,
    content text,
    status text not null default 'active', -- 'draft', 'active', 'retired'
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 2. BETTING BANKROLLS
create table if not exists public.betting_bankrolls (
    id bigint generated always as identity primary key,
    uuid uuid default gen_random_uuid() not null unique,
    name text not null default 'Main Bankroll',
    currency text not null default 'USD',
    current_balance numeric(14,2) not null default 0.00,
    initial_deposit numeric(14,2) not null default 0.00,
    total_deposited numeric(14,2) not null default 0.00,
    total_withdrawn numeric(14,2) not null default 0.00,
    total_staked numeric(14,2) not null default 0.00,
    total_payout numeric(14,2) not null default 0.00,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 3. BETTING TICKETS
create table if not exists public.betting_tickets (
    id bigint generated always as identity primary key,
    uuid uuid default gen_random_uuid() not null unique,
    ticket_number text,
    ticket_date date not null default current_date,
    model_id bigint references public.betting_models(id) on delete restrict,
    bankroll_id bigint references public.betting_bankrolls(id) on delete restrict,
    stake numeric(12,2) default 0.00,
    combined_odds numeric(8,4),
    estimated_ticket_probability numeric(6,4),
    status text not null default 'pending', -- 'pending', 'won', 'lost', 'void'
    actual_result text,
    profit_loss numeric(12,2) default 0.00,
    notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 4. BETTING TRANSACTIONS (IMMUTABLE LEDGER)
create table if not exists public.betting_transactions (
    id bigint generated always as identity primary key,
    uuid uuid default gen_random_uuid() not null unique,
    bankroll_id bigint references public.betting_bankrolls(id) on delete restrict not null,
    ticket_id bigint references public.betting_tickets(id) on delete set null, -- Null for manual transactions
    transaction_type text not null, -- 'deposit', 'withdrawal', 'bet_stake', 'bet_win', 'bet_refund', 'adjustment'
    trigger_type text not null default 'automatic', -- 'manual' vs 'automatic'
    amount numeric(14,2) not null,
    balance_before numeric(14,2) not null,
    balance_after numeric(14,2) not null,
    description text,
    created_at timestamptz not null default now()
);

-- 5. BETTING SELECTIONS (SELECTED BETS WITH STATISTICAL SNAPSHOT)
create table if not exists public.betting_selections (
    id bigint generated always as identity primary key,
    uuid uuid default gen_random_uuid() not null unique,
    ticket_id bigint references public.betting_tickets(id) on delete cascade not null,
    match_date date,
    league text,
    home_team text not null,
    away_team text not null,
    home_league_position integer,
    away_league_position integer,
    home_goals_scored numeric(6,2),
    home_goals_conceded numeric(6,2),
    away_goals_scored numeric(6,2),
    away_goals_conceded numeric(6,2),
    home_goals_per_game numeric(6,3),
    home_conceded_per_game numeric(6,3),
    away_goals_per_game numeric(6,3),
    away_conceded_per_game numeric(6,3),
    market text not null,
    selection text not null,
    odds numeric(8,4),
    estimated_probability numeric(6,4),
    breakeven_probability numeric(6,4),
    edge_percentage_points numeric(6,2),
    expected_value numeric(6,4),
    actual_home_score integer,
    actual_away_score integer,
    result text default 'pending', -- 'won', 'lost', 'void', 'pending'
    comment text,
    notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 6. BETTING ALTERNATIVES (CONSIDERED BUT REJECTED BETS)
create table if not exists public.betting_alternatives (
    id bigint generated always as identity primary key,
    uuid uuid default gen_random_uuid() not null unique,
    ticket_id bigint references public.betting_tickets(id) on delete cascade not null,
    match_date date,
    league text,
    home_team text not null,
    away_team text not null,
    market text not null,
    selection text not null,
    odds numeric(8,4),
    estimated_probability numeric(6,4),
    breakeven_probability numeric(6,4),
    edge_percentage_points numeric(6,2),
    expected_value numeric(6,4),
    actual_home_score integer,
    actual_away_score integer,
    result text default 'pending', -- 'won', 'lost', 'void', 'pending'
    comment text,
    notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 7. ATOMIC BANKROLL TRANSACTION STORED PROCEDURE
create or replace function public.execute_bankroll_transaction(
    p_bankroll_id bigint,
    p_ticket_id bigint,
    p_transaction_type text,
    p_trigger_type text,
    p_amount numeric,
    p_description text
) returns public.betting_transactions as $$
declare
    v_current_bal numeric;
    v_new_bal numeric;
    v_tx public.betting_transactions;
begin
    -- Lock bankroll row for update to guarantee strict sequential accounting
    select current_balance into v_current_bal 
    from public.betting_bankrolls 
    where id = p_bankroll_id 
    for update;

    if not found then
        raise exception 'Bankroll with ID % not found', p_bankroll_id;
    end if;

    v_new_bal := v_current_bal + p_amount;

    -- Insert ledger record
    insert into public.betting_transactions (
        bankroll_id,
        ticket_id,
        transaction_type,
        trigger_type,
        amount,
        balance_before,
        balance_after,
        description
    ) values (
        p_bankroll_id,
        p_ticket_id,
        p_transaction_type,
        p_trigger_type,
        p_amount,
        v_current_bal,
        v_new_bal,
        p_description
    ) returning * into v_tx;

    -- Update running bankroll
    update public.betting_bankrolls
    set current_balance = v_new_bal,
        total_deposited = case when p_transaction_type = 'deposit' then total_deposited + p_amount else total_deposited end,
        total_withdrawn = case when p_transaction_type = 'withdrawal' then total_withdrawn + abs(p_amount) else total_withdrawn end,
        total_staked = case when p_transaction_type = 'bet_stake' then total_staked + abs(p_amount) else total_staked end,
        total_payout = case when p_transaction_type = 'bet_win' then total_payout + p_amount else total_payout end,
        updated_at = now()
    where id = p_bankroll_id;

    return v_tx;
end;
$$ language plpgsql security definer;

-- 8. ROW LEVEL SECURITY (RLS)
alter table public.betting_models enable row level security;
alter table public.betting_bankrolls enable row level security;
alter table public.betting_tickets enable row level security;
alter table public.betting_transactions enable row level security;
alter table public.betting_selections enable row level security;
alter table public.betting_alternatives enable row level security;

-- Admin-only policies
create policy "Admin manage betting_models" on public.betting_models
    for all using (
        exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
    );

create policy "Admin manage betting_bankrolls" on public.betting_bankrolls
    for all using (
        exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
    );

create policy "Admin manage betting_tickets" on public.betting_tickets
    for all using (
        exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
    );

create policy "Admin manage betting_transactions" on public.betting_transactions
    for all using (
        exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
    );

create policy "Admin manage betting_selections" on public.betting_selections
    for all using (
        exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
    );

create policy "Admin manage betting_alternatives" on public.betting_alternatives
    for all using (
        exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
    );

-- 9. SEED INITIAL DATA IF NOT PRESENT
insert into public.betting_bankrolls (name, currency, current_balance, initial_deposit, is_active)
select 'Main Bankroll', 'USD', 0.00, 0.00, true
where not exists (select 1 from public.betting_bankrolls limit 1);

insert into public.betting_models (version, name, description, content, status, is_active)
select 
    '1.0', 
    'Simple Poisson Goal Model', 
    'Home/away goal-rate model using Poisson distribution to estimate Over/Under, BTTS, and 1X2 market value.',
    'Model uses home team''s home GF/game and away team''s away GA/game to estimate home expected goals.\nAway expected goals calculated using away GF/game and home GA/game.\nPoisson distribution used to calculate value for Over 1.5, Over 2.5, BTTS, and Double Chance.',
    'active',
    true
where not exists (select 1 from public.betting_models limit 1);
