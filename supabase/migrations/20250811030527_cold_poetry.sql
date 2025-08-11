/*
  # Fix search path security issues for remaining functions

  1. Security Updates
    - Set secure search_path for 10 remaining functions
    - Prevents search path manipulation attacks
    - Ensures consistent object resolution

  2. Functions Updated
    - update_articles_updated_at() - Article timestamp management
    - generate_slug() - Generic slug generation
    - set_article_slug() - Article slug setting
    - update_updated_at_timestamp() - General timestamp updates
    - generate_product_slug() - Product slug generation
    - generate_course_slug() - Course slug generation
    - update_case_studies_updated_at() - Case study timestamp updates
    - update_events_updated_at() - Event timestamp updates
    - generate_case_study_slug() - Case study slug generation
    - generate_event_slug() - Event slug generation

  3. Security Benefits
    - Prevents users from manipulating search path to execute malicious code
    - Ensures functions always resolve objects in predictable, secure manner
    - Resolves security warnings from Supabase database linter
*/

-- Fix search path for update_articles_updated_at function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_articles_updated_at'
  ) THEN
    ALTER FUNCTION public.update_articles_updated_at() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for generate_slug function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'generate_slug'
  ) THEN
    ALTER FUNCTION public.generate_slug() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for set_article_slug function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'set_article_slug'
  ) THEN
    ALTER FUNCTION public.set_article_slug() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for update_updated_at_timestamp function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_updated_at_timestamp'
  ) THEN
    ALTER FUNCTION public.update_updated_at_timestamp() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for generate_product_slug function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'generate_product_slug'
  ) THEN
    ALTER FUNCTION public.generate_product_slug() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for generate_course_slug function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'generate_course_slug'
  ) THEN
    ALTER FUNCTION public.generate_course_slug() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for update_case_studies_updated_at function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_case_studies_updated_at'
  ) THEN
    ALTER FUNCTION public.update_case_studies_updated_at() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for update_events_updated_at function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_events_updated_at'
  ) THEN
    ALTER FUNCTION public.update_events_updated_at() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for generate_case_study_slug function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'generate_case_study_slug'
  ) THEN
    ALTER FUNCTION public.generate_case_study_slug() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for generate_event_slug function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'generate_event_slug'
  ) THEN
    ALTER FUNCTION public.generate_event_slug() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for update_config_updated_at function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_config_updated_at'
  ) THEN
    ALTER FUNCTION public.update_config_updated_at() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for cleanup_inactive_sessions function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'cleanup_inactive_sessions'
  ) THEN
    ALTER FUNCTION public.cleanup_inactive_sessions() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for update_session_timestamp function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_session_timestamp'
  ) THEN
    ALTER FUNCTION public.update_session_timestamp() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for update_notification_settings_updated_at function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_notification_settings_updated_at'
  ) THEN
    ALTER FUNCTION public.update_notification_settings_updated_at() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;