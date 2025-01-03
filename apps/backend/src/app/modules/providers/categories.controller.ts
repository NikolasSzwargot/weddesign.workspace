import { ProvidersService } from './services/providers.service';
import { BadRequestException, Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CategoryToSummaryDto, CreateProviderCategoryDto, ProviderCategoryDto } from '@shared/dto';

@Controller('providers/categories')
export class CategoriesController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  async create(@Body() createProviderCategoryDto: CreateProviderCategoryDto): Promise<ProviderCategoryDto> {
    return await this.providersService.createNewCategory(createProviderCategoryDto);
  }

  @Get('all')
  async findAll(): Promise<CategoryToSummaryDto[]> {
    return await this.providersService.getCategoriesSummary();
  }

  @Get(':id')
  async findOne(@Query('id') idString: string): Promise<ProviderCategoryDto> {
    const id = parseInt(idString);
    if (isNaN(id) && idString) {
      throw new BadRequestException('Id should be a number');
    }

    return await this.providersService.getCategoryById(id);
  }

  @Delete(':id')
  async remove(@Query('id') idString: string): Promise<ProviderCategoryDto> {
    const id = parseInt(idString);
    if (isNaN(id) && idString) {
      throw new BadRequestException('Id should be a number');
    }
    return await this.providersService.removeCategory(id);
  }
}
