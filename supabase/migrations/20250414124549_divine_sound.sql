/*
  # Add Stripe Configuration

  1. Changes
    - Add Stripe publishable key to config table
    - Add Stripe secret key to config table
    - Add Stripe webhook secret to config table
  
  2. Security
    - Store keys securely in config table
    - Maintain existing RLS policies
*/

-- Insert Stripe configuration
INSERT INTO config (key, value)
VALUES 
  ('STRIPE_PUBLISHABLE_KEY', 'pk_test_51OxHVhBXWAkqFXf8Hs8YPuQvDGkiHDZVxVzjp9hPgPxGBJHALxuKTAOYJJFDlZxTBXxPxPxPxPxPxPxPxPxPx'),
  ('STRIPE_SECRET_KEY', 'sk_test_51OxHVhBXWAkqFXf8Hs8YPuQvDGkiHDZVxVzjp9hPgPxGBJHALxuKTAOYJJFDlZxTBXxPxPxPxPxPxPxPxPxPx'),
  ('STRIPE_WEBHOOK_SECRET', 'whsec_51OxHVhBXWAkqFXf8Hs8YPuQvDGkiHDZVxVzjp9hPgPxGBJHALxuKTAOYJJFDlZxTBXxPxPxPxPxPxPxPxPxPx')
ON CONFLICT (key) 
DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();