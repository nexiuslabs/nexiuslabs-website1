/*
  # Fix Search Path for generate_event_slug Function

  1. Security Updates
    - Set explicit search_path for generate_event_slug() function
    - Prevents search path manipulation attacks
    - Ensures predictable object resolution

  2. Changes
    - ALTER FUNCTION generate_event_slug() SET search_path = 'pg_catalog', 'public'
    - This fixes the "Function Search Path Mutable" security warning
    - Function will now always resolve objects safely and predictably

  This migration addresses Supabase database linter warning 0011 for the generate_event_slug function.
*/

DO $$
BEGIN
  -- Check if the function exists and alter its search_path
  IF EXISTS (
    SELECT 1 FROM pg_proc p 
    JOIN pg_namespace n ON p.pronamespace = n.oid 
    WHERE n.nspname = 'public' 
    AND p.proname = 'generate_event_slug'
  ) THEN
    -- Set secure search_path for the function
    ALTER FUNCTION public.generate_event_slug() SET search_path = 'pg_catalog', 'public';
    
    RAISE NOTICE 'Successfully updated search_path for generate_event_slug function';
  ELSE
    RAISE NOTICE 'Function generate_event_slug does not exist, skipping';
  END IF;
END $$;