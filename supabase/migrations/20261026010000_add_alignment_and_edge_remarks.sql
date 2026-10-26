-- Migration: 20261026010000_add_alignment_and_edge_remarks.sql
-- Purpose:
-- 1. Add alignment_delta_pp, alignment_remark, and edge_remark to betting_selections.
-- 2. Add alignment_delta_pp, alignment_remark, and edge_remark to betting_alternatives (maintaining 100% schema parity).

-- 1. Selections Table
ALTER TABLE public.betting_selections
  ADD COLUMN IF NOT EXISTS alignment_delta_pp numeric(5,2),
  ADD COLUMN IF NOT EXISTS alignment_remark varchar(20),
  ADD COLUMN IF NOT EXISTS edge_remark varchar(20);

-- 2. Alternatives Table (100% schema parity)
ALTER TABLE public.betting_alternatives
  ADD COLUMN IF NOT EXISTS alignment_delta_pp numeric(5,2),
  ADD COLUMN IF NOT EXISTS alignment_remark varchar(20),
  ADD COLUMN IF NOT EXISTS edge_remark varchar(20);

-- Comments
COMMENT ON COLUMN public.betting_selections.alignment_delta_pp IS 'Absolute difference in percentage points between primary and historical estimated probability: |P_primary - P_hist| * 100';
COMMENT ON COLUMN public.betting_selections.alignment_remark IS '5-tier consensus category: very_high, high, medium, low, very_low';
COMMENT ON COLUMN public.betting_selections.edge_remark IS '5-tier value edge category: very_high, high, medium, low, very_low';

COMMENT ON COLUMN public.betting_alternatives.alignment_delta_pp IS 'Absolute difference in percentage points between primary and historical estimated probability: |P_primary - P_hist| * 100';
COMMENT ON COLUMN public.betting_alternatives.alignment_remark IS '5-tier consensus category: very_high, high, medium, low, very_low';
COMMENT ON COLUMN public.betting_alternatives.edge_remark IS '5-tier value edge category: very_high, high, medium, low, very_low';
