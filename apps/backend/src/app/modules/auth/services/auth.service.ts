import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterAccountDto } from '@shared/dto';
import { PrismaService } from '../../../prisma-client.service';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { jwtConstants } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  private static readonly saltOrRounds = 10;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  async create(createAuthDto: RegisterAccountDto): Promise<LoginDto> {
    if (!this.isValidEmail(createAuthDto.email)) {
      throw new Error('Invalid email');
    }
    const newUser = await this.usersService.createNewUser(createAuthDto.user);
    const hashedPassword = await bcrypt.hash(createAuthDto.password, AuthService.saltOrRounds);
    return this.prisma.userLogin.create({
      data: {
        email: createAuthDto.email,
        password: hashedPassword,
        userId: newUser.id,
      },
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; expires_at: string }> {
    const account = await this.prisma.userLogin.findFirst({
      where: { email: loginDto.email },
    });
    if (!(await this.checkLoginAndPassword(account, loginDto))) {
      console.log(account, loginDto);
      throw new UnauthorizedException();
    }
    const user = await this.prisma.user.findUnique({ where: { id: account.userId } });
    const payload = {
      email: loginDto.email,
      userId: user.id,
      brideName: user.firstNameBride,
      groomName: user.firstNameGroom,
      lastName: user.lastName,
      weddingDate: user.weddingDate,
      language: user.language,
    };

    const expiresIn = jwtConstants.expiresIn;
    const expiresInMs = typeof expiresIn === 'string' ? ms(expiresIn) : expiresIn * 1000;

    return {
      access_token: await this.jwtService.signAsync(payload),
      expires_at: new Date(Date.now() + expiresInMs).toISOString(),
    };
  }

  private async checkLoginAndPassword(account: LoginDto, loginDto: LoginDto): Promise<boolean> {
    if (!account) {
      throw new BadRequestException('User not found');
    }
    return await bcrypt.compare(loginDto.password, account.password);
  }
}
