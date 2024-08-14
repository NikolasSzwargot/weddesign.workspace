import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserDto } from './dto/user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('craeteUser')
  login(@Body() createUser: UserDto): Promise<User> {
    return this.usersService.createNewUser(createUser);
  }
}
