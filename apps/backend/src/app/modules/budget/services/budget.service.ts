import { Injectable } from '@nestjs/common';
import { CreateExpenseDto, ExpenseDto, UpdateExpenseDto } from '@shared/dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BudgetService {
  private prisma = new PrismaClient();

  async create(createExpenseDto: CreateExpenseDto): Promise<ExpenseDto> {
    return this.prisma.expense.create({ data: createExpenseDto });
  }

  async findAll(): Promise<ExpenseDto[]> {
    return this.prisma.expense.findMany();
  }

  async findOne(id: number): Promise<ExpenseDto> {
    return this.prisma.expense.findUnique({ where: { id } });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto): Promise<ExpenseDto> {
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

  remove(id: number) {
    return `This action removes a #${id} budget`;
  }
}
