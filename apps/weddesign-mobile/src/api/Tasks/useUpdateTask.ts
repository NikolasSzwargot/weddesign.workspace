import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {TaskDto, UpdateTaskDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export type TaskIdUpdateDto = {
    id: number;
    data: UpdateTaskDto;
};

export const useUpdateTask = () => {
    const api = useFetch();
    const queryClient = useQueryClient();
    const getTaskUpdateUrl = (id: number): ApiRoutes => {
        return ApiRoutes.TasksUpdate.replace(':id', id.toString()) as ApiRoutes;
    };

    return useMutation<TaskDto, Error, TaskIdUpdateDto>(
        ({id, data}) =>
            api.PATCH<TaskDto, UpdateTaskDto>(getTaskUpdateUrl(id), data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.TasksGrouped]);
            },
            onError: (error) => {
                console.error('Error updating guest:', error);
            },
        },
    );
};
