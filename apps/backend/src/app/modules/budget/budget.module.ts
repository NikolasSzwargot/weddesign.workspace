import { Module } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { BudgetController } from './budget.controller';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
