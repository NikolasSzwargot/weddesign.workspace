import { ProvidersService } from './services/providers.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request } from '@nestjs/common';
import { CreateProviderDto, ProviderDto, UpdateProviderDto } from '@shared/dto';
import { ApiGlobalDecorators } from '../../../decorators/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Providers')
@ApiGlobalDecorators()
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  async create(@Request() req, @Body() createProviderDto: CreateProviderDto): Promise<ProviderDto> {
    return await this.providersService.createNewProvider(req.user.userId, createProviderDto);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProviderDto: UpdateProviderDto
  ): Promise<ProviderDto> {
    return await this.providersService.updateProvider(req.user.userId, id, updateProviderDto);
  }

  @Get('allInCategory/:categoryId')
  async findAll(@Request() req, @Param('categoryId', ParseIntPipe) categoryId: number): Promise<ProviderDto[]> {
    return await this.providersService.getAllProvidersInCategory(req.user.userId, categoryId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<ProviderDto> {
    return await this.providersService.getProviderById(req.user.userId, id);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: number): Promise<ProviderDto> {
    return await this.providersService.removeProvider(req.user.userId, id);
  }

  @Get('groupedByStarsInCategory/:categoryId')
  async getAllProvidersInCategoryGrouped(
    @Request() req,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ): Promise<{ title: string; data: ProviderDto[] }[]> {
    return this.providersService.getProvidersGroupedByStarsForCategory(req.user.userId, categoryId);
  }
}
