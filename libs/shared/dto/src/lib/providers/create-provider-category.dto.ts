import { OmitType } from '@nestjs/swagger';
import { ProviderCategoryDto } from './provider-category.dto';

export class CreateProviderCategoryDto extends OmitType(ProviderCategoryDto, ['id', 'updatedAt', 'createdAt']) {
}
