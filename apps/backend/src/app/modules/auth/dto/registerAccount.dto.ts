import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class RegisterAccountDto {
  @ApiProperty({ required: true })
  login: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  user: UserDto;
}
