/*
  # Add send-confirmation-email Edge Function configuration
  
  1. Changes
    - Add Edge Function URL configuration
    - Ensure proper access for email sending
*/

-- Add Edge Function configuration
INSERT INTO edge_function_config (function_name, base_url)
VALUES (
  'send-confirmation-email',
  'https://tunidbyclygzipvbfzee.supabase.co/functions/v1/send-confirmation-email'
) ON CONFLICT (function_name) DO UPDATE
SET base_url = EXCLUDED.base_url;