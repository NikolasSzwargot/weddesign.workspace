import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserDto } from '@shared/dto';
import { User } from '@prisma/client';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async login(@Body() createUser: UserDto): Promise<User> {
    return await this.usersService.createNewUser(createUser);
  }
}
