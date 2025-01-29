import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {TaskDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useUpcomingTask = () => {
    const api = useFetch();
    return useQuery<TaskDto>([ApiRoutes.TasksUpcomingTask], () =>
        api.GET<TaskDto>(ApiRoutes.TasksUpcomingTask),
    );
};
