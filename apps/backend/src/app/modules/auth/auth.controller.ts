import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterAccountDto, UserDto } from '@shared/dto';
import { LoginDto } from '@shared/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<UserDto> {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() createAccountDto: RegisterAccountDto): Promise<LoginDto> {
    return this.authService.create(createAccountDto);
  }
}
