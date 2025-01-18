import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterTaskDto {
  @ApiPropertyOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  showDoneTasks: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  deadline: {
    after: boolean;
    before: boolean;
    without: boolean;
  }

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
