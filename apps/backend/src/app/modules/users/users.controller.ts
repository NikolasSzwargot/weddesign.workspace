import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto, UserDto } from '@shared/dto';
import { Public } from '../../../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserDto> {
    return await this.usersService.createNewUser(createUser);
  }
}
