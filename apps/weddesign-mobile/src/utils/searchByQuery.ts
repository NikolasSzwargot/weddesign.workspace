import {ExpensesByCategoryDto, ExpensesByDateDto} from '@shared/dto';

import {GroupedTasksDto, GuestsGroupedProps} from '../api';
import {ProvidersByStarsProps} from '../api/Providers/useGroupedByStarsInCategory';

export const searchByQuery = (
    list:
        | ExpensesByCategoryDto[]
        | ExpensesByDateDto[]
        | GuestsGroupedProps[]
        | ProvidersByStarsProps[]
        | GroupedTasksDto[],
    query: string,
) => {
    if (!query) {
        return list;
    }

    return list
        .map(
            (
                category:
                    | ExpensesByCategoryDto
                    | ExpensesByDateDto
                    | GuestsGroupedProps
                    | ProvidersByStarsProps
                    | GroupedTasksDto,
            ) => {
                const filteredData = category.data.filter((item) => {
                    if ('name' in item) {
                        return (
                            item.name?.toLowerCase().includes(query.toLowerCase()) ||
                            item.description
                                ?.toLowerCase()
                                .includes(query.toLowerCase())
                        );
                    }
                    if ('firstName' in item && 'lastName' in item) {
                        return (
                            item.firstName
                                ?.toLowerCase()
                                .includes(query.toLowerCase()) ||
                            item.lastName
                                ?.toLowerCase()
                                .includes(query.toLowerCase())
                        );
                    }
                    return false;
                });
                if (filteredData.length > 0) {
                    return {
                        ...category,
                        data: filteredData,
                    };
                }
                return null;
            },
        )
        .filter(Boolean);
};
