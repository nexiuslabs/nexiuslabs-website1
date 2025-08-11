/*
  # Fix search path for set_article_slug function

  This migration addresses a security vulnerability where the `set_article_slug` function
  has a mutable search_path, which could potentially be exploited by malicious users.

  ## Security Changes
  1. Set explicit search_path for `set_article_slug()` function
  2. Prevent search path manipulation attacks
  3. Ensure predictable object resolution

  ## Function Updates
  - `set_article_slug()`: Sets search_path to 'pg_catalog', 'public'

  This ensures the function always resolves PostgreSQL system functions from pg_catalog
  first, then application objects from the public schema, preventing any security issues
  related to search path manipulation.
*/

-- Fix search path for set_article_slug function
DO $$
BEGIN
  -- Check if the function exists before attempting to alter it
  IF EXISTS (
    SELECT 1 
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' 
    AND p.proname = 'set_article_slug'
  ) THEN
    -- Set secure search_path for the function
    ALTER FUNCTION public.set_article_slug() SET search_path = 'pg_catalog', 'public';
    
    RAISE NOTICE 'Successfully updated search_path for set_article_slug function';
  ELSE
    RAISE NOTICE 'Function set_article_slug does not exist, skipping';
  END IF;
END $$;