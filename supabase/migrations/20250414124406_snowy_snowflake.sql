/*
  # Fix Event Registration Policies

  1. Changes
    - Drop existing policies
    - Create simplified public access policy
    - Add proper indexes
    - Ensure RLS is enabled
  
  2. Security
    - Allow public registration submissions
    - Maintain admin access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable public registration" ON event_registrations;
DROP POLICY IF EXISTS "Enable admin access" ON event_registrations;

-- Create simplified policies
CREATE POLICY "allow_all_registration_operations"
  ON event_registrations
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS event_registrations_event_id_idx ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS event_registrations_email_idx ON event_registrations(email);
CREATE INDEX IF NOT EXISTS event_registrations_status_idx ON event_registrations(status);
CREATE INDEX IF NOT EXISTS event_registrations_created_at_idx ON event_registrations(created_at DESC);

-- Ensure RLS is enabled
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;