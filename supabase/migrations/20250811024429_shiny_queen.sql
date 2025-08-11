/*
  # Fix validate_config_key function search path security

  1. Security Enhancement
    - Set explicit search_path for `validate_config_key()` function
    - Use secure standard: 'pg_catalog', 'public'
    - Prevent potential security vulnerabilities from mutable search paths

  2. How it Works
    - pg_catalog contains PostgreSQL system functions (checked first)
    - public contains application-specific objects (checked second)
    - Prevents users from manipulating search path to execute malicious code

  3. Impact
    - Resolves Supabase security warning
    - No functional changes to the function behavior
    - Maintains existing validation logic
*/

-- Set secure search_path for validate_config_key function
ALTER FUNCTION public.validate_config_key() SET search_path = 'pg_catalog', 'public';