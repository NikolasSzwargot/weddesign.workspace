import { Module } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { ExpenseController } from './expense.controller';
import { CategoriesController } from './categories.controller';
import { LimitBudgetController } from './main-budget-limit.controller';
import { PrismaService } from '../../prisma-client.service';

@Module({
  controllers: [ExpenseController, CategoriesController, LimitBudgetController],
  providers: [BudgetService, PrismaService],
})
export class BudgetModule {}
