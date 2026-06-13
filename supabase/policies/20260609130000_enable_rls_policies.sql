-- =====================================================================
-- Production Row-Level Security policies for the Postless data layer.
-- =====================================================================
-- STAGED, NOT AUTO-APPLIED. This file lives in supabase/policies/ (NOT in
-- supabase/migrations/) on purpose, so `supabase db push` never enables RLS on
-- the dev/test DB by accident and locks everyone out.
--
-- To use in PRODUCTION:
--   * copy this file into supabase/migrations/ (keep the timestamp prefix) and
--     run `supabase db push`, OR
--   * paste it into the production project's SQL Editor.
--
-- IMPORTANT ASSUMPTION:
--   These policies assume public.users.id == the Supabase Auth uid (auth.uid()),
--   i.e. each app user row's id equals their auth user id. If your onboarding
--   stores the auth uid in a different column, change the auth.uid() comparisons
--   to match. The service_role / secret key bypasses RLS entirely, so server-side
--   and admin writes keep working regardless of these policies.
--
-- Idempotent: safe to re-run (enable RLS is a no-op if already on; each policy is
-- dropped before being recreated).
-- =====================================================================

-- Helper: does the current user own this brand?
-- SECURITY DEFINER bypasses RLS on `brands` inside the function, which avoids
-- policy recursion and is faster than an inline subquery evaluated under RLS.
create or replace function public.user_owns_brand(b uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.brands where id = b and user_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------
-- Enable RLS on every table
-- ---------------------------------------------------------------------
alter table public.plans                enable row level security;
alter table public.users                enable row level security;
alter table public.brands               enable row level security;
alter table public.brand_profiles       enable row level security;
alter table public.subscriptions        enable row level security;
alter table public.inbox_items          enable row level security;
alter table public.content_chunks       enable row level security;
alter table public.content_plans        enable row level security;
alter table public.posts                enable row level security;
alter table public.platform_connections enable row level security;
alter table public.usage_log            enable row level security;

-- ---------------------------------------------------------------------
-- plans: public, read-only reference data (pricing tiers).
-- Writes are intentionally unpoliced -> only service_role can modify.
-- ---------------------------------------------------------------------
drop policy if exists plans_select on public.plans;
create policy plans_select on public.plans
  for select to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------
-- users: a user sees and updates only their own row.
-- ---------------------------------------------------------------------
drop policy if exists users_self_select on public.users;
create policy users_self_select on public.users
  for select to authenticated
  using (id = auth.uid());

drop policy if exists users_self_update on public.users;
create policy users_self_update on public.users
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- ---------------------------------------------------------------------
-- brands: owned via brands.user_id.
-- ---------------------------------------------------------------------
drop policy if exists brands_owner_all on public.brands;
create policy brands_owner_all on public.brands
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ---------------------------------------------------------------------
-- brand_profiles: keyed by brand_id, gated on brand ownership.
-- ---------------------------------------------------------------------
drop policy if exists brand_profiles_owner_all on public.brand_profiles;
create policy brand_profiles_owner_all on public.brand_profiles
  for all to authenticated
  using (public.user_owns_brand(brand_id))
  with check (public.user_owns_brand(brand_id));

-- ---------------------------------------------------------------------
-- subscriptions: user reads own; billing writes happen via service_role.
-- ---------------------------------------------------------------------
drop policy if exists subscriptions_owner_select on public.subscriptions;
create policy subscriptions_owner_select on public.subscriptions
  for select to authenticated
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------
-- inbox_items: brand-scoped; owner has full CRUD.
-- ---------------------------------------------------------------------
drop policy if exists inbox_items_owner_all on public.inbox_items;
create policy inbox_items_owner_all on public.inbox_items
  for all to authenticated
  using (public.user_owns_brand(brand_id))
  with check (public.user_owns_brand(brand_id));

-- ---------------------------------------------------------------------
-- content_chunks: brand-scoped; owner has full CRUD.
-- (Embeddings are typically written server-side via service_role.)
-- ---------------------------------------------------------------------
drop policy if exists content_chunks_owner_all on public.content_chunks;
create policy content_chunks_owner_all on public.content_chunks
  for all to authenticated
  using (public.user_owns_brand(brand_id))
  with check (public.user_owns_brand(brand_id));

-- ---------------------------------------------------------------------
-- content_plans: brand-scoped; owner has full CRUD.
-- ---------------------------------------------------------------------
drop policy if exists content_plans_owner_all on public.content_plans;
create policy content_plans_owner_all on public.content_plans
  for all to authenticated
  using (public.user_owns_brand(brand_id))
  with check (public.user_owns_brand(brand_id));

-- ---------------------------------------------------------------------
-- posts: brand-scoped; owner has full CRUD.
-- ---------------------------------------------------------------------
drop policy if exists posts_owner_all on public.posts;
create policy posts_owner_all on public.posts
  for all to authenticated
  using (public.user_owns_brand(brand_id))
  with check (public.user_owns_brand(brand_id));

-- ---------------------------------------------------------------------
-- platform_connections: brand-scoped. Holds oauth_tokens (sensitive).
-- Owner may manage connection state; consider keeping token writes
-- service_role-only and never selecting oauth_tokens from the client.
-- ---------------------------------------------------------------------
drop policy if exists platform_connections_owner_all on public.platform_connections;
create policy platform_connections_owner_all on public.platform_connections
  for all to authenticated
  using (public.user_owns_brand(brand_id))
  with check (public.user_owns_brand(brand_id));

-- ---------------------------------------------------------------------
-- usage_log: user reads own usage; inserts are server-side (service_role).
-- ---------------------------------------------------------------------
drop policy if exists usage_log_owner_select on public.usage_log;
create policy usage_log_owner_select on public.usage_log
  for select to authenticated
  using (user_id = auth.uid());
