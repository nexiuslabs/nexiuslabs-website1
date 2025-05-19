/*
  # Fix OpenAI Configuration Access

  1. Changes
    - Drop existing OpenAI config
    - Re-add OpenAI key with proper formatting
    - Add index for faster key lookup
    
  2. Security
    - Maintain existing RLS policies
*/

-- First remove any existing OpenAI config
DELETE FROM config WHERE key = 'OPENAI_API_KEY';

-- Insert OpenAI configuration with properly formatted key
INSERT INTO config (key, value)
VALUES (
  'OPENAI_API_KEY',
  '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'
);

-- Create index for faster config lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS config_key_lookup_idx ON config(key);

-- Verify the config exists and is accessible
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM config 
    WHERE key = 'OPENAI_API_KEY' 
    AND value IS NOT NULL 
    AND value != ''
  ) THEN
    RAISE EXCEPTION 'OpenAI API key not found or invalid in config table';
  END IF;
END $$;