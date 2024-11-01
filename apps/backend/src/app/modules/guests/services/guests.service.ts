import { Injectable } from '@nestjs/common';
import { CreateGuestDto } from '@shared/dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GuestsService {
  private prisma = new PrismaClient();

  create(createGuestDto: CreateGuestDto) {
    return this.prisma.guest.create({
      data: {
        firstName: createGuestDto.firstName,
        lastName: createGuestDto.lastName,
        guestStatusId: createGuestDto.statusId,
        canGetThere: createGuestDto.canGetThere,
        isCompanion: createGuestDto.isCompanion,
        isChild: createGuestDto.isChild,
        isVege: createGuestDto.isVege,
        overnight: createGuestDto.overnight,
      },
    });
  }

  findAll() {
    return this.prisma.guest.findMany();
  }

  findOne(id: number) {
    return this.prisma.guest.findUnique({ where: { id: id } });
  }

  remove(id: number) {
    return this.prisma.guest.delete({ where: { id: id } });
  }
}
