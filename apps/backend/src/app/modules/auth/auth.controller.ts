import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterAccountDto } from './dto/registerAccount.dto';
import { LoginDto } from './dto/login.dto';

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
