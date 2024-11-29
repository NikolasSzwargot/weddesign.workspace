import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from '../expense.controller';
import { BudgetService } from '../services/budget.service';

describe('BudgetController', () => {
  let controller: ExpenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [BudgetService],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
