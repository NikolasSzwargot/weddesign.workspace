import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ProviderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  amount: number;

  @ApiProperty()
  @IsOptional()
  website: string;

  @ApiProperty()
  @IsOptional()
  instagram: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  stars: number;

  @ApiProperty()
  isReserved: boolean;

  @ApiProperty()
  @IsOptional()
  createdAt: Date;

  @ApiProperty()
  @IsOptional()
  updatedAt: Date;
}
