import { Injectable } from '@nestjs/common';
import { GuestStatus, PrismaClient } from '@prisma/client';

@Injectable()
export class GuestsStatusesService {
  private prisma = new PrismaClient();

  async findAll(): Promise<GuestStatus[]> {
    return this.prisma.guestStatus.findMany();
  }

  async findById(id: number): Promise<GuestStatus> {
    return this.prisma.guestStatus.findUnique({ where: { id: id } });
  }

  async findByName(name: string): Promise<GuestStatus> {
    return this.prisma.guestStatus.findUnique({ where: { name: name } });
  }
}
