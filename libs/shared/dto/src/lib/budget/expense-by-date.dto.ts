import { Expense } from '@prisma/client';

export class ExpensesByDateDto {
  date: string;
  expenses: Expense[];
  spent: number;
}
