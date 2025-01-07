import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class GuestDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsBoolean()
  isVege: boolean;

  @ApiProperty()
  @IsBoolean()
  isCompanion: boolean;

  @ApiProperty()
  @IsBoolean()
  isChild: boolean;

  @ApiProperty()
  @IsBoolean()
  canGetThere: boolean;

  @ApiProperty()
  @IsBoolean()
  overnight: boolean;

  @ApiProperty()
  @IsString()
  notes: string;

  @ApiProperty({ required: true })
  @IsNumber()
  guestStatusId: number;

  @ApiProperty({ required: true })
  @IsNumber()
  userId: number;
}
