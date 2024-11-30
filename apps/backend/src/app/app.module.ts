import { Module } from '@nestjs/common';

import { GuestsModule } from './modules/guests/guests.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BudgetModule } from './modules/budget/budget.module';

@Module({
  imports: [GuestsModule, AuthModule, UsersModule, BudgetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
