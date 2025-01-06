import { PartialType } from '@nestjs/swagger';
import { CreateCategoryLimitDto } from './create-category-limit.dto';

export class UpdateCategoryLimitDto extends PartialType(CreateCategoryLimitDto) { }
