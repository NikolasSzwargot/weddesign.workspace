import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto, UserDto } from '@shared/dto';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async createNewUser(newUserDto: CreateUserDto): Promise<UserDto> {
    return this.prisma.user.create({ data: newUserDto });
  }
}
