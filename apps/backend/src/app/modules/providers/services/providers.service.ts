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

  async createNewCategory(newCategoryDto: CreateProviderCategoryDto): Promise<ProviderCategoryDto> {
    return this.prisma.providerCategory.create({ data: newCategoryDto });
  }

  async removeCategory(id: number): Promise<ProviderCategoryDto> {
    try {
      return this.prisma.providerCategory.delete({ where: { id: id } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provide Category not found');
      }
      throw new Error(e);
    }
  }

  async getCategoryById(id: number): Promise<ProviderCategoryDto> {
    try {
      return this.prisma.providerCategory.findUnique({ where: { id: id } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provide Category not found');
      }
      throw new Error(e);
    }
  }

  private async getAllCategoriesWithProviders(): Promise<CategoryWithProviders[]> {
    return this.prisma.providerCategory.findMany({
      include: {
        providers: {
          select: {
            id: true,
            isReserved: true,
          },
        },
      },
    });
  }

  async getCategoriesSummary(): Promise<CategoryToSummaryDto[]> {
    const categories = await this.getAllCategoriesWithProviders();
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

  async createNewProvider(newProviderDto: CreateProviderDto): Promise<ProviderDto> {
    return this.prisma.provider.create({ data: newProviderDto });
  }

  async updateProvider(id: number, updateProviderDto: UpdateProviderDto): Promise<ProviderDto> {
    try {
      return await this.prisma.provider.update({
        where: { id },
        data: updateProviderDto,
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provider not found');
      }
      throw new Error(e);
    }
  }

  async getAllProvidersInCategory(categoryId: number): Promise<ProviderDto[]> {
    try {
      return await this.prisma.provider.findMany({
        where: { categoryId },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProviderById(id: number): Promise<ProviderDto> {
    try {
      return await this.prisma.provider.findFirst({
        where: { id },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provider not found');
      }
      throw new Error(e);
    }
  }

  async removeProvider(id: number): Promise<ProviderDto> {
    try {
      return await this.prisma.provider.delete({ where: { id } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error('Provider not found');
      }
      throw new Error(e);
    }
  }
}
