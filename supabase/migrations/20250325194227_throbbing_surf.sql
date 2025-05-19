/*
  # Fix Email Configuration

  1. Changes
    - Remove any existing config for send-confirmation-email
    - Add Edge Function configuration with correct URL
    - Add index for faster lookups
    - Add verification to ensure config exists

  2. Security
    - Maintain existing RLS policies
*/

-- First remove any existing config for send-confirmation-email
DELETE FROM edge_function_config 
WHERE function_name = 'send-confirmation-email';

-- Add Edge Function configuration with correct URL
INSERT INTO edge_function_config (function_name, base_url)
VALUES (
  'send-confirmation-email',
  'https://tunidbyclygzipvbfzee.supabase.co/functions/v1/send-confirmation-email'
);

-- Create index for faster lookups if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'edge_function_config' 
    AND indexname = 'edge_function_config_function_name_idx'
  ) THEN
    CREATE INDEX edge_function_config_function_name_idx 
    ON edge_function_config(function_name);
  END IF;
END $$;

-- Verify the config exists and is accessible
DO $$ 
DECLARE
  func_url text;
BEGIN
  SELECT base_url INTO func_url
  FROM edge_function_config 
  WHERE function_name = 'send-confirmation-email';

  IF func_url IS NULL OR func_url = '' THEN
    RAISE EXCEPTION 'Edge Function URL not found or invalid';
  END IF;
END $$;