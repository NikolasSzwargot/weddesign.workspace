import { OmitType, PartialType } from '@nestjs/swagger';
import { BudgetLimitDto } from './budget-limit.dto';

export class UpdateBudgetLimitDto extends PartialType(OmitType(BudgetLimitDto, ['id', 'userId', 'updatedAt', 'createdAt'])) {}
