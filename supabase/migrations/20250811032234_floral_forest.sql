/*
  # Fix search path for generate_product_slug function

  1. Security Enhancement
    - Sets explicit search_path for `generate_product_slug()` function
    - Prevents search path manipulation attacks
    - Ensures consistent object resolution

  2. Changes Made
    - Alters the function to use secure search_path = 'pg_catalog', 'public'
    - Maintains existing function behavior while improving security
    - Safe migration with existence checks

  This resolves the "Function Search Path Mutable" security warning from Supabase's database linter.
*/

-- Check if the function exists and set secure search_path
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'generate_product_slug'
  ) THEN
    -- Set explicit search_path for security
    ALTER FUNCTION public.generate_product_slug() SET search_path = 'pg_catalog', 'public';
    
    RAISE NOTICE 'Successfully updated search_path for generate_product_slug function';
  ELSE
    RAISE NOTICE 'Function generate_product_slug does not exist, skipping update';
  END IF;
END $$;