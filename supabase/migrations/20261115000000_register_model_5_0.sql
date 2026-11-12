-- =========================================================================
-- REGISTER BETTING MODEL 5.0 & ENRICH TOURNAMENT METADATA
-- Purpose: Register dedicated model for Continental Club Competitions 
--          (UCL, UEL, CAF CL) and National Team Competitions (AFCON, Euro, WC).
-- =========================================================================

-- 1. Register Model 5.0 in Central Model Registry
insert into public.betting_models (
    uuid,
    version,
    name,
    description,
    content,
    status,
    is_active
)
select 
    'f1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d'::uuid,
    '5.0',
    'roys_tournament_international_engine',
    'Dedicated bivariate Poisson and World Football Elo-calibrated betting engine for Continental Club Tournaments (UCL, UEL, CAF CL) and National Team Tournaments (AFCON, Euro, World Cup, Nations League, Qualifiers). Coexists independently alongside Model 4.0 without overriding domestic league rules.',
    'Model 5.0 operates across two specialized calculation tracks:
Track A: Continental Club Competitions with Competition Strength Index (CSI) normalization based on UEFA and CAF coefficient tiers.
Track B: National Team Competitions with World Football Elo Rating Differentials, Neutral Venue Protocol (H=0), and Knockout Compression Factor (Ks=0.88).
Core Gated Markets: Over 1.5 Anchor, Draw No Bet (DNB), Double Chance (1X/X2), Under 3.5 Knockout Fortress, and Dominant Winner.',
    'active',
    true
where not exists (
    select 1 from public.betting_models where version = '5.0' or name = 'roys_tournament_international_engine'
);

-- 2. Optional non-breaking column additions for Tournament & International metadata
alter table public.betting_selections 
    add column if not exists is_neutral_venue boolean default false,
    add column if not exists competition_type text,
    add column if not exists stage text,
    add column if not exists elo_home integer,
    add column if not exists elo_away integer;

alter table public.betting_alternatives 
    add column if not exists is_neutral_venue boolean default false,
    add column if not exists competition_type text,
    add column if not exists stage text,
    add column if not exists elo_home integer,
    add column if not exists elo_away integer;

