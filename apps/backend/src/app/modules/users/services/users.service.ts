import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserDto } from '@shared/dto';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async createNewUser(newUserDto: UserDto): Promise<User> {
    return this.prisma.user.create({ data: newUserDto });
  }
}
