import { Injectable } from '@nestjs/common';
import { CreateExpenseDto, ExpenseDto, UpdateExpenseDto, ExpensesByCategoryDto } from '@shared/dto';
import { ExpenseCategory, PrismaClient } from '@prisma/client';

@Injectable()
export class BudgetService {
  private prisma = new PrismaClient();

  async addExpense(createExpenseDto: CreateExpenseDto): Promise<ExpenseDto> {
    return this.prisma.expense.create({ data: createExpenseDto });
  }

  async getExpenses(): Promise<ExpenseDto[]> {
    return this.prisma.expense.findMany();
  }

  async getExpenseById(id: number): Promise<ExpenseDto> {
    return this.prisma.expense.findUnique({ where: { id } });
  }

  async updateExpense(id: number, updateExpenseDto: UpdateExpenseDto): Promise<ExpenseDto> {
    try {
      return await this.prisma.expense.update({
        where: { id },
        data: updateExpenseDto,
      });
    } catch (e) {
      if (e.code === 'P2025') {
        return null;
      }
      throw new Error('Expense not found');
    }
  }

  async getExpensesByCategory(): Promise<ExpensesByCategoryDto[]> {
    const expenses: ExpenseDto[] = await this.getExpenses();

    const groupedExpenses: Record<string, ExpenseDto[]> = {};

    expenses.forEach((expense: ExpenseDto) => {
      const expenseCategoryId = expense.categoryId;
      if (!groupedExpenses[expenseCategoryId]) {
        groupedExpenses[expenseCategoryId] = [];
      }
      groupedExpenses[expenseCategoryId].push(expense);
    });

    return await Promise.all(
      Object.keys(groupedExpenses).map(async (categoryIdStr) => {
        const categoryId = parseInt(categoryIdStr, 10);
        const categoryName = await this.getCategoryName(categoryId);
        const limit = await this.getCategoryLimit(categoryId);

        const expenses = groupedExpenses[categoryIdStr];
        const spent = expenses.reduce((acc, expense) => acc + expense.amount, 0);

        return {
          categoryId,
          categoryName,
          expenses: expenses.sort((a, b) => b.amount - a.amount),
          limit,
          spent,
        } as ExpensesByCategoryDto;
      })
    ).then((results) => results.sort((a, b) => b.spent - a.spent));
  }

  async deleteExpenseById(id: number): Promise<ExpenseDto> {
    return this.prisma.expense.delete({ where: { id: id } });
  }

  async getCategories(): Promise<ExpenseCategory[]> {
    return this.prisma.expenseCategory.findMany();
  }

  async getCategoryName(categoryId: number): Promise<string> {
    const category = await this.prisma.expenseCategory.findUnique({ where: { id: categoryId } });
    return category?.name || 'Unknown';
  }

  async getCategoryLimit(categoryId: number): Promise<number> {
    const category = await this.prisma.expenseCategory.findUnique({ where: { id: categoryId } });
    return category?.limit || 0;
  }
}
