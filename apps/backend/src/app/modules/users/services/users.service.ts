import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from '@shared/dto';
import { PrismaService } from '../../../prisma-client.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createNewUser(newUserDto: CreateUserDto): Promise<UserDto> {
    return this.prisma.user.create({ data: newUserDto });
  }
}
