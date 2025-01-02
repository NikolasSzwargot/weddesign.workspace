import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.guestStatus.createMany({
    data: [
      {
        name: 'created',
      },
      {
        name: 'invited',
      },
      {
        name: 'accepted',
      },
      {
        name: 'rejected',
      },
    ],
  });

  console.log('Statuses have been imported correctly');

  await prisma.expenseCategory.createMany({
    data: [
      {
        name: 'food',
      },
      {
        name: 'place',
      },
      {
        name: 'decoration',
      },
      {
        name: 'flowers',
      },
      {
        name: 'photos',
      },
      {
        name: 'music',
      },
      {
        name: 'entertainment',
      },
      {
        name: 'presents',
      },
      {
        name: 'outfits',
      },
      {
        name: 'beauty',
      },
      {
        name: 'accesories',
      },
      {
        name: 'rings',
      },
      {
        name: 'accomodation',
      },
      {
        name: 'legal',
      },
      {
        name: 'transport',
      },
      {
        name: 'other',
      },
    ],
  });

  console.log('Expense categories have been imported correctly');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
