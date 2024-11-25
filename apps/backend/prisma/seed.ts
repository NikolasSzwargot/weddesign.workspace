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

  // Przykładowe dane gości z imionami i nazwiskami
  // pewnie można by to zrobić w innym pliku, ale sprawdzał to stefan esz
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

  // Tworzenie 10 gości z różnymi atrybutami
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
