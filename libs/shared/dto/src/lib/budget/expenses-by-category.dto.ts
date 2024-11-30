import { Expense } from '@prisma/client';

export class ExpensesByCategoryDto {
  categoryId: number;
  categoryName: string;
  expenses: Expense[];
  limit: number;
  spent: number;
}
