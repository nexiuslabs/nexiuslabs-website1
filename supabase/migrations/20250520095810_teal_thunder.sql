/*
  # Remove hardcoded secrets
  
  1. Changes
    - Removes hardcoded secrets from config table
    - Ensures RLS is enabled on config table
    - Adds policy for public access to Stripe publishable key
  
  2. Security
    - Enables RLS on config table
    - Adds policy for public access to specific config values
    - Maintains existing admin access policy
*/

-- Remove any existing secrets
DELETE FROM config 
WHERE key IN (
  'RECAPTCHA_SECRET_KEY',
  'LLAMA_INDEX_API_KEY',
  'STRIPE_PUBLISHABLE_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET'
);

-- Ensure RLS is enabled
ALTER TABLE config ENABLE ROW LEVEL SECURITY;

-- Add policy for public access to Stripe publishable key if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_policies 
    WHERE policyname = 'Enable public stripe key access' 
    AND tablename = 'config'
  ) THEN
    CREATE POLICY "Enable public stripe key access" ON config
      FOR SELECT
      TO public
      USING (key = 'STRIPE_PUBLISHABLE_KEY');
  END IF;
END$$;