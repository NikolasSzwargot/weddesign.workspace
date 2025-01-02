import { Module } from '@nestjs/common';

import { GuestsModule } from './modules/guests/guests.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BudgetModule } from './modules/budget/budget.module';
import { PrismaService } from './prisma-client.service';
import { ProvidersModule } from './modules/providers/providers.module';

@Module({
  imports: [GuestsModule, AuthModule, UsersModule, BudgetModule, ProvidersModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
