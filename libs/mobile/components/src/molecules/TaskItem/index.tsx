import React from 'react';
import {TaskItemContainer, TaskInfoContainer, TaskNameWrapper} from './styles';
import {TaskDto} from '@shared/dto';
import {Text} from '@weddesign/themes';
import {IconButton} from '../../atoms';
import {Icons} from '@weddesign/assets';
import {TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Colors} from '@weddesign/enums';

type GuestItemProps = {
    task: TaskDto;
    onCheckboxPress: (task: TaskDto) => void;
    onGuestPress: () => void;
    onDeletePress: (task: TaskDto) => void;
};

const TaskItem = ({
    task,
    onCheckboxPress,
    onGuestPress,
    onDeletePress,
}: GuestItemProps) => (
    <TaskItemContainer onPress={onGuestPress}>
        <TaskInfoContainer>
            <TouchableOpacity onPress={() => onCheckboxPress(task)}>
                <CheckBox
                    checked={false}
                    uncheckedColor={Colors.Black}
                    checkedColor={Colors.Black}
                />
            </TouchableOpacity>
            <TaskNameWrapper>
                <Text.Regular size={14}>{task.name}</Text.Regular>
            </TaskNameWrapper>
        </TaskInfoContainer>
        <IconButton Icon={Icons.X} onPress={() => onDeletePress(task)} />
    </TaskItemContainer>
);

export default TaskItem;
