import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterAccountDto, UserDto } from '@shared/dto';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

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

  async login(loginDto: LoginDto): Promise<UserDto | null> {
    const account = await this.prisma.userLogin.findFirst({
      where: { email: loginDto.email },
    });
    if (await this.checkLoginAndPassword(account, loginDto)) {
      return this.prisma.user.findUnique({ where: { id: account.userId } });
    }
    return null;
  }

  private async checkLoginAndPassword(account: LoginDto, loginDto: LoginDto): Promise<boolean> {
    if (!account) {
      return false;
    }
    return await bcrypt.compare(loginDto.password, account.password);
  }
}
