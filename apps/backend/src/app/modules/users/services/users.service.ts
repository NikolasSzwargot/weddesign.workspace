import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  createNewUser(newUserDto: UserDto)
  {
    return this.prisma.user.create({ data: newUserDto });
  }
}
