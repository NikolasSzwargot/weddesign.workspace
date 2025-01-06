import { ApiProperty } from '@nestjs/swagger';

export class BudgetLimitDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
