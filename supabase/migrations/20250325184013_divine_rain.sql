/*
  # Update OpenAI Model Configuration

  1. Changes
    - Set model to gpt-3.5-turbo
    - Maintain existing API key
  
  2. Security
    - Keep existing RLS policies
*/

-- Update OpenAI model configuration
INSERT INTO config (key, value)
VALUES 
  ('OPENAI_MODEL', 'gpt-3.5-turbo')
ON CONFLICT (key) 
DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();