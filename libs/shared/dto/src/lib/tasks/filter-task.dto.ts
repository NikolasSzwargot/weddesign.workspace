import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterTaskDto {
  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  showDoneTasks: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  afterDeadline: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  beforeDeadline: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  withoutDeadline: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  minDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  maxDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== null && value !== undefined ? Number(value) : undefined)) // string to number for swagger
  showFor: number;
}
