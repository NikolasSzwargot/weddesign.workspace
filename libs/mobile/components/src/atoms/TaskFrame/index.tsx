import {Text} from '@weddesign/themes';
import {MainView} from './styles';

type TaskFrameProps = {
    taskLabel?: string;
};

const TaskFrame = ({taskLabel}: TaskFrameProps) => {
    return (
        <MainView>
            <Text.Bold>{'Następne zadanie:'}</Text.Bold>
        </MainView>
    );
};

export default TaskFrame;
