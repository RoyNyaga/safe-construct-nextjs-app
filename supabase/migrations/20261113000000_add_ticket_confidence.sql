-- Migration: 20261113000000_add_ticket_confidence.sql
-- Purpose: Add confidence calibration level and confidence diagnostic notes to betting_tickets

ALTER TABLE public.betting_tickets
  ADD COLUMN IF NOT EXISTS confidence text 
    CHECK (confidence IN ('very_high', 'high', 'medium', 'low', 'very_low')),
  ADD COLUMN IF NOT EXISTS confidence_notes text;

CREATE INDEX IF NOT EXISTS idx_betting_tickets_confidence 
  ON public.betting_tickets (confidence);

COMMENT ON COLUMN public.betting_tickets.confidence IS 
  'Calibrated engine confidence: very_high, high, medium, low, very_low';
COMMENT ON COLUMN public.betting_tickets.confidence_notes IS 
  'Diagnostic synthesis explaining why this confidence level was assigned';

