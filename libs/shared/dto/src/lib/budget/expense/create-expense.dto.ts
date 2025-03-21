import { OmitType } from '@nestjs/swagger';
import { ExpenseDto } from './expense.dto';

export class CreateExpenseDto extends OmitType(ExpenseDto, ['id', 'userId', 'updatedAt', 'createdAt']) {
}
