/*
  # Add featured_image column to articles table

  1. Changes
    - Add featured_image column to articles table
    - Make it nullable since not all articles may have an image
    - Update existing articles to have null for featured_image
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add featured_image column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'articles' 
    AND column_name = 'featured_image'
  ) THEN
    ALTER TABLE articles 
    ADD COLUMN featured_image text;
  END IF;
END $$;