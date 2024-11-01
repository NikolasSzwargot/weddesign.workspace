import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GuestsService } from './services/guests.service';
import { CreateGuestDto } from '@shared/dto';
import { GuestsStatusesService } from './services/guest-statuses.service';

@Controller('guests')
export class GuestsController {
  constructor(
    private readonly guestsService: GuestsService,
    private readonly guestStatusesService: GuestsStatusesService
  ) {}

  @Post('createGuest')
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestsService.create(createGuestDto);
  }

  @Get('getAllGuests')
  findAll() {
    return this.guestsService.findAll();
  }

  @Get('getGuest')
  findOne(@Param('id') id: string) {
    return this.guestsService.findOne(+id);
  }

  @Delete('deleteGuest')
  remove(@Param('id') id: string) {
    return this.guestsService.remove(+id);
  }

  @Get('getStatuses')
  findAllStatuses() {
    return this.guestStatusesService.findAll();
  }

  @Get('getStatusById')
  getStatusById(@Param('id') id: number) {
    return this.guestStatusesService.findById(id);
  }

  @Get('getStatusByName')
  getStatusByName(@Param('name') name: string) {
    return this.guestStatusesService.findByName(name);
  }
}
