import { Controller, Get, Post, Body, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { GuestsService } from './services/guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { Guest } from '@prisma/client';
import { ApiQuery } from '@nestjs/swagger';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestService: GuestsService) {}

  @Post('createGuest')
  async create(@Body() createGuestDto: CreateGuestDto): Promise<Guest> {
    return await this.guestService.create(createGuestDto);
  }

  @Get('getAllGuests')
  async findAll(): Promise<Guest[]> {
    return await this.guestService.findAll();
  }

  @Get('getGuest')
  async findOne(@Query('id') idString: string): Promise<Guest> {
    const id = parseInt(idString);
    if (isNaN(id) && idString) {
      throw new BadRequestException('Id should be a number');
    }

    return await this.guestService.findOne(id);
  }

  @Get('count')
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'statusName', required: false, type: String })
  @ApiQuery({ name: 'statusId', required: false, type: Number })
  async getCount(
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

    const count = await this.guestService.countGuests(filter, statusName, statusId);
    return { count };
  }

  @Delete('deleteGuest')
  async remove(@Query('id') idString: string): Promise<Guest> {
    const id = parseInt(idString);
    if (isNaN(id) && idString) {
      throw new BadRequestException('Id should be a number');
    }
    return await this.guestService.remove(id);
  }

  @Get('allGuestsGrouped')
  async getAllGuestsGrouped(): Promise<{ data: Guest[]; title: string }[]> {
    return await this.guestService.getGuestsGroupedByFirstLetter();
  }
}
