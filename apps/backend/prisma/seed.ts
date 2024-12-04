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
        name: 'decor',
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
        name: 'gifts',
      },
      {
        name: 'dress',
      },
      {
        name: 'appearance',
      },
      {
        name: 'accessories',
      },
      {
        name: 'rings',
      },
      {
        name: 'accommodation',
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

  const expenses = [
    { name: 'Fotograf', categoryId: 1 },
    { name: 'Kamerzysta', categoryId: 1 },
    { name: 'Alkohol', categoryId: 1 },
    { name: 'Słodki stół', categoryId: 2 },
    { name: 'Dekoracje', categoryId: 3 },
    { name: 'Kwiaty na dekorację', categoryId: 4 },
    { name: 'Zespół muzyczny', categoryId: 6 },
    { name: 'Podziękowania dla gości', categoryId: 8 },
    { name: 'Suknia ślubna', categoryId: 9 },
    { name: 'Obrączki ślubne', categoryId: 12 },
    { name: 'Transport dla gości', categoryId: 14 },
    { name: 'Konsultacja prawna', categoryId: 13 },
  ];

  const expensesData = expenses.map((expense, index) => {
    return {
      name: expense.name,
      description: `Opis wydatku: ${expense.name.toLowerCase()}`,
      categoryId: expense.categoryId,
      amount: (expense.categoryId % 5) * 1000,
      isPaid: index % 3 === 0,
    };
  });

  await prisma.expense.createMany({
    data: expensesData,
  });

  console.log('12 expenses have been imported correctly');
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
