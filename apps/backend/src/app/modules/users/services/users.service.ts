import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from '@shared/dto';
import { PrismaService } from '../../../prisma-client.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createNewUser(newUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.prisma.user.create({ data: newUserDto });
    await this.createBudgetMainLimit(newUser.id);
    await this.createBudgetCategoriesLimit(newUser.id);
    return newUser;
  }

  private async createBudgetMainLimit(userId: number) {
    await this.prisma.mainBudgetLimit.create({
      data: {
        userId,
        limit: 0,
      },
    });
  }
  private async createBudgetCategoriesLimit(userId: number) {
    const categories = await this.prisma.expenseCategory.findMany();
    const data = categories.map((category) => ({
      userId,
      categoryId: category.id,
      limit: 0,
    }));

    await this.prisma.expenseCategoryLimit.createMany({
      data,
    });
  }
}
