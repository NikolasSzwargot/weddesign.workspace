import { Injectable } from '@nestjs/common';
import {
  CategoryToSummaryDto,
  CategoryWithProviders,
  CreateProviderCategoryDto,
  ProviderCategoryDto,
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
}
