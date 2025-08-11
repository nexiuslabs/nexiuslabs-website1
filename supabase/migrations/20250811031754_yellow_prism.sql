/*
  # Fix search path for generate_slug function

  This migration addresses a security vulnerability where the `generate_slug` function
  has a mutable search_path, which could allow for search path manipulation attacks.

  ## Changes Made
  1. Set explicit search_path for `generate_slug()` function
  2. Prevents security vulnerabilities from search path manipulation

  ## Security Impact
  - Prevents search path manipulation attacks
  - Ensures predictable object resolution in function execution
  - Maintains function stability and security
*/

-- Fix search path for generate_slug function
DO $$
BEGIN
  -- Check if the function exists before attempting to alter it
  IF EXISTS (
    SELECT 1 
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' 
    AND p.proname = 'generate_slug'
  ) THEN
    -- Set secure search path for the function
    ALTER FUNCTION public.generate_slug() SET search_path = 'pg_catalog', 'public';
    
    RAISE NOTICE 'Successfully set search_path for generate_slug function';
  ELSE
    RAISE NOTICE 'Function generate_slug does not exist, skipping';
  END IF;
END $$;