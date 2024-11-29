import { Module } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { ExpenseController } from './expense.controller';
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [ExpenseController, CategoriesController],
  providers: [BudgetService],
})
export class BudgetModule {}
