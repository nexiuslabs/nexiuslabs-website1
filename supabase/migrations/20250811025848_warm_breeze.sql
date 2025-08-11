/*
  # Fix Function Search Path Security Issues

  This migration addresses the "Function Search Path Mutable" security warnings
  by setting explicit search_path values for functions that currently have
  mutable search paths.

  ## Security Changes
  - Sets secure search_path for `handle_session_state_change()` function
  - Sets secure search_path for `close_user_sessions()` function  
  - Sets secure search_path for `generate_event_slug()` function

  ## Security Benefits
  - Prevents potential code injection through search_path manipulation
  - Ensures consistent object resolution across function executions
  - Follows PostgreSQL security best practices for function definitions

  The search_path is set to 'pg_catalog', 'public' which:
  1. First checks pg_catalog for system functions (secure)
  2. Then checks public schema for application objects
  3. Prevents users from hijacking function behavior via search_path changes
*/

-- Fix search_path for handle_session_state_change function
ALTER FUNCTION public.handle_session_state_change() SET search_path = 'pg_catalog', 'public';

-- Fix search_path for close_user_sessions function  
ALTER FUNCTION public.close_user_sessions() SET search_path = 'pg_catalog', 'public';

-- Fix search_path for generate_event_slug function
ALTER FUNCTION public.generate_event_slug() SET search_path = 'pg_catalog', 'public';