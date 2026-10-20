-- Add country column to betting_selections and betting_alternatives
alter table public.betting_selections
add column if not exists country text;

alter table public.betting_alternatives
add column if not exists country text;
