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

  const guests = [
    { firstName: 'Filip', lastName: 'Rosiak' },
    { firstName: 'Jakub', lastName: 'Stefański' },
    { firstName: 'Lena', lastName: 'Woźniak' },
    { firstName: 'Nikolas', lastName: 'Szwargot' },
    { firstName: 'Kacper', lastName: 'Woźniak' },
    { firstName: 'Miłosz', lastName: 'Wiśniewski' },
    { firstName: 'Mikołaj', lastName: 'Napierała' },
    { firstName: 'Hubert', lastName: 'Bogdański' },
    { firstName: 'Kacper', lastName: 'Kuras' },
    { firstName: 'Michał', lastName: 'Konieczny' },
  ];

  const guestsData = guests.map((guest, index) => ({
    firstName: guest.firstName,
    lastName: guest.lastName,
    isVege: index % 2 === 0,
    isCompanion: index % 3 === 0,
    isChild: index % 4 === 0,
    canGetThere: true,
    overnight: index % 5 === 0,
    notes: `Notatki dla ${guest.firstName} ${guest.lastName}`,
    guestStatusId: (index % 4) + 1,
  }));

  await prisma.guest.createMany({
    data: guestsData,
  });

  console.log('10 guests have been imported correctly');
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
