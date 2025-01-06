import { ProvidersService } from './services/providers.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request } from '@nestjs/common';
import { CategoryToSummaryDto, CreateProviderCategoryDto, ProviderCategoryDto } from '@shared/dto';
import { ApiGlobalDecorators } from '../../../decorators/swagger.decorators';

@ApiGlobalDecorators()
@Controller('providers/categories')
export class CategoriesController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  async create(
    @Request() req,
    @Body() createProviderCategoryDto: CreateProviderCategoryDto
  ): Promise<ProviderCategoryDto> {
    return await this.providersService.createNewCategory(req.user.userId, createProviderCategoryDto);
  }

  @Get('all')
  async findAll(@Request() req): Promise<CategoryToSummaryDto[]> {
    return await this.providersService.getCategoriesSummary(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProviderCategoryDto> {
    return await this.providersService.getCategoryById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ProviderCategoryDto> {
    return await this.providersService.removeCategory(id);
  }
}
