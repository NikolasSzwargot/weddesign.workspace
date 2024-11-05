import { Injectable } from '@nestjs/common';
import { CreateGuestDto } from '../dto/create-guest.dto';
import { Guest, PrismaClient } from '@prisma/client';

@Injectable()
export class GuestsService {
  private prisma = new PrismaClient();

  async create(createGuestDto: CreateGuestDto): Promise<Guest> {
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

  async countGuests(filter?: string, statusName?: string, statusId?: number): Promise<number> {
    const where: any = {};

    switch (filter) {
      case 'overnight':
        where.overnight = true;
        break;
      case 'isVege':
        where.isVege = true;
        break;
      case 'isChild':
        where.isChild = true;
        break;
      case 'canGetThere':
        where.canGetThere = true;
        break;
      case 'isCompanion':
        where.isCompanion = true;
        break;
    }

    if (statusName) {
      where.status = {
        name: statusName,
      };
    }

    if (statusId) {
      where.status = {
        id: statusId,
      };
    }

    return this.prisma.guest.count({
      where,
    });
  }

  async findAll(): Promise<Guest[]> {
    return this.prisma.guest.findMany();
  }

  async findOne(id: number): Promise<Guest> {
    return this.prisma.guest.findUnique({ where: { id: id } });
  }

  async remove(id: number): Promise<Guest> {
    return this.prisma.guest.delete({ where: { id: id } });
  }

  async getGuestsGroupedByFirstLetter(): Promise<Record<string, Guest[]>> {
    const guests = await this.findAll();

    const groupedGuests: Record<string, Guest[]> = {};

    guests.forEach((guest) => {
      const firstLetter = guest.firstName.charAt(0).toUpperCase();

      if (!groupedGuests[firstLetter]) {
        groupedGuests[firstLetter] = [];
      }
      groupedGuests[firstLetter].push(guest);
    });

    for (const letter in groupedGuests) {
      groupedGuests[letter].sort((a, b) => (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName));
    }

    return groupedGuests;
  }
}
