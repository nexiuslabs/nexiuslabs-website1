/*
  # Remove email validation constraints

  1. Changes
    - Remove CHECK constraints for email validation from all tables
    - Keep RLS policies but remove restrictive email validation
    - Allow frontend validation to handle email format checking

  2. Tables affected
    - workshop_registrations
    - leads  
    - event_registrations
    - ignite_form

  3. Security
    - RLS policies remain intact
    - Only removing database-level email format validation
*/

-- Remove email validation constraints from workshop_registrations
ALTER TABLE public.workshop_registrations DROP CONSTRAINT IF EXISTS "valid_email";

-- Remove email validation constraints from leads
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS "valid_email";

-- Remove email validation constraints from event_registrations  
ALTER TABLE public.event_registrations DROP CONSTRAINT IF EXISTS "valid_email";

-- Remove email validation constraints from ignite_form
ALTER TABLE public.ignite_form DROP CONSTRAINT IF EXISTS "valid_email";