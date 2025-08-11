/*
  # Fix Search Path Security for Multiple Functions

  1. Security Enhancement
    - Set explicit `search_path` for `handle_session_state_change()` function
    - Set explicit `search_path` for `close_user_sessions()` function  
    - Set explicit `search_path` for `generate_event_slug()` function
    - Uses secure standard: `'pg_catalog', 'public'`

  2. Purpose
    - Prevents potential security vulnerabilities from mutable search paths
    - Ensures functions consistently resolve object references
    - `pg_catalog` contains PostgreSQL system functions (checked first)
    - `public` contains application-specific objects (checked second)

  3. Impact
    - Resolves Supabase security warnings for these functions
    - Maintains existing functionality while improving security posture
*/

-- Fix search path for handle_session_state_change function
ALTER FUNCTION public.handle_session_state_change() SET search_path = 'pg_catalog', 'public';

-- Fix search path for close_user_sessions function  
ALTER FUNCTION public.close_user_sessions() SET search_path = 'pg_catalog', 'public';

-- Fix search path for generate_event_slug function
ALTER FUNCTION public.generate_event_slug() SET search_path = 'pg_catalog', 'public';