/*
  # Fix search path security issues for final functions and update extension

  1. Security Fixes
    - Set secure search_path for remaining functions:
      - `generate_event_slug` - Event slug generation
      - `update_chat_sessions_updated_at` - Chat session timestamp updates
      - `update_chat_session_last_message_at` - Chat session last message tracking
      - `is_admin` - Admin user verification

  2. Extension Updates
    - Update `pg_graphql` extension from version 1.5.9 to 1.5.11
    - Patches security vulnerabilities and improves stability

  3. Security Benefits
    - Prevents search path manipulation attacks
    - Ensures predictable object resolution
    - Keeps extensions up to date with latest security patches
*/

-- Fix search path for generate_event_slug function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'generate_event_slug'
  ) THEN
    ALTER FUNCTION public.generate_event_slug() SET search_path = 'pg_catalog', 'public';
    RAISE NOTICE 'Fixed search_path for generate_event_slug function';
  ELSE
    RAISE NOTICE 'Function generate_event_slug not found, skipping';
  END IF;
END $$;

-- Fix search path for update_chat_sessions_updated_at function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_chat_sessions_updated_at'
  ) THEN
    ALTER FUNCTION public.update_chat_sessions_updated_at() SET search_path = 'pg_catalog', 'public';
    RAISE NOTICE 'Fixed search_path for update_chat_sessions_updated_at function';
  ELSE
    RAISE NOTICE 'Function update_chat_sessions_updated_at not found, skipping';
  END IF;
END $$;

-- Fix search path for update_chat_session_last_message_at function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'update_chat_session_last_message_at'
  ) THEN
    ALTER FUNCTION public.update_chat_session_last_message_at() SET search_path = 'pg_catalog', 'public';
    RAISE NOTICE 'Fixed search_path for update_chat_session_last_message_at function';
  ELSE
    RAISE NOTICE 'Function update_chat_session_last_message_at not found, skipping';
  END IF;
END $$;

-- Fix search path for is_admin function
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'is_admin'
  ) THEN
    ALTER FUNCTION public.is_admin() SET search_path = 'pg_catalog', 'public';
    RAISE NOTICE 'Fixed search_path for is_admin function';
  ELSE
    RAISE NOTICE 'Function is_admin not found, skipping';
  END IF;
END $$;

-- Update pg_graphql extension to latest version
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_extension 
    WHERE extname = 'pg_graphql'
  ) THEN
    -- Check current version and update if needed
    IF EXISTS (
      SELECT 1 FROM pg_extension 
      WHERE extname = 'pg_graphql' 
      AND extversion != '1.5.11'
    ) THEN
      ALTER EXTENSION pg_graphql UPDATE TO '1.5.11';
      RAISE NOTICE 'Updated pg_graphql extension to version 1.5.11';
    ELSE
      RAISE NOTICE 'pg_graphql extension is already up to date';
    END IF;
  ELSE
    RAISE NOTICE 'pg_graphql extension not found, skipping update';
  END IF;
END $$;