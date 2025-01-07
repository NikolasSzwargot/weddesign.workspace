import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const ApiGlobalDecorators = () => applyDecorators(ApiBearerAuth('JWT-auth'));
