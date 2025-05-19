/*
  # Fix OpenAI Key Configuration

  1. Changes
    - Remove any existing OpenAI config entries
    - Add new config with exact key name
    - Add verification check
    - Add proper indexes
  
  2. Security
    - Maintain existing RLS policies
    - Ensure key is properly stored
*/

-- First remove any existing OpenAI config entries
DELETE FROM config 
WHERE key IN ('OPENAI_API_KEY', 'OPENAI KEY');

-- Insert OpenAI configuration with exact key name
INSERT INTO config (key, value)
VALUES (
  'OPENAI KEY',
  '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'
);

-- Create index for faster lookups if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'config_key_idx'
  ) THEN
    CREATE INDEX config_key_idx ON config(key);
  END IF;
END $$;

-- Verify the config exists and is accessible
DO $$ 
DECLARE
  api_key text;
BEGIN
  SELECT value INTO api_key
  FROM config 
  WHERE key = 'OPENAI KEY';

  IF api_key IS NULL OR api_key = '' THEN
    RAISE EXCEPTION 'OpenAI API key not found or invalid in config table';
  END IF;
END $$;