import { Injectable } from '@nestjs/common';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from '@shared/dto';
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

  async getTasksGrouped(userId: number): Promise<{ title: string; data: TaskDto[] }[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

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

  async getUpcomingTask(userId: number): Promise<TaskDto> {
    return this.prisma.task.findFirst({
      where: { userId, isDone: false, deadline: { gte: new Date() } },
      orderBy: { deadline: { sort: 'asc', nulls: 'last' } },
    });
  }
}
