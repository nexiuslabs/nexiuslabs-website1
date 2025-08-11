/*
  # Fix Workshop Registrations RLS Performance Issue

  ## Summary
  This migration fixes a performance issue with the workshop_registrations table's RLS policy.
  The current policy re-evaluates auth.role() for each row, which causes suboptimal performance at scale.

  ## Changes Made
  1. Drop the existing "Enable read access for authenticated users" policy
  2. Recreate the policy with optimized auth function call using (select role())
  3. This ensures the role() function is evaluated only once per query instead of per row

  ## Security
  - Maintains the same security behavior (authenticated users can read)
  - No changes to access permissions
  - Only improves query performance
*/

-- Drop the existing policy that has performance issues
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.workshop_registrations;

-- Recreate the policy with performance optimization
-- Using (select role()) instead of role() to avoid re-evaluation per row
CREATE POLICY "Enable read access for authenticated users" 
ON public.workshop_registrations 
FOR SELECT 
TO public 
USING ((select role()) = 'authenticated'::text);