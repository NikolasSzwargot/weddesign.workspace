import { ProviderCategoryDto } from './provider-category.dto';
import { OmitType } from '@nestjs/swagger';

export class CategoryToSummaryDto extends OmitType(ProviderCategoryDto, ['updatedAt', 'createdAt']) {
  inDatabase: number;
  reserved: number;
}
