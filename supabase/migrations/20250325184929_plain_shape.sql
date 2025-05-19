/*
  # Update Edge Function Configuration

  1. Changes
    - Update chat-ai function configuration
    - Set model to gpt-3.5-turbo
    - Ensure proper base URL
  
  2. Security
    - Maintain existing RLS policies
*/

-- Update Edge Function configuration
INSERT INTO edge_function_config (function_name, base_url)
VALUES (
  'chat-ai',
  'https://tunidbyclygzipvbfzee.supabase.co/functions/v1/chat-ai'
) ON CONFLICT (function_name) DO UPDATE
SET base_url = EXCLUDED.base_url;

-- Update OpenAI model configuration
INSERT INTO config (key, value)
VALUES 
  ('OPENAI_MODEL', 'gpt-3.5-turbo')
ON CONFLICT (key) 
DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();