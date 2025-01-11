import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {TaskDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export type GroupedTasksDto = {
    title: string;
    data: TaskDto[];
};

export const useGroupedTasks = () => {
    const api = useFetch();

    return useQuery<GroupedTasksDto[], Error>([ApiRoutes.TasksGrouped], () =>
        api.GET<GroupedTasksDto[]>(ApiRoutes.TasksGrouped),
    );
};
