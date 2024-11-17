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

  console.log('Statuses has been imported correctly');
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
