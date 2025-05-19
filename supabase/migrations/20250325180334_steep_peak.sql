/*
  # Add OpenAI Configuration

  1. Changes
    - Add OpenAI API key to config table
    - Add OpenAI model configuration
  
  2. Security
    - Store API key securely in config table
    - Maintain existing RLS policies
*/

-- Insert OpenAI configuration
INSERT INTO config (key, value)
VALUES 
  ('OPENAI_API_KEY', 'your-api-key-here'),
  ('OPENAI_MODEL', 'gpt-4')
ON CONFLICT (key) 
DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();