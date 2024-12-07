import { Module } from '@nestjs/common';
import { GuestsService } from './services/guests.service';
import { GuestsController } from './guests.controller';
import { GuestsStatusesService } from './services/guest-statuses.service';
import { PrismaService } from '../../prisma-client.service';

@Module({
  controllers: [GuestsController],
  providers: [GuestsService, GuestsStatusesService, PrismaService],
})
export class GuestsModule {}
