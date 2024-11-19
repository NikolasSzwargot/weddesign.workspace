import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { CreateGuestDto } from './createGuest.dto';

export class UpdateGuestDto extends PartialType(CreateGuestDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isVege?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCompanion?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isChild?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canGetThere?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  overnight?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;
}
