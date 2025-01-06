import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { BudgetLimitDto, ExpenseCategoryDto, UpdateBudgetLimitDto } from '@shared/dto';
import { BudgetService } from './services/budget.service';
import { Public } from '../../../decorators/public.decorator';

@Controller('budget/categories')
export class CategoriesController {
  constructor(private readonly budgetService: BudgetService) {}

  @Public()
  @Get()
  async findAll(): Promise<ExpenseCategoryDto[]> {
    return await this.budgetService.getCategories();
  }

  @Public()
  @Get('name/:categoryId')
  async getCategoryName(@Param('categoryId') id: number): Promise<string> {
    return await this.budgetService.getCategoryName(+id);
  }

  @Public()
  @Get('limit/:categoryId')
  async getCategoryLimit(@Param('categoryId') id: number): Promise<number> {
    return await this.budgetService.getCategoryLimit(+id);
  }

  @Public()
  @Patch('limit/:categoryId')
  async setCategoryLimit(
    @Param('categoryId') id: number,
    @Body() updateCategoryLimit: UpdateBudgetLimitDto
  ): Promise<BudgetLimitDto> {
    return await this.budgetService.setCategoryLimit(+id, updateCategoryLimit);
  }
}
