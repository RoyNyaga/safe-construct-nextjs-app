-- =========================================================================
-- BETTING WARNINGS & POST-MATCH EVALUATION SCHEMA
-- Migration: 20261024000000_create_betting_warnings.sql
-- Purpose: Structured risk documentation, match-level warnings, ChatGPT 
--          post-match evaluation ledger, and learning analytics.
-- =========================================================================

-- 1. BETTING WARNINGS
create table if not exists public.betting_warnings (
    id bigint generated always as identity primary key,
    uuid uuid default gen_random_uuid() not null unique,
    ticket_id bigint references public.betting_tickets(id) on delete cascade not null,
    selection_id bigint references public.betting_selections(id) on delete cascade,
    alternative_id bigint references public.betting_alternatives(id) on delete cascade,
    target_type text not null default 'selection', -- 'selection' | 'alternative'
    warning_type text not null, -- 'H2H_LOW_GOALS', 'LOW_SCORING_LEAGUE', 'RECENT_FORM_SLUMP', 'KEY_ATTACKER_ABSENT', etc.
    severity text not null default 'MEDIUM', -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    market_relevance text not null default 'DIRECT', -- 'DIRECT', 'INDIRECT', 'CONTEXTUAL'
    direction text not null default 'CONTRADICTORY', -- 'CONTRADICTORY', 'NEUTRAL', 'SUPPORTIVE'
    description text not null,
    evidence text,
    verified boolean not null default true,
    numerical_adjustment boolean not null default false,
    pre_match_status text not null default 'PENDING',
    post_match_status text not null default 'PENDING', -- 'PENDING', 'CONFIRMED', 'NOT_CONFIRMED', 'INCONCLUSIVE', 'NOT_APPLICABLE'
    review_notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    -- Enforce that a warning is linked to either a selection or an alternative, never neither or both
    constraint chk_warning_target check (
        (selection_id is not null and alternative_id is null) or
        (selection_id is null and alternative_id is not null)
    )
);

-- 2. BETTING WARNING REVIEWS (IMMUTABLE AUDIT / HISTORY LEDGER)
create table if not exists public.betting_warning_reviews (
    id bigint generated always as identity primary key,
    uuid uuid default gen_random_uuid() not null unique,
    warning_id bigint references public.betting_warnings(id) on delete cascade not null,
    previous_status text,
    new_status text not null,
    review_notes text,
    evidence_assessment text, -- 'SUPPORTED', 'CONTRADICTED', 'PARTIAL', 'INCONCLUSIVE'
    confidence text, -- 'LOW', 'MEDIUM', 'HIGH'
    review_source text not null default 'chatgpt', -- 'chatgpt', 'manual'
    created_at timestamptz not null default now()
);

-- 3. INDEXES FOR HIGH-PERFORMANCE FILTERING AND ANALYTICS
create index if not exists idx_betting_warnings_ticket_id on public.betting_warnings(ticket_id);
create index if not exists idx_betting_warnings_selection_id on public.betting_warnings(selection_id);
create index if not exists idx_betting_warnings_alternative_id on public.betting_warnings(alternative_id);
create index if not exists idx_betting_warnings_warning_type on public.betting_warnings(warning_type);
create index if not exists idx_betting_warnings_severity on public.betting_warnings(severity);
create index if not exists idx_betting_warnings_post_match_status on public.betting_warnings(post_match_status);
create index if not exists idx_betting_warnings_created_at on public.betting_warnings(created_at desc);

create index if not exists idx_betting_warning_reviews_warning_id on public.betting_warning_reviews(warning_id);
create index if not exists idx_betting_warning_reviews_created_at on public.betting_warning_reviews(created_at desc);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.betting_warnings enable row level security;
alter table public.betting_warning_reviews enable row level security;

-- Open policies matching project convention for internal betting tables
drop policy if exists "Manage betting_warnings" on public.betting_warnings;
create policy "Manage betting_warnings" on public.betting_warnings
    for all to public using (true) with check (true);

drop policy if exists "Manage betting_warning_reviews" on public.betting_warning_reviews;
create policy "Manage betting_warning_reviews" on public.betting_warning_reviews
    for all to public using (true) with check (true);
