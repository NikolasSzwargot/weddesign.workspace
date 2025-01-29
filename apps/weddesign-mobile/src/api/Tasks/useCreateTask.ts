import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CreateTaskDto, TaskDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useCreateTask = () => {
    const api = useFetch();
    const queryClient = useQueryClient();

    return useMutation<TaskDto, Error, CreateTaskDto>(
        (task: CreateTaskDto) =>
            api.POST<TaskDto, CreateTaskDto>(ApiRoutes.TasksCreate, task),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.TasksGrouped]);
                queryClient.invalidateQueries([ApiRoutes.TasksUpcomingTask]);
            },
            onError: (error) => {
                console.error('Error creating guest:', error);
            },
        },
    );
};
