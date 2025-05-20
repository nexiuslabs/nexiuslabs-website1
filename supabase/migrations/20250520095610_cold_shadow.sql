/*
  # Remove hardcoded secrets from config table
  
  1. Changes
    - Remove hardcoded secrets from config table
    - Add placeholder for environment-based configuration
  
  2. Security
    - Enable RLS on config table
    - Add policy for admin access
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

-- Add policy for admin access
CREATE POLICY "Enable admin config management" ON config
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  ));