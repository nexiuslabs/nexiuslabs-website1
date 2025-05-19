/*
  # Add LlamaIndex API Key Configuration

  1. Changes
    - Add LlamaIndex API key to config table
    - Ensure proper access control
  
  2. Security
    - Store API key securely
    - Maintain existing RLS policies
*/

-- Insert LlamaIndex API key configuration
INSERT INTO config (key, value)
VALUES 
  ('LLAMA_INDEX_API_KEY', 'your-api-key-here')
ON CONFLICT (key) 
DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();

-- Create index for faster lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS config_key_lookup_idx ON config(key);