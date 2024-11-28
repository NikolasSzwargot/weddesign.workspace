import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { CreateExpenseDto, ExpenseDto, UpdateExpenseDto } from '@shared/dto';

@Controller('expense')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto): Promise<ExpenseDto> {
    return await this.budgetService.create(createExpenseDto);
  }

  @Get()
  async findAll() {
    return this.budgetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.budgetService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBudgetDto: UpdateExpenseDto) {
    return this.budgetService.update(+id, updateBudgetDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.budgetService.remove(+id);
  }
}
