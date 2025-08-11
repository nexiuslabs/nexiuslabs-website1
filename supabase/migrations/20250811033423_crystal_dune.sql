/*
  # Fix search path security for update_link_clicks_updated_at function

  1. Security Updates
    - Set explicit search_path for `update_link_clicks_updated_at()` function
    - Prevents search path manipulation attacks
    - Ensures consistent function behavior across all contexts

  2. Changes
    - Alter function to use secure search_path: 'pg_catalog', 'public'
    - Add existence check before modification
    - Maintain function's original behavior while enhancing security
*/

-- Fix search path for update_link_clicks_updated_at function
DO $$
BEGIN
  -- Check if the function exists before altering it
  IF EXISTS (
    SELECT 1 
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_link_clicks_updated_at'
  ) THEN
    -- Set explicit search_path for security
    ALTER FUNCTION public.update_link_clicks_updated_at() 
    SET search_path = 'pg_catalog', 'public';
    
    RAISE NOTICE 'Successfully updated search_path for update_link_clicks_updated_at function';
  ELSE
    RAISE NOTICE 'Function update_link_clicks_updated_at does not exist, skipping';
  END IF;
END $$;