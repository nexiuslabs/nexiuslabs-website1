/*
  # Fix Search Path for generate_event_slug Function

  This migration addresses the security warning: "Function Search Path Mutable" 
  for the generate_event_slug function.

  ## Security Issue
  The generate_event_slug function has a mutable search_path which could allow 
  malicious users to alter the function's behavior by manipulating their session's 
  search_path setting.

  ## Resolution
  Sets an explicit, secure search_path for the function that:
  - First searches pg_catalog (PostgreSQL system functions)
  - Then searches public schema (application objects)
  - Prevents search path manipulation attacks

  ## Safety
  - Checks function existence before modification
  - Uses IF EXISTS pattern to prevent errors
  - Maintains function functionality while improving security
*/

-- Check if the function exists and alter its search_path if it does
DO $$
BEGIN
  -- Check if the generate_event_slug function exists
  IF EXISTS (
    SELECT 1 
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' 
    AND p.proname = 'generate_event_slug'
  ) THEN
    -- Set secure search_path for the function
    ALTER FUNCTION public.generate_event_slug() SET search_path = 'pg_catalog', 'public';
    
    RAISE NOTICE 'Successfully updated search_path for generate_event_slug function';
  ELSE
    RAISE NOTICE 'Function generate_event_slug does not exist, skipping search_path update';
  END IF;
END $$;