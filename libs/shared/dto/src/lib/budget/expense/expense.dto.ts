import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class ExpenseDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  categoryId: number;

  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsDate()
  @ApiProperty()
  deadline: Date;

  @IsBoolean()
  @ApiProperty()
  isPaid: boolean;

  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  updatedAt: Date;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  createdAt: Date;
}
