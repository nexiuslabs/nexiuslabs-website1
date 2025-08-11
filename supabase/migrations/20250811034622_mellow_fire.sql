/*
  # Optimize RLS Policy Performance for Chat Messages

  ## Performance Optimization
  - Fix auth.uid() re-evaluation issue in `enable_admin_management` policy
  - Replace `uid()` with `(SELECT auth.uid())` to evaluate once per query instead of once per row
  - Significantly improves performance when querying multiple chat messages

  ## Security Maintained
  - Preserves exact same security behavior
  - Admin users can still manage all chat messages
  - Regular users still have appropriate access restrictions
  - No change in access control logic

  ## Changes Made
  1. Drop existing `enable_admin_management` policy
  2. Recreate policy with optimized auth.uid() call
  3. Maintain all existing functionality while improving performance
*/

-- Drop the existing policy that has performance issues
DROP POLICY IF EXISTS "enable_admin_management" ON public.chat_messages;

-- Recreate the policy with optimized auth.uid() call
-- This ensures auth.uid() is evaluated once per query, not once per row
CREATE POLICY "enable_admin_management"
ON public.chat_messages
FOR ALL
TO authenticated
USING (EXISTS ( SELECT 1
   FROM admin_users
  WHERE (admin_users.user_id = (SELECT auth.uid()))));