# Prisma data layer

Prisma owns the backend and AI data-layer tables in `prisma/schema.prisma` and migrations in
`prisma/migrations/`. Supabase remains the Postgres, pgvector, and Auth host.

The onboarding tables (`users`, `brands`, `brand_profiles`) are owned by the onboarding workstream
and are intentionally not modeled here. Data-layer tables store those relationships as plain UUID
columns without foreign keys.

## Local workflow

1. Copy `.env.example` to `.env` and fill `DATABASE_URL` and `DIRECT_URL`.
2. Generate the Prisma client:

   ```sh
   npm run prisma:generate
   ```

3. Create or apply local migrations:

   ```sh
   npm run prisma:migrate
   ```

4. Seed local development data:

   ```sh
   npm run db:seed
   ```

Embedding values are intentionally not seeded. The app writes embeddings with raw SQL because Prisma
models the pgvector column as `Unsupported("vector(1536)")`.

## RLS policies

Prisma does not manage RLS. Keep RLS policy SQL in `supabase/policies/` and apply it manually after
Prisma migrations have been applied.

## Hosted test database reconciliation

The hosted test database currently has tables that were created manually through the SQL editor, so
it has no Prisma migration history. Do not run either option below against hosted infrastructure
without explicit approval.

Recommended option: reset the test database, then apply the clean Prisma history.

```sh
npx prisma migrate deploy
```

This is the cleanest path because the test database is disposable and Prisma becomes the migration
source of truth from the first recorded migration.

Alternative option: baseline the existing hosted schema if the test database cannot be reset.

```sh
npx prisma migrate resolve --applied 20260609110000_init_data_layer
```

Only use baselining after confirming the live schema exactly matches the Prisma migration SQL,
including enum types, indexes, defaults, and the pgvector extension.
