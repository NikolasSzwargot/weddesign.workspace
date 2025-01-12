import React from 'react';
import {TasksScreens} from '@weddesign/enums';

import {TaskForm, TasksList} from '../../organisms';

type TasksPageProps = {
    screen?: TasksScreens;
};
const TasksPage = ({screen}: TasksPageProps) => {
    switch (screen) {
        case TasksScreens.ADD:
            return <TaskForm />;
        case TasksScreens.LIST:
            return <TasksList />;
    }
};

export default TasksPage;
