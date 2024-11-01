import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterAccountDto } from '@shared/dto';
import { LoginDto } from '@shared/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.checkLoginAndPassword(loginDto);
  }

  @Post('register')
  register(@Body() createAccountDto: RegisterAccountDto) {
    return this.authService.create(createAccountDto);
  }
}
