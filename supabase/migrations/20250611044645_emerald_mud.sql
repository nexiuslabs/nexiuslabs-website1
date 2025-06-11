/*
  # Create workshop registrations table

  1. New Tables
    - `workshop_registrations`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, optional)
      - `email` (text, required)
      - `phone` (text, optional)
      - `company` (text, optional)
      - `project_idea` (text, optional)
      - `cohort` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `workshop_registrations` table
    - Add policy for public insert access
    - Add policy for authenticated read access

  3. Constraints
    - Email validation constraint
    - Status validation constraint
*/

CREATE TABLE IF NOT EXISTS public.workshop_registrations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name text NOT NULL,
    last_name text,
    email text NOT NULL,
    phone text,
    company text,
    project_idea text,
    cohort text,
    status text DEFAULT 'pending',
    created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.workshop_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for all users" ON public.workshop_registrations
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users" ON public.workshop_registrations
FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE public.workshop_registrations ADD CONSTRAINT "valid_email" 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');

ALTER TABLE public.workshop_registrations ADD CONSTRAINT "valid_status" 
CHECK (status IN ('pending', 'confirmed', 'cancelled'));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS workshop_registrations_email_idx ON public.workshop_registrations (email);
CREATE INDEX IF NOT EXISTS workshop_registrations_cohort_idx ON public.workshop_registrations (cohort);
CREATE INDEX IF NOT EXISTS workshop_registrations_status_idx ON public.workshop_registrations (status);
CREATE INDEX IF NOT EXISTS workshop_registrations_created_at_idx ON public.workshop_registrations (created_at DESC);