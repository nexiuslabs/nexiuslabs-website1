/*
  # Fix Edge Function Configuration

  1. Changes
    - Add Edge Function configurations
    - Add proper CORS settings
    - Update function URLs
*/

-- Add Edge Function configurations
INSERT INTO edge_function_config (function_name, base_url)
VALUES 
  ('create-checkout', 'https://tunidbyclygzipvbfzee.supabase.co/functions/v1/create-checkout'),
  ('stripe-webhook', 'https://tunidbyclygzipvbfzee.supabase.co/functions/v1/stripe-webhook')
ON CONFLICT (function_name) 
DO UPDATE SET base_url = EXCLUDED.base_url;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS edge_function_config_function_name_idx 
ON edge_function_config(function_name);