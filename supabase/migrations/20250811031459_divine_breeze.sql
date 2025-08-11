/*
  # Fix search path for generate_event_slug function

  1. Security Enhancement
    - Sets explicit search_path for `generate_event_slug()` function
    - Prevents search path manipulation attacks
    - Ensures predictable object resolution

  2. Changes
    - Alters the `public.generate_event_slug()` function to use secure search_path
    - Uses 'pg_catalog', 'public' for safe object resolution
*/

-- Fix search path for generate_event_slug function
DO $$
BEGIN
  -- Check if the function exists before altering it
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'generate_event_slug'
  ) THEN
    -- Set secure search_path for the function
    ALTER FUNCTION public.generate_event_slug() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;