import { Expense } from '@prisma/client';

export class ExpensesByDateDto {
  date: Date;
  expenses: Expense[];
  spent: number;
}
