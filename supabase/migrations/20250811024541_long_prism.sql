/*
  # Fix increment_link_click function search path security

  1. Security Enhancement
    - Sets explicit search_path for increment_link_click() function
    - Prevents security vulnerabilities from mutable search paths
    - Uses secure standard: 'pg_catalog', 'public'

  2. Changes
    - ALTER FUNCTION to set search_path = 'pg_catalog', 'public'
    - Ensures consistent object resolution regardless of user's search_path

  3. Security Benefits
    - Prevents malicious users from manipulating search_path
    - Ensures function always looks in pg_catalog first, then public
    - Maintains function behavior while improving security posture
*/

-- Fix search path security for increment_link_click function
ALTER FUNCTION public.increment_link_click(text) SET search_path = 'pg_catalog', 'public';