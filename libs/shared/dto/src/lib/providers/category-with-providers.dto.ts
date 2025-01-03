import { ProviderCategoryDto } from './provider-category.dto';

export class CategoryWithProviders extends ProviderCategoryDto {
  providers: {id: number; isReserved: boolean}[];
}
