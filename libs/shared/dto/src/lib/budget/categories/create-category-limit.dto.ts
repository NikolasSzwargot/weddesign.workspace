import { OmitType } from '@nestjs/swagger';
import { CategoryLimitDto } from './category-limit.dto';

export class CreateCategoryLimitDto extends OmitType(CategoryLimitDto, ['id', 'userId', 'updatedAt', 'createdAt']) {
}
