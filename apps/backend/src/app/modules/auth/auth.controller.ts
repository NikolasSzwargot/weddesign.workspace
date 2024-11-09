import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterAccountDto } from '@shared/dto';
import { LoginDto } from '@shared/dto';
import { UserLogin } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<boolean> {
    return await this.authService.checkLoginAndPassword(loginDto);
  }

  @Post('register')
  async register(@Body() createAccountDto: RegisterAccountDto): Promise<UserLogin> {
    return this.authService.create(createAccountDto);
  }
}
