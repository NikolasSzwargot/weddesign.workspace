import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestsModule } from './modules/guests/guests.module';

@Module({
  imports: [GuestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
