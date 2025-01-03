import { ProvidersService } from './services/providers.service';
import { BadRequestException, Body, Controller, Delete, Get, Patch, Post, Query, Request } from '@nestjs/common';
import { CreateProviderDto, ProviderDto, UpdateProviderDto } from '@shared/dto';
import { ApiGlobalDecorators } from '../../../decorators/swagger.decorators';

@ApiGlobalDecorators()
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  async create(@Request() req, @Body() createProviderDto: CreateProviderDto): Promise<ProviderDto> {
    return await this.providersService.createNewProvider(req.user.userId, createProviderDto);
  }

  @Patch(':id')
  async update(@Query('id') idString: string, @Body() updateProviderDto: UpdateProviderDto): Promise<ProviderDto> {
    const id = parseInt(idString);
    if (isNaN(id) && idString) {
      throw new BadRequestException('Id should be a number');
    }
    return await this.providersService.updateProvider(id, updateProviderDto);
  }

  @Get('allInCategory/:categoryId')
  async findAll(@Request() req, @Query('categoryId') categoryIdString: string): Promise<ProviderDto[]> {
    const categoryId = parseInt(categoryIdString);
    if (isNaN(categoryId) && categoryIdString) {
      throw new BadRequestException('Id should be a number');
    }
    return await this.providersService.getAllProvidersInCategory(req.user.userId, categoryId);
  }

  @Get(':id')
  async findOne(@Query('id') idString: string): Promise<ProviderDto> {
    const id = parseInt(idString);
    if (isNaN(id) && idString) {
      throw new BadRequestException('Id should be a number');
    }

    return await this.providersService.getProviderById(id);
  }

  @Delete(':id')
  async remove(@Query('id') idString: string): Promise<ProviderDto> {
    const id = parseInt(idString);
    if (isNaN(id) && idString) {
      throw new BadRequestException('Id should be a number');
    }
    return await this.providersService.removeProvider(id);
  }

  @Get('groupedByStarsInCategory/:categoryId')
  async getAllProvidersInCategoryGrouped(
    @Request() req,
    @Query('categoryId') categoryIdString: string
  ): Promise<{ title: string; data: ProviderDto[] }[]> {
    const categoryId = parseInt(categoryIdString);
    if (isNaN(categoryId) && categoryIdString) {
      throw new BadRequestException('Id should be a number');
    }
    return this.providersService.getProvidersGroupedByStarsForCategory(req.user.userId, categoryId);
  }
}
