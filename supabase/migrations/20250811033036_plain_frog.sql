/*
  # Fix search path for update_updated_at_timestamp function

  ## Security Enhancement
  - Sets explicit search_path for update_updated_at_timestamp() function
  - Prevents search path manipulation attacks
  - Ensures consistent function behavior regardless of user's search_path settings

  ## Changes
  1. Security
     - ALTER FUNCTION update_updated_at_timestamp() SET search_path = 'pg_catalog', 'public'
     - This ensures the function always resolves system functions from pg_catalog first
     - Then resolves application objects from the public schema
     - Prevents potential security vulnerabilities from search path injection

  ## Impact
  - Resolves Supabase database linter warning about mutable search_path
  - Maintains existing functionality while improving security posture
  - No breaking changes to existing triggers or table operations
*/

-- Fix search path security for update_updated_at_timestamp function
DO $$
BEGIN
  -- Check if the function exists and set secure search_path
  IF EXISTS (
    SELECT 1 
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' 
    AND p.proname = 'update_updated_at_timestamp'
  ) THEN
    -- Set explicit search_path for security
    ALTER FUNCTION public.update_updated_at_timestamp() 
    SET search_path = 'pg_catalog', 'public';
    
    RAISE NOTICE 'Successfully set secure search_path for update_updated_at_timestamp function';
  ELSE
    RAISE NOTICE 'Function update_updated_at_timestamp does not exist - skipping search_path fix';
  END IF;
END $$;