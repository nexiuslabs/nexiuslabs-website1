/*
  # Fix Stripe Configuration Access

  1. Changes
    - Update Stripe configuration
    - Add proper indexes
    - Fix RLS policies
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable public config access" ON config;

-- Create new policy for public access to Stripe publishable key
CREATE POLICY "Enable public stripe key access"
  ON config
  FOR SELECT
  TO public
  USING (key = 'STRIPE_PUBLISHABLE_KEY');

-- Update Stripe configuration
INSERT INTO config (key, value)
VALUES 
  ('STRIPE_PUBLISHABLE_KEY', 'pk_test_51OxHVhBXWAkqFXf8Hs8YPuQvDGkiHDZVxVzjp9hPgPxGBJHALxuKTAOYJJFDlZxTBXxPxPxPxPxPxPxPxPxPx')
ON CONFLICT (key) 
DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS config_key_stripe_idx ON config(key) WHERE key = 'STRIPE_PUBLISHABLE_KEY';