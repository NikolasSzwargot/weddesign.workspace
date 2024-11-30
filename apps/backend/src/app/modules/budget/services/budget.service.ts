import { Injectable } from '@nestjs/common';
import {
  CreateExpenseDto,
  ExpenseDto,
  UpdateExpenseDto,
  ExpensesByCategoryDto,
  BudgetLimitDto,
  GetBudgetLimitsDto,
  UpdateBudgetLimitDto,
} from '@shared/dto';
import { ExpenseCategory } from '@prisma/client';
import { PrismaService } from '../../../prisma-client.service';

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  async addExpense(createExpenseDto: CreateExpenseDto): Promise<ExpenseDto> {
    return this.prisma.expense.create({ data: createExpenseDto });
  }

  async getExpenses(): Promise<ExpenseDto[]> {
    return this.prisma.expense.findMany();
  }

  async getExpenseById(id: number): Promise<ExpenseDto> {
    try {
      return this.prisma.expense.findUnique({ where: { id } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Expense not found');
      }
      throw new Error(e);
    }
  }

  async updateExpense(id: number, updateExpenseDto: UpdateExpenseDto): Promise<ExpenseDto> {
    try {
      return await this.prisma.expense.update({
        where: { id },
        data: updateExpenseDto,
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Expense not found');
      }
      throw new Error(e);
    }
  }

  async getExpensesByCategory(): Promise<ExpensesByCategoryDto[]> {
    const expenses = await this.getExpenses();

    const groupedExpenses = this.groupExpenseByCategory(expenses);

    const expenseDetails = await Promise.all(
      Object.keys(groupedExpenses).map(async (categoryIdStr) => {
        return this.createExpenseDetailDto(categoryIdStr, groupedExpenses[categoryIdStr]);
      })
    );
    return expenseDetails.sort((a, b) => b.spent - a.spent);
  }

  async deleteExpenseById(id: number): Promise<ExpenseDto> {
    try {
      return this.prisma.expense.delete({ where: { id: id } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Expense not found');
      }
      throw new Error(e);
    }
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
    return category?.limit || null;
  }

  private groupExpenseByCategory(expenses: ExpenseDto[]): Record<string, ExpenseDto[]> {
    return expenses.reduce(
      (acc, expense) => {
        const categoryId = expense.categoryId.toString();
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push(expense);
        return acc;
      },
      {} as Record<string, ExpenseDto[]>
    );
  }

  private async createExpenseDetailDto(categoryIdStr: string, expenses: ExpenseDto[]): Promise<ExpensesByCategoryDto> {
    const categoryId = parseInt(categoryIdStr, 10);
    const [categoryName, limit] = await Promise.all([
      this.getCategoryName(categoryId),
      this.getCategoryLimit(categoryId),
    ]);

    const spent = expenses.reduce((total, expense) => total + expense.amount, 0);

    return {
      categoryId,
      categoryName,
      expenses: expenses.sort((a, b) => b.amount - a.amount),
      limit,
      spent,
    };
  }

  async getBudgetLimit(): Promise<GetBudgetLimitsDto> {
    const budgetLimit = await this.prisma.mainBudgetLimit.findFirst();
    const expenses = await this.getExpenses();
    const paidExpenses = expenses.filter((expense) => expense.isPaid);
    const notPaidExpenses = expenses.filter((expense) => !expense.isPaid);

    return {
      limit: budgetLimit.limit,
      paid: paidExpenses.reduce((total, expense) => total + expense.amount, 0),
      notPaid: notPaidExpenses.reduce((total, expense) => total + expense.amount, 0),
      totalPlanned: expenses.reduce((total, expense) => total + expense.amount, 0),
    };
  }

  async updateBudgetLimit(id: number, updateBudgetLimitDto: UpdateBudgetLimitDto): Promise<BudgetLimitDto> {
    try {
      return this.prisma.mainBudgetLimit.update({
        where: { id },
        data: updateBudgetLimitDto,
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Budget limit not found');
      }
      throw new Error(e);
    }
  }
}
