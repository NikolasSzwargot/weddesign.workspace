import { Module } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { ExpenseController } from './expense.controller';
import { CategoriesController } from './categories.controller';
import { LimitBudgetController } from './main-budget-limit.controller';

@Module({
  controllers: [ExpenseController, CategoriesController, LimitBudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
