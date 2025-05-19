/*
  # Add Chat AI Edge Function Configuration

  1. Changes
    - Add configuration for chat-ai Edge Function
    - Set up secure URL for function calls
*/

-- Insert Edge Function configuration
INSERT INTO edge_function_config (function_name, base_url)
VALUES (
  'chat-ai',
  'https://tunidbyclygzipvbfzee.supabase.co/functions/v1/chat-ai'
) ON CONFLICT (function_name) DO UPDATE
SET base_url = EXCLUDED.base_url;