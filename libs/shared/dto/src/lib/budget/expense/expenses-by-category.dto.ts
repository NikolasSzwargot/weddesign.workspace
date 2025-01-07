import { Expense } from '@prisma/client';

export class ExpensesByCategoryDto {
  categoryId: number;
  title: string;
  data: Expense[];
  subtitle: string;
  limit: number;
  spent: number;
}
