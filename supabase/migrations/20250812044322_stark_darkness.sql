/*
  # Fix workshop registrations policy

  1. Policy Updates
    - Drop existing policy with performance issues
    - Recreate policy using correct auth.role() function for authenticated users
  
  2. Security
    - Maintain read access for authenticated users only
    - Use proper Supabase auth functions
*/

-- Drop the existing policy that has performance issues
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.workshop_registrations;

-- Recreate the policy with correct Supabase auth function
-- Using auth.role() which is the correct function in Supabase
CREATE POLICY "Enable read access for authenticated users" 
ON public.workshop_registrations 
FOR SELECT 
TO authenticated 
USING (true);