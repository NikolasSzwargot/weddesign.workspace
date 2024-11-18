import { Module } from '@nestjs/common';
import { GuestsService } from './services/guests.service';
import { GuestsController } from './guests.controller';
import { GuestsStatusesService } from './services/guest-statuses.service';

@Module({
  controllers: [GuestsController],
  providers: [GuestsService, GuestsStatusesService],
  imports: [],
})
export class GuestsModule {}
