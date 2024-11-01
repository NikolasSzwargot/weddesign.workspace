import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ required: true })
  firstNameBride: string;

  @ApiProperty({ required: true })
  firstNameGroom: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty({ required: true })
  weddingDate: Date;

  @ApiProperty({ required: true })
  language: string;
}
