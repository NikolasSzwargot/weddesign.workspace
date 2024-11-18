import { ApiProperty } from '@nestjs/swagger';

export class CreateGuestDto {
  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty()
  isVege: boolean;

  @ApiProperty()
  isCompanion: boolean;

  @ApiProperty()
  isChild: boolean;

  @ApiProperty()
  canGetThere: boolean;

  @ApiProperty()
  overnight: boolean;

  @ApiProperty()
  statusId: number;
}
