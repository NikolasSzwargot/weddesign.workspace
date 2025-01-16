import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {GroupedTasksDto, useGroupedTasks} from '../../api';

export type TasksFilter = {
    showFinished: boolean;
    showUnscheduled: boolean;
    showAfterDeadline: boolean;
    showBeforeDeadline: boolean;
    minimumDate: Date | null;
    maximumDate: Date | null;
};
type TasksContextProps = {
    tasks: GroupedTasksDto[] | null;
    isLoading: boolean;
    filters: TasksFilter | null;
    filterTasks: (userFilters: TasksFilter | null) => void;
};

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const useTasks = () => {
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error('useTasks must be used within TasksProvider');
    }
    return context;
};

type TasksProviderProps = {
    children: ReactNode;
};

export const TasksProvider = ({children}: TasksProviderProps) => {
    const [tasks, setTasks] = useState<GroupedTasksDto[] | null>(null);
    const {data, isLoading: isRequestLoading} = useGroupedTasks();
    const [isLoading, setIsLoading] = useState<boolean>(isRequestLoading);
    const [filters, setFilters] = useState<TasksFilter | null>(null);

    const filterTasks = useCallback(
        async (userFilters: TasksFilter | null) => {
            setIsLoading(true);
            setFilters(userFilters);

            if (userFilters && data) {
                const filteredTasks = data.map((group) => ({
                    ...group,
                    data: group.data.filter((task) => {
                        const {
                            showFinished,
                            showUnscheduled,
                            showAfterDeadline,
                            showBeforeDeadline,
                            minimumDate,
                            maximumDate,
                        } = userFilters;

                        const isFinishedMatch = showFinished || !task.isDone;
                        const isUnscheduledMatch =
                            showUnscheduled || !!task.deadline;
                        const isAfterDeadlineMatch =
                            showAfterDeadline ||
                            (task.deadline && task.deadline >= new Date());
                        const isBeforeDeadlineMatch =
                            showBeforeDeadline ||
                            (task.deadline && task.deadline <= new Date());
                        const isWithinDateRange =
                            (!minimumDate || task.deadline >= minimumDate) &&
                            (!maximumDate || task.deadline <= maximumDate);

                        return (
                            isFinishedMatch &&
                            isUnscheduledMatch &&
                            isAfterDeadlineMatch &&
                            isBeforeDeadlineMatch &&
                            isWithinDateRange
                        );
                    }),
                }));

                setTasks(filteredTasks);
            } else {
                setTasks(data);
            }

            setIsLoading(false);
        },
        [data],
    );

    useEffect(() => {
        setIsLoading(true);
        setTasks(data);
        setIsLoading(false);
    }, [data]);

    const contextValues = useMemo<TasksContextProps>(
        () => ({tasks, isLoading, filters, filterTasks}),
        [tasks, isLoading],
    );

    return (
        <TasksContext.Provider value={contextValues}>
            {children}
        </TasksContext.Provider>
    );
};
