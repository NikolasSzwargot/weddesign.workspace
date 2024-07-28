import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GuestsService } from './services/guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

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
}
