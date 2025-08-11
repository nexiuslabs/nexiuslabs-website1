/*
  # Optimize RLS Policy Performance for Notification Settings

  ## Issue
  The notification_settings table has RLS policies that re-evaluate auth.uid() for each row,
  causing suboptimal query performance at scale.

  ## Changes
  1. Optimized Policies
     - "Users can view their own notification settings" - wrapped uid() with (SELECT auth.uid())
     - "Users can update their own notification settings" - wrapped uid() with (SELECT auth.uid())

  ## Performance Impact
  - auth.uid() will be evaluated once per query instead of once per row
  - Significantly improved performance when querying multiple notification settings
  - Better scalability as the table grows

  ## Security
  - Maintains exact same security behavior
  - No changes to access control logic
  - Users can still only access their own notification settings
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own notification settings" ON public.notification_settings;
DROP POLICY IF EXISTS "Users can update their own notification settings" ON public.notification_settings;

-- Recreate policies with optimized auth.uid() calls
CREATE POLICY "Users can view their own notification settings"
  ON public.notification_settings
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own notification settings"
  ON public.notification_settings
  FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));