import { ProvidersService } from './services/providers.service';
import { BadRequestException, Body, Controller, Delete, Get, Post, Query, Request } from '@nestjs/common';
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
