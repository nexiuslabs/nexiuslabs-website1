/*
  # Optimize RLS Policy Performance for Events Table

  ## Issue
  The "Enable admin management of events" policy on public.events was re-evaluating auth.uid() for each row,
  causing performance issues at scale.

  ## Solution
  - Drop the existing policy that calls uid() for each row
  - Recreate the policy with optimized (SELECT auth.uid()) call
  - This ensures auth.uid() is evaluated only once per query instead of once per row

  ## Performance Impact
  - Significantly improves query performance for admin users
  - Reduces database load when querying multiple events
  - Maintains the same security behavior with better efficiency
*/

-- Drop the existing policy with performance issues
DROP POLICY IF EXISTS "Enable admin management of events" ON public.events;

-- Recreate the policy with optimized auth.uid() call
CREATE POLICY "Enable admin management of events"
ON public.events
FOR ALL
TO authenticated
USING (EXISTS ( 
  SELECT 1
  FROM admin_users
  WHERE (admin_users.user_id = (SELECT auth.uid()))
));