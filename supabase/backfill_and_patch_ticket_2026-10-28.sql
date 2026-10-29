-- Script: backfill_and_patch_ticket_2026-10-28.sql
-- Purpose:
-- 1. Patch Ticket S-26-v2.1 selections & alternatives in the database to separate venue-specific vs overall stats.
-- 2. Optional backfill for legacy tickets (S-21 to S-25) to preserve overall stats without data loss.

-- ============================================================================
-- PART 1: Patch Ticket S-26-v2.1 (2026-10-28) Selections
-- ============================================================================

-- 1. FK Radnicki Nis vs FK Partizan Belgrade
UPDATE public.betting_selections s
SET
  home_matches_played = 6,
  home_goals_scored = 11,
  home_goals_conceded = 11,
  home_goals_per_game = 1.83,
  home_conceded_per_game = 1.83,
  home_overall_matches_played = 12,
  home_overall_goals_scored = 19,
  home_overall_goals_conceded = 21,
  home_overall_goals_per_game = 1.58,
  home_overall_conceded_per_game = 1.75,
  away_matches_played = 5,
  away_goals_scored = 12,
  away_goals_conceded = 6,
  away_goals_per_game = 2.40,
  away_conceded_per_game = 1.20,
  away_overall_matches_played = 11,
  away_overall_goals_scored = 25,
  away_overall_goals_conceded = 13,
  away_overall_goals_per_game = 2.27,
  away_overall_conceded_per_game = 1.18
FROM public.betting_tickets t
WHERE s.ticket_id = t.id
  AND t.ticket_number = 'S-26-v2.1'
  AND s.home_team = 'FK Radnicki Nis'
  AND s.away_team = 'FK Partizan Belgrade';

-- 2. Genoa vs Juventus
UPDATE public.betting_selections s
SET
  home_matches_played = 5,
  home_goals_scored = 5,
  home_goals_conceded = 11,
  home_goals_per_game = 1.00,
  home_conceded_per_game = 2.20,
  home_overall_matches_played = 9,
  home_overall_goals_scored = 7,
  home_overall_goals_conceded = 21,
  home_overall_goals_per_game = 0.78,
  home_overall_conceded_per_game = 2.33,
  away_matches_played = 4,
  away_goals_scored = 9,
  away_goals_conceded = 4,
  away_goals_per_game = 2.25,
  away_conceded_per_game = 1.00,
  away_overall_matches_played = 9,
  away_overall_goals_scored = 15,
  away_overall_goals_conceded = 7,
  away_overall_goals_per_game = 1.67,
  away_overall_conceded_per_game = 0.78
FROM public.betting_tickets t
WHERE s.ticket_id = t.id
  AND t.ticket_number = 'S-26-v2.1'
  AND s.home_team = 'Genoa'
  AND s.away_team = 'Juventus';

-- 3. FC Dundee vs FC Kilmarnock
UPDATE public.betting_selections s
SET
  home_matches_played = 4,
  home_goals_scored = 7,
  home_goals_conceded = 8,
  home_goals_per_game = 1.75,
  home_conceded_per_game = 2.00,
  home_overall_matches_played = 9,
  home_overall_goals_scored = 13,
  home_overall_goals_conceded = 18,
  home_overall_goals_per_game = 1.44,
  home_overall_conceded_per_game = 2.00,
  away_matches_played = 5,
  away_goals_scored = 7,
  away_goals_conceded = 10,
  away_goals_per_game = 1.40,
  away_conceded_per_game = 2.00,
  away_overall_matches_played = 9,
  away_overall_goals_scored = 12,
  away_overall_goals_conceded = 17,
  away_overall_goals_per_game = 1.33,
  away_overall_conceded_per_game = 1.89
FROM public.betting_tickets t
WHERE s.ticket_id = t.id
  AND t.ticket_number = 'S-26-v2.1'
  AND s.home_team = 'FC Dundee'
  AND s.away_team = 'FC Kilmarnock';

