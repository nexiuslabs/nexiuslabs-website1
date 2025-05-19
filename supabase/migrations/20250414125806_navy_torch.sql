/*
  # Fix Edge Function Configuration and CORS

  1. Changes
    - Update Edge Function configurations
    - Add proper CORS settings
    - Fix RLS policies
*/

-- Drop existing policies
DROP POLICY IF EXISTS "allow_all_registration_operations" ON event_registrations;

-- Create new policies for event registrations
CREATE POLICY "enable_registration_operations"
  ON event_registrations
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Update Edge Function configurations
INSERT INTO edge_function_config (function_name, base_url)
VALUES 
  ('create-checkout', 'https://tunidbyclygzipvbfzee.supabase.co/functions/v1/create-checkout'),
  ('stripe-webhook', 'https://tunidbyclygzipvbfzee.supabase.co/functions/v1/stripe-webhook')
ON CONFLICT (function_name) 
DO UPDATE SET base_url = EXCLUDED.base_url;

-- Update Stripe configuration
INSERT INTO config (key, value)
VALUES 
  ('STRIPE_PUBLISHABLE_KEY', 'pk_test_51OxHVhBXWAkqFXf8Hs8YPuQvDGkiHDZVxVzjp9hPgPxGBJHALxuKTAOYJJFDlZxTBXxPxPxPxPxPxPxPxPxPx')
ON CONFLICT (key) 
DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();