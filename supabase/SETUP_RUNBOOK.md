# Postless Supabase setup runbook

Supabase remains the hosted Postgres, pgvector, and Auth provider. Prisma owns the backend and AI
data-layer schema and migrations in `prisma/`.

Do not run hosted database migration, reset, resolve, or seed commands without explicit
project-owner approval.

## Local setup

Run from the repo root.

```sh
npm install
npm run prisma:generate
```

Fill `.env` from `.env.example`:

```sh
SUPABASE_PROJECT_REF=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WAITLIST_API_URL=
WAITLIST_UPSTREAM_URL=
```

Use pooled Supabase Postgres for `DATABASE_URL` and the direct connection string for `DIRECT_URL`.

## Local migrations and seed

Apply Prisma migrations locally:

```sh
npm run prisma:migrate
```

Seed local data:

```sh
npm run db:seed
```

Embeddings are not seeded. The application writes pgvector values through raw SQL helpers because
Prisma models `content_chunks.embedding` as an unsupported `vector(1536)` column.

## RLS policies

RLS policy SQL is kept in `supabase/policies/` and is applied separately after Prisma migrations.
Prisma does not manage RLS.

## Hosted test database reconciliation

The hosted test database may contain tables created manually via SQL editor. It will conflict with a
clean Prisma migration history until reconciled.

Recommended for disposable test data:

```sh
npx prisma migrate deploy
```

Only use this after resetting the test database through an approved process.

Alternative if the hosted schema must be preserved:

```sh
npx prisma migrate resolve --applied 20260609110000_init_data_layer
```

Only baseline after confirming the hosted schema exactly matches the Prisma migration SQL, including
enum types, defaults, indexes, pgvector extension, and the HNSW index.
