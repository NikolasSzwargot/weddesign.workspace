import { OmitType } from '@nestjs/swagger';
import { GuestDto } from './guest.dto';

export class CreateGuestDto extends OmitType(GuestDto, ['id', 'userId']){

}
