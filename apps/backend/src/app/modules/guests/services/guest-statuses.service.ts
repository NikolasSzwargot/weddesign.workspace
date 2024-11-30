import { Injectable } from '@nestjs/common';
import { GuestStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma-client.service';

@Injectable()
export class GuestsStatusesService {
  constructor(private prisma: PrismaService) {}

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
