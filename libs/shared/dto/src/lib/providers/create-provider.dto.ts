import { OmitType } from '@nestjs/swagger';
import { ProviderDto } from './provider.dto';

export class CreateProviderDto extends OmitType(ProviderDto, ['id', 'userId', 'updatedAt', 'createdAt']) {
}
