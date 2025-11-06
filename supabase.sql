create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  usecase text,
  source text default 'landing',
  created_at timestamptz default now()
);
create index if not exists waitlist_email_idx on public.waitlist (lower(email));