-- Lead capture table for email-gated downloads
CREATE TABLE IF NOT EXISTS public.lead_captures (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  name text NOT NULL,
  company text,
  source text DEFAULT 'playbook_download',
  created_at timestamptz DEFAULT now()
);

-- Unique constraint on email+source to prevent duplicates per asset
CREATE UNIQUE INDEX IF NOT EXISTS lead_captures_email_source_idx ON public.lead_captures (email, source);

-- Enable RLS
ALTER TABLE public.lead_captures ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (website visitors)
CREATE POLICY "Allow anonymous inserts" ON public.lead_captures
  FOR INSERT TO anon
  WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Authenticated users can read" ON public.lead_captures
  FOR SELECT TO authenticated
  USING (true);
