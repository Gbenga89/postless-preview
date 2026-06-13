import { prisma } from '@/lib/prisma';

export type RelevantChunk = {
  id: string;
  chunkText: string | null;
  distance: number;
};

function toVectorLiteral(embedding: number[]) {
  if (embedding.length !== 1536) {
    throw new Error('Expected a 1536-dimensional embedding.');
  }

  return `[${embedding.join(',')}]`;
}

export async function findRelevantChunks(
  brandId: string,
  queryEmbedding: number[],
  k: number,
): Promise<RelevantChunk[]> {
  const vector = toVectorLiteral(queryEmbedding);
  const limit = Math.max(1, Math.min(k, 100));

  return prisma.$queryRaw<RelevantChunk[]>`
    select
      id,
      chunk_text as "chunkText",
      embedding <=> ${vector}::vector as distance
    from content_chunks
    where brand_id = ${brandId}::uuid
      and embedding is not null
    order by embedding <=> ${vector}::vector
    limit ${limit}
  `;
}

export async function updateChunkEmbedding(
  contentChunkId: string,
  embedding: number[],
): Promise<void> {
  const vector = toVectorLiteral(embedding);

  await prisma.$executeRaw`
    update content_chunks
    set embedding = ${vector}::vector
    where id = ${contentChunkId}::uuid
  `;
}
