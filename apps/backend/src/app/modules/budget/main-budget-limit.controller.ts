import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { BudgetLimitDto, GetBudgetLimitsDto, UpdateBudgetLimitDto } from '@shared/dto';

@Controller('budget/limit')
export class LimitBudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  async findOne(): Promise<GetBudgetLimitsDto> {
    return await this.budgetService.getBudgetLimit();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBudgetLimit: UpdateBudgetLimitDto): Promise<BudgetLimitDto> {
    return await this.budgetService.updateBudgetLimit(+id, updateBudgetLimit);
  }
}
