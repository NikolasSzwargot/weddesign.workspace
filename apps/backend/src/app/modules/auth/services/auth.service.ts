import { Inject, Injectable } from '@nestjs/common';
import { RegisterAccountDto } from '../dto/registerAccount.dto';
import { PrismaClient } from '@prisma/client';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  private static readonly saltOrRounds = 10;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  async create(createAuthDto: RegisterAccountDto) {
    const newUser = await this.usersService.createNewUser(createAuthDto.user);
    const hashedPassword = await bcrypt.hash(createAuthDto.password, AuthService.saltOrRounds);
    return this.prisma.userLogin.create({
      data: {
        login: createAuthDto.login,
        password: hashedPassword,
        userId: newUser.id,
      },
    });
  }

  async checkLoginAndPassword(loginDto: LoginDto) {
    const account = await this.prisma.userLogin.findFirst({
      where: { login: loginDto.login },
    });
    return bcrypt.compare(loginDto.password, account.password);
  }
}
