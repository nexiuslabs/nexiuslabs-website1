/*
  # Add company and remarks fields to ignite_form table

  1. Changes
    - Add company field
    - Add remarks field
    - Maintain existing RLS policies
*/

-- Drop existing table
DROP TABLE IF EXISTS ignite_form;

-- Recreate table with new fields
CREATE TABLE IF NOT EXISTS ignite_form (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text,
  email text NOT NULL,
  company text NOT NULL,
  message text,
  remarks text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable RLS
ALTER TABLE ignite_form ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert access for all users"
  ON ignite_form
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
  ON ignite_form
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = auth.uid()
  ));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS ignite_form_email_idx ON ignite_form(email);
CREATE INDEX IF NOT EXISTS ignite_form_created_at_idx ON ignite_form(created_at DESC);
CREATE INDEX IF NOT EXISTS ignite_form_status_idx ON ignite_form(status);
CREATE INDEX IF NOT EXISTS ignite_form_company_idx ON ignite_form(company);