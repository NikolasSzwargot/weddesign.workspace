import {FilterTaskDto, TaskDto} from '@shared/dto';
import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';

import {useFetch} from '../useFetch';

export type GroupedTasksDto = {
    title: string;
    data: TaskDto[];
};

export const useGroupedTasks = (filter: FilterTaskDto) => {
    const api = useFetch();

    return useQuery<GroupedTasksDto[], Error>([ApiRoutes.TasksGrouped], () =>
        api.GET<GroupedTasksDto[]>(ApiRoutes.TasksGrouped, {params: filter}),
    );
};
