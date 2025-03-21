import { Body, Controller, Get, Param, ParseIntPipe, Patch, Request } from '@nestjs/common';
import { CategoryLimitDto, UpdateBudgetLimitDto } from '@shared/dto';
import { BudgetService } from './services/budget.service';
import { ApiGlobalDecorators } from '../../../decorators/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Budget')
@ApiGlobalDecorators()
@Controller('budget/categories')
export class CategoriesLimitController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get('limit')
  async getCategoriesLimit(@Request() req): Promise<CategoryLimitDto[]> {
    return await this.budgetService.getCategoryLimits(req.user.userId);
  }

  @Get('limit/:categoryId')
  async getCategoryLimit(@Request() req, @Param('categoryId', ParseIntPipe) id: number): Promise<number> {
    return await this.budgetService.getCategoryLimit(req.user.userId, id);
  }

  @Patch('limit/:categoryId')
  async setCategoryLimit(
    @Request() req,
    @Param('categoryId', ParseIntPipe) id: number,
    @Body() updateCategoryLimit: UpdateBudgetLimitDto
  ): Promise<CategoryLimitDto> {
    return await this.budgetService.setCategoryLimit(req.user.userId, id, updateCategoryLimit);
  }
}
