import { Injectable } from '@nestjs/common';
import { CreateTaskDto, FilterTaskDto, TaskDto, UpdateTaskDto } from '@shared/dto';
import { PrismaService } from '../../../prisma-client.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createNewTask(userId: number, newTask: CreateTaskDto): Promise<TaskDto> {
    return this.prisma.task.create({ data: { ...newTask, userId } });
  }

  async updateTask(userId: number, id: number, updateTask: UpdateTaskDto): Promise<TaskDto> {
    try {
      return await this.prisma.task.update({
        where: { id, userId },
        data: updateTask,
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provider not found');
      }
      throw new Error(e);
    }
  }

  async getTaskById(userId: number, id: number): Promise<TaskDto> {
    try {
      return await this.prisma.task.findFirst({
        where: { id, userId },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provider not found');
      }
      throw new Error(e);
    }
  }

  async removeTask(userId: number, id: number): Promise<TaskDto> {
    try {
      return await this.prisma.task.delete({ where: { id, userId } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provider not found');
      }
      throw new Error(e);
    }
  }

  private getFilteredTasks(userId: number, filterDto: FilterTaskDto): Promise<TaskDto[]> {
    const conditions: any = {
      userId,
    };

    if (!filterDto.showDoneTasks) {
      conditions.isDone = false;
    }

    if (filterDto.deadline) {
      const orConditions = [];

      switch (true) {
        case filterDto.deadline.after:
          orConditions.push({
            deadline: { gt: new Date() },
          });
          break;

        case filterDto.deadline.before:
          orConditions.push({
            deadline: { lt: new Date() },
          });
          break;

        case filterDto.deadline.without:
          orConditions.push({
            deadline: null,
          });
          break;
      }

      if (orConditions.length > 0 && orConditions.length < 3) {
        conditions.OR = orConditions;
      }
    }

    if (filterDto.minDate) {
      conditions.deadline = { ...conditions.deadline, gt: new Date(filterDto.minDate) };
    }
    if (filterDto.maxDate) {
      conditions.deadline = { ...conditions.deadline, lt: new Date(filterDto.maxDate) };
    }

    if (filterDto.showFor !== undefined) {
      const today = new Date();
      let futureDate: Date;

      switch (filterDto.showFor) {
        case 0:
          futureDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
          break;

        case 1:
          futureDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
          break;

        case 2:
          futureDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
          break;

        default:
          futureDate = null;
          break;
      }

      if (futureDate) {
        conditions.deadline = {
          ...conditions.deadline,
          lte: futureDate,
        };
      }
    }

    return this.prisma.task.findMany({
      where: conditions,
      orderBy: { createdAt: 'asc' },
    });
  }

  async getTasksGrouped(userId: number, filterDto: FilterTaskDto): Promise<{ title: string; data: TaskDto[] }[]> {
    const tasks = await this.getFilteredTasks(userId, filterDto);

    const groupedTasks = tasks.reduce(
      (acc, task) => {
        const title = task.deadline
          ? new Date(task.deadline).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' })
          : 'bezterminowo';

        const group = acc.find((g) => g.title === title);

        if (group) {
          group.data.push(task);
        } else {
          acc.push({ title, data: [task] });
        }

        return acc;
      },
      [] as { title: string; data: TaskDto[] }[]
    );

    groupedTasks.forEach((group) => {
      group.data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    });

    return groupedTasks;
  }
}
