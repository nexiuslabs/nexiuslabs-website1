/*
  # Fix search path for generate_slug function

  ## Security Enhancement
  
  This migration addresses the "Function Search Path Mutable" security warning by setting an explicit 
  `search_path` for the `generate_slug()` function.

  ## Changes Made
  
  1. **Security Fix**
     - Sets explicit `search_path = 'pg_catalog', 'public'` for the `generate_slug()` function
     - Prevents search path manipulation attacks
     - Ensures predictable function behavior regardless of user's search_path settings

  ## Security Impact
  
  - Mitigates potential security vulnerabilities from search path injection
  - Ensures function always resolves system and application objects correctly
  - Follows PostgreSQL security best practices for function definitions
*/

-- Fix search path for generate_slug function
DO $$
BEGIN
  -- Check if the function exists and alter its search_path
  IF EXISTS (
    SELECT 1 
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' 
    AND p.proname = 'generate_slug'
  ) THEN
    -- Set secure search_path for the function
    ALTER FUNCTION public.generate_slug() SET search_path = 'pg_catalog', 'public';
    
    RAISE NOTICE 'Successfully updated search_path for generate_slug function';
  ELSE
    RAISE NOTICE 'Function generate_slug not found, skipping search_path update';
  END IF;
END $$;