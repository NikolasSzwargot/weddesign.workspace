import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from '@shared/dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
