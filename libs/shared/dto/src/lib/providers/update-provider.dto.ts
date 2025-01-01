import { PartialType } from '@nestjs/swagger';
import { CreateProviderDto } from '@shared/dto';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {
}
