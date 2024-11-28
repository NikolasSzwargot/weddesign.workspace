import { PartialType } from '@nestjs/swagger';
import { CreateGuestDto } from './createGuest.dto';

export class UpdateGuestDto extends PartialType(CreateGuestDto) {
}
