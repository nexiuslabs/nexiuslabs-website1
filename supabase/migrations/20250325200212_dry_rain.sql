/*
  # Add SMTP Configuration

  1. Changes
    - Add SMTP credentials to config table
    - Set up email configuration
    - Ensure secure storage of credentials

  2. Security
    - Store credentials in config table
    - Maintain existing RLS policies
*/

-- First remove any existing SMTP config
DELETE FROM config 
WHERE key LIKE 'SMTP_%';

-- Insert SMTP configuration
INSERT INTO config (key, value)
VALUES 
  ('SMTP_HOST', 'mail.mezzaconsulting.com'),
  ('SMTP_PORT', '465'),
  ('SMTP_USER', 'melverick@mezzaconsulting.com'),
  ('SMTP_PASS', 'Mez-528116!');

-- Create index for faster lookups if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'config' 
    AND indexname = 'config_key_idx'
  ) THEN
    CREATE INDEX config_key_idx ON config(key);
  END IF;
END $$;

-- Verify the config exists and is accessible
DO $$ 
DECLARE
  smtp_host text;
  smtp_port text;
  smtp_user text;
  smtp_pass text;
BEGIN
  SELECT value INTO smtp_host FROM config WHERE key = 'SMTP_HOST';
  SELECT value INTO smtp_port FROM config WHERE key = 'SMTP_PORT';
  SELECT value INTO smtp_user FROM config WHERE key = 'SMTP_USER';
  SELECT value INTO smtp_pass FROM config WHERE key = 'SMTP_PASS';

  IF smtp_host IS NULL OR smtp_port IS NULL OR smtp_user IS NULL OR smtp_pass IS NULL THEN
    RAISE EXCEPTION 'SMTP configuration is incomplete';
  END IF;
END $$;