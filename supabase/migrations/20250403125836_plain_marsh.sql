/*
  # Fix article slug ambiguity

  1. Changes
    - Add explicit table references for slug column
    - Add index for slug lookups
    - Add trigger to ensure unique slugs
  
  2. Security
    - Maintain existing RLS policies
*/

-- Create function to ensure unique slugs
CREATE OR REPLACE FUNCTION ensure_unique_article_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug text;
  new_slug text;
  counter integer := 1;
BEGIN
  -- If slug is already unique, keep it
  IF NOT EXISTS (
    SELECT 1 FROM articles 
    WHERE articles.slug = NEW.slug 
    AND articles.id != NEW.id
  ) THEN
    RETURN NEW;
  END IF;

  -- Generate new unique slug
  base_slug := NEW.slug;
  new_slug := base_slug;
  
  WHILE EXISTS (
    SELECT 1 FROM articles 
    WHERE articles.slug = new_slug 
    AND articles.id != NEW.id
  ) LOOP
    counter := counter + 1;
    new_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := new_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for unique slugs
DROP TRIGGER IF EXISTS ensure_unique_article_slug_trigger ON articles;
CREATE TRIGGER ensure_unique_article_slug_trigger
  BEFORE INSERT OR UPDATE OF slug ON articles
  FOR EACH ROW
  EXECUTE FUNCTION ensure_unique_article_slug();

-- Create index for faster slug lookups if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'articles' 
    AND indexname = 'articles_slug_lookup_idx'
  ) THEN
    CREATE INDEX articles_slug_lookup_idx ON articles(slug);
  END IF;
END $$;