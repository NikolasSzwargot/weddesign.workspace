import { Controller, Get, Param } from '@nestjs/common';
import { ExpenseCategoryDto } from '@shared/dto';
import { BudgetService } from './services/budget.service';

@Controller('categories')
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
}
