import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExpenseCategoryDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
