import { PickType } from '@nestjs/swagger';
import { RegisterAccountDto } from './registerAccount.dto';

export class LoginDto extends PickType(RegisterAccountDto, ['email', 'password']){}
