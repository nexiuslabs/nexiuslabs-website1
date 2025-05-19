/*
  # Fix leads table configuration

  1. Changes
    - Remove captcha requirement
    - Add proper indexes
    - Update policies for public access
    
  2. Security
    - Enable RLS
    - Allow public form submissions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert access for all users" ON leads;

-- Create new insert policy without captcha requirement
CREATE POLICY "Enable insert access for all users"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Make captcha_token nullable if it isn't already
ALTER TABLE leads
ALTER COLUMN captcha_token DROP NOT NULL;

-- Create indexes for better performance if they don't exist
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);