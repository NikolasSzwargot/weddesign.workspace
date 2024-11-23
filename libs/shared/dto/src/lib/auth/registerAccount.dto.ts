import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@shared/dto';


export class RegisterAccountDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  user: UserDto;
}
