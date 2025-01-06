import { Expense } from '@prisma/client';

export class ExpensesByDateDto {
  title: string;
  data: Expense[];
  spent: number;
}
