import { Injectable } from '@nestjs/common';
import { CreateGuestDto, GuestFiltersDto, UpdateGuestDto } from '@shared/dto';
import { Guest, PrismaClient } from '@prisma/client';

@Injectable()
export class GuestsService {
  private prisma = new PrismaClient();

  async create(userId: number, createGuestDto: CreateGuestDto): Promise<Guest> {
    return this.prisma.guest.create({
      data: {
        ...createGuestDto,
        userId,
      },
    });
  }

  async update(userId: number, id: number, updateGuestDto: UpdateGuestDto): Promise<Guest | null> {
    try {
      return await this.prisma.guest.update({
        where: { id, userId },
        data: updateGuestDto,
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Expense not found');
      }
      throw e;
    }
  }

  async countGuests(userId: number, filter?: string, statusName?: string, statusId?: number): Promise<number> {
    const where: any = {};
    where.userId = userId;

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

  async findAll(userId: number): Promise<Guest[]> {
    return this.prisma.guest.findMany({ where: { userId } });
  }

  async findOne(userId: number, id: number): Promise<Guest> {
    return this.prisma.guest.findUnique({ where: { id, userId } });
  }

  async remove(userId: number, id: number): Promise<Guest> {
    return this.prisma.guest.delete({ where: { id, userId } });
  }

  async getGuestsGroupedByFirstLetter(
    userId: number,
    filters: GuestFiltersDto
  ): Promise<{ data: Guest[]; title: string }[]> {
    const guests = await this.prisma.guest.findMany({ where: { userId, ...filters } });

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

    return Object.keys(groupedGuests)
      .sort()
      .map((letter) => ({
        title: letter,
        data: groupedGuests[letter],
      }));
  }
}
