import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto, UserDto } from '@shared/dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async login(@Body() createUser: CreateUserDto): Promise<UserDto> {
    return await this.usersService.createNewUser(createUser);
  }
}
