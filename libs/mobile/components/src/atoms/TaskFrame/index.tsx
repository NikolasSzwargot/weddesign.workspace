import {Text} from '@weddesign/themes';
import {MainView} from './styles';

type TaskFrameProps = {
    title: string;
    noTaskLabel: string;
    taskLabel?: string;
    taskDate?: Date;
};

const TaskFrame = ({taskLabel, taskDate, title, noTaskLabel}: TaskFrameProps) => {
    return (
        <MainView>
            <Text.Bold>{title}</Text.Bold>
            <Text.SemiBold>
                {taskDate
                    ? new Date(taskDate).toLocaleDateString('pl-PL', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                      })
                    : ''}
            </Text.SemiBold>
            <Text.SemiBold>{taskLabel ?? noTaskLabel}</Text.SemiBold>
        </MainView>
    );
};

export default TaskFrame;
