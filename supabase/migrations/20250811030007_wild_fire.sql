/*
  # Fix Function Search Path Security Issues

  This migration addresses security warnings by setting explicit search_path for database functions.
  
  ## Security Enhancement
  
  1. **Functions Updated**
     - `generate_event_slug()` - Event slug generation function
     - `set_event_slug()` - Event slug setting function  
     - `handle_image_update()` - Image update handler function
     - `set_event_content()` - Event content setting function
     - `update_updated_at_column()` - Generic timestamp update function
     - `ensure_unique_article_slug()` - Article slug uniqueness function
  
  2. **Security Changes**
     - Sets explicit `search_path = 'pg_catalog', 'public'` for each function
     - Prevents potential security vulnerabilities from mutable search paths
     - Ensures consistent object resolution across function executions
  
  3. **How It Works**
     - `pg_catalog` contains PostgreSQL system functions (checked first)
     - `public` contains application-specific objects (checked second)
     - Prevents users from manipulating search path to execute malicious code
*/

-- Fix search path for generate_event_slug function
ALTER FUNCTION public.generate_event_slug() SET search_path = 'pg_catalog', 'public';

-- Fix search path for set_event_slug function  
ALTER FUNCTION public.set_event_slug() SET search_path = 'pg_catalog', 'public';

-- Fix search path for handle_image_update function
ALTER FUNCTION public.handle_image_update() SET search_path = 'pg_catalog', 'public';

-- Fix search path for set_event_content function
ALTER FUNCTION public.set_event_content() SET search_path = 'pg_catalog', 'public';

-- Fix search path for update_updated_at_column function
ALTER FUNCTION public.update_updated_at_column() SET search_path = 'pg_catalog', 'public';

-- Fix search path for ensure_unique_article_slug function
ALTER FUNCTION public.ensure_unique_article_slug() SET search_path = 'pg_catalog', 'public';