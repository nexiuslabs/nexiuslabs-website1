/*
  # Fix Email Configuration

  1. Changes
    - Add Edge Function configuration for send-confirmation-email
    - Ensure proper URL format
    - Add index for faster lookups

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
CREATE INDEX IF NOT EXISTS edge_function_config_function_name_idx 
ON edge_function_config(function_name);

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