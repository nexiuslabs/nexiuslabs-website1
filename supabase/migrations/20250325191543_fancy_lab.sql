/*
  # Update chat-ai Edge Function Configuration

  1. Changes
    - Update Edge Function URL
    - Ensure proper configuration
  
  2. Security
    - Maintain existing security policies
*/

-- Update Edge Function configuration
INSERT INTO edge_function_config (function_name, base_url)
VALUES (
  'chat-ai',
  'https://tunidbyclygzipvbfzee.supabase.co/functions/v1/chat-ai'
) ON CONFLICT (function_name) DO UPDATE
SET base_url = EXCLUDED.base_url;