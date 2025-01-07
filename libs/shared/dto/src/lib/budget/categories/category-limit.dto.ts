import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryLimitDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNumber()
  @ApiProperty()
  categoryId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  limit: number;

  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
