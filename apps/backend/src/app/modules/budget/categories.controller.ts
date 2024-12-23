import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { BudgetLimitDto, ExpenseCategoryDto, UpdateBudgetLimitDto } from '@shared/dto';
import { BudgetService } from './services/budget.service';

@Controller('budget/categories')
export class CategoriesController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  async findAll(): Promise<ExpenseCategoryDto[]> {
    return await this.budgetService.getCategories();
  }

  @Get('name/:categoryId')
  async getCategoryName(@Param('categoryId') id: number): Promise<string> {
    return await this.budgetService.getCategoryName(+id);
  }

  @Get('limit/:categoryId')
  async getCategoryLimit(@Param('categoryId') id: number): Promise<number> {
    return await this.budgetService.getCategoryLimit(+id);
  }

  @Patch('limit/:categoryId')
  async setCategoryLimit(
    @Param('categoryId') id: number,
    @Body() updateCategoryLimit: UpdateBudgetLimitDto
  ): Promise<BudgetLimitDto> {
    return await this.budgetService.setCategoryLimit(+id, updateCategoryLimit);
  }
}
