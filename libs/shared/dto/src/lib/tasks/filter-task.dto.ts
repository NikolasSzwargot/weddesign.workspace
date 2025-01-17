import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterTaskDto {
  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  showDoneTasks: boolean;

  @ApiProperty()
  @IsOptional()
  deadline: {
    after: boolean;
    before: boolean;
    without: boolean;
  }

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  minDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  maxDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== null && value !== undefined ? Number(value) : undefined)) // string to number for swagger
  showFor: number;
}