-- 4. AC Milan vs Bologna
UPDATE public.betting_selections s
SET
  home_matches_played = 4,
  home_goals_scored = 10,
  home_goals_conceded = 2,
  home_goals_per_game = 2.50,
  home_conceded_per_game = 0.50,
  home_overall_matches_played = 8,
  home_overall_goals_scored = 16,
  home_overall_goals_conceded = 9,
  home_overall_goals_per_game = 2.00,
  home_overall_conceded_per_game = 1.13,
  away_matches_played = 4,
  away_goals_scored = 6,
  away_goals_conceded = 8,
  away_goals_per_game = 1.50,
  away_conceded_per_game = 2.00,
  away_overall_matches_played = 8,
  away_overall_goals_scored = 9,
  away_overall_goals_conceded = 10,
  away_overall_goals_per_game = 1.13,
  away_overall_conceded_per_game = 1.25
FROM public.betting_tickets t
WHERE s.ticket_id = t.id
  AND t.ticket_number = 'S-26-v2.1'
  AND s.home_team = 'AC Milan'
  AND s.away_team = 'Bologna';

-- 5. AC Oulu vs VPS
UPDATE public.betting_selections s
SET
  home_matches_played = 14,
  home_goals_scored = 21,
  home_goals_conceded = 22,
  home_goals_per_game = 1.50,
  home_conceded_per_game = 1.57,
  home_overall_matches_played = 27,
  home_overall_goals_scored = 37,
  home_overall_goals_conceded = 47,
  home_overall_goals_per_game = 1.37,
  home_overall_conceded_per_game = 1.74,
  away_matches_played = 13,
  away_goals_scored = 21,
  away_goals_conceded = 24,
  away_goals_per_game = 1.62,
  away_conceded_per_game = 1.85,
  away_overall_matches_played = 27,
  away_overall_goals_scored = 43,
  away_overall_goals_conceded = 45,
  away_overall_goals_per_game = 1.59,
  away_overall_conceded_per_game = 1.67
FROM public.betting_tickets t
WHERE s.ticket_id = t.id
  AND t.ticket_number = 'S-26-v2.1'
  AND s.home_team = 'AC Oulu'
  AND s.away_team = 'VPS';

-- 6. Paide Linnameeskond vs JK Nomme Kalju
UPDATE public.betting_selections s
SET
  home_matches_played = 16,
  home_goals_scored = 35,
  home_goals_conceded = 18,
  home_goals_per_game = 2.19,
  home_conceded_per_game = 1.13,
  home_overall_matches_played = 32,
  home_overall_goals_scored = 63,
  home_overall_goals_conceded = 35,
  home_overall_goals_per_game = 1.97,
  home_overall_conceded_per_game = 1.09,
  away_matches_played = 16,
  away_goals_scored = 32,
  away_goals_conceded = 19,
  away_goals_per_game = 2.00,
  away_conceded_per_game = 1.19,
  away_overall_matches_played = 32,
  away_overall_goals_scored = 68,
  away_overall_goals_conceded = 33,
  away_overall_goals_per_game = 2.13,
  away_overall_conceded_per_game = 1.03
FROM public.betting_tickets t
WHERE s.ticket_id = t.id
  AND t.ticket_number = 'S-26-v2.1'
  AND s.home_team = 'Paide Linnameeskond'
  AND s.away_team = 'JK Nomme Kalju';

-- ============================================================================
-- PART 2: Patch Ticket S-26-v2.1 (2026-10-28) Alternatives
-- ============================================================================

-- 1. Celtic FC vs Dundee United
UPDATE public.betting_alternatives a
SET
  home_matches_played = 4,
  home_goals_scored = 16,
  home_goals_conceded = 2,
  home_goals_per_game = 4.00,
  home_conceded_per_game = 0.50,
  home_overall_matches_played = 9,
  home_overall_goals_scored = 29,
  home_overall_goals_conceded = 3,
  home_overall_goals_per_game = 3.22,
  home_overall_conceded_per_game = 0.33,
  away_matches_played = 4,
  away_goals_scored = 5,
  away_goals_conceded = 4,
  away_goals_per_game = 1.25,
  away_conceded_per_game = 1.00,
  away_overall_matches_played = 9,
  away_overall_goals_scored = 11,
  away_overall_goals_conceded = 9,
  away_overall_goals_per_game = 1.22,
  away_overall_conceded_per_game = 1.00
