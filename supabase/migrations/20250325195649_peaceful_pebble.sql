/*
  # Fix Edge Function Configuration

  1. Changes
    - Remove any existing config for send-confirmation-email
    - Add correct Edge Function configuration
    - Add proper indexes
    - Add verification checks
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
  -- Create unique index on function_name
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'edge_function_config' 
    AND indexname = 'edge_function_config_function_name_key'
  ) THEN
    CREATE UNIQUE INDEX edge_function_config_function_name_key 
    ON edge_function_config(function_name);
  END IF;

  -- Create index for function name lookups
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