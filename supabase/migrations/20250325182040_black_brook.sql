/*
  # Fix OpenAI API Key Configuration

  1. Changes
    - Update key name to match secret key name
    - Ensure proper config table setup
  
  2. Security
    - Maintain existing RLS policies
*/

-- First remove any existing OpenAI config
DELETE FROM config WHERE key = 'OPENAI_API_KEY';

-- Insert OpenAI configuration with correct key name
INSERT INTO config (key, value)
VALUES (
  'OPENAI KEY',
  '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'
);

-- Verify the config exists and is accessible
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM config 
    WHERE key = 'OPENAI KEY' 
    AND value IS NOT NULL 
    AND value != ''
  ) THEN
    RAISE EXCEPTION 'OpenAI API key not found or invalid in config table';
  END IF;
END $$;