import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GuestFiltersDto {
  @ApiPropertyOptional({ type: Number})
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  guestStatusId?: number;

  @ApiPropertyOptional({ type: Boolean})
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  overnight?: boolean;

  @ApiPropertyOptional({ type: Boolean})
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  canGetThere?: boolean;

  @ApiPropertyOptional({ type: Boolean})
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isChild?: boolean;

  @ApiPropertyOptional({ type: Boolean})
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isCompanion?: boolean;

  @ApiPropertyOptional({ type: Boolean})
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isVege?: boolean;
}
