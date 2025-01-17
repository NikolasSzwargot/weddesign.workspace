import { TasksService } from './services/tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto, FilterTaskDto, TaskDto, UpdateTaskDto } from '@shared/dto';
import { ApiGlobalDecorators } from '../../../decorators/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiGlobalDecorators()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Request() req, @Body() createTaskDto: CreateTaskDto): Promise<TaskDto> {
    return await this.tasksService.createNewTask(req.user.userId, createTaskDto);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<TaskDto> {
    return await this.tasksService.updateTask(req.user.userId, id, updateTaskDto);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<TaskDto> {
    return await this.tasksService.getTaskById(req.user.userId, id);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id', ParseIntPipe) id: number): Promise<TaskDto> {
    return await this.tasksService.removeTask(req.user.userId, id);
  }

  @Get('groupedDeadline')
  async getAllProvidersInCategoryGrouped(
    @Request() req,
    @Query(new ValidationPipe({ transform: true })) filter: FilterTaskDto
  ): Promise<{ title: string; data: TaskDto[] }[]> {
    return this.tasksService.getTasksGrouped(req.user.userId, filter);
  }
}
