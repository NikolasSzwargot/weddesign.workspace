import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from '@shared/dto';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  createNewUser(newUserDto: UserDto) {
    return this.prisma.user.create({ data: newUserDto });
  }
}
