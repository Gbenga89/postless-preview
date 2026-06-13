import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const brandId = '00000000-0000-4000-8000-000000000301';
const userId = '00000000-0000-4000-8000-000000000201';

async function main() {
  await prisma.plan.upsert({
    where: { id: '00000000-0000-4000-8000-000000000101' },
    update: {
      name: 'Base',
      priceUsd: 19,
      tokenAllowance: 100_000,
      modelTier: 'cheap',
      limits: {
        brands: 1,
        scheduled_posts: 30,
        platform_connections: 2,
      },
    },
    create: {
      id: '00000000-0000-4000-8000-000000000101',
      name: 'Base',
      priceUsd: 19,
      tokenAllowance: 100_000,
      modelTier: 'cheap',
      limits: {
        brands: 1,
        scheduled_posts: 30,
        platform_connections: 2,
      },
    },
  });

  await prisma.plan.upsert({
    where: { id: '00000000-0000-4000-8000-000000000102' },
    update: {
      name: 'Pro',
      priceUsd: 79,
      tokenAllowance: 750_000,
      modelTier: 'premium',
      limits: {
        brands: 5,
        scheduled_posts: 250,
        platform_connections: 6,
        priority_generation: true,
      },
    },
    create: {
      id: '00000000-0000-4000-8000-000000000102',
      name: 'Pro',
      priceUsd: 79,
      tokenAllowance: 750_000,
      modelTier: 'premium',
      limits: {
        brands: 5,
        scheduled_posts: 250,
        platform_connections: 6,
        priority_generation: true,
      },
    },
  });

  await prisma.contentPlan.upsert({
    where: { id: '00000000-0000-4000-8000-000000000501' },
    update: {
      brandId,
      cadence: 'weekly',
      aggressiveness: 3,
      schedule: [
        {
          day: 'monday',
          time: '09:00',
          platform: 'linkedin',
          theme: 'founder lesson',
        },
        {
          day: 'wednesday',
          time: '11:30',
          platform: 'x',
          theme: 'product insight',
        },
        {
          day: 'friday',
          time: '14:00',
          platform: 'linkedin',
          theme: 'metric teardown',
        },
      ],
      status: 'active',
    },
    create: {
      id: '00000000-0000-4000-8000-000000000501',
      brandId,
      cadence: 'weekly',
      aggressiveness: 3,
      schedule: [
        {
          day: 'monday',
          time: '09:00',
          platform: 'linkedin',
          theme: 'founder lesson',
        },
        {
          day: 'wednesday',
          time: '11:30',
          platform: 'x',
          theme: 'product insight',
        },
        {
          day: 'friday',
          time: '14:00',
          platform: 'linkedin',
          theme: 'metric teardown',
        },
      ],
      status: 'active',
    },
  });

  await prisma.inboxItem.upsert({
    where: { id: '00000000-0000-4000-8000-000000000401' },
    update: {
      brandId,
      userId,
      scope: 'brand',
      type: 'idea',
      title: 'Activation checklist thread',
      rawContent:
        'Share a practical checklist for finding the single activation event that best predicts retention.',
      sourceUrl: null,
    },
    create: {
      id: '00000000-0000-4000-8000-000000000401',
      brandId,
      userId,
      scope: 'brand',
      type: 'idea',
      title: 'Activation checklist thread',
      rawContent:
        'Share a practical checklist for finding the single activation event that best predicts retention.',
      sourceUrl: null,
    },
  });

  await prisma.inboxItem.upsert({
    where: { id: '00000000-0000-4000-8000-000000000402' },
    update: {
      brandId,
      userId,
      scope: 'brand',
      type: 'work_update',
      title: 'New cohort report shipped',
      rawContent:
        'We shipped cohort reports that show week-over-week retention by acquisition channel and onboarding path.',
      sourceUrl: null,
    },
    create: {
      id: '00000000-0000-4000-8000-000000000402',
      brandId,
      userId,
      scope: 'brand',
      type: 'work_update',
      title: 'New cohort report shipped',
      rawContent:
        'We shipped cohort reports that show week-over-week retention by acquisition channel and onboarding path.',
      sourceUrl: null,
    },
  });

  await prisma.inboxItem.upsert({
    where: { id: '00000000-0000-4000-8000-000000000403' },
    update: {
      brandId,
      userId,
      scope: 'brand',
      type: 'link',
      title: 'Retention benchmark notes',
      rawContent:
        'Notes from a benchmark article about early SaaS retention curves and what founders should measure before scaling acquisition.',
      sourceUrl: 'https://example.com/saas-retention-benchmarks',
    },
    create: {
      id: '00000000-0000-4000-8000-000000000403',
      brandId,
      userId,
      scope: 'brand',
      type: 'link',
      title: 'Retention benchmark notes',
      rawContent:
        'Notes from a benchmark article about early SaaS retention curves and what founders should measure before scaling acquisition.',
      sourceUrl: 'https://example.com/saas-retention-benchmarks',
    },
  });
}

main()
  .catch(async (error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
