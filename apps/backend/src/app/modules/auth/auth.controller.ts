import { Controller, Post, Body, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterAccountDto } from '@shared/dto';
import { LoginDto } from '@shared/dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() createAccountDto: RegisterAccountDto): Promise<{ access_token: string }> {
    const loginDto = await this.authService.create(createAccountDto);
    return await this.authService.login(loginDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
