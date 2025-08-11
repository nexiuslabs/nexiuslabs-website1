/*
  # Fix search path security for cleanup_expired_sessions function

  1. Security Enhancement
    - Set explicit search_path for cleanup_expired_sessions() function
    - Use secure standard: 'pg_catalog', 'public'
    - Prevent potential security vulnerabilities from mutable search paths

  2. How it Works
    - pg_catalog contains PostgreSQL system functions (checked first)
    - public contains application-specific objects (checked second)
    - Prevents users from manipulating search path to execute malicious code
*/

-- Set secure search path for cleanup_expired_sessions function
ALTER FUNCTION public.cleanup_expired_sessions() SET search_path = 'pg_catalog', 'public';