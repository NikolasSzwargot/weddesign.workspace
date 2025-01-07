import { ProvidersService } from './services/providers.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request } from '@nestjs/common';
import { CategoryToSummaryDto, CreateProviderCategoryDto, ProviderCategoryDto } from '@shared/dto';
import { ApiGlobalDecorators } from '../../../decorators/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Providers')
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

  @Get()
  async findAll(@Request() req): Promise<CategoryToSummaryDto[]> {
    return await this.providersService.getCategoriesSummary(req.user.userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<ProviderCategoryDto> {
    return await this.providersService.getCategoryById(req.user.userId, id);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<ProviderCategoryDto> {
    return await this.providersService.removeCategory(req.user.userId, id);
  }
}
