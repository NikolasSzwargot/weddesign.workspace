import { OmitType } from '@nestjs/swagger';
import { BudgetLimitDto } from './budget-limit.dto';

export class CreateBudgetLimitDto extends OmitType(BudgetLimitDto, ['id', 'createdAt', 'updatedAt']) {}
