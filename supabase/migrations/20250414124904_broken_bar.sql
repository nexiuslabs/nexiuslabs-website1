/*
  # Fix Stripe Configuration

  1. Changes
    - Add proper RLS policies for config table
    - Add index for faster key lookups
    - Update Stripe configuration
*/

-- First ensure RLS is enabled
ALTER TABLE config ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Authenticated users can read config" ON config;
DROP POLICY IF EXISTS "Admin users can manage config" ON config;

-- Create new policies
CREATE POLICY "Enable public config access"
  ON config
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable admin config management"
  ON config
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  ));

-- Update Stripe configuration
INSERT INTO config (key, value)
VALUES 
  ('STRIPE_PUBLISHABLE_KEY', 'pk_test_51OxHVhBXWAkqFXf8Hs8YPuQvDGkiHDZVxVzjp9hPgPxGBJHALxuKTAOYJJFDlZxTBXxPxPxPxPxPxPxPxPxPx'),
  ('STRIPE_SECRET_KEY', 'sk_test_51OxHVhBXWAkqFXf8Hs8YPuQvDGkiHDZVxVzjp9hPgPxGBJHALxuKTAOYJJFDlZxTBXxPxPxPxPxPxPxPxPxPx'),
  ('STRIPE_WEBHOOK_SECRET', 'whsec_51OxHVhBXWAkqFXf8Hs8YPuQvDGkiHDZVxVzjp9hPgPxGBJHALxuKTAOYJJFDlZxTBXxPxPxPxPxPxPxPxPxPx')
ON CONFLICT (key) 
DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS config_key_lookup_idx ON config(key);
CREATE INDEX IF NOT EXISTS config_key_idx ON config(key);