-- Hero A/B test events table
-- Run this once in Supabase SQL editor.

create table if not exists public.hero_ab_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- event payload
  event text not null,
  variant text,
  cta text,
  path text,
  ref text,
  session_id text,
  user_agent text
);

-- Optional indexes for faster aggregation
create index if not exists hero_ab_events_created_at_idx on public.hero_ab_events (created_at);
create index if not exists hero_ab_events_event_variant_idx on public.hero_ab_events (event, variant);

-- Lock down: no public read/write (service role bypasses RLS).
alter table public.hero_ab_events enable row level security;

-- No RLS policies intentionally.
-- Only service role inserts should be used via Netlify function.
