import { Module } from '@nestjs/common';
import { ProvidersService } from './services/providers.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from '../../prisma-client.service';
import { ProvidersController } from './providers.controller';

@Module({
  controllers: [CategoriesController, ProvidersController],
  providers: [ProvidersService, PrismaService],
})
export class ProvidersModule {}
