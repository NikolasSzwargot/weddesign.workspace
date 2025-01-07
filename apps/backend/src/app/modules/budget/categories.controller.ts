import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ExpenseCategoryDto } from '@shared/dto';
import { BudgetService } from './services/budget.service';
import { Public } from '../../../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Budget')
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
  async getCategoryName(@Param('categoryId', ParseIntPipe) id: number): Promise<string> {
    return await this.budgetService.getCategoryName(id);
  }
}
