import React from 'react';
import {TasksScreens} from '@weddesign/enums';

import {TaskForm, TasksFilter, TasksList} from '../../organisms';
import {TaskFilterProvider} from '../../providers';

type TasksPageProps = {
    screen?: TasksScreens;
};
const TasksPage = ({screen}: TasksPageProps) => {
    switch (screen) {
        case TasksScreens.ADD:
            return (
                <TaskFilterProvider>
                    <TaskForm />
                </TaskFilterProvider>
            );
        case TasksScreens.LIST:
            return (
                <TaskFilterProvider>
                    <TasksList />
                </TaskFilterProvider>
            );
        case TasksScreens.FILTER:
            return (
                <TaskFilterProvider>
                    <TasksFilter />
                </TaskFilterProvider>
            );
    }
};

export default TasksPage;
