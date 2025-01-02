import { Controller, Get, Body, Patch, Param, Request, Post } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { BudgetLimitDto, CreateBudgetLimitDto, GetBudgetLimitsDto, UpdateBudgetLimitDto } from '@shared/dto';
import { ApiGlobalDecorators } from '../../../decorators/swagger.decorators';

@ApiGlobalDecorators()
@Controller('budget/limit')
export class LimitBudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  async findOne(@Request() req): Promise<GetBudgetLimitsDto> {
    return await this.budgetService.getBudgetLimit(req.user.userId);
  }

  @Post()
  async create(@Request() req, @Body() createBudgetLimitDto: CreateBudgetLimitDto) {
    return await this.budgetService.createBudgetLimit(req.user.userId, createBudgetLimitDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBudgetLimit: UpdateBudgetLimitDto): Promise<BudgetLimitDto> {
    return await this.budgetService.updateBudgetLimit(+id, updateBudgetLimit);
  }
}
