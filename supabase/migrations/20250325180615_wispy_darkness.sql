/*
  # Update OpenAI API Key

  1. Changes
    - Update OpenAI API key in config table
    - Maintain existing configuration
*/

-- Update OpenAI configuration with actual API key
INSERT INTO config (key, value)
VALUES 
  ('OPENAI_API_KEY', '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')
ON CONFLICT (key) 
DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();