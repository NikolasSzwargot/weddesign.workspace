import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from 'react';
import {FilterTaskDto} from '@shared/dto';

type TaskFilterContextType = {
    filter: FilterTaskDto | undefined;
    setFilter: Dispatch<SetStateAction<FilterTaskDto>> | undefined;
};

const TaskFilterContext = createContext<TaskFilterContextType>({
    filter: undefined,
    setFilter: undefined,
});

export const TaskFilterProvider = ({children}) => {
    const [filter, setFilter] = useState<FilterTaskDto>({showDoneTasks: true});

    const contextValue = useMemo<TaskFilterContextType>(
        () => ({filter, setFilter}),
        [filter, setFilter],
    );

    return (
        <TaskFilterContext.Provider value={contextValue}>
            {children}
        </TaskFilterContext.Provider>
    );
};

export const useTaskFilter = () => useContext(TaskFilterContext);
