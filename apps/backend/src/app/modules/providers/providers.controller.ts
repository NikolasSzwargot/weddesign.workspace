import { ProvidersService } from './services/providers.service';
import { BadRequestException, Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateProviderDto, ProviderDto, UpdateProviderDto } from '@shared/dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  async create(@Body() createProviderDto: CreateProviderDto): Promise<ProviderDto> {
    return await this.providersService.createNewProvider(createProviderDto);
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
  async findAll(@Query('categoryId') idString: string): Promise<ProviderDto[]> {
    const id = parseInt(idString);
    if (isNaN(id) && idString) {
      throw new BadRequestException('Id should be a number');
    }
    return await this.providersService.getAllProvidersInCategory(id);
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

  @Get('groupedByStarsInCategory')
  async getAllProvidersInCategoryGrouped(
    @Query('categoryId') idString: string
  ): Promise<{ title: string; data: ProviderDto[] }[]> {
    const id = parseInt(idString);
    if (isNaN(id) && idString) {
      throw new BadRequestException('Id should be a number');
    }
    return this.providersService.getProvidersGroupedByStarsForCategory(id);
  }
}
