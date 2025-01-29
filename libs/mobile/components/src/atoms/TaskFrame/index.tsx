import {Text} from '@weddesign/themes';
import {MainView} from './styles';

type TaskFrameProps = {
    taskLabel?: string;
    taskDate?: Date;
};

const TaskFrame = ({taskLabel, taskDate}: TaskFrameProps) => {
    return (
        <MainView>
            <Text.Bold>{'Następne zadanie:'}</Text.Bold>
            <Text.SemiBold>
                {taskDate
                    ? new Date(taskDate).toLocaleDateString('pl-PL', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                      })
                    : ''}
            </Text.SemiBold>
            <Text.SemiBold>{taskLabel ?? 'Brak zadań na teraz!'}</Text.SemiBold>
        </MainView>
    );
};

export default TaskFrame;
