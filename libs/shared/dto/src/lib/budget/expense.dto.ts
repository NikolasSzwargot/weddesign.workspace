import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ExpenseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  deadline: Date;

  @ApiProperty()
  isPaid: boolean;

  @ApiProperty()
  @IsOptional()
  updatedAt: Date;

  @ApiProperty()
  @IsOptional()
  createdAt: Date;
}
