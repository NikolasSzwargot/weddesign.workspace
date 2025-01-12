import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { PrismaService } from '../../prisma-client.service';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}
