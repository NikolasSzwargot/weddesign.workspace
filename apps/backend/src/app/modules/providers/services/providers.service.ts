import { Injectable } from '@nestjs/common';
import {
  CategoryToSummaryDto,
  CategoryWithProviders,
  CreateProviderCategoryDto,
  CreateProviderDto,
  ProviderCategoryDto,
  ProviderDto,
  UpdateProviderDto,
} from '@shared/dto';
import { PrismaService } from '../../../prisma-client.service';

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) {}

  async createNewCategory(userId: number, newCategoryDto: CreateProviderCategoryDto): Promise<ProviderCategoryDto> {
    return this.prisma.providerCategory.create({ data: { ...newCategoryDto, userId } });
  }

  async removeCategory(userId: number, categoryId: number): Promise<ProviderCategoryDto> {
    try {
      await this.prisma.provider.deleteMany({
        where: { categoryId, userId },
      });

      return this.prisma.providerCategory.delete({ where: { id: categoryId, userId } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provider category not found');
      }
      throw new Error(e);
    }
  }

  async getCategoryById(userId: number, id: number): Promise<ProviderCategoryDto> {
    try {
      return this.prisma.providerCategory.findUnique({ where: { id, userId } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provider category not found');
      }
      throw new Error(e);
    }
  }

  private async getAllCategoriesWithProviders(userId: number): Promise<CategoryWithProviders[]> {
    return this.prisma.providerCategory.findMany({
      include: {
        providers: {
          select: {
            id: true,
            isReserved: true,
          },
        },
      },
      where: { userId },
    });
  }

  async getCategoriesSummary(userId: number): Promise<CategoryToSummaryDto[]> {
    const categories = await this.getAllCategoriesWithProviders(userId);
    return categories.map((category) => {
      const totalProviders: number = category.providers.length;
      const reservedProviders: number = category.providers.filter((provider) => provider.isReserved).length;

      return {
        id: category.id,
        iconId: category.iconId,
        name: category.name,
        inDatabase: totalProviders,
        reserved: reservedProviders,
      };
    });
  }

  async createNewProvider(userId: number, newProviderDto: CreateProviderDto): Promise<ProviderDto> {
    return this.prisma.provider.create({ data: { ...newProviderDto, userId } });
  }

  async updateProvider(userId: number, id: number, updateProviderDto: UpdateProviderDto): Promise<ProviderDto> {
    try {
      return await this.prisma.provider.update({
        where: { id, userId },
        data: updateProviderDto,
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provider not found');
      }
      throw new Error(e);
    }
  }

  async getAllProvidersInCategory(userId: number, categoryId: number): Promise<ProviderDto[]> {
    try {
      return await this.prisma.provider.findMany({
        where: { categoryId, userId },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProviderById(userId: number, id: number): Promise<ProviderDto> {
    try {
      return await this.prisma.provider.findFirst({
        where: { id, userId },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provider not found');
      }
      throw new Error(e);
    }
  }

  async removeProvider(userId: number, id: number): Promise<ProviderDto> {
    try {
      return await this.prisma.provider.delete({ where: { id, userId } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provider not found');
      }
      throw new Error(e);
    }
  }

  async getProvidersGroupedByStarsForCategory(
    userId: number,
    categoryId: number
  ): Promise<{ title: string; data: ProviderDto[] }[]> {
    const providersInCategory = await this.prisma.provider.findMany({
      where: { categoryId, userId },
    });

    const groupedProviders = providersInCategory.reduce(
      (acc, provider) => {
        const title = `${provider.stars}/5`;
        const group = acc.find((g) => g.title === title);

        if (group) {
          group.data.push(provider);
        } else {
          acc.push({ title, data: [provider] });
        }

        return acc;
      },
      [] as { title: string; data: ProviderDto[] }[]
    );

    return groupedProviders.sort((a, b) => {
      const starsA = parseInt(a.title.split('/')[0], 10);
      const starsB = parseInt(b.title.split('/')[0], 10);
      return starsB - starsA;
    });
  }
}
