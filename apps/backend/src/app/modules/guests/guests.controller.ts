import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  BadRequestException,
  Param,
  Patch,
  ParseIntPipe,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { GuestsService } from './services/guests.service';
import { CreateGuestDto, UpdateGuestDto } from '@shared/dto';
import { GuestsStatusesService } from './services/guest-statuses.service';
import { ApiQuery } from '@nestjs/swagger';
import { Guest, GuestStatus } from '@prisma/client';
import { Public } from '../../../decorators/public.decorator';
import { ApiGlobalDecorators } from '../../../decorators/swagger.decorators';

@ApiGlobalDecorators()
@Controller('guests')
export class GuestsController {
  constructor(
    private readonly guestService: GuestsService,
    private readonly guestStatusesService: GuestsStatusesService
  ) {}

  @Post()
  async create(@Request() req, @Body() createGuestDto: CreateGuestDto): Promise<Guest> {
    return await this.guestService.create(req.user.userId, createGuestDto);
  }

  @Patch(':id')
  async updateGuest(@Param('id', ParseIntPipe) id: number, @Body() updateGuestDto: UpdateGuestDto): Promise<Guest> {
    const guest = await this.guestService.update(id, updateGuestDto);
    if (!guest) {
      throw new NotFoundException('Guest not found');
    }
    return guest;
  }

  @Get()
  async findAll(@Request() req): Promise<Guest[]> {
    return await this.guestService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Guest> {
    return await this.guestService.findOne(id);
  }

  @Get('count')
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'statusName', required: false, type: String })
  @ApiQuery({ name: 'statusId', required: false, type: Number })
  async getCount(
    @Request() req,
    @Query('filter') filter?: string,
    @Query('statusName') statusName?: string,
    @Query('statusId') statusIdString?: string
  ): Promise<{ count: number }> {
    if (statusName && statusIdString) {
      throw new BadRequestException('Please provide status name OR id');
    }

    const statusId = parseInt(statusIdString);
    if (isNaN(statusId) && statusIdString) {
      throw new BadRequestException('StatusId should be a number');
    }

    const count = await this.guestService.countGuests(req.user.userId, filter, statusName, statusId);
    return { count };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Guest> {
    return await this.guestService.remove(id);
  }

  @Get('grouped')
  async getAllGuestsGrouped(@Request() req): Promise<{ data: Guest[]; title: string }[]> {
    return await this.guestService.getGuestsGroupedByFirstLetter(req.user.userId);
  }

  @Public()
  @Get('status')
  async findAllStatuses(): Promise<GuestStatus[]> {
    return await this.guestStatusesService.findAll();
  }

  @Public()
  @Get('status/:id')
  async getStatusById(@Param('id', ParseIntPipe) id: number): Promise<GuestStatus> {
    return await this.guestStatusesService.findById(id);
  }

  @Public()
  @Get('status/name')
  async getStatusByName(@Query('name') name: string): Promise<GuestStatus> {
    return await this.guestStatusesService.findByName(name);
  }
}
