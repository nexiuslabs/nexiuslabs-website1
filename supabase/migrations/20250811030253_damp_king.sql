/*
  # Fix Search Path Security Issues for Additional Functions

  This migration addresses security warnings from Supabase's database linter by setting explicit search paths for functions that currently have mutable search paths.

  ## Security Fixes
  1. Sets secure search_path for 6 additional functions
  2. Prevents potential security vulnerabilities from search path manipulation
  3. Ensures consistent object resolution across function executions

  ## Functions Fixed
  - `ensure_unique_article_slug()` - Article slug uniqueness validation
  - `update_config_updated_at()` - Configuration timestamp updates
  - `cleanup_inactive_sessions()` - Session cleanup operations
  - `update_session_timestamp()` - Session timestamp management
  - `update_notification_settings_updated_at()` - Notification settings timestamps
  - `update_articles_updated_at()` - Article timestamp updates

  ## Security Benefits
  - Prevents users from manipulating search path to execute malicious code
  - Ensures functions always resolve objects in predictable manner
  - Resolves security warnings from Supabase database linter
*/

-- Fix search path for ensure_unique_article_slug function
DO $$
BEGIN
  -- Check if function exists before altering
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'ensure_unique_article_slug'
  ) THEN
    ALTER FUNCTION public.ensure_unique_article_slug() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for update_config_updated_at function
DO $$
BEGIN
  -- Check if function exists before altering
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
  -- Check if function exists before altering
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
  -- Check if function exists before altering
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
  -- Check if function exists before altering
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_notification_settings_updated_at'
  ) THEN
    ALTER FUNCTION public.update_notification_settings_updated_at() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for update_articles_updated_at function
DO $$
BEGIN
  -- Check if function exists before altering
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_articles_updated_at'
  ) THEN
    ALTER FUNCTION public.update_articles_updated_at() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for set_event_slug function
DO $$
BEGIN
  -- Check if function exists before altering
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'set_event_slug'
  ) THEN
    ALTER FUNCTION public.set_event_slug() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for handle_image_update function
DO $$
BEGIN
  -- Check if function exists before altering
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'handle_image_update'
  ) THEN
    ALTER FUNCTION public.handle_image_update() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for set_event_content function
DO $$
BEGIN
  -- Check if function exists before altering
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'set_event_content'
  ) THEN
    ALTER FUNCTION public.set_event_content() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;

-- Fix search path for update_updated_at_column function
DO $$
BEGIN
  -- Check if function exists before altering
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_updated_at_column'
  ) THEN
    ALTER FUNCTION public.update_updated_at_column() SET search_path = 'pg_catalog', 'public';
  END IF;
END $$;