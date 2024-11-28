import { ApiProperty } from '@nestjs/swagger';

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
}
