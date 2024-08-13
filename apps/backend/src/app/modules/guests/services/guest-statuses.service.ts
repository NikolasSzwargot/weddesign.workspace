import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GuestsStatusesService {
  private prisma = new PrismaClient();

  findAll() {
    return this.prisma.guestStatus.findMany();
  }

  findById(id: number) {
    return this.prisma.guestStatus.findUnique({ where: { id: id } });
  }

  findByName(name: string) {
    return this.prisma.guestStatus.findUnique({ where: { name: name } });
  }
}
