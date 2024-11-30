import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstNameBride: string;

  @ApiProperty()
  firstNameGroom: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  weddingDate: Date;

  @ApiProperty()
  language: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
