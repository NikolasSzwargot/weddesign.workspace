import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserDto } from '@shared/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('craeteUser')
  login(@Body() createUser: UserDto) {
    return this.usersService.createNewUser(createUser);
  }
}
