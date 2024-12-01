import { Expense } from '@prisma/client';
export declare class ExpensesByCategoryDto {
    categoryId: number;
    categoryName: string;
    expenses: Expense[];
    limit: number;
}
