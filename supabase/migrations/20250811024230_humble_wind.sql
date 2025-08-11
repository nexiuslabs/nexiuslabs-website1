/*
  # Fix Function Search Path Security Issue

  1. Security Enhancement
    - Set secure search_path for update_link_clicks_updated_at function
    - Prevents potential security vulnerabilities from mutable search_path
    - Ensures function always uses pg_catalog and public schemas in that order

  2. Functions Updated
    - `update_link_clicks_updated_at()` - Set search_path to 'pg_catalog', 'public'

  This fix addresses the Supabase security warning about mutable search_path in functions.
*/

-- Set secure search_path for the update_link_clicks_updated_at function
ALTER FUNCTION public.update_link_clicks_updated_at() SET search_path = 'pg_catalog', 'public';