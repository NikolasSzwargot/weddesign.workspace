import { Module } from '@nestjs/common';
import { GuestsService } from './services/guests.service';
import { GuestsController } from './guests.controller';

@Module({
  controllers: [GuestsController],
  providers: [GuestsService],
  imports: [],
})
export class GuestsModule {}
