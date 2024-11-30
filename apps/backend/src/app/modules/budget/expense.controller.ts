import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { CreateExpenseDto, ExpenseDto, UpdateExpenseDto, ExpensesByCategoryDto } from '@shared/dto';

@Controller('budget/expense')
export class ExpenseController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto): Promise<ExpenseDto> {
    return await this.budgetService.addExpense(createExpenseDto);
  }

  @Get()
  async findAll(): Promise<ExpenseDto[]> {
    return await this.budgetService.getExpenses();
  }

  @Get('groupedByCategory')
  async groupedByCategory(): Promise<ExpensesByCategoryDto[]> {
    return await this.budgetService.getExpensesByCategory();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ExpenseDto> {
    return await this.budgetService.getExpenseById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto): Promise<ExpenseDto> {
    return await this.budgetService.updateExpense(+id, updateExpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ExpenseDto> {
    return await this.budgetService.deleteExpenseById(+id);
  }
}
