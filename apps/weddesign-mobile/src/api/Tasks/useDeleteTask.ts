import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {TaskDto} from '@shared/dto';

import {useFetch} from '../useFetch';

type DeleteTaskParams = {
    taskId: number;
};

export const useDeleteTask = () => {
    const api = useFetch();
    const queryClient = useQueryClient();
    const getTasksDeleteUrl = (id: number): ApiRoutes => {
        return ApiRoutes.TasksDelete.replace(':id', id.toString()) as ApiRoutes;
    };

    return useMutation<TaskDto, Error, DeleteTaskParams>(
        ({taskId}: DeleteTaskParams) => {
            if (!taskId) {
                throw new Error('Guest ID is required to delete a guest');
            }
            return api.DELETE<TaskDto>(getTasksDeleteUrl(taskId));
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.TasksGrouped]);
                queryClient.invalidateQueries([ApiRoutes.TasksUpcomingTask]);
            },
            onError: (error) => {
                console.error('Failed to delete task:', error.message);
            },
        },
    );
};
