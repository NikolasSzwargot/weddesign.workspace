import { OmitType, PartialType } from '@nestjs/swagger';
import { ExpenseDto } from './expense.dto';

export class UpdateExpenseDto extends PartialType(OmitType(ExpenseDto, ['id', 'updatedAt', 'createdAt'])) { }
