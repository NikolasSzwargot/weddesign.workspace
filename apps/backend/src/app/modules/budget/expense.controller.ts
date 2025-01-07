import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { CreateExpenseDto, ExpenseDto, UpdateExpenseDto, ExpensesByCategoryDto, ExpensesByDateDto } from '@shared/dto';
import { ApiGlobalDecorators } from '../../../decorators/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Budget')
@ApiGlobalDecorators()
@Controller('budget/expense')
export class ExpenseController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  async create(@Request() req, @Body() createExpenseDto: CreateExpenseDto): Promise<ExpenseDto> {
    return await this.budgetService.addExpense(req.user.userId, createExpenseDto);
  }

  @Get()
  async findAll(@Request() req): Promise<ExpenseDto[]> {
    return await this.budgetService.getExpenses(req.user.userId);
  }

  @Get('groupedByCategory')
  async groupedByCategory(@Request() req): Promise<ExpensesByCategoryDto[]> {
    return await this.budgetService.getExpensesByCategory(req.user.userId);
  }

  @Get('groupedByDate')
  async groupedByDate(@Request() req): Promise<ExpensesByDateDto[]> {
    return await this.budgetService.getExpensesByDate(req.user.userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<ExpenseDto> {
    return await this.budgetService.getExpenseById(req.user.userId, id);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto
  ): Promise<ExpenseDto> {
    return await this.budgetService.updateExpense(req.user.userId, id, updateExpenseDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<ExpenseDto> {
    return await this.budgetService.deleteExpenseById(req.user.userId, id);
  }
}
