/*
  # Fix Edge Function Configuration

  1. Changes
    - Add configuration for send-confirmation-email function
    - Add unique constraint on function_name
    - Add proper indexes for performance
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

-- Create indexes for faster lookups if they don't exist
DO $$ 
BEGIN
  -- Create unique index on function_name if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'edge_function_config' 
    AND indexname = 'edge_function_config_function_name_key'
  ) THEN
    ALTER TABLE edge_function_config ADD CONSTRAINT edge_function_config_function_name_key UNIQUE (function_name);
  END IF;

  -- Create index for function name lookups if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'edge_function_config' 
    AND indexname = 'edge_function_config_function_name_idx'
  ) THEN
    CREATE INDEX edge_function_config_function_name_idx ON edge_function_config(function_name);
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