import { Module } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { ExpenseController } from './expense.controller';
import { CategoriesController } from './categories.controller';
import { LimitBudgetController } from './main-budget-limit.controller';
import { PrismaService } from '../../prisma-client.service';
import { CategoriesLimitController } from './categories-limits.controller';

@Module({
  controllers: [ExpenseController, CategoriesController, LimitBudgetController, CategoriesLimitController],
  providers: [BudgetService, PrismaService],
})
export class BudgetModule {}