FROM public.betting_tickets t
WHERE a.ticket_id = t.id
  AND t.ticket_number = 'S-26-v2.1'
  AND a.home_team = 'Celtic FC'
  AND a.away_team = 'Dundee United';

-- 2. Parma Calcio 1913 vs Udinese
UPDATE public.betting_alternatives a
SET
  home_matches_played = 5,
  home_goals_scored = 7,
  home_goals_conceded = 7,
  home_goals_per_game = 1.40,
  home_conceded_per_game = 1.40,
  home_overall_matches_played = 9,
  home_overall_goals_scored = 12,
  home_overall_goals_conceded = 15,
  home_overall_goals_per_game = 1.33,
  home_overall_conceded_per_game = 1.67,
  away_matches_played = 4,
  away_goals_scored = 4,
  away_goals_conceded = 8,
  away_goals_per_game = 1.00,
  away_conceded_per_game = 2.00,
  away_overall_matches_played = 9,
  away_overall_goals_scored = 14,
  away_overall_goals_conceded = 14,
  away_overall_goals_per_game = 1.56,
  away_overall_conceded_per_game = 1.56
FROM public.betting_tickets t
WHERE a.ticket_id = t.id
  AND t.ticket_number = 'S-26-v2.1'
  AND a.home_team = 'Parma Calcio 1913'
  AND a.away_team = 'Udinese';

-- 3. National Bank FC vs Al Masry
UPDATE public.betting_alternatives a
SET
  home_matches_played = 16,
  home_goals_scored = 24,
  home_goals_conceded = 21,
  home_goals_per_game = 1.50,
  home_conceded_per_game = 1.31,
  home_overall_matches_played = 32,
  home_overall_goals_scored = 42,
  home_overall_goals_conceded = 44,
  home_overall_goals_per_game = 1.31,
  home_overall_conceded_per_game = 1.38,
  away_matches_played = 16,
  away_goals_scored = 20,
  away_goals_conceded = 20,
  away_goals_per_game = 1.25,
  away_conceded_per_game = 1.25,
  away_overall_matches_played = 32,
  away_overall_goals_scored = 39,
  away_overall_goals_conceded = 38,
  away_overall_goals_per_game = 1.22,
  away_overall_conceded_per_game = 1.19
FROM public.betting_tickets t
WHERE a.ticket_id = t.id
  AND t.ticket_number = 'S-26-v2.1'
  AND a.home_team = 'National Bank FC'
  AND a.away_team = 'Al Masry';

-- 4. FK Radnicki 1923 vs FK Zeleznicar Pancevo
UPDATE public.betting_alternatives a
SET
  home_matches_played = 6,
  home_goals_scored = 12,
  home_goals_conceded = 8,
  home_goals_per_game = 2.00,
  home_conceded_per_game = 1.33,
  home_overall_matches_played = 12,
  home_overall_goals_scored = 21,
  home_overall_goals_conceded = 17,
  home_overall_goals_per_game = 1.75,
  home_overall_conceded_per_game = 1.42,
  away_matches_played = 6,
  away_goals_scored = 6,
  away_goals_conceded = 11,
  away_goals_per_game = 1.00,
  away_conceded_per_game = 1.83,
  away_overall_matches_played = 12,
  away_overall_goals_scored = 15,
  away_overall_goals_conceded = 18,
  away_overall_goals_per_game = 1.25,
  away_overall_conceded_per_game = 1.50
FROM public.betting_tickets t
WHERE a.ticket_id = t.id
  AND t.ticket_number = 'S-26-v2.1'
  AND a.home_team = 'FK Radnicki 1923'
  AND a.away_team = 'FK Zeleznicar Pancevo';

