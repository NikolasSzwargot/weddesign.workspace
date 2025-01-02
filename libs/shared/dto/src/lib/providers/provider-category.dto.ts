import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ProviderCategoryDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  iconId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsOptional()
  updatedAt: Date;

  @ApiProperty()
  @IsOptional()
  createdAt: Date;
}
