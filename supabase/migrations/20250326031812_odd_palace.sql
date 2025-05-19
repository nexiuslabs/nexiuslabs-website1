/*
  # Update LlamaIndex Configuration

  1. Changes
    - Add LlamaIndex API key and configuration
    - Add project and organization settings
  
  2. Security
    - Store API key securely
    - Maintain existing RLS policies
*/

-- Insert LlamaIndex configuration
INSERT INTO config (key, value)
VALUES 
  ('LLAMA_INDEX_API_KEY', 'llx-...'),
  ('LLAMA_INDEX_PROJECT_NAME', 'Default'),
  ('LLAMA_INDEX_ORG_ID', '17ec3b35-1d1d-494f-b7c6-df9d06dfd0f9'),
  ('LLAMA_INDEX_INDEX_NAME', 'nexius-company-data')
ON CONFLICT (key) 
DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();