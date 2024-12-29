import { Module } from '@nestjs/common';
import { ProvidersService } from './services/providers.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from '../../prisma-client.service';

@Module({
  controllers: [CategoriesController],
  providers: [ProvidersService, PrismaService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
