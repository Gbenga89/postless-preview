CREATE EXTENSION IF NOT EXISTS vector;

-- CreateEnum
CREATE TYPE "InboxScope" AS ENUM ('brand', 'global');

-- CreateEnum
CREATE TYPE "InboxType" AS ENUM ('article', 'idea', 'link', 'text', 'feedback', 'work_update');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'in_review', 'queued', 'published', 'failed');

-- CreateTable
CREATE TABLE "plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "price_usd" DECIMAL(65,30),
    "token_allowance" INTEGER,
    "model_tier" TEXT,
    "limits" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "plan_id" UUID NOT NULL,
    "status" TEXT,
    "trial_ends_at" TIMESTAMPTZ,
    "current_period_end" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inbox_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "brand_id" UUID,
    "user_id" UUID NOT NULL,
    "scope" "InboxScope" NOT NULL DEFAULT 'brand',
    "type" "InboxType",
    "title" TEXT,
    "raw_content" TEXT,
    "source_url" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inbox_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_chunks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inbox_item_id" UUID NOT NULL,
    "brand_id" UUID,
    "chunk_index" INTEGER,
    "chunk_text" TEXT,
    "token_count" INTEGER,
    "embedding" vector(1536),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "brand_id" UUID NOT NULL,
    "cadence" TEXT,
    "aggressiveness" INTEGER,
    "schedule" JSONB NOT NULL DEFAULT '[]',
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "content_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "brand_id" UUID NOT NULL,
    "plan_id" UUID,
    "body" TEXT,
    "platform_variants" JSONB NOT NULL DEFAULT '{}',
    "status" "PostStatus" NOT NULL DEFAULT 'draft',
    "review_mode" BOOLEAN NOT NULL DEFAULT false,
    "scheduled_at" TIMESTAMPTZ,
    "published_at" TIMESTAMPTZ,
    "regen_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_connections" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "brand_id" UUID NOT NULL,
    "platform" TEXT,
    "oauth_tokens" JSONB,
    "status" TEXT NOT NULL DEFAULT 'disconnected',
    "connected_at" TIMESTAMPTZ,

    CONSTRAINT "platform_connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usage_log" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "brand_id" UUID,
    "action" TEXT,
    "provider" TEXT,
    "model" TEXT,
    "tokens_used" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usage_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "subscriptions_user_id_idx" ON "subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "inbox_items_brand_id_created_at_idx" ON "inbox_items"("brand_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "inbox_items_user_id_idx" ON "inbox_items"("user_id");

-- CreateIndex
CREATE INDEX "posts_brand_id_status_scheduled_at_idx" ON "posts"("brand_id", "status", "scheduled_at");

-- CreateIndex
CREATE INDEX "usage_log_user_id_created_at_idx" ON "usage_log"("user_id", "created_at");

-- pgvector index Prisma cannot model.
CREATE INDEX IF NOT EXISTS content_chunks_embedding_hnsw
  ON content_chunks USING hnsw (embedding vector_cosine_ops);

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_chunks" ADD CONSTRAINT "content_chunks_inbox_item_id_fkey" FOREIGN KEY ("inbox_item_id") REFERENCES "inbox_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "content_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
