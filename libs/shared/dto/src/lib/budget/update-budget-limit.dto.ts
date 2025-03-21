import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateBudgetLimitDto } from './create-budget-limit.dto';

export class UpdateBudgetLimitDto extends PartialType(OmitType(CreateBudgetLimitDto, ['userId'])) {}
