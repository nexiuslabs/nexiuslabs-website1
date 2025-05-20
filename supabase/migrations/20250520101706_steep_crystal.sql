/*
  # Secure Configuration Management

  1. Changes
    - Removes any hardcoded secrets from config table
    - Ensures RLS is properly configured
    - Sets up secure policies for config access

  2. Security
    - Enables RLS on config table
    - Adds policy for admin-only access
    - Adds public read-only access for specific keys
*/

-- First, ensure we're not storing any sensitive data
DELETE FROM config 
WHERE key IN (
  'RECAPTCHA_SECRET_KEY',
  'LLAMA_INDEX_API_KEY', 
  'STRIPE_PUBLISHABLE_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'OPENAI_API_KEY'
);

-- Ensure RLS is enabled
ALTER TABLE config ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable admin config management" ON config;
DROP POLICY IF EXISTS "Enable public stripe key access" ON config;

-- Re-create policies with proper checks
CREATE POLICY "Enable admin config management" ON config
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  ));

-- Allow public read access only to safe keys
CREATE POLICY "Enable public safe key access" ON config
  FOR SELECT
  TO public
  USING (key IN ('STRIPE_PUBLISHABLE_KEY', 'RECAPTCHA_SITE_KEY'));

-- Add function to validate config keys
CREATE OR REPLACE FUNCTION validate_config_key()
RETURNS TRIGGER AS $$
BEGIN
  -- Prevent insertion of sensitive keys
  IF NEW.key IN (
    'RECAPTCHA_SECRET_KEY',
    'LLAMA_INDEX_API_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'OPENAI_API_KEY'
  ) THEN
    RAISE EXCEPTION 'Cannot store sensitive configuration in database';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to prevent storing sensitive keys
DROP TRIGGER IF EXISTS prevent_sensitive_config ON config;
CREATE TRIGGER prevent_sensitive_config
  BEFORE INSERT OR UPDATE ON config
  FOR EACH ROW
  EXECUTE FUNCTION validate_config_key();