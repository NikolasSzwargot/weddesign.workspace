import React from 'react';
import {TasksScreens} from '@weddesign/enums';

import {TaskForm, TasksFilter, TasksList} from '../../organisms';
import {TasksProvider} from '../../providers';

type TasksPageProps = {
    screen?: TasksScreens;
};
const TasksPage = ({screen}: TasksPageProps) => {
    switch (screen) {
        case TasksScreens.ADD:
            return (
                <TasksProvider>
                    <TaskForm />
                </TasksProvider>
            );
        case TasksScreens.LIST:
            return (
                <TasksProvider>
                    <TasksList />
                </TasksProvider>
            );
        case TasksScreens.FILTER:
            return (
                <TasksProvider>
                    <TasksFilter />
                </TasksProvider>
            );
    }
};

export default TasksPage;
